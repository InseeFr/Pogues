import { oidcSpa } from 'oidc-spa/react-spa';
import z from 'zod';

const authority = import.meta.env.VITE_OIDC_ISSUER;
const client_id = import.meta.env.VITE_OIDC_CLIENT_ID;

const oidcScopes = (import.meta.env.VITE_OIDC_SCOPES || 'profile,roles').split(
  ',',
);

const decodedIdTokenSchema = z.object({
  preferred_username: z.string(),
  name: z.string(),
  timbre: z.string(),
});

export const { bootstrapOidc, getOidc, useOidc } = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: decodedIdTokenSchema,
  })
  .createUtils();

await bootstrapOidc(
  import.meta.env.VITE_OIDC_ENABLED === 'true'
    ? {
        implementation: 'real',
        clientId: client_id,
        issuerUri: authority,

        // Enable for detailed initialization and token lifecycle logs.
        debugLogs: true,
        warnUserSecondsBeforeAutoLogout: 60,
        scopes: oidcScopes,
      }
    : {
        // Mock mode: no requests to an auth server are made.
        implementation: 'mock',
        isUserInitiallyLoggedIn: true,
        decodedIdToken_mock: {
          preferred_username: 'mock-user',
          name: 'Mock User',
          timbre: 'Mock stamp',
        },
      },
);

export const getAccessToken = async () => {
  const oidc = await getOidc();

  if (!oidc.isUserLoggedIn) return undefined;

  return await oidc.getAccessToken();
};
