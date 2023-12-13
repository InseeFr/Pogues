import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from '../../../../../forms/controls/input';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

function ResponseFormatDatatypeText({ name, required, readOnly }) {
  return (
    <FormSection name={name}>
      <div className="response-format-datatype-text">
        <Field
          name="maxLength"
          type="number"
          component={Input}
          label={Dictionary.maxLength}
          required={required}
          disabled={readOnly}
        />
        <Field
          name="pattern"
          type="text"
          component={Input}
          label={Dictionary.pattern}
          disabled={readOnly}
        />
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeText.defaultProps = {
  name: TEXT,
  readOnly: false,
  required: true,
};

export default ResponseFormatDatatypeText;
