import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import { InputWithVariableAutoCompletion } from 'hoc/withCurrentFormVariables';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatSimple from 'questionnaire/components/response-format/simple/response-format-simple';
import ResponseFormatSingle from 'questionnaire/components/response-format/single/response-format-single';
import Dictionary from 'utils/dictionary/dictionary';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

function InputMeasure(props) {
  const { selectorPath } = props;
  const baseId = selectorPath.split('.').join('-');
  const responseFormatTypes = [
    {
      id: `${baseId}-${SIMPLE}`,
      label: Dictionary.responseFormatSimple,
      value: SIMPLE,
      content: <ResponseFormatSimple selectorPathParent={selectorPath} showMandatory={false} />,
    },
    {
      id: `${baseId}-${SINGLE_CHOICE}`,
      label: Dictionary.responseFormatSingle,
      value: SINGLE_CHOICE,
      content: <ResponseFormatSingle selectorPathParent={selectorPath} showMandatory={false} />,
    },
  ];
  return (
    <div>
      <Field
        name="label"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.measureLabel}
        required
      />

      <ComponentSelectoryByTypeContainer
        label={Dictionary.typeMeasure}
        components={responseFormatTypes}
        selectorPath={selectorPath}
      />
    </div>
  );
}

InputMeasure.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default InputMeasure;
