# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RemoteEnvironment <a name="RemoteEnvironment" id="@jttc/remote-development.RemoteEnvironment"></a>

Define a new Remote Environment in a EC2 instance for the given developer.

*Example*

```typescript
import { RemoteEnvironment} from '@jttc/remote-environment'

 new RemoteEnvironment(stack, 'RemoteEnvironment', {
   developer: 'test',
   ebsStorage: 250,
   vpcId: 'vpc-xxxxxxxxxxx',
   sshPublicKeyName: 'id_ed25519.pub',
 });
```


#### Initializers <a name="Initializers" id="@jttc/remote-development.RemoteEnvironment.Initializer"></a>

```typescript
import { RemoteEnvironment } from '@jttc/remote-development'

new RemoteEnvironment(scope: Construct, id: string, props: RemoteEnvironmentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.Initializer.parameter.props">props</a></code> | <code><a href="#@jttc/remote-development.RemoteEnvironmentProps">RemoteEnvironmentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@jttc/remote-development.RemoteEnvironment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@jttc/remote-development.RemoteEnvironment.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@jttc/remote-development.RemoteEnvironment.Initializer.parameter.props"></a>

- *Type:* <a href="#@jttc/remote-development.RemoteEnvironmentProps">RemoteEnvironmentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.addUserDat">addUserDat</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@jttc/remote-development.RemoteEnvironment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addUserDat` <a name="addUserDat" id="@jttc/remote-development.RemoteEnvironment.addUserDat"></a>

```typescript
public addUserDat(scriptPath: string): void
```

###### `scriptPath`<sup>Required</sup> <a name="scriptPath" id="@jttc/remote-development.RemoteEnvironment.addUserDat.parameter.scriptPath"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@jttc/remote-development.RemoteEnvironment.isConstruct"></a>

```typescript
import { RemoteEnvironment } from '@jttc/remote-development'

RemoteEnvironment.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@jttc/remote-development.RemoteEnvironment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/remote-development.RemoteEnvironment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@jttc/remote-development.RemoteEnvironment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### RemoteEnvironmentProps <a name="RemoteEnvironmentProps" id="@jttc/remote-development.RemoteEnvironmentProps"></a>

#### Initializer <a name="Initializer" id="@jttc/remote-development.RemoteEnvironmentProps.Initializer"></a>

```typescript
import { RemoteEnvironmentProps } from '@jttc/remote-development'

const remoteEnvironmentProps: RemoteEnvironmentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.developer">developer</a></code> | <code>string</code> | Name of the developer. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.sshPublicKeyName">sshPublicKeyName</a></code> | <code>string</code> | The name of the file of the public key we are going to upload to AWS. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.vpcId">vpcId</a></code> | <code>string</code> | The VPC where the EC2 Instances is going to be launched. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.ebsStorage">ebsStorage</a></code> | <code>number</code> | The number of Gigabites of the EBS Volumen attached to the instance. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.instanceStopMetricPeriod">instanceStopMetricPeriod</a></code> | <code>aws-cdk-lib.Duration</code> | We use this when create an alarm to stop instance after this period. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.instanceType">instanceType</a></code> | <code>string</code> | EC2 Instance Type. |
| <code><a href="#@jttc/remote-development.RemoteEnvironmentProps.property.ubuntuImage">ubuntuImage</a></code> | <code><a href="#@jttc/remote-development.UbuntuImage">UbuntuImage</a></code> | If you want to specify a version of ubuntu image to get the ami-id you can use this configuration. |

---

##### `developer`<sup>Required</sup> <a name="developer" id="@jttc/remote-development.RemoteEnvironmentProps.property.developer"></a>

```typescript
public readonly developer: string;
```

- *Type:* string

Name of the developer.

This will be used to name the EC2 Instance.
Must be unique

---

##### `sshPublicKeyName`<sup>Required</sup> <a name="sshPublicKeyName" id="@jttc/remote-development.RemoteEnvironmentProps.property.sshPublicKeyName"></a>

```typescript
public readonly sshPublicKeyName: string;
```

- *Type:* string

The name of the file of the public key we are going to upload to AWS.

This key will be used when we create the EC2 Instance

The key must be stored in your computer in .ssh folder as usual.
You only need to provide the name of the file.

---

*Example*

```typescript
   Your file is ./ssh/mykey.pub
   You provide only the name of the file: "mykey.pub"
```


##### `vpcId`<sup>Required</sup> <a name="vpcId" id="@jttc/remote-development.RemoteEnvironmentProps.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* string

