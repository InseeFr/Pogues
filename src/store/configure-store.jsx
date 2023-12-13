import { createStore, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index.jsx';

const loggerMiddleware = createLogger();

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

export default function configureStore(init) {
  return createStore(
    rootReducer,
    init,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, loggerMiddleware),
      persistState(getDebugSessionKey()),
    ),
  );
}
