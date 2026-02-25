import { applyMiddleware, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index.jsx';

const loggerMiddleware = createLogger();

// Sync isQuestionnaireModified with setIsDirtyState (if provided)
const createDirtyStateMiddleware =
  (setIsDirtyState) => (store) => (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    // Sync `isQuestionnaireModified` with setIsDirtyState (only if provided)
    if (
      setIsDirtyState &&
      prevState.appState.isQuestionnaireModified !==
        nextState.appState.isQuestionnaireModified
    ) {
      setIsDirtyState(nextState.appState.isQuestionnaireModified);
    }

    return result;
  };

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

export default function configureStore(init, setIsDirtyState) {
  return createStore(
    rootReducer,
    init,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        createDirtyStateMiddleware(setIsDirtyState),
      ),
      persistState(getDebugSessionKey()),
    ),
  );
}
