import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from 'layout/forms/controls/input';
import CodesListNewEdit from 'layout/widget/codes-list-new-edit';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalView from 'layout/widget/optional-view';

function SecondaryAxis() {
  return (
    <div>
      <CodesListNewEdit />
      <OptionalView
        name="showTotalLabel"
        label={Dictionary.rowTotal}
        view={<Field name="totalLabel" type="text" component={Input} label={Dictionary.rowTotalLabel} />}
      />
    </div>
  );
}

class ResponseFormatTableSecondary extends FormSection {
  static defaultProps = {
    name: 'AXISSECONDARY',
  };
  render() {
    return <OptionalView checkbox name="showSecondaryAxis" label={Dictionary.addScndAxis} view={<SecondaryAxis />} />;
  }
}

export default ResponseFormatTableSecondary;
