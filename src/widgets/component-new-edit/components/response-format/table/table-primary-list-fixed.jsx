import React from 'react';

import { Field, FormSection } from 'redux-form';

import { DIMENSION_LENGTH } from '../../../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../../../forms/controls/control-with-suggestions';
import Dictionary from '../../../../../utils/dictionary/dictionary';

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
