import * as fs from 'fs';
import * as path from 'path';
import { Annotations, CfnOutput, Stack } from 'aws-cdk-lib';
import { KeyPair } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface KeypairProps {
  /**
   * This name will be used to the keypair name.
   * It will be a suffix added to "keypair-remote-development"
   * If not provided, we use the stack name as suffix
   */
  readonly keypairName?: string;

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
}

/**
 * @export
 * @class
 */
export class RemoteEnvironmentKeyPair extends Construct {
  /**
   * The key pair created
   */
  readonly key: KeyPair;

  /**
   * @param {Construct} scope
   * @param {string} id
   */
  constructor(scope: Construct, id: string, props: KeypairProps) {
    super(scope, id);

    const homeDirectory = process.env.HOME as string;
    const sshKeyPath = path.join(
      homeDirectory,
      `/.ssh/${props?.sshPublicKeyName}`
    );

    if (!fs.existsSync(sshKeyPath)) {
      Annotations.of(this).addError(
        `There is not ssh key file provided: ${homeDirectory}/.ssh/${props.sshPublicKeyName}. Please, create a new ssh key and save it in .shh directory`
      );
    }

    this.key = new KeyPair(this, 'ImportedKeyPair', {
      keyPairName: props.keypairName
        ? `keypair-remote-development-${props.keypairName}`
        : `keypair-remote-development-${Stack.of(this).stackName}`,
      publicKeyMaterial: fs.readFileSync(sshKeyPath).toString(),
    });

    new CfnOutput(this, 'OutputImportedKeyPair', {
      value: this.key.keyPairName,
      description: 'Name of the personal public key pair',
    });
  }
}