The VPC where the EC2 Instances is going to be launched.

---

##### `ebsStorage`<sup>Optional</sup> <a name="ebsStorage" id="@jttc/remote-development.RemoteEnvironmentProps.property.ebsStorage"></a>

```typescript
public readonly ebsStorage: number;
```

- *Type:* number

The number of Gigabites of the EBS Volumen attached to the instance.

---

##### `instanceStopMetricPeriod`<sup>Optional</sup> <a name="instanceStopMetricPeriod" id="@jttc/remote-development.RemoteEnvironmentProps.property.instanceStopMetricPeriod"></a>

```typescript
public readonly instanceStopMetricPeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration

We use this when create an alarm to stop instance after this period.

By default is 15 minuts

---

##### `instanceType`<sup>Optional</sup> <a name="instanceType" id="@jttc/remote-development.RemoteEnvironmentProps.property.instanceType"></a>

```typescript
public readonly instanceType: string;
```

- *Type:* string

EC2 Instance Type.

For example: "t3.micro".
By default is "t3a.xlarge"

---

##### `ubuntuImage`<sup>Optional</sup> <a name="ubuntuImage" id="@jttc/remote-development.RemoteEnvironmentProps.property.ubuntuImage"></a>

```typescript
public readonly ubuntuImage: UbuntuImage;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuImage">UbuntuImage</a>

If you want to specify a version of ubuntu image to get the ami-id you can use this configuration.

---

### UbuntuImage <a name="UbuntuImage" id="@jttc/remote-development.UbuntuImage"></a>

Ubuntu image configuration.

We use this to create the parameter store where the ubuntu ami id is located
The parameter is a conbination of this configuration

#### Initializer <a name="Initializer" id="@jttc/remote-development.UbuntuImage.Initializer"></a>

```typescript
import { UbuntuImage } from '@jttc/remote-development'

const ubuntuImage: UbuntuImage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuImage.property.arch">arch</a></code> | <code><a href="#@jttc/remote-development.UbuntuArch">UbuntuArch</a></code> | Ubuntu architecture: For example: "amd64", "arm64". |
| <code><a href="#@jttc/remote-development.UbuntuImage.property.product">product</a></code> | <code><a href="#@jttc/remote-development.UbuntuProduct">UbuntuProduct</a></code> | Ubuntu product. |
| <code><a href="#@jttc/remote-development.UbuntuImage.property.release">release</a></code> | <code><a href="#@jttc/remote-development.UbuntuRelease">UbuntuRelease</a></code> | Ubuntu release: For example: "20.04", "22.04", "focal", "bionic". |
| <code><a href="#@jttc/remote-development.UbuntuImage.property.virt">virt</a></code> | <code><a href="#@jttc/remote-development.UbuntuVirtType">UbuntuVirtType</a></code> | Ubuntu Virtualization Type: For example: "pv", "hvm". |
| <code><a href="#@jttc/remote-development.UbuntuImage.property.volume">volume</a></code> | <code><a href="#@jttc/remote-development.UbuntuVolumeType">UbuntuVolumeType</a></code> | Ubuntu Volume Type: For example: "ebs-gp2", "ebs-io1". |

---

##### `arch`<sup>Required</sup> <a name="arch" id="@jttc/remote-development.UbuntuImage.property.arch"></a>

```typescript
public readonly arch: UbuntuArch;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuArch">UbuntuArch</a>

Ubuntu architecture: For example: "amd64", "arm64".

---

##### `product`<sup>Required</sup> <a name="product" id="@jttc/remote-development.UbuntuImage.property.product"></a>

```typescript
public readonly product: UbuntuProduct;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuProduct">UbuntuProduct</a>

Ubuntu product.

For example: "server".

---

##### `release`<sup>Required</sup> <a name="release" id="@jttc/remote-development.UbuntuImage.property.release"></a>

```typescript
public readonly release: UbuntuRelease;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuRelease">UbuntuRelease</a>

Ubuntu release: For example: "20.04", "22.04", "focal", "bionic".

---

##### `virt`<sup>Required</sup> <a name="virt" id="@jttc/remote-development.UbuntuImage.property.virt"></a>

