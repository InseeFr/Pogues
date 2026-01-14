import { applyMiddleware, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index.jsx';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => {
    return (
      action.type !== '@@redux-form/REGISTER_FIELD' &&
      action.type !== '@@redux-form/UNREGISTER_FIELD' &&
      action.type !== '@@redux-form/BLUR' &&
      action.type !== '@@redux-form/FOCUS' &&
      action.type !== '@@redux-form/LOAD_UNITS' &&
      action.type !== '@@redux-form/LOAD_METADATA_FAILURE' &&
      action.type !== '@@redux-form/LOAD_QUESTIONNAIRE_SUCCESS' &&
      action.type !== '@@redux-form/SET_ACTIVE_QUESTIONNAIRE' &&
      action.type !== '@@redux-form/LOAD_STATISTICAL_CONTEXT' &&
      action.type !== '@@redux-form/LOAD_STATISTICAL_CONTEXT_SUCCESS' &&
      action.type !== '@@redux-form/LOAD_METADATA_FAILURE' &&
      action.type !== '@@redux-form/LOAD_UNITS' &&
      action.type !== '@@redux-form/LOAD_QUESTIONNAIRE_START' &&
      action.type !== '@@redux-form/SET_SELECTED_COMPONENT' &&
      action.type !== '@@redux-form/LOAD_METADATA_FAILURE' &&
      action.type !== '@@redux-form/ARRAY_REMOVE_ALL' &&
      action.type !== '@@redux-form/ARRAY_PUSH' &&
      action.type !== '@@redux-form/CLEAR_VALIDATION_ERRORS' &&
      action.type !== '@@redux-form/REMOVE_VALIDATION_ERRORS'
    );
  },
});

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
