import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  DEFAULT_FORM_NAME,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../../constants/pogues-constants';
import { SimpleEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Textarea from '../../../forms/controls/textarea';
import { defaultState } from '../../../model/formToState/component-new-edit/control';
import Dictionary from '../../../utils/dictionary/dictionary';
import { validateControlForm } from '../../../utils/validation/validate';
import { ListWithInputPanel } from '../../list-with-input-panel';

const validateForm = (addErrors, validate) => (values) => {
  return validate(values, addErrors);
};

const Controls = ({
  formName,
  selectorPath,
  errors,
  addErrors,
  isDynamicArray,
  isRoundabout,
}) => {
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
          component={SimpleEditorWithVariable}
          label={Dictionary.expression}
          required
          setDisableValidation={setDisableValidation}
        />
        <Field
          name="message"
          component={SimpleEditorWithVariable}
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
          <GenericOption key="WARN" value="WARN">
            {Dictionary.WARN}
          </GenericOption>
          <GenericOption key="ERROR" value="ERROR">
            {Dictionary.ERROR}
          </GenericOption>
        </Field>
        {isDynamicArray && (
          <Field
            name="scope"
            id="control_scope"
            component={Select}
            label={Dictionary.control_scope}
            required={isDynamicArray}
          >
            <GenericOption key="WHOLE" value="WHOLE">
              {Dictionary.DYNAMIC_ARRAY}
            </GenericOption>
            <GenericOption key="OCCURRENCE" value="OCCURRENCE">
              {Dictionary.LINE}
            </GenericOption>
          </Field>
        )}
        {isRoundabout && (
          <Field
            name="scope"
            id="control_scope"
            component={Select}
            label={Dictionary.control_scope}
            required={isRoundabout}
          >
            <GenericOption key="WHOLE" value="WHOLE">
              {Dictionary.ROUNDABOUT}
            </GenericOption>
            <GenericOption key="OCCURRENCE" value="OCCURRENCE">
              {Dictionary.OCCURRENCE}
            </GenericOption>
          </Field>
        )}
      </ListWithInputPanel>
    </FormSection>
  );
};

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    isDynamicArray:
      selector(state, `${TABS_PATHS.RESPONSE_FORMAT}.type`) ===
        QUESTION_TYPE_ENUM.TABLE &&
      selector(
        state,
        `${TABS_PATHS.RESPONSE_FORMAT}.${QUESTION_TYPE_ENUM.TABLE}.${DIMENSION_TYPE.PRIMARY}.type`,
      ) === DIMENSION_FORMATS.LIST,
  };
};

Controls.propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
  isDynamicArray: PropTypes.bool,
  isRoundabout: PropTypes.bool,
};
Controls.defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.CONTROLS,
  errors: [],
  isDynamicArray: false,
  isRoundabout: false,
};

export default connect(mapStateToProps)(Controls);
