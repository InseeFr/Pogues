import { readFile, writeFileSync } from 'fs';

readFile('.env', 'utf8', (_, contents) => {
  const content = contents
    .split('\n')
    .filter((line) => !line.startsWith('#'))
    .map((line) => line.split('='))
    .filter((data) => data.length === 2)
    .map(
      ([key]) =>
        `echo "window._env_['${key.replace('VITE_', '')}'] = '$${key.replace(
          'VITE_',
          '',
        )}';" >> /usr/share/nginx/html/env-config.js`,
    );

  const fullFile = ['#!/bin/sh', ...content, 'exec "$@"'].join('\n');
  writeFileSync('entrypoint.sh', fullFile, 'utf8');
});
