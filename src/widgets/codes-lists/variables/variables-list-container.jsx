import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayRemoveAll, change, formValueSelector } from 'redux-form';

import { clearSearchResult } from '../../../actions/search';
import {
  COMPONENT_TYPE,
  DEFAULT_FORM_NAME,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import { findQuestionInLoop } from '../../component-new-edit/components/variables/utils-loops';
import Variables from './variables-list';

const { QUESTION } = COMPONENT_TYPE;

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
  const codesListsStore = state.appState.activeCodeListsById;
  const currentId = selector(state, `${path}id`);
  const currentName = selector(state, `${path}name`);
  const currentLabel = selector(state, `${path}label`);

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

  const loopQuestionsId = loopChildren.map((question) => question.id);

  const tableId = Object.values(state.appState.activeComponentsById).find(
    (component) => component.type === QUESTION && component.id === scope,
  )?.id;

  const questionsId = [...loopQuestionsId, tableId];

  const collectedVariablesByQuestion =
    state.appState.collectedVariableByQuestion;

  const collectedVariables = Object.keys(collectedVariablesByQuestion)
    .filter((key) => questionsId.includes(key))
    .map((key) => collectedVariablesByQuestion[key]);

  const loopVariablesStore = collectedVariables.flatMap((variablesNested) =>
    Object.values(variablesNested).map((variable) => ({
      id: variable.id,
      label: variable.label,
      name: variable.name,
    })),
  );

  const calculatedAndExternalVariables = {
    ...state.appState.activeExternalVariablesById,
    ...state.appState.activeCalculatedVariablesById,
  };

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

  const currentCodesListsStore =
    currentId !== ''
      ? {
          ...codesListsStore,
          [currentId]: {
            id: currentId,
            name: currentName,
            label: currentLabel,
            scope: scope,
          },
        }
      : codesListsStore;

  return {
    path,
    currentId,
    variablesStore,
    currentCodesListsStore,
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
