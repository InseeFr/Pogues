import React from 'react';

import { Field, FormSection } from 'redux-form';

import { DIMENSION_LENGTH } from '../../../../../constants/pogues-constants';
import Input from '../../../../../forms/controls/input';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { DYNAMIC_LENGTH: selectorPath } = DIMENSION_LENGTH;

export function ResponseFormatTablePrincipalListDynamic() {
  return (
    <FormSection name={selectorPath}>
      <Field
        name="minLines"
        type="number"
        component={Input}
        label={Dictionary.minRowNb}
        required
      />
      <Field
        name="maxLines"
        type="number"
        component={Input}
        label={Dictionary.maxRowNb}
        required
      />
    </FormSection>
  );
}
