import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../model/redirection';

import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { GotoInput } from 'widgets/goto-input';
import { RichEditorWithVariable } from 'forms/controls/control-with-suggestions';
import Textarea from 'forms/controls/textarea';
import { validateRedirectionForm } from 'utils/validation/validate';

import { TABS_PATHS, DEFAULT_FORM_NAME } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

// Utils

const validateForm =
  (addErrors, validate, componentsStore, editingComponentId) => values => {
    return validate(values, addErrors, {
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
  addErrors: PropTypes.func.isRequired,
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
  addErrors,
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
        validateForm={validateForm(
          addErrors,
          validateRedirectionForm,
          componentsStore,
          editingComponentId,
        )}
      >
        <Field
          type="text"
          name="label"
          component={Textarea}
          label={Dictionary.goTo_description}
          required
        />
        <Field
          type="text"
          name="condition"
          component={RichEditorWithVariable}
          label={Dictionary.condition}
          required
        />
        <GotoInput
          formName={formName}
          selectorPath={selectorPath}
          componentType={componentType}
        />
      </ListWithInputPanel>
    </FormSection>
  );
}

Redirections.propTypes = propTypes;
Redirections.defaultProps = defaultProps;

export default Redirections;
