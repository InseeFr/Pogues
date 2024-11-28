import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_FORMATS } from '../../../../../constants/pogues-constants';
import { CodesLists } from '../../../../codes-lists';

const { CODES_LIST: selectorPath } = DIMENSION_FORMATS;

const ResponseFormatTablePrincipalCodeslist = ({ selectorPathParent }) => {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <CodesLists selectorPathParent={selectorPathComposed} />
      </FormSection>
    </div>
  );
};

ResponseFormatTablePrincipalCodeslist.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTablePrincipalCodeslist.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTablePrincipalCodeslist;
