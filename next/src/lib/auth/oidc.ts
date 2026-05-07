import { oidcSpa } from 'oidc-spa/react-spa'
import { z } from 'zod'

const decodedIdTokenSchema = z.object({
  family_name: z.string().optional(),
  given_name: z.string(),
  timbre: z.string().nullish(), // timbre can be not defined (undefined or null) in case of "external" user
  realm_access: z.object({
    roles: z.array(z.string()),
  }),
})

export const DEFAULT_STAMP = (import.meta.env.VITE_DEFAULT_USER_STAMP ||
  'FAKEPERMISSION') as string

const oidcScopes = (import.meta.env.VITE_OIDC_SCOPES || 'profile,roles').split(
  ',',
)

export type DecodedIdTokenType =
  | z.infer<typeof decodedIdTokenSchema>
  | undefined

export const { bootstrapOidc, getOidc, useOidc } = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: decodedIdTokenSchema,
  })
  .createUtils()

bootstrapOidc(
  import.meta.env.VITE_OIDC_ENABLED === 'true'
    ? {
        implementation: 'real',
        // Configure your OIDC provider in `.env.local`
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        issuerUri: import.meta.env.VITE_OIDC_ISSUER,
        BASE_URL: import.meta.env.BASE_URL,
        // Enable for detailed initialization and token lifecycle logs.
        debugLogs: import.meta.env.DEV,
        scopes: oidcScopes,
      }
    : {
        // Mock mode: no requests to an auth server are made.
        implementation: 'mock',
        isUserInitiallyLoggedIn: true,
        decodedIdToken_mock: {
          given_name: import.meta.env.VITE_DEFAULT_USER_NAME ?? 'Guybrush',
          family_name: '',
          timbre: DEFAULT_STAMP,
          realm_access: {
            roles: ['user'],
          },
        },
      },
)

export const getAccessToken = async () => {
  const oidc = await getOidc()
  if (!oidc.isUserLoggedIn) return undefined

  return await oidc.getAccessToken()
}
