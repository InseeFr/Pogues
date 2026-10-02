#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
for (const dir of ['next', 'legacy']) {
  if (!fs.existsSync(path.join(root, dir, 'node_modules'))) {
    console.error(
      `Missing ${dir}/node_modules. From the repo root run:\n  pnpm install:all`,
    )
    process.exit(1)
  }
}
