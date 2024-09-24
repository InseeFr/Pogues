import React from 'react';
import { FormSection, Field } from 'redux-form';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { InputWithVariableAutoCompletion } from '../../../../../forms/controls/control-with-suggestions';
import { DIMENSION_LENGTH } from '../../../../../constants/pogues-constants';

const { FIXED_LENGTH: selectorPath } = DIMENSION_LENGTH;

export function ResponseFormatTablePrincipalListFixed() {
  return (
    <FormSection name={selectorPath}>
      <Field
        name="fixedLength"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.formula}
        required
      />
    </FormSection>
  );
}
