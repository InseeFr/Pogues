import React from 'react';

const dummyOidcClient = {
  isUserLoggedIn: true,
  // eslint-disable-next-line no-return-assign
  logout: () => (window.location.href = '/'),
  getTokens: () => ({
    accessToken: null,
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    accessTokenExpirationTime: null,
  }),
  renewToken: () => {},
};

export const AuthContext = React.createContext();

const AuthProviderNone = ({ children }) => (
  <AuthContext.Provider value={dummyOidcClient}>
    {children}
  </AuthContext.Provider>
);

export default AuthProviderNone;
