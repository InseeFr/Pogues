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
    const activeCalculatedVariables = activeFormData.calculatedVariables
      ? activeFormData.calculatedVariables.calculatedVariables.map(v => v.name)
      : [];
    const activeExternalVariables = activeFormData.externalVariables
      ? activeFormData.externalVariables.externalVariables.map(v => v.name)
      : [];
    const activeCollectedVariables = activeFormData.collectedVariables
      ? activeFormData.collectedVariables.collectedVariables.map(v => v.name)
      : [];

    return {
      availableSuggestions: [...activeCalculatedVariables, ...activeExternalVariables, ...activeCollectedVariables],
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
