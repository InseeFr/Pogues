import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import Input from 'forms/controls/input';
import { TextareaWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultForm } from '../model/control';
import withXPathValidation from 'hoc/with-xpath-validation';

const TextAreaWithVariableAndXPathValidation = withXPathValidation(TextareaWithVariableAutoCompletion);

function validationControl(values) {
  const { label, condition, message } = values;
  const errors = [];

  if (label === '') errors.push(Dictionary.validation_control_label);
  if (condition === '') errors.push(Dictionary.validation_expression);
  if (message === '') errors.push(Dictionary.validation_control_message);

  return errors;
}

function InputControl() {
  return (
    <div>
      <Field type="text" name="label" component={Input} label={Dictionary.control_label} required />
      <Field
        name="condition"
        component={TextAreaWithVariableAndXPathValidation}
        label={Dictionary.expression}
        required
      />
      <Field
        name="message"
        component={TextareaWithVariableAutoCompletion}
        label={Dictionary.control_message}
        required
      />
      <Field name="type" id="control_type" component={Select} label={Dictionary.type} required>
        <GenericOption key="INFO" value="INFO">
          {Dictionary.INFO}
        </GenericOption>
        <GenericOption key="WARN" value="WARN">
          {Dictionary.WARN}
        </GenericOption>
        <GenericOption key="ERROR" value="ERROR">
          {Dictionary.ERROR}
        </GenericOption>
      </Field>
      {/* <Field */}
      {/* name="during_collect" */}
      {/* id="control_during_collect" */}
      {/* component={Checkbox} */}
      {/* label={Dictionary.control_during_collect} */}
      {/* /> */}
      {/* <Field */}
      {/* name="post_collect" */}
      {/* id="control_post_collect" */}
      {/* component={Checkbox} */}
      {/* label={Dictionary.control_post_collect} */}
      {/* /> */}
    </div>
  );
}

class Controls extends Component {
  static selectorPath = 'controls';

  render() {
    const { controls, ...initialInputValues } = defaultForm;
    const inputControlView = <InputControl />;

    return (
      <FormSection name={Controls.selectorPath} className="controls">
        <ListEntryFormContainer
          inputView={inputControlView}
          initialInputValues={initialInputValues}
          selectorPath={Controls.selectorPath}
          validationInput={validationControl}
          listName="controls"
          submitLabel="reset"
          noValueLabel="noControlYet"
        />
      </FormSection>
    );
  }
}

export default Controls;
