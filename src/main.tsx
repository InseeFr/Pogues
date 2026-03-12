/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMemo } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './auth/context';
import './index.css';
import Router from './router';
import configureStore from './store/configure-store';
import { DecodedIdTokenType } from './utils/oidc';

export const Main = ({
  setIsDirtyState,
  getAccessToken,
  decodedIdToken,
}: {
  setIsDirtyState: () => void;
  getAccessToken: () => Promise<string | undefined>;
  decodedIdToken: DecodedIdTokenType;
}) => {
  const contextValue = useMemo(() => ({ getAccessToken, decodedIdToken }), []);

  const store = configureStore({}, setIsDirtyState);

  return (
    <AuthContext.Provider value={contextValue}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  );
};
