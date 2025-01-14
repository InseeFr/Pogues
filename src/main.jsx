import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Router from './router';
import configureStore from './store/configure-store';
import { OidcProvider } from './utils/oidc';

export const Main = () => {
  const store = configureStore({});
  return (
    <Provider store={store}>
      <OidcProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </OidcProvider>
    </Provider>
  );
};
