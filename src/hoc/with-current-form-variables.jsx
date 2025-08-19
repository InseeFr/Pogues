import React from 'react';

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../constants/pogues-constants';
import { nestedStoreToFlat, storeToArray } from '../utils/utils';

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
  const withCurrentFormVariablesComponent = (props) => (
    <ComponentToWrap {...props} />
  );

  const mapStateToProps = (name) => (state) => {
    const selector = formValueSelector(name);

    const currentActiveCalculatedVariables = (
      selector(state, 'calculatedVariables.calculatedVariables') || []
    ).map((v) => v.name);
    const currentActiveExternalVariables = (
      selector(state, 'externalVariables.externalVariables') || []
    ).map((v) => v.name);
    const currentActiveCollectedVariables = (
      selector(state, 'collectedVariables.collectedVariables') || []
    ).map((v) => v.name);

    const activeCalculatedVariables = storeToArray(
      state.appState.activeCalculatedVariablesById,
    ).map((v) => v.name);
    const activeExternalVariables = storeToArray(
      state.appState.activeExternalVariablesById,
    ).map((v) => v.name);
    const activeCollectedVariables = nestedStoreToFlat(
      state.appState.collectedVariableByQuestion,
    ).map((v) => v.name);

    // Adding the variables of external references
    const externalVarsAvailable =
      state.metadataByType.externalQuestionnairesVariables || {};
    const refIds =
      state.appState.activeQuestionnaire.childQuestionnaireRef || [];
    const externalVarsWanted = Object.keys(externalVarsAvailable)
      .filter((key) => refIds.includes(key))
      .reduce(
        (acc, key) => acc.concat(externalVarsAvailable[key].variables),
        [],
      )
      .map((v) => v?.Name);

    // Dedupe using a Set, which is then spread into a new Array
    const availableSuggestions = [
      ...new Set([
        ...currentActiveCalculatedVariables,
        ...currentActiveExternalVariables,
        ...currentActiveCollectedVariables,
        ...activeCalculatedVariables,
        ...activeExternalVariables,
        ...activeCollectedVariables,
        ...externalVarsWanted,
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
