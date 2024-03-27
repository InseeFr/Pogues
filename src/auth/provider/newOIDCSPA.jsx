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

const dummyUseOidc = () => dummyOidcClient;

const { authUrl, realm, client_id } = oidcConf;

export const AuthContext = React.createContext(dummyOidcClient);

const createAuth = () => {
  if (authType === 'oidc') {
    const { OidcProvider, useOidc } = createReactOidc({
      issuerUri: `${authUrl}/realms/${realm}`,
      clientId: client_id,
      publicUrl: `${window.location.origin}`,
    });

    return {
      useOidc,
      OidcProvider,
    };
  }
  return {
    useOidc: dummyUseOidc,
    OidcProvider: ({ children }) => (
      <AuthContext.Provider>{children}</AuthContext.Provider>
    ),
  };
};

export const { OidcProvider, useOidc } = createAuth();
