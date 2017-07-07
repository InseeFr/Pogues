import React from 'react';
import { FormSection } from 'redux-form';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatSimple from 'questionnaire/components/response-format/response-format-simple';
import ResponseFormatSingle from 'questionnaire/components/response-format/response-format-single';
import ResponseFormatMultiple from 'questionnaire/components/response-format/response-format-multiple';
import ResponseFormatTable from 'questionnaire/components/response-format/response-format-table';
import Dictionary from 'utils/dictionary/dictionary';
import { QUESTION_TYPE_ENUM } from 'constants/schema';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

class ResponseFormat extends FormSection {
  static selectorPath = 'responseFormat';
  static defaultProps = {
    name: 'responseFormat',
  };

  render() {
    const responseFormatTypes = [
      {
        id: `response-format-${SIMPLE}`,
        label: Dictionary.responseFormatSimple,
        value: SIMPLE,
        content: <ResponseFormatSimple />,
      },
      {
        id: `response-format-${SINGLE_CHOICE}`,
        label: Dictionary.responseFormatSingle,
        value: SINGLE_CHOICE,
        content: <ResponseFormatSingle />,
      },
      {
        id: `response-format-${MULTIPLE_CHOICE}`,
        label: Dictionary.responseFormatMultiple,
        value: MULTIPLE_CHOICE,
        content: <ResponseFormatMultiple />,
      },
      {
        id: `response-format-${TABLE}`,
        label: Dictionary.responseFormatTable,
        value: TABLE,
        content: <ResponseFormatTable />,
      },
    ];

    return (
      <div className="response-format">
        <ComponentSelectoryByTypeContainer
          label={Dictionary.responseFormats}
          components={responseFormatTypes}
          selectorPath={ResponseFormat.selectorPath}
        />
      </div>
    );
  }
}

export default ResponseFormat;
