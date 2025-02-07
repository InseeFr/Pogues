import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const decodedIdTokenSchema = z.object({
  accessToken: z.string(),
  family_name: z.string(),
  given_name: z.string(),
  timbre: z.string(),
});

export const { OidcProvider, useOidc, getOidc } =
  import.meta.env.VITE_OIDC_ENABLED === 'false'
    ? createMockReactOidc({
        isUserInitiallyLoggedIn: false,
        mockedTokens: {
          decodedIdToken: {
            accessToken: 'token',
            family_name: 'Threepwood',
            given_name: 'Guybrush',
            timbre: 'FAKEPERMISSION',
          } satisfies z.infer<typeof decodedIdTokenSchema>,
        },
      })
    : createReactOidc({
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        issuerUri: import.meta.env.VITE_OIDC_ISSUER,
        publicUrl: import.meta.env.BASE_URL,
        //decodedIdTokenSchema,
      });
