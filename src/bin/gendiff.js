#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });
program.parse(process.argv);
