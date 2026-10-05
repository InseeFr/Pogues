/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMemo } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './auth/context';
import './index.css';
import { DecodedIdTokenType } from './lib/auth/oidc';
import Router from './router';
import configureStore from './store/configure-store';
import { NextNavigationContext } from './utils/next-pages';

export const Main = ({
  setIsDirtyState,
  getAccessToken,
  decodedIdToken,
  navigateToNext = (path) => window.location.assign(path),
}: {
  setIsDirtyState: () => void;
  getAccessToken: () => Promise<string | undefined>;
  decodedIdToken: DecodedIdTokenType;
  /** Navigate to a page of the new application without reloading it. */
  navigateToNext?: (path: string) => void;
}) => {
  const contextValue = useMemo(() => ({ getAccessToken, decodedIdToken }), []);

  const store = configureStore({}, setIsDirtyState);

  return (
    <AuthContext.Provider value={contextValue}>
      <NextNavigationContext.Provider value={navigateToNext}>
        <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      </NextNavigationContext.Provider>
    </AuthContext.Provider>
  );
};
