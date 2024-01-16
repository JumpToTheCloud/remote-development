import * as fs from 'fs';
import { Annotations, CfnOutput, Duration, Tags } from 'aws-cdk-lib';
import {
  ComparisonOperator,
  Metric,
  Stats,
  Unit,
} from 'aws-cdk-lib/aws-cloudwatch';
import {
  Ec2Action,
  Ec2InstanceAction,
} from 'aws-cdk-lib/aws-cloudwatch-actions';
import {
  BlockDeviceVolume,
  CfnEIP,
  Instance,
  InstanceType,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

import { RemoteEnvironmentKeyPair } from './ec2-key-pair';

/**
 * Ubuntu available product
 */
export enum UbuntuProduct {
  /**
   * Ubuntu Server
   */
  SERVER = 'server',

  /**
   * Minimal ubuntu server
   */
  'SERVER_MINIMAL' = 'server-minimal',
}

/**
 * Ubuntu version release
 */
export enum UbuntuRelease {
  /**
   * Release 22.04
   */
  'UBUNTU_22_04' = '22.04',

  /**
   * Release 20.04
   */
  'UBUNTU_20_04' = '20.04',

  /**
   * Release Focal
   */
  FOCAL = 'focal',

  /**
   * Release Bionic
   */
  BIONIC = 'bionic',
}

/**
 * Server Architecture
 */
export enum UbuntuArch {
  /**
   * X86 architecture
   */
  AMD64 = 'amd64',

  /**
   * ARM Architecture
   */
  ARM64 = 'arm64',
}

/**
 * Virtulization type
 */
export enum UbuntuVirtType {
  /**
   * Paravirtual type
   */
  PV = 'pv',

  /**
   * Hardware Virtual Machine type
   */
  HVM = 'hvm',
}

/**
 * EBS Volumen type attached to the instance
 */
export enum UbuntuVolumeType {
  /**
   * General Purpose SSD
   */
  EBS_GP2 = 'ebs-gp2',

  /**
   * Provisioned IOPS SSD Volumes
   */
  EBS_IO1 = 'ebs-io1',
}

/**
 * Ubuntu image configuration.
 * We use this to create the parameter store where the ubuntu ami id is located
 * The parameter is a conbination of this configuration
 */
export interface UbuntuImage {
  /**
   * Ubuntu product. For example: "server".
   */
  readonly product: UbuntuProduct;
  /**
   * Ubuntu release: For example: "20.04", "22.04", "focal", "bionic"
   */
  readonly release: UbuntuRelease;
  /**
   * Ubuntu architecture: For example: "amd64", "arm64"
   */
  readonly arch: UbuntuArch;
  /**
   * Ubuntu Virtualization Type: For example: "pv", "hvm"
   */
  readonly virt: UbuntuVirtType;
  /**
   * Ubuntu Volume Type: For example: "ebs-gp2", "ebs-io1"
   */
  readonly volume: UbuntuVolumeType;
}

export interface RemoteEnvironmentProps {
  /**
   * The VPC where the EC2 Instances is going to be launched.
   */
  readonly vpcId: string;
  /**
   * Name of the developer. This will be used to name the EC2 Instance.
   * Must be unique
   */
  readonly developer: string;
  /**
   * The name of the file of the public key we are going to upload to AWS.
   * This key will be used when we create the EC2 Instance
   *
   * The key must be stored in your computer in .ssh folder as usual.
   * You only need to provide the name of the file.
   *
   * @example
   *    Your file is ./ssh/mykey.pub
   *    You provide only the name of the file: "mykey.pub"
   */
  readonly sshPublicKeyName: string;
  /**
   * The number of Gigabites of the EBS Volumen attached to the instance
   */
  readonly ebsStorage?: number;

  /**
   * If you want to specify a version of ubuntu image to get the ami-id
   * you can use this configuration
   */
  readonly ubuntuImage?: UbuntuImage;

  /**
   * We use this when create an alarm to stop instance after this period.
   * By default is 15 minuts
   */
  readonly instanceStopMetricPeriod?: Duration;

  /**
   * EC2 Instance Type. For example: "t3.micro".
   * By default is "t3a.xlarge"
   */
  readonly instanceType?: string;
}

/**
 * Define a new Remote Environment in a EC2 instance for the given developer
 * @example
 * import { RemoteEnvironment} from '@jttc/remote-environment'
 *
 *  new RemoteEnvironment(stack, 'RemoteEnvironment', {
      developer: 'test',
      ebsStorage: 250,
      vpcId: 'vpc-xxxxxxxxxxx',
      sshPublicKeyName: 'id_ed25519.pub',
    });
 */
export class RemoteEnvironment extends Construct {
  private instance: Instance;
  /**
   * @param {Construct} scope
   * @param {string} id
   */
  constructor(scope: Construct, id: string, props: RemoteEnvironmentProps) {
    super(scope, id);

    const vpc = Vpc.fromLookup(this, 'VPC', {
      vpcId: props.vpcId,
    });

    const securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc: vpc,
      description: 'Allow ssh access to ec2 instance',
      allowAllOutbound: true,
      securityGroupName: `remote-environment-ec2-${props.developer}`,
    });

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22)),
      'Allow ssh connection';

    const keyPair = new RemoteEnvironmentKeyPair(this, 'KeyPair', {
      keypairName: props.developer,
      sshPublicKeyName: props.sshPublicKeyName,
    });

    let ubuntuImageParameter: string;

    if (props.ubuntuImage) {
      ubuntuImageParameter = `/aws/service/canonical/ubuntu/server/${props.ubuntuImage.release}/stable/current/${props.ubuntuImage.arch}/${props.ubuntuImage.virt}/${props.ubuntuImage.volume}/ami-id`;
    } else {
      ubuntuImageParameter = `/aws/service/canonical/ubuntu/server/${UbuntuRelease.UBUNTU_22_04}/stable/current/${UbuntuArch.AMD64}/${UbuntuVirtType.HVM}/${UbuntuVolumeType.EBS_GP2}/ami-id`;
    }

    const machineImage = MachineImage.fromSsmParameter(ubuntuImageParameter);
    const instanceType = props.instanceType ? props.instanceType : 't3a.xlarge';
    const ebsStorage = props.ebsStorage ? props.ebsStorage : 250;

    this.instance = new Instance(this, 'RemoteDevelopmentInstance', {
      vpc: vpc,
      instanceType: new InstanceType(instanceType),
      machineImage,
      keyPair: keyPair.key,
      securityGroup: securityGroup,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      blockDevices: [
        {
          deviceName: '/dev/sda1',
          volume: BlockDeviceVolume.ebs(ebsStorage),
        },
      ],
      associatePublicIpAddress: true,
    });

    Tags.of(this.instance).add('name', `remote-environment-${props.developer}`);

    const elasticIp = new CfnEIP(this, 'ElasticIp', {
      instanceId: this.instance.instanceId,
    });

    const metric = new Metric({
      namespace: 'AWS/EC2',
      metricName: 'CPUUtilization',
      statistic: Stats.MAXIMUM,
      period: props.instanceStopMetricPeriod
        ? props.instanceStopMetricPeriod
        : Duration.minutes(15),
      dimensionsMap: {
        InstanceId: this.instance.instanceId,
      },
      unit: Unit.PERCENT,
    });

    const alarm = metric.createAlarm(this, 'Ec2Alarm', {
      comparisonOperator: ComparisonOperator.LESS_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: 2,
      evaluationPeriods: 1,
      alarmName: `terminate-remote-environment-instance-15-minutes-${props.developer}`,
    });

    alarm.addAlarmAction(new Ec2Action(Ec2InstanceAction.STOP));

    new CfnOutput(this, 'PublicIp', {
      value: elasticIp.attrPublicIp,
      description: 'Public Ip',
    });
  }

  public addUserDate(scriptPath: string) {
    if (fs.existsSync(scriptPath)) {
      Annotations.of(this).addError(
        `There is not user data script in the path provider. Please, make sure there is file: ${scriptPath}`
      );
    }

    this.instance.addUserData(fs.readFileSync(scriptPath, 'utf-8').toString());
  }
}
