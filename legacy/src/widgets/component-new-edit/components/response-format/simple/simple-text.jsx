import React from 'react';

import { Field, FormSection } from 'redux-form';

import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import Input from '../../../../../forms/controls/input';
import Dictionary from '../../../../../utils/dictionary/dictionary';

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
