import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';

const decodedIdTokenSchema = z.object({
  family_name: z.string().optional(),
  given_name: z.string(),
  timbre: z.string(),
});

export const { OidcProvider, useOidc, getOidc } =
  import.meta.env.VITE_OIDC_ENABLED === 'false'
    ? createMockReactOidc({
        autoLogin: true,
        isUserInitiallyLoggedIn: true,
        homeUrl: import.meta.env.BASE_URL,
        mockedTokens: {
          decodedIdToken: {
            given_name: import.meta.env.VITE_DEFAULT_USER_NAME ?? 'Guybrush',
            family_name: '',
            timbre: import.meta.env.VITE_DEFAULT_USER_STAMP ?? 'FAKEPERMISSION',
          } satisfies z.infer<typeof decodedIdTokenSchema>,
        },
      })
    : createReactOidc({
        autoLogin: true,
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        issuerUri: import.meta.env.VITE_OIDC_ISSUER,
        homeUrl: import.meta.env.BASE_URL,
        decodedIdTokenSchema,
      });
