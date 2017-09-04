import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultCollectedVariableForm } from 'utils/transformation-entities/collected-variable';
import Input from 'layout/forms/controls/input';
import { name as validateName, nameSize } from 'layout/forms/validation-rules';

function validationCollectedVariable(values, addedItems) {
  const { name, label, ref } = values;
  const addedItemsNames = addedItems.filter((cv, index) => index !== ref - 1).map(cv => cv.name);
  const errors = [];
  const invalidName = validateName(name);
  const tooLongName = nameSize(name);

  if (invalidName) errors.push(invalidName);
  if (tooLongName) errors.push(tooLongName);

  if (name === '') errors.push(Dictionary.validation_collectedvariable_name);
  if (label === '') errors.push(Dictionary.validation_collectedvariable_label);
  if (addedItemsNames.indexOf(name) !== -1) errors.push(Dictionary.validation_collectedvariable_existing);

  return errors;
}

function InputCollectedVariable() {
  return (
    <div>
      <Field name="label" type="text" component={Input} label={Dictionary.label} required />
      <Field name="name" type="text" component={Input} label={Dictionary.name} required />
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
          showAddButton={false}
          showRemoveButton={false}
          avoidNewAddition
        />
      </FormSection>
    );
  }
}
export default CollectedVariables;
