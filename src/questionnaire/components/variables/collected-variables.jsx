import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultForm } from './model/collected-variable';
import Input from 'forms/controls/input';
import { name as validateName, nameSize } from 'forms/validation-rules';

function validationCollectedVariable(values) {
  const { name, label, ref, collectedVariables } = values;
  const addedItemsNames = collectedVariables.filter((cv, index) => index !== ref - 1).map(cv => cv.name);
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
  static propTypes = {
    selectorPath: PropTypes.string.isRequired,
    generateCollectedVariables: PropTypes.func.isRequired,
    errors: PropTypes.array,
  };

  static defaultProps = {
    errors: [],
  };

  render() {
    const { collectedVariables, ...initialInputValues } = defaultForm;
    const inputCollectedVariableView = <InputCollectedVariable />;
    const { generateCollectedVariables, errors, selectorPath } = this.props;
    const styleErrors = {
      display: errors.length > 0 ? 'block' : 'none',
    };
    const errorsList = errors.map((e, index) => {
      return <li key={index}>{e}</li>;
    });

    return (
      <FormSection name={selectorPath} className="collected-variables">
        <ul style={styleErrors} className="nav-error">
          {errorsList}
        </ul>
        <button
          type="button"
          className="btn-yellow"
          onClick={event => {
            event.preventDefault();
            generateCollectedVariables();
          }}
        >
          {Dictionary.generateCollectedVariables}
        </button>
        <ListEntryFormContainer
          inputView={inputCollectedVariableView}
          initialInputValues={initialInputValues}
          selectorPath={selectorPath}
          validationInput={validationCollectedVariable}
          listName="collectedVariables"
          submitLabel="reset"
          noValueLabel="noCollectedVariablesYet"
          showDuplicateButton={false}
          showAddButton={false}
          showRemoveButton={false}
          avoidNewAddition
        />
        <Field name="responseFormat" type="hidden" component="input" />
      </FormSection>
    );
  }
}
export default CollectedVariables;
