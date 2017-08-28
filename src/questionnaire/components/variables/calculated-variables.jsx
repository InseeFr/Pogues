import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultCalculatedVariableForm } from 'utils/transformation-entities/calculated-variable';
import Input from 'layout/forms/controls/input';
import { name as validateName, nameSize } from 'layout/forms/validation-rules';

function validationCalculatedVariable(values, addedItems) {
  const { label, name, formula, ref } = values;
  const addedItemsNames = addedItems.filter((cv, index) => index !== ref - 1).map(cv => cv.name);
  const errors = [];
  const invalidName = validateName(name);
  const tooLongName = nameSize(name);

  if (invalidName) errors.push(invalidName);
  if (tooLongName) errors.push(tooLongName);
  if (label === '') errors.push(Dictionary.validation_calculatedvariable_label);
  if (name === '') errors.push(Dictionary.validation_calculatedvariable_name);
  if (formula === '') errors.push(Dictionary.validation_calculatedvariable_formula);
  if (addedItemsNames.indexOf(name) !== -1) errors.push(Dictionary.validation_calculatedvariable_existing);

  return errors;
}

function InputCalculatedVariable() {
  return (
    <div>
      <Field name="label" type="text" component={Input} label={Dictionary.label} required />
      <Field name="name" type="text" component={Input} label={Dictionary.name} required />
      <Field name="formula" type="text" component={Input} label={Dictionary.formula} required />
    </div>
  );
}
class CalculatedVariables extends Component {
  static selectorPath = 'calculatedVariables';

  render() {
    const { calculatedVariables, ...initialInputValues } = defaultCalculatedVariableForm;
    const inputCalculatedVariableView = <InputCalculatedVariable />;

    return (
      <FormSection name={CalculatedVariables.selectorPath} className="calculated-variables">
        <ListEntryFormContainer
          inputView={inputCalculatedVariableView}
          initialInputValues={initialInputValues}
          selectorPath={CalculatedVariables.selectorPath}
          validationInput={validationCalculatedVariable}
          listName="calculatedVariables"
          submitLabel="addCalculatedVariable"
          noValueLabel="noCalculatedVariablesYet"
          showDuplicateButton={false}
        />
      </FormSection>
    );
  }
}
export default CalculatedVariables;
