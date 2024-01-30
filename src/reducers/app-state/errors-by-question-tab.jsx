import _ from 'lodash';

import { SET_TAB_ERRORS, CLEAR_TAB_ERRORS } from '../../actions/app-state';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';
import { TAB_NAMES } from '../../constants/pogues-constants';

const actionHandlers = {};

function getNumErrorsFromObject(item) {
  let numErrors = 0;

  if (_.isObject(item)) {
    numErrors = Object.keys(item).reduce((accInner, key) => {
      return accInner + getNumErrorsFromObject(item[key]);
    }, 0);
  } else if (_.isArray(item)) {
    numErrors = Object.keys(item).reduce((accInner, key) => {
      return accInner + getNumErrorsFromObject(item[key]);
    }, 0);
  } else if (_.isString(item)) {
    numErrors = 1;
  }

  return numErrors;
}

function getNumErrorsByTab(errorsValidation, errorsIntegrity) {
  const numErrorsValidation = Object.keys(TAB_NAMES).reduce((acc, key) => {
    const tabName = TAB_NAMES[key];
    return {
      ...acc,
      [tabName]: getNumErrorsFromObject(errorsValidation[tabName]),
    };
  }, {});
  const numErrorsIntegrity = Object.keys(TAB_NAMES).reduce((acc, key) => {
    const tabName = TAB_NAMES[key];
    return {
      ...acc,
      [tabName]: Object.keys(errorsIntegrity).filter(innerKey => {
        return errorsIntegrity[innerKey].type === tabName;
      }).length,
    };
  }, {});

  return Object.keys(TAB_NAMES).reduce((acc, key) => {
    const tabName = TAB_NAMES[key];
    return {
      ...acc,
      [tabName]: numErrorsValidation[tabName] + numErrorsIntegrity[tabName],
    };
  }, {});
}

export function setTabErrors(state, { errorsValidation, errorsIntegrity }) {
  return {
    ...state,
    ...getNumErrorsByTab(errorsValidation, errorsIntegrity),
  };
}

export function clearTabErrors() {
  return {};
}

actionHandlers[SET_TAB_ERRORS] = setTabErrors;
actionHandlers[CLEAR_TAB_ERRORS] = clearTabErrors;

export default createActionHandlers(actionHandlers);
