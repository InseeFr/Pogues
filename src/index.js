import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as Root } from 'react-hot-loader';

import configureStore from 'store/configure-store';
import AppContainer from 'components/pogues-app';

const store = configureStore();

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Root>
        <Component />
      </Root>
    </Provider>,
    document.getElementById('base')
  );
};

renderApp(AppContainer);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('components/pogues-app', () => renderApp(AppContainer));
}
