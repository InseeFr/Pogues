import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DATATYPE_NAME,
  DEFAULT_FORM_NAME,
  TABS_PATHS,
} from '../../../../constants/pogues-constants';
import { SimpleEditorWithVariable } from '../../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../../forms/controls/generic-option';
import Input from '../../../../forms/controls/input';
import Select from '../../../../forms/controls/select';
import { defaultState } from '../../../../model/formToState/component-new-edit/calculated-variable';
import Dictionary from '../../../../utils/dictionary/dictionary';
import { validateCalculatedVariableForm } from '../../../../utils/validation/validate';
import { ListWithInputPanel } from '../../../list-with-input-panel';
import { SelectorView, View } from '../../../selector-view';
import ResponseFormatDatatypeDate from '../response-format/simple/simple-date';
import ResponseFormatDatatypeNumeric from '../response-format/simple/simple-numeric';
import ResponseFormatDatatypeText from '../response-format/simple/simple-text';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
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
  scopes: PropTypes.array.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.CALCULATED_VARIABLES,
  errors: [],
};

const CalculatedVariables = ({
  formName,
  selectorPath,
  errors,
  addErrors,
  scopes,
}) => {
  const [disableValidation, setDisableValidation] = useState(false);
  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="calculatedVariables"
        errors={errors}
        validateForm={validateForm(addErrors, validateCalculatedVariableForm)}
        resetObject={defaultState}
        canDuplicate={false}
        disableValidation={disableValidation}
      >
        <Field
          name="label"
          type="text"
          component={Input}
          label={Dictionary.label}
          required
        />
        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          required
        />
        <Field
          name="formula"
          type="text"
          component={SimpleEditorWithVariable}
          label={Dictionary.formula}
          required
          setDisableValidation={setDisableValidation}
        />
        <Field name="scope" component={Select} label={Dictionary.Scope}>
          <GenericOption key="" value="">
            {Dictionary.selectScope}
          </GenericOption>
          {scopes}
        </Field>
        <SelectorView
          label={Dictionary.responseType}
          selectorPath={selectorPath}
          required={false}
        >
          <View key={TEXT} value={TEXT} label={Dictionary.TEXT}>
            <ResponseFormatDatatypeText required={false} />
          </View>
          <View key={DATE} value={DATE} label={Dictionary.DATE}>
            <ResponseFormatDatatypeDate />
          </View>
          <View key={NUMERIC} value={NUMERIC} label={Dictionary.NUMERIC}>
            <ResponseFormatDatatypeNumeric
              selectorPath={selectorPath}
              required
              disableSetUnit={true}
            />
          </View>
          <View key={BOOLEAN} value={BOOLEAN} label={Dictionary.BOOLEAN} />
        </SelectorView>
      </ListWithInputPanel>
    </FormSection>
  );
};

CalculatedVariables.propTypes = propTypes;
CalculatedVariables.defaultProps = defaultProps;

export default CalculatedVariables;
