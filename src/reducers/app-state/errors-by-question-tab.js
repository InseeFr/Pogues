import { SET_TAB_ERRORS, CLEAR_TAB_ERRORS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { TAB_NAMES } from 'constants/pogues-constants';

const actionHandlers = {};

export function setTabErrors(state, errors) {
  return {
    ...state,
    ...errors.reduce((acc, error) => {
      // error -> ['responseFormat.PRIMARY.label', 'Error message']
      const tabName = error[0].split('.')[0];

      if (Object.values(TAB_NAMES).indexOf(tabName) !== -1) {
        const numErrors = acc[tabName] || 0;

        return {
          ...acc,
          [tabName]: numErrors + 1,
        };
      }

      return acc;
    }, {}),
  };
}

export function clearTabErrors() {
  return {};
}

actionHandlers[SET_TAB_ERRORS] = setTabErrors;
actionHandlers[CLEAR_TAB_ERRORS] = clearTabErrors;

export default createActionHandlers(actionHandlers);
