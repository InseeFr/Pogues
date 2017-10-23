import React from 'react';
import { connect } from 'react-redux';

import Textarea from 'layout/forms/controls/rich-textarea';
import InputWithSuggestions from 'forms/controls/input-with-suggestions';

/**
 * High order component
 *
 * @param ComponentToWrap
 * @returns <ComponentToWrap availableSuggestions=[...] />
 */
const withCurrentFormVariables = ComponentToWrap => {
  const withCurrentFormVariablesComponent = props => <ComponentToWrap {...props} />;

  const mapStateToProps = state => {
    const activeFormData = state.form.component.values;
    const currentActiveCalculatedVariables = activeFormData.calculatedVariables
      ? activeFormData.calculatedVariables.calculatedVariables.map(v => v.name)
      : [];
    const currentActiveExternalVariables = activeFormData.externalVariables
      ? activeFormData.externalVariables.externalVariables.map(v => v.name)
      : [];
    const currentActiveCollectedVariables = activeFormData.collectedVariables
      ? activeFormData.collectedVariables.collectedVariables.map(v => v.name)
      : [];
    const activeCalculatedVariables = state.appState.activeCalculatedVariablesById
      ? Object.keys(state.appState.activeCalculatedVariablesById).map(
          k => state.appState.activeCalculatedVariablesById[k].name
        )
      : [];
    const activeExternalVariables = state.appState.activeExternalVariablesById
      ? Object.keys(state.appState.activeExternalVariablesById).map(
          k => state.appState.activeExternalVariablesById[k].name
        )
      : [];
    const activeCollectedVariables = state.appState.activeCollectedVariablesById
      ? Object.keys(state.appState.activeCollectedVariablesById).map(
          k => state.appState.activeCollectedVariablesById[k].name
        )
      : [];
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
    };
  };
  return connect(mapStateToProps)(withCurrentFormVariablesComponent);
};

const InputWithVariableAutoCompletion = withCurrentFormVariables(InputWithSuggestions);
const TextAreaWithVariableAutoCompletion = withCurrentFormVariables(Textarea);

// Don't use hoc directly in render
export default withCurrentFormVariables;
// Prefer the used of instanced versions exported here
export { InputWithVariableAutoCompletion, TextAreaWithVariableAutoCompletion };
