import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from 'layout/forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import { required, minValue } from 'layout/forms/validation-rules';

const { NUMERIC } = DATATYPE_NAME;

class ResponseFormatDatatypeNumeric extends FormSection {
  static defaultProps = {
    name: NUMERIC,
  };
  render() {
    return (
      <div className="response-format-datatype-numeric">
        <Field
          name="minimum"
          type="number"
          component={Input}
          label={Dictionary.minimum}
          validate={[required, minValue(0)]}
          required
        />
        <Field
          name="maximum"
          type="number"
          component={Input}
          label={Dictionary.maximum}
          validate={[required, minValue(1)]}
          required
        />
        <Field name="decimals" type="number" component={Input} label={Dictionary.decimals} />
      </div>
    );
  }
}

export default ResponseFormatDatatypeNumeric;
