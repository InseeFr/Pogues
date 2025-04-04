import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_TYPE } from '../../../../../constants/pogues-constants';
import InputMeasure from './input-measure';

const { MEASURE: selectorPath } = DIMENSION_TYPE;

function ResponseFormatTableMeasure({
  selectorPathParent,
  disableSetConditionFilter,
}) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <InputMeasure
        selectorPath={selectorPathComposed}
        disableSetConditionFilter={disableSetConditionFilter}
      />
    </FormSection>
  );
}

ResponseFormatTableMeasure.propTypes = {
  selectorPathParent: PropTypes.string,
  disableSetConditionFilter: PropTypes.bool,
};

ResponseFormatTableMeasure.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTableMeasure;
