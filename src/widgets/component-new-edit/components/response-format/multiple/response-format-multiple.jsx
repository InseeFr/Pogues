import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { QUESTION_TYPE_ENUM } from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import ResponseFormatMultiplePrimary from './multiple-primary';
import ResponseFormatMultipleMeasure from './multiple-measure';

const { MULTIPLE_CHOICE: selectorPath } = QUESTION_TYPE_ENUM;

function ResponseFormatMultiple({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath} className="response-format__multiple">
      <h3 className="axis-primary__head">{Dictionary.primaryAxis}</h3>
      <ResponseFormatMultiplePrimary
        selectorPathParent={selectorPathComposed}
      />
      <h3 className="axis-measure__head">{Dictionary.measureInfo}</h3>
      <ResponseFormatMultipleMeasure
        selectorPathParent={selectorPathComposed}
      />
    </FormSection>
  );
}

ResponseFormatMultiple.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatMultiple.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatMultiple;
