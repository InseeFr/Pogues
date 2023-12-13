import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { CodesLists } from '../../../../codes-lists';
import { DIMENSION_TYPE } from '../../../../../constants/pogues-constants';

const { PRIMARY: selectorPath } = DIMENSION_TYPE;

function ResponseFormatMultiplePrimary({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <CodesLists selectorPathParent={selectorPathComposed} />
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
