import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import CodesList from 'layout/widget/codes-list/codes-list';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalViewContainer from 'layout/connected-widget/optional-view';

function ResponseFormatTableSecondaryOptional({ selectorPath }) {
  return (
    <div>
      <CodesList selectorPath={selectorPath} optional />
      <OptionalViewContainer
        name="showTotalLabel"
        selectorPath={selectorPath}
        label={Dictionary.columnTotal}
        view={<Field name="totalLabel" type="text" component={Input} label={Dictionary.columnTotalLabel} />}
      />
    </div>
  );
}

ResponseFormatTableSecondaryOptional.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default ResponseFormatTableSecondaryOptional;
