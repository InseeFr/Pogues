import React from 'react';
import AuthProviderNone from './none';
import AuthProviderOIDC from './oidc';

const AuthProvider = ({ store, children }) => {
  const { authType } = store.getState();
  if (authType === 'NONE')
    return <AuthProviderNone>{children}</AuthProviderNone>;
  if (authType === 'OIDC')
    return <AuthProviderOIDC store={store}>{children}</AuthProviderOIDC>;
  return <div>{`Auth type ${authType} is nor recognized`}</div>;
};

export default AuthProvider;
