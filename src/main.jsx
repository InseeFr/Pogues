import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Router from './router';
import configureStore from './store/configure-store';

export const Main = ({ setIsDirtyState }) => {
  const store = configureStore({}, setIsDirtyState);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

Main.propTypes = {
  setIsDirtyState: PropTypes.func,
};
