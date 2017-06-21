import React from 'react';
import { FormSection, Field } from 'redux-form';

import { DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import Dictionary from 'utils/dictionary/dictionary';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatDatatypeNumeric from 'questionnaire/components/response-format/response-format-datatype-numeric';
import ResponseFormatDatatypeText from 'questionnaire/components/response-format/response-format-datatype-text';

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
        label: Dictionary.DATE,
        value: DATE,
        content: '',
      },
      {
        label: Dictionary.NUMERIC,
        value: NUMERIC,
        content: <ResponseFormatDatatypeNumeric />,
      },
      {
        label: Dictionary.TEXT,
        value: TEXT,
        content: <ResponseFormatDatatypeText />,
      },
      {
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
