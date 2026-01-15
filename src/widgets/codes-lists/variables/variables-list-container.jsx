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
  { selectorPathParent, selectorPath, formName },
) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const currentId = selector(state, `${path}id`);

  const rawVariablesStore = {
    ...Object.values(state.appState.activeComponentsById)
      .filter((comp) => comp.type === COMPONENT_TYPE.QUESTION)
      .map((comp) => {
        return { id: { id: comp.id, label: comp.label, name: comp.name } };
      })
      .flat(),
    ...state.appState.activeExternalVariablesById,
    ...state.appState.activeCalculatedVariablesById,
  };
  const variablesStore = Object.values(rawVariablesStore).reduce(
    (acc, value) => {
      if (value?.id && value?.name) {
        acc[value.id] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.values(value).forEach((nestedVar) => {
          if (nestedVar?.id && nestedVar?.name) {
            acc[nestedVar.id] = nestedVar;
          }
        });
      }
      return acc;
    },
    {},
  );

  return {
    path,
    currentId,
    variablesStore,
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