```typescript
public readonly virt: UbuntuVirtType;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuVirtType">UbuntuVirtType</a>

Ubuntu Virtualization Type: For example: "pv", "hvm".

---

##### `volume`<sup>Required</sup> <a name="volume" id="@jttc/remote-development.UbuntuImage.property.volume"></a>

```typescript
public readonly volume: UbuntuVolumeType;
```

- *Type:* <a href="#@jttc/remote-development.UbuntuVolumeType">UbuntuVolumeType</a>

Ubuntu Volume Type: For example: "ebs-gp2", "ebs-io1".

---



## Enums <a name="Enums" id="Enums"></a>

### UbuntuArch <a name="UbuntuArch" id="@jttc/remote-development.UbuntuArch"></a>

Server Architecture.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuArch.AMD64">AMD64</a></code> | X86 architecture. |
| <code><a href="#@jttc/remote-development.UbuntuArch.ARM64">ARM64</a></code> | ARM Architecture. |

---

##### `AMD64` <a name="AMD64" id="@jttc/remote-development.UbuntuArch.AMD64"></a>

X86 architecture.

---


##### `ARM64` <a name="ARM64" id="@jttc/remote-development.UbuntuArch.ARM64"></a>

ARM Architecture.

---


### UbuntuProduct <a name="UbuntuProduct" id="@jttc/remote-development.UbuntuProduct"></a>

Ubuntu available product.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuProduct.SERVER">SERVER</a></code> | Ubuntu Server. |
| <code><a href="#@jttc/remote-development.UbuntuProduct.SERVER_MINIMAL">SERVER_MINIMAL</a></code> | Minimal ubuntu server. |

---

##### `SERVER` <a name="SERVER" id="@jttc/remote-development.UbuntuProduct.SERVER"></a>

Ubuntu Server.

---


##### `SERVER_MINIMAL` <a name="SERVER_MINIMAL" id="@jttc/remote-development.UbuntuProduct.SERVER_MINIMAL"></a>

Minimal ubuntu server.

---


### UbuntuRelease <a name="UbuntuRelease" id="@jttc/remote-development.UbuntuRelease"></a>

Ubuntu version release.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuRelease.UBUNTU_22_04">UBUNTU_22_04</a></code> | Release 22.04. |
| <code><a href="#@jttc/remote-development.UbuntuRelease.UBUNTU_20_04">UBUNTU_20_04</a></code> | Release 20.04. |
| <code><a href="#@jttc/remote-development.UbuntuRelease.FOCAL">FOCAL</a></code> | Release Focal. |
| <code><a href="#@jttc/remote-development.UbuntuRelease.BIONIC">BIONIC</a></code> | Release Bionic. |

---

##### `UBUNTU_22_04` <a name="UBUNTU_22_04" id="@jttc/remote-development.UbuntuRelease.UBUNTU_22_04"></a>

Release 22.04.

---


##### `UBUNTU_20_04` <a name="UBUNTU_20_04" id="@jttc/remote-development.UbuntuRelease.UBUNTU_20_04"></a>

Release 20.04.

---


##### `FOCAL` <a name="FOCAL" id="@jttc/remote-development.UbuntuRelease.FOCAL"></a>

Release Focal.

---


##### `BIONIC` <a name="BIONIC" id="@jttc/remote-development.UbuntuRelease.BIONIC"></a>

Release Bionic.

---


### UbuntuVirtType <a name="UbuntuVirtType" id="@jttc/remote-development.UbuntuVirtType"></a>

Virtulization type.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuVirtType.PV">PV</a></code> | Paravirtual type. |
| <code><a href="#@jttc/remote-development.UbuntuVirtType.HVM">HVM</a></code> | Hardware Virtual Machine type. |

---

##### `PV` <a name="PV" id="@jttc/remote-development.UbuntuVirtType.PV"></a>

Paravirtual type.

---


##### `HVM` <a name="HVM" id="@jttc/remote-development.UbuntuVirtType.HVM"></a>

Hardware Virtual Machine type.

---


### UbuntuVolumeType <a name="UbuntuVolumeType" id="@jttc/remote-development.UbuntuVolumeType"></a>

EBS Volumen type attached to the instance.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/remote-development.UbuntuVolumeType.EBS_GP2">EBS_GP2</a></code> | General Purpose SSD. |
| <code><a href="#@jttc/remote-development.UbuntuVolumeType.EBS_IO1">EBS_IO1</a></code> | Provisioned IOPS SSD Volumes. |

---

##### `EBS_GP2` <a name="EBS_GP2" id="@jttc/remote-development.UbuntuVolumeType.EBS_GP2"></a>

General Purpose SSD.

---


##### `EBS_IO1` <a name="EBS_IO1" id="@jttc/remote-development.UbuntuVolumeType.EBS_IO1"></a>

Provisioned IOPS SSD Volumes.

---

