import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import InputMeasure from './input-measure';
import { DIMENSION_TYPE } from '../../../../../constants/pogues-constants';

const { MEASURE: selectorPath } = DIMENSION_TYPE;

function ResponseFormatTableMeasure({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <InputMeasure selectorPath={selectorPathComposed} />
    </FormSection>
  );
}

ResponseFormatTableMeasure.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTableMeasure.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTableMeasure;
