import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';

import { getEnvVar } from '@/utils/env';

const authority = getEnvVar('OIDC_AUTHORITY') ?? '';
const client_id = getEnvVar('OIDC_CLIENT_ID') ?? '';
const authType = getEnvVar('AUTH_TYPE');

export const { OidcProvider, useOidc } =
  authType === 'OIDC'
    ? createReactOidc({
        clientId: client_id,
        issuerUri: authority,
        publicUrl: import.meta.env.BASE_URL,
      })
    : createMockReactOidc({
        isUserInitiallyLoggedIn: true,
        mockedTokens: {
          decodedIdToken: {
            preferred_username: getEnvVar('DEFAULT_USER_ID') ?? 'FAKEID',
            name: getEnvVar('DEFAULT_USER_NAME') ?? 'Fake user',
            timbre: getEnvVar('DEFAULT_USER_STAMP') ?? 'FAKEPERMISSION',
          },
        },
      });
