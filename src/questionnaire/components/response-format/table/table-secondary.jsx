import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import CodesList from 'layout/widget/codes-list/codes-list';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalView from 'layout/widget/optional-view';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import { required } from 'layout/forms/validation-rules';

const { TABLE } = QUESTION_TYPE_ENUM;

function SecondaryAxis({ selectorPath }) {
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

SecondaryAxis.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

class ResponseFormatTableSecondary extends FormSection {
  static selectorPath = `responseFormat.${TABLE}.AXISSECONDARY`;
  static defaultProps = {
    name: 'AXISSECONDARY',
  };
  render() {
    return (
      <OptionalView
        checkbox
        name="showSecondaryAxis"
        label={Dictionary.addScndAxis}
        view={<SecondaryAxis selectorPath={ResponseFormatTableSecondary.selectorPath} />}
      />
    );
  }
}

export default ResponseFormatTableSecondary;
