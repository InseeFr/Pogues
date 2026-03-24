import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DEFAULT_FORM_NAME,
  TABS_PATHS,
} from '../../../constants/pogues-constants';
import { SimpleEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import Textarea from '../../../forms/controls/textarea';
import { defaultState } from '../../../model/formToState/component-new-edit/redirection';
import Dictionary from '../../../utils/dictionary/dictionary';
import { validateRedirectionForm } from '../../../utils/validation/validate';
import { ListWithInputPanel } from '../../list-with-input-panel';
import { GotoInput } from './goto-input';

// Utils

const validateForm =
  (addErrors, validate, componentsStore, editingComponentId) => (values) => {
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

const Redirections = ({
  formName,
  selectorPath,
  componentType,
  errors,
  addErrors,
  componentsStore,
  editingComponentId,
}) => {
  const [disableValidation, setDisableValidation] = useState(false);
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
        disableValidation={disableValidation}
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
          component={SimpleEditorWithVariable}
          label={Dictionary.condition}
          required
          setDisableValidation={setDisableValidation}
        />
        <GotoInput
          formName={formName}
          selectorPath={selectorPath}
          componentType={componentType}
        />
      </ListWithInputPanel>
    </FormSection>
  );
};

Redirections.propTypes = propTypes;
Redirections.defaultProps = defaultProps;

export default Redirections;
