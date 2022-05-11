import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { DEFAULT_FORM_NAME } from 'constants/pogues-constants';
import { storeToArray, nestedStoreToFlat } from 'utils/utils';

/**
 * High order component
 *
 * @param ComponentToWrap
 * @returns <ComponentToWrap availableSuggestions=[...] />
 */
const withCurrentFormVariables = (
  ComponentToWrap,
  formName = DEFAULT_FORM_NAME,
) => {
  const withCurrentFormVariablesComponent = props => (
    <ComponentToWrap {...props} />
  );

  const mapStateToProps = name => state => {
    const selector = formValueSelector(name);

    const currentActiveCalculatedVariables = (
      selector(state, 'calculatedVariables.calculatedVariables') || []
    ).map(v => v.name);
    const currentActiveExternalVariables = (
      selector(state, 'externalVariables.externalVariables') || []
    ).map(v => v.name);
    const currentActiveCollectedVariables = (
      selector(state, 'collectedVariables.collectedVariables') || []
    ).map(v => v.name);

    const activeCalculatedVariables = storeToArray(
      state.appState.activeCalculatedVariablesById,
    ).map(v => v.name);
    const activeExternalVariables = storeToArray(
      state.appState.activeExternalVariablesById,
    ).map(v => v.name);
    const activeCollectedVariables = nestedStoreToFlat(
      state.appState.collectedVariableByQuestion,
    ).map(v => v.name);

    // Dedupe using a Set, which is then spread into a new Array
    const availableSuggestions = [
      ...new Set([
        ...currentActiveCalculatedVariables,
        ...currentActiveExternalVariables,
        ...currentActiveCollectedVariables,
        ...activeCalculatedVariables,
        ...activeExternalVariables,
        ...activeCollectedVariables,
      ]),
    ];
    return {
      availableSuggestions,
      focusedInput: state.appState.focusedInput,
      formulasLanguage: state.appState.activeQuestionnaire.formulaSpecified,
    };
  };
  return connect(mapStateToProps(formName))(withCurrentFormVariablesComponent);
};

// Don't use hoc directly in render
export default withCurrentFormVariables;
