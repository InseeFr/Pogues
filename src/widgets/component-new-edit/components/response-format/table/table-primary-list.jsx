import React from 'react';
import { FormSection, Field } from 'redux-form';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import Input from '../../../../../forms/controls/input';
import { DIMENSION_FORMATS } from '../../../../../constants/pogues-constants';

const { LIST: selectorPath } = DIMENSION_FORMATS;

function ResponseFormatTablePrincipalList() {
  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <Field
          name="numLinesMin"
          type="number"
          component={Input}
          label={Dictionary.minRowNb}
          required
        />
        <Field
          name="numLinesMax"
          type="number"
          component={Input}
          label={Dictionary.maxRowNb}
          required
        />
      </FormSection>
    </div>
  );
}

export default ResponseFormatTablePrincipalList;
