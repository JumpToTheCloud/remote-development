import { ReleasableCommits, awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

export const CDK_VERSION = '2.111.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Antonio Márquez Pérez',
  authorAddress: 'antonio.marquez@jumptothecloud.tech',
  cdkVersion: CDK_VERSION,
  defaultReleaseBranch: 'main',
  constructsVersion: '10.3.0',
  jsiiVersion: '5.3.0',
  name: '@jttc/remote-development',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:JumpToTheCloud/remote-development.git',
  keywords: ['aws', 'cdk', 'remote development'],
  prettier: true,
  prettierOptions: {
    settings: {
      trailingComma: TrailingComma.ES5,
      singleQuote: true,
      bracketSpacing: true,
      semi: true,
    },
  },
  release: true,
  jestOptions: {
    jestConfig: {
      verbose: true,
    },
  },
  releaseToNpm: true,
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  releaseFailureIssue: true,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['commitizen', 'cz-customizable'],
  packageName: '@jttc/remote-development' /* The "name" in package.json. */,
});

project.addScripts({
  commit: './node_modules/cz-customizable/standalone.js',
});

project.synth();
