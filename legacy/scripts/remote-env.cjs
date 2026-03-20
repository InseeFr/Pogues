#!/usr/bin/env node
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const reset = '\x1b[0m';
const log = {
  green: (text) => console.log('\x1b[32m' + text + reset),
  blue: (text) => console.log('\x1b[34m' + text + reset),
  red: (text) => console.log('\x1b[31m' + text + reset),
};

log.blue(`MFE manage env for remote (micro-frontend)`);

const nameOfMfeEnv = 'swEnv.js';
const entryScriptPath = path.resolve(
  `${process.cwd()}/dist/${process.argv[2]}`,
);
const swEnvScriptPath = path.resolve(`${process.cwd()}/dist/${nameOfMfeEnv}`);

const isSwEnvScriptExists = fs.existsSync(swEnvScriptPath);
const isEntryScriptExists = fs.existsSync(entryScriptPath);

if (isSwEnvScriptExists && isEntryScriptExists) {
  const entryContent = fs.readFileSync(entryScriptPath).toString('utf-8');
  const newEntryContent = `import "./${nameOfMfeEnv}";${entryContent}`;
  fs.writeFileSync(entryScriptPath, Buffer.from(newEntryContent, 'utf8'));
  log.green(`✓ Added env file inside ${entryScriptPath}`);
} else {
  log.red(
    `x Nothing to do. Are you using vite-envs and federation plugin in your configuration vite.config.ts ?`,
  );
}
