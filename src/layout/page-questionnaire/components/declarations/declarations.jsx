import React, { Component } from 'react';
import { Field, formValueSelector, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultForm } from './model/declaration';
import { required } from 'forms/validation-rules';
import { TextareaWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';

function validationDeclaration(values) {
  const { label } = values;
  const requiredLabel = required(label);
  const errors = [];

  if (requiredLabel) errors.push(Dictionary.validation_declaration_label);

  return errors;
}

function InputDeclaration({ showPosition }) {
  return (
    <div>
      <Field
        name="label"
        id="declaration_text"
        component={TextareaWithVariableAutoCompletion}
        label={Dictionary.declaration_label}
        buttons
        required
      />

      <Field name="declarationType" id="declaration_type" component={Select} label={Dictionary.type} required>
        <GenericOption key="INSTRUCTION" value="INSTRUCTION">
          {Dictionary.INSTRUCTION}
        </GenericOption>
        <GenericOption key="COMMENT" value="COMMENT">
          {Dictionary.COMMENT}
        </GenericOption>
        <GenericOption key="HELP" value="HELP">
          {Dictionary.HELP}
        </GenericOption>
        <GenericOption key="WARNING" value="WARNING">
          {Dictionary.WARNING}
        </GenericOption>
      </Field>

      {showPosition && (
        <Field
          name="position"
          id="declaration_position"
          component={Select}
          label={Dictionary.declaration_position}
          required
        >
          <GenericOption key="AFTER_QUESTION_TEXT" value="AFTER_QUESTION_TEXT">
            {Dictionary.dclPosAfterQuestion}
          </GenericOption>
          <GenericOption key="AFTER_RESPONSE" value="AFTER_RESPONSE">
            {Dictionary.dclPosAfterAnswer}
          </GenericOption>
          <GenericOption key="BEFORE_QUESTION_TEXT" value="BEFORE_QUESTION_TEXT">
            {Dictionary.dclPosBeforeText}
          </GenericOption>
          <GenericOption key="DETACHABLE" value="DETACHABLE">
            {Dictionary.dclPosDetachable}
          </GenericOption>
        </Field>
      )}
    </div>
  );
}

InputDeclaration.propTypes = {
  showPosition: PropTypes.bool.isRequired,
};

class Declarations extends Component {
  static selectorPath = 'declarations';

  static propTypes = {
    showPosition: PropTypes.bool,
  };

  static defaultProps = {
    showPosition: true,
  };

  render() {
    const { declarations, ...initialInputValues } = defaultForm;
    const InputDeclarationView = <InputDeclaration />;
    return (
      <FormSection name={Declarations.selectorPath} className="declaratations">
        <ListEntryFormContainer
          inputView={InputDeclarationView}
          initialInputValues={initialInputValues}
          selectorPath={Declarations.selectorPath}
          validationInput={validationDeclaration}
          listName="declarations"
          submitLabel="reset"
          noValueLabel="noDeclarationYet"
          rerenderOnEveryChange
        />
      </FormSection>
    );
  }
}
export default Declarations;
