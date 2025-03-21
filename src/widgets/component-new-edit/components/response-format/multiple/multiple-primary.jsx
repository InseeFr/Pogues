import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_TYPE } from '../../../../../constants/pogues-constants';
import { CodesLists } from '../../../../codes-lists';

const { PRIMARY: selectorPath } = DIMENSION_TYPE;

function ResponseFormatMultiplePrimary({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <CodesLists
        selectorPathParent={selectorPathComposed}
        allowPrecision={true}
        allowFilter={true}
      />
    </FormSection>
  );
}

ResponseFormatMultiplePrimary.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatMultiplePrimary.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatMultiplePrimary;
