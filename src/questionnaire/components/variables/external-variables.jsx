import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultExternalVariableForm } from 'utils/transformation-entities/external-variable';
import Input from 'layout/forms/controls/input';

function validationExternalVariable(values, addedItems) {
  const { name, label } = values;
  const addedItemsNames = addedItems.map(cv => cv.name);
  const errors = [];

  if (name === '') errors.push(Dictionary.validation_externalvariable_name);
  if (label === '') errors.push(Dictionary.validation_externalvariable_label);
  if (addedItemsNames.indexOf(name) !== -1) errors.push(Dictionary.validation_externalvariable_existing);

  return errors;
}

function questionnaireName(value, previousValue, allValues) {
  if (value.length === 0 && allValues.externalVariables.label && allValues.externalVariables.label.length > 0) {
    value = allValues.externalVariables.label.replace(/[^a-z0-9_]/gi, '').toUpperCase().slice(0, 10);
  }
  return value;
}

function InputExternalVariable() {
  return (
    <div>
      <Field name="label" type="text" component={Input} label={Dictionary.label} required />
      <Field name="name" type="text" component={Input} label={Dictionary.name} normalize={questionnaireName} required />
    </div>
  );
}
class ExternalVariables extends Component {
  static selectorPath = 'externalVariables';

  render() {
    const { externalVariables, ...initialInputValues } = defaultExternalVariableForm;
    const inputExternalVariableView = <InputExternalVariable />;

    return (
      <FormSection name={ExternalVariables.selectorPath} className="external-variables">
        <ListEntryFormContainer
          inputView={inputExternalVariableView}
          initialInputValues={initialInputValues}
          selectorPath={ExternalVariables.selectorPath}
          validationInput={validationExternalVariable}
          listName="externalVariables"
          submitLabel="addExternalVariable"
          noValueLabel="noExternalVariablesYet"
          showDuplicateButton={false}
        />
      </FormSection>
    );
  }
}
export default ExternalVariables;
