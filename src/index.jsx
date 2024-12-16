import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';
import configureStore from './store/configure-store';
import { OidcProvider } from './utils/oidc';
import { getInit } from './utils/remote-api';

const renderApp = (init) => {
  const store = configureStore(init);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <OidcProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </OidcProvider>
      </Provider>
    </StrictMode>,
  );
};

// Instead of Promise.resolve, deal with a public API endpoint

getInit().then((res) => renderApp(res));
