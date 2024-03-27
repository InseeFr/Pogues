import { createReactOidc } from 'oidc-spa/react';
import React from 'react';
import { getEnvVar } from '../../utils/env';

export const authType = getEnvVar('VITE_AUTH_TYPE');
export const oidcConf = {
  authUrl: getEnvVar('VITE_AUTH_URL'),
  realm: getEnvVar('VITE_REALM'),
  client_id: getEnvVar('VITE_CLIENT_ID'),
};

const dummyOidcClient = {
  isUserLoggedIn: true,
  login: () => console.log("You're loggin"),
  logout: () => {
    window.location.href = '/';
  },
  oidcTokens: {
    accessToken: undefined,
    decodedIdToken: undefined,
    idToken: undefined,
    refreshToken: undefined,
    refreshTokenExpirationTime: undefined,
    accessTokenExpirationTime: undefined,
  },
};

const { authUrl, realm, client_id } = oidcConf;

export const AuthContext = React.createContext(dummyOidcClient);

export function AuthProvider({ children }) {
  if (authType === 'oidc') {
    const { OidcProvider, useOidc } = createReactOidc({
      issuerUri: `${authUrl}/realms/${realm}`,
      clientId: client_id,
      /**
       * - `your-app.com/${publicUrl}silent-sso.html` must serve the file
       *   that you have created in the setup process.
       * - `your-app.com/${publicUrl}` must be the homepage of your webapp.
       *
       * Vite:  `publicUrl: import.meta.env.BASE_URL`
       * CRA:   `publicUrl: process.env.PUBLIC_URL`
       * Other: `publicUrl: "/"` (Usually)
       */
      publicUrl: `${window.location.origin}`,
    });
    return {
      useOidc,
      OidcProvider,
    };
  }

  return (
    <AuthContext.Provider value={dummyOidcClient}>
      {children}
    </AuthContext.Provider>
  );
}
