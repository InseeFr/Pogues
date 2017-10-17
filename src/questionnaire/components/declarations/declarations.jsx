import React, { Component } from 'react';
import { Field, formValueSelector, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { declarationsFormDefault } from 'utils/transformation-entities/declaration';
import { required } from 'layout/forms/validation-rules';
import { TextAreaWithVariableAutoCompletion } from 'hoc/withCurrentFormVariables';

function validationDeclaration(values) {
  const { label } = values;
  const requiredLabel = required(label);
  const errors = [];

  if (requiredLabel) errors.push(Dictionary.validation_declaration_label);

  return errors;
}

function InputDeclaration({ identifier, showPosition }) {
  const types = [
    {
      value: 'INSTRUCTION',
      label: Dictionary.INSTRUCTION,
    },
    {
      value: 'COMMENT',
      label: Dictionary.COMMENT,
    },
    {
      value: 'HELP',
      label: Dictionary.HELP,
    },
    {
      value: 'WARNING',
      label: Dictionary.WARNING,
    },
  ];

  const positions = [
    {
      value: 'AFTER_QUESTION_TEXT',
      label: Dictionary.dclPosAfterQuestion,
    },
    {
      value: 'AFTER_RESPONSE',
      label: Dictionary.dclPosAfterAnswer,
    },
    {
      value: 'BEFORE_QUESTION_TEXT',
      label: Dictionary.dclPosBeforeText,
    },
    {
      value: 'DETACHABLE',
      label: Dictionary.dclPosDetachable,
    },
  ];

  return (
    <div>
      <Field
        name="label"
        id="declaration_text"
        component={TextAreaWithVariableAutoCompletion}
        label={Dictionary.declaration_label}
        buttons
        required
        identifier={identifier}
      />

      <Field
        name="declarationType"
        id="declaration_type"
        component={Select}
        label={Dictionary.type}
        options={types}
        required
      />

      {showPosition && (
        <Field
          name="position"
          id="declaration_position"
          component={Select}
          label={Dictionary.declaration_position}
          options={positions}
          required
        />
      )}
    </div>
  );
}

InputDeclaration.propTypes = {
  showPosition: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    identifier: selector(state, `declarations.ref`),
  };
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
    const { declarations, ...initialInputValues } = declarationsFormDefault;
    const InputDeclarationView = connect(mapStateToProps)(InputDeclaration);
    const inputDeclarationViewInstance = <InputDeclarationView showPosition={this.props.showPosition} />;
    return (
      <FormSection name={Declarations.selectorPath} className="declaratations">
        <ListEntryFormContainer
          inputView={inputDeclarationViewInstance}
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
