import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { CodesLists } from 'widgets/codes-lists';
import { DIMENSION_FORMATS } from 'constants/pogues-constants';

const { CODES_LIST } = DIMENSION_FORMATS;
const selectorPath = CODES_LIST;

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
