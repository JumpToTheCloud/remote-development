[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![npm](https://img.shields.io/npm/v/%40jttc%2Fremote-development)

[![View on Construct Hub](https://constructs.dev/badge?package=%40jttc%2Fremote-development)](https://constructs.dev/packages/@jttc/remote-development)

# AWS Remote Environment in a EC2 Instance Construct Library

This AWS CDK Construct deploy an EC2 Instance per developer to work in a remote environment.

## Installation

```
yarn add @jttc/remote-development
```

```
npm install @jttc/remote-development
```

## How to use

```typescript
import { RemoteEnvironment } from '@jttc/remote-development';

new RemoteEnvironment(this, 'RemoteEnvironment', {
  developer: 'developer-id-name',
  vpcId: 'vpc-xxxxxxxxxxx',
  sshPublicKeyName: 'id_ed25519.pub',
});
```

## Features

- Upload own ssh key created in the developer machine under .ssh folder
- Create an EC2 instance with the following configuration by default:
  - Instance type: t3a.xlarge by default. It can be customizable.
  - Deployed in a Public Subnet.
  - Elastic Ip associated to the instance.
  - EBS volumen of 250 GB by default. It can be customizable.
- Security group to allow ssh connection to the instance.
- The instances has a tag name: "remote-environment-<developer-name>"
- it creates an alamar to check the instance utilization. If in 15 minutes the cpu utilization is less than 2% the instance will be stopped automatically. The developer will go to the console to start it manually.
- It is possible to create a file with instance user data scripts and it will uploaded to execute at initialization point.

## Appendix

### How to create a ssh key in linux environment

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
