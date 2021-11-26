import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './auth';
import { getInit } from './utils/remote-api';
import configureStore from 'store/configure-store';
import Router from 'router';

const renderApp = (Component, init) => {
  const store = configureStore(init);
  console.log('store', store.getState());
  ReactDOM.render(
    <Provider store={store}>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AuthProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

// Instead of Promise.resolve, deal with a public API endpoint

getInit().then(res => renderApp(Router, res));
