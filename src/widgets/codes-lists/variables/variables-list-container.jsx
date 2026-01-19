import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayRemoveAll, change, formValueSelector } from 'redux-form';

import { clearSearchResult } from '../../../actions/search';
import {
  DEFAULT_FORM_NAME,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import { findQuestionInLoop } from '../../component-new-edit/components/variables/utils-loops';
import Variables from './variables-list';

// PropTypes and defaultProps

const propTypes = {
  selectorPathParent: PropTypes.string,
  selectorPath: PropTypes.string,
  formName: PropTypes.string,
  scope: PropTypes.string,
};

export const defaultProps = {
  selectorPathParent: '',
  selectorPath: DEFAULT_VARIABLE_SELECTOR_PATH,
  formName: DEFAULT_FORM_NAME,
  scope: '',
};

// Container

export const mapStateToProps = (
  state,
  { selectorPathParent, selectorPath, formName, scope },
) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const currentId = selector(state, `${path}id`);

  if (!scope || scope === '') {
    return {
      path,
      currentId,
      variablesStore: {},
      scope: '',
    };
  }

  const loopChildren =
    findQuestionInLoop(state.appState.activeComponentsById)[scope] || [];

  console.log(
    'VariablesListContainer - mapStateToProps - loopChildren',
    loopChildren,
  );

  const loopVariablesStore = loopChildren.reduce((acc, question) => {
    acc[question.id] = {
      id: question.id,
      label: question.label,
      name: question.name,
    };

    return acc;
  }, {});

  const calculatedAndExternalVariables = {
    ...state.appState.activeExternalVariablesById,
    ...state.appState.activeCalculatedVariablesById,
  };

  console.log(
    'VariablesListContainer - mapStateToProps - calculatedAndExternalVariables',
    calculatedAndExternalVariables,
  );

  const calculatedAndExternalInLoop = Object.values(
    calculatedAndExternalVariables,
  )
    .filter((variable) => variable.scope === scope)
    .reduce((acc, variable) => {
      acc[variable.id] = variable;
      return acc;
    }, {});

  const variablesStore = {
    ...loopVariablesStore,
    ...calculatedAndExternalInLoop,
  };

  return {
    path,
    currentId,
    variablesStore,
    scope,
  };
};

const mapDispatchToProps = {
  clearSearchResult,
  change: change,
  arrayRemoveAll: arrayRemoveAll,
};

const VariablesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Variables);

VariablesListContainer.propTypes = propTypes;
VariablesListContainer.defaultProps = defaultProps;

export default VariablesListContainer;
