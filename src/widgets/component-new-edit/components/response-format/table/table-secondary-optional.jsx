import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'forms/controls/input';
import { CodesLists } from 'widgets/codes-lists';
import { OptionalView } from 'widgets/optional-view';
import Dictionary from 'utils/dictionary/dictionary';

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
  selectorPath: PropTypes.string.isRequired
};

export default ResponseFormatTableSecondaryOptional;
