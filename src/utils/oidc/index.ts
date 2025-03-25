import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';

import { getEnvVar } from '@/utils/env';

const authority = getEnvVar('OIDC_ISSUER') ?? '';
const client_id = getEnvVar('OIDC_CLIENT_ID') ?? '';

export const { OidcProvider, useOidc } =
  getEnvVar('OIDC_ENABLED') === 'false'
    ? createMockReactOidc({
        isUserInitiallyLoggedIn: true,
        mockedTokens: {
          decodedIdToken: {
            preferred_username: getEnvVar('DEFAULT_USER_ID') ?? 'FAKEID',
            name: getEnvVar('DEFAULT_USER_NAME') ?? 'Fake user',
            timbre: getEnvVar('DEFAULT_USER_STAMP') ?? 'FAKEPERMISSION',
          },
        },
        homeUrl: '/',
      })
    : createReactOidc({
        clientId: client_id,
        issuerUri: authority,
        homeUrl: '/',
      });
