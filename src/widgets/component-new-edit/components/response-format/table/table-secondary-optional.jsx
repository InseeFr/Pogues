import React from 'react';
import PropTypes from 'prop-types';

import { CodesLists } from 'widgets/codes-lists';

function ResponseFormatTableSecondaryOptional({ selectorPath }) {
  return (
    <div>
      <CodesLists selectorPathParent={selectorPath} />
      {/*
  <OptionalView
    name="showTotalLabel"
    selectorPath={selectorPath}
    label={Dictionary.columnTotal}
  >
    <Field
      name="totalLabel"
      type="text"
      component={Input}
      label={Dictionary.columnTotalLabel}
    />
  </OptionalView>

  */}
    </div>
  );
}

ResponseFormatTableSecondaryOptional.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default ResponseFormatTableSecondaryOptional;
