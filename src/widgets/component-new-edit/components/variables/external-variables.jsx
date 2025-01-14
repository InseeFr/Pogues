import React from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DATATYPE_NAME,
  DEFAULT_FORM_NAME,
  TABS_PATHS,
} from '../../../../constants/pogues-constants';
import GenericOption from '../../../../forms/controls/generic-option';
import Input from '../../../../forms/controls/input';
import Select from '../../../../forms/controls/select';
import { defaultState } from '../../../../model/formToState/component-new-edit/external-variable';
import Dictionary from '../../../../utils/dictionary/dictionary';
import { validateExternalVariableForm } from '../../../../utils/validation/validate';
import { ListWithInputPanel } from '../../../list-with-input-panel';
import { SelectorView, View } from '../../../selector-view';
import ResponseFormatDatatypeDate from '../response-format/simple/simple-date';
import ResponseFormatDatatypeNumeric from '../response-format/simple/simple-numeric';
import ResponseFormatDatatypeText from '../response-format/simple/simple-text';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

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
  selectorPath: TABS_PATHS.EXTERNAL_VARIABLES,
  errors: [],
};

// Component

function ExternalVariables({
  formName,
  selectorPath,
  errors,
  addErrors,
  scopes,
}) {
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
}

ExternalVariables.propTypes = propTypes;
ExternalVariables.defaultProps = defaultProps;

export default ExternalVariables;
