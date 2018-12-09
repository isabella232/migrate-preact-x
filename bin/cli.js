#!/usr/bin/env node

'use strict';

const Runner = require('jscodeshift/dist/Runner');

const path = require('path');
const pkg = require('../package.json');
const opts = require('nomnom')
  .script('migrate-preact-x')
  .options({
    path: {
      position: 0,
      help: 'Files or directory to transform',
      list: true,
      metavar: 'FILE',
      required: true
    },
    cpus: {
      abbr: 'c',
      help: '(all by default) Determines the number of processes started.'
    },
    verbose: {
      abbr: 'v',
      choices: [0, 1, 2],
      default: 0,
      help: 'Show more information about the transform process'
    },
    dry: {
      abbr: 'd',
      flag: true,
      help: 'Dry run (no changes are made to files)'
    },
    print: {
      abbr: 'p',
      flag: true,
      help: 'Print output, useful for development'
    },
    extensions: {
      default: 'js',
      help: 'File extensions the transform file should be applied to'
    },
    ignorePattern: {
      full: 'ignore-pattern',
      list: true,
      help: 'Ignore files that match a provided glob expression'
    },
    ignoreConfig: {
      full: 'ignore-config',
      list: true,
      help: 'Ignore files if they match patterns sourced from a configuration file (e.g., a .gitignore)',
      metavar: 'FILE'
    },
    runInBand: {
      flag: true,
      default: false,
      full: 'run-in-band',
      help: 'Run serially in the current process'
    },
    silent: {
      abbr: 's',
      flag: true,
      default: false,
      full: 'silent',
      help: 'No output'
    },
    parser: {
      choices: ['babel', 'babylon', 'flow'],
      default: 'babel',
      full: 'parser',
      help: 'The parser to use for parsing your source files (babel | babylon | flow)'
    },
    version: {
      flag: true,
      help: 'print version and exit',
      callback: function() {
        return `migrate-preact-x: ${pkg.version}`
      },
    },
  })
  .parse();

const transformFile = path.resolve(__dirname + '/../lib/migrate-preact-x.js');
Runner.run(
  transformFile,
  opts.path,
  Object.assign({}, opts,
    {
      transform: transformFile,
    },
  )
);
