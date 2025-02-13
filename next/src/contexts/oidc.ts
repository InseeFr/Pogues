import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';

import { getEnvVar } from '@/utils/env';

const decodedIdTokenSchema = z.object({
  family_name: z.string().optional(),
  given_name: z.string(),
  timbre: z.string(),
});

export const { OidcProvider, useOidc, getOidc } =
  getEnvVar('OIDC_ENABLED') !== 'false' && getEnvVar('AUTH_TYPE') === 'OIDC'
    ? createReactOidc({
        autoLogin: true,
        clientId: getEnvVar('OIDC_CLIENT_ID') ?? '',
        issuerUri: getEnvVar('OIDC_ISSUER') ?? '',
        homeUrl: import.meta.env.BASE_URL,
        decodedIdTokenSchema,
      })
    : createMockReactOidc({
        autoLogin: true,
        isUserInitiallyLoggedIn: true,
        homeUrl: import.meta.env.BASE_URL,
        mockedTokens: {
          decodedIdToken: {
            given_name: getEnvVar('DEFAULT_USER_NAME') ?? 'Guybrush',
            family_name: '',
            timbre: getEnvVar('DEFAULT_USER_STAMP') ?? 'FAKEPERMISSION',
          } satisfies z.infer<typeof decodedIdTokenSchema>,
        },
      });
