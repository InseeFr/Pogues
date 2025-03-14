import React from 'react';

import PropTypes from 'prop-types';

import { CodesLists } from '../../../../codes-lists';

function ResponseFormatTableSecondaryOptional({ selectorPath }) {
  return (
    <div>
      <CodesLists selectorPathParent={selectorPath} allowPrecision={false} />
    </div>
  );
}

ResponseFormatTableSecondaryOptional.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default ResponseFormatTableSecondaryOptional;
