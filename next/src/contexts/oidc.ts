import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';

const decodedIdTokenSchema = z.object({
  sid: z.string(),
  sub: z.string(),
  name: z.string(),
  timbre: z.string(),
  preferred_username: z.string(),
});

export const { OidcProvider, useOidc, getOidc } =
  import.meta.env.VITE_OIDC_ENABLED === 'false'
    ? createMockReactOidc({
        isUserInitiallyLoggedIn: false,
        mockedTokens: {
          decodedIdToken: {
            sid: `mock-${self.crypto.randomUUID()}`,
            sub: 'mock-sub',
            preferred_username: 'mock-user',
            name: 'Fake user',
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
