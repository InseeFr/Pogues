import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../model/redirection';

import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { GotoInput } from 'widgets/goto-input';
import { TextareaWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import Input from 'forms/controls/input';
import { validateRedirectionForm } from 'utils/validation/validate';

import { TABS_PATHS, DEFAULT_FORM_NAME } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

// Utils

const validateForm = (setErrors, validate, componentsStore, editingComponentId) => values => {
  return validate(values, setErrors, {
    componentsStore,
    editingComponentId,
  });
};

// Prop types and default props

const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  componentType: PropTypes.string.isRequired,
  editingComponentId: PropTypes.string.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  componentsStore: PropTypes.object.isRequired,
};

const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.REDIRECTIONS,
  errors: [],
};

// Component

function Redirections({
  formName,
  selectorPath,
  componentType,
  errors,
  setErrors,
  componentsStore,
  editingComponentId,
}) {
  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="redirections"
        errors={errors}
        resetObject={defaultState}
        validateForm={validateForm(setErrors, validateRedirectionForm, componentsStore, editingComponentId)}
      >
        <Field type="text" name="label" component={Input} label={Dictionary.goTo_label} required />
        <Field
          type="text"
          name="condition"
          component={TextareaWithVariableAutoCompletion}
          label={Dictionary.expression}
          required
        />
        <GotoInput formName={formName} selectorPath={selectorPath} componentType={componentType} />
      </ListWithInputPanel>
    </FormSection>
  );
}

Redirections.propTypes = propTypes;
Redirections.defaultProps = defaultProps;

export default Redirections;
