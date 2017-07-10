import React from 'react';
import { FormSection, Field } from 'redux-form';

import { DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import Dictionary from 'utils/dictionary/dictionary';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatDatatypeNumeric from './simple-numeric';
import ResponseFormatDatatypeText from './simple-text';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { SIMPLE } = QUESTION_TYPE_ENUM;

class ResponseFormatSimple extends FormSection {
  static selectorPath = `responseFormat.${SIMPLE}`;
  static defaultProps = {
    name: SIMPLE,
  };
  render() {
    const responseFormatDatatypes = [
      {
        id: `response-format-simple-${DATE}`,
        label: Dictionary.DATE,
        value: DATE,
        content: '',
      },
      {
        id: `response-format-simple-${NUMERIC}`,
        label: Dictionary.NUMERIC,
        value: NUMERIC,
        content: <ResponseFormatDatatypeNumeric />,
      },
      {
        id: `response-format-simple-${TEXT}`,
        label: Dictionary.TEXT,
        value: TEXT,
        content: <ResponseFormatDatatypeText />,
      },
      {
        id: `response-format-simple-${BOOLEAN}`,
        label: Dictionary.BOOLEAN,
        value: BOOLEAN,
        content: '',
      },
    ];

    return (
      <div>
        <div className="ctrl-checkbox">
          <label htmlFor="rf-simple-mandatory">{Dictionary.mandatory}</label>
          <div>
            <Field name="mandatory" id="rf-simple-mandatory" component="input" type="checkbox" />
          </div>
        </div>
        <ComponentSelectoryByTypeContainer
          label={Dictionary.responseType}
          components={responseFormatDatatypes}
          selectorPath={ResponseFormatSimple.selectorPath}
        />
      </div>
    );
  }
}

export default ResponseFormatSimple;
