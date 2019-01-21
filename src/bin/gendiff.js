#!/usr/bin/env node
import { version } from '../../package.json';

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);

console.log('stuff');
