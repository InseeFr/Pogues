import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultCollectedVariableForm } from 'utils/transformation-entities/collected-variable';
import Input from 'layout/forms/controls/input';
import { name as validateName } from 'layout/forms/validation-rules';

function validationCollectedVariable(values, addedItems) {
  const { name, label } = values;
  const addedItemsNames = addedItems.map(cv => cv.name);
  const errors = [];
  const invalidName = validateName(name);

  if (invalidName) errors.push(invalidName);
  if (name === '') errors.push(Dictionary.validation_collectedvariable_name);
  if (label === '') errors.push(Dictionary.validation_collectedvariable_label);
  if (addedItemsNames.indexOf(name) !== -1) errors.push(Dictionary.validation_collectedvariable_existing);

  return errors;
}

function componentName(value, previousValue, allValues) {
  if (value.length === 0 && allValues.collectedVariables.label && allValues.collectedVariables.label.length > 0) {
    value = allValues.collectedVariables.label.replace(/[^a-z0-9_]/gi, '').toUpperCase().slice(0, 10);
  }
  return value;
}

function InputCollectedVariable() {
  return (
    <div>
      <Field name="label" type="text" component={Input} label={Dictionary.label} required />
      <Field name="name" type="text" component={Input} label={Dictionary.name} normalize={componentName} required />
    </div>
  );
}
class CollectedVariables extends Component {
  static selectorPath = 'collectedVariables';

  render() {
    const { collectedVariables, ...initialInputValues } = defaultCollectedVariableForm;
    const inputCollectedVariableView = <InputCollectedVariable />;

    return (
      <FormSection name={CollectedVariables.selectorPath} className="collected-variables">
        <ListEntryFormContainer
          inputView={inputCollectedVariableView}
          initialInputValues={initialInputValues}
          selectorPath={CollectedVariables.selectorPath}
          validationInput={validationCollectedVariable}
          listName="collectedVariables"
          submitLabel="addCollectedVariable"
          noValueLabel="noCollectedVariablesYet"
          showDuplicateButton={false}
        />
      </FormSection>
    );
  }
}
export default CollectedVariables;
