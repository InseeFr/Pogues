import React from 'react';
import { FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ResponseFormatTablePrincipal from 'questionnaire/components/response-format/response-format-table-principal';
import ResponseFormatTableSecondary from 'questionnaire/components/response-format/response-format-table-secondary';
import ResponseFormatTableMeasures from 'questionnaire/components/response-format/response-format-table-measures';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { TABLE } = QUESTION_TYPE_ENUM;

class ResponseFormatTable extends FormSection {
  static defaultProps = {
    name: TABLE,
  };
  render() {
    return (
      <div className="response-format__table">
        <h3 id="response-format__table-principal-head">{Dictionary.primaryAxis}</h3>
        <ResponseFormatTablePrincipal />
        <h3 id="response-format__table-secondary-head">{Dictionary.secondaryAxis}</h3>
        <ResponseFormatTableSecondary />
        <h3 id="response-format__table-measures-head">{Dictionary.measureInfo}</h3>
        <ResponseFormatTableMeasures />
      </div>
    );
  }
}

export default ResponseFormatTable;
