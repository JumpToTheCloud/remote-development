import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RemoteEnvironment } from '../src/remote-ec2-instance';

describe('Snapshot test validations', () => {
  const app = new App();
  const stack = new Stack(app, 'Stack', {
    env: {
      region: 'eu-west-1',
      account: '123456789012',
    },
  });

  new RemoteEnvironment(stack, 'RemoteEnvironment', {
    developer: 'test',
    ebsStorage: 250,
    vpcId: 'vpc-xxxxxxxxxxx',
    sshPublicKeyName: 'id_ed25519.pub',
  });

  it('should match the snapshot', () => {
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
