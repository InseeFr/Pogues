import React, { useCallback } from 'react';

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
import { useAggregatedDisableValidation } from '../utils/use-aggregated-disable-validation';
import { GotoInput } from './goto-input';

const validateForm =
  (addErrors, validate, componentsStore, editingComponentId) => (values) => {
    return validate(values, addErrors, {
      componentsStore,
      editingComponentId,
    });
  };

const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  componentType: PropTypes.string.isRequired,
  editingComponentId: PropTypes.string.isRequired,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
  componentsStore: PropTypes.object.isRequired,
  handleDisableValidation: PropTypes.func,
};

const Redirections = ({
  formName = DEFAULT_FORM_NAME,
  selectorPath = TABS_PATHS.REDIRECTIONS,
  componentType,
  errors = [],
  addErrors,
  componentsStore,
  editingComponentId,
  handleDisableValidation,
}) => {
  const onAggregateChange = useCallback(
    (any) => {
      handleDisableValidation?.(any);
    },
    [handleDisableValidation],
  );
  const { disabled: disableValidation, getSetDisableValidation } =
    useAggregatedDisableValidation(onAggregateChange);

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
          setDisableValidation={getSetDisableValidation('condition')}
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
export default Redirections;
