import React, { useState } from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../model/control';

import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import Textarea from 'forms/controls/textarea';
import { RichEditorWithVariable } from 'forms/controls/control-with-suggestions';

import { validateControlForm } from 'utils/validation/validate';
import Dictionary from 'utils/dictionary/dictionary';

import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { TABS_PATHS, DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Utils

const validateForm = (addErrors, validate) => values => {
  return validate(values, addErrors);
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
  selectorPath: TABS_PATHS.CONTROLS,
  errors: [],
};

// Component

const Controls = ({ formName, selectorPath, errors, addErrors }) => {
  const [disableValidation, setDisableValidation] = useState(false);
  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="controls"
        errors={errors}
        validateForm={validateForm(addErrors, validateControlForm)}
        resetObject={defaultState}
        disableValidation={disableValidation}
      >
        <Field
          type="text"
          name="label"
          component={Textarea}
          label={Dictionary.description_label}
          required
        />
        <Field
          name="condition"
          component={RichEditorWithVariable}
          label={Dictionary.expression}
          required
          setDisableValidation={setDisableValidation}
        />
        <Field
          name="message"
          component={RichEditorWithVariable}
          label={Dictionary.control_message}
          required
          setDisableValidation={setDisableValidation}
        />
        <Field
          name="criticity"
          id="control_criticity"
          component={Select}
          label={Dictionary.criticity}
          required
        >
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
      </ListWithInputPanel>
    </FormSection>
  );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
