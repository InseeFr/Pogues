/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

import type { ImportMetaEnv } from '../src/vite-env';

const devModeConfig = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: (_id: string) => {
    return () => ({
      Main: () => {
        return '=====> Pogues Legacy is not available on dev mode <=====';
      },
    });
  },
  init: () => {},
};

// @ts-ignore
const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'my-runtime-plugin',
    async loadEntry({ remoteInfo }) {
      // @ts-ignore
      const ENV = (window.__VITE_ENVS || {}) as ImportMetaEnv;
      if (ENV.DEV) {
        return devModeConfig;
      } else {
        const originalEntryFile = new URL(remoteInfo.entry).pathname;
        const finalEntry = `${ENV.VITE_POGUES_LEGACY}/${originalEntryFile}`;
        console.log('finalEntry', finalEntry);
        return await import(/* @vite-ignore */ finalEntry);
      }
    },
  };
};
export default runtimePlugin;
