import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import configureStore from './store/configure-store';
import { getInit } from './utils/remote-api';
import { OidcProvider } from './utils/oidc';

const container = document.getElementById('root');

const renderApp = (Component, init) => {
  const store = configureStore(init);
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <OidcProvider>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </OidcProvider>
    </Provider>,
  );
};

// Instead of Promise.resolve, deal with a public API endpoint

getInit().then(res => renderApp(Router, res));
