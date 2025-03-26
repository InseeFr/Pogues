import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';

const authority = import.meta.env.VITE_OIDC_ISSUER;
const client_id = import.meta.env.VITE_OIDC_CLIENT_ID;

export const { OidcProvider, useOidc } =
  import.meta.env.VITE_OIDC_ENABLED === 'false'
    ? createMockReactOidc({
        isUserInitiallyLoggedIn: true,
        mockedTokens: {
          decodedIdToken: {
            preferred_username:
              import.meta.env.VITE_DEFAULT_USER_ID ?? 'FAKEID',
            name: import.meta.env.VITE_DEFAULT_USER_NAME ?? 'Fake user',
            timbre: import.meta.env.VITE_DEFAULT_USER_STAMP ?? 'FAKEPERMISSION',
          },
        },
        homeUrl: '/',
      })
    : createReactOidc({
        clientId: client_id,
        issuerUri: authority,
        homeUrl: '/',
      });
