import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Router from './router';
import configureStore from './store/configure-store';
import { OidcProvider } from './utils/oidc';

export const Main = ({ setIsDirtyState }) => {
  const store = configureStore({}, setIsDirtyState);
  return (
    <Provider store={store}>
      <OidcProvider>
        <BrowserRouter>
          <Router setIsDirtyState={setIsDirtyState} />
        </BrowserRouter>
      </OidcProvider>
    </Provider>
  );
};
