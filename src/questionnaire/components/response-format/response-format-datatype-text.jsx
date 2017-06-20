import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from 'layout/forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

class ResponseFormatDatatypeText extends FormSection {
  static defaultProps = {
    name: TEXT,
  };
  render() {
    return (
      <div className="response-format-datatype-text">
        <Field name="maxLength" type="number" component={Input} label={Dictionary.maxLength} />
        <Field name="pattern" type="text" component={Input} label={Dictionary.pattern} />
      </div>
    );
  }
}

export default ResponseFormatDatatypeText;
