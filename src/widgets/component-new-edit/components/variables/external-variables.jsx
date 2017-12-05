import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../../model/external-variable';

import Input from 'forms/controls/input';
import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { validateExternalVariableForm } from 'utils/validation/validate';

import Dictionary from 'utils/dictionary/dictionary';
import { TABS_PATHS, DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Utils

const validateForm = (addErrors, validate) => (values, state) => {
  return validate(values, addErrors, state);
};

// Prop types and default props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.EXTERNAL_VARIABLES,
  errors: [],
};

// Component

function ExternalVariables({ formName, selectorPath, errors, addErrors }) {
  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="externalVariables"
        errors={errors}
        validateForm={validateForm(addErrors, validateExternalVariableForm)}
        resetObject={defaultState}
        canDuplicate={false}
      >
        <Field name="label" type="text" component={Input} label={Dictionary.label} required />
        <Field name="name" type="text" component={Input} label={Dictionary.name} required />
      </ListWithInputPanel>
    </FormSection>
  );
}

ExternalVariables.propTypes = propTypes;
ExternalVariables.defaultProps = defaultProps;

export default ExternalVariables;
