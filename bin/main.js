#!/usr/bin/env node

const program = require('commander');

const app = require('../src/app');
const package = require('../package.json');

program
  .version(package.version, '-v, --version')
  .option('-p, --port [number]', 'Add the port where server will run', '3000')
  .parse(process.argv);

app(program);