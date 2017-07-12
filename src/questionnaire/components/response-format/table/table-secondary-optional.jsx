import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import CodesList from 'layout/widget/codes-list/codes-list';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalView from 'layout/widget/optional-view';
import { required } from 'layout/forms/validation-rules';

function ResponseFormatTableSecondaryOptional({ selectorPath }) {
  return (
    <div>
      <CodesList selectorPath={selectorPath} />
      <OptionalView
        name="showTotalLabel"
        label={Dictionary.rowTotal}
        view={
          <Field
            name="totalLabel"
            type="text"
            component={Input}
            label={Dictionary.rowTotalLabel}
            validate={[required]}
            required
          />
        }
      />
    </div>
  );
}

ResponseFormatTableSecondaryOptional.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default ResponseFormatTableSecondaryOptional;
