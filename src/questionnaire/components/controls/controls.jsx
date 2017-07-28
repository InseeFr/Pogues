import React from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import Checkbox from 'layout/forms/controls/checkbox';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';

function InputControl() {
  const levels = [
    {
      value: 'INFO',
      label: Dictionary.INFO,
    },
    {
      value: 'WARN',
      label: Dictionary.WARN,
    },
    {
      value: 'ERROR',
      label: Dictionary.ERROR,
    },
  ];
  return (
    <div>
      <Field type="text" name="label" id="control_text" component={Input} label={Dictionary.control_label} />
      <Field name="condition" id="control_condition" help component={Textarea} label={Dictionary.expression} />
      <Field name="message" id="control_message" component={Textarea} label={Dictionary.control_message} />
      <Field name="type" id="control_type" component={Select} label={Dictionary.type} options={levels} required />
      <Field
        name="during_collect"
        id="control_during_collect"
        component={Checkbox}
        label={Dictionary.control_during_collect}
      />
      <Field
        name="post_collect"
        id="control_post_collect"
        component={Checkbox}
        label={Dictionary.control_post_collect}
      />
    </div>
  );
}

class Controls extends FormSection {
  static selectorPath = 'controls';
  static defaultProps = {
    name: 'controls',
  };

  render() {
    const inputControlView = <InputControl />;

    return (
      <div className="controls">
        <ListEntryFormContainer
          inputView={inputControlView}
          listName="controls"
          selectorPath={Controls.selectorPath}
          submitLabel="addControl"
          noValueLabel="noControlYet"
        />
      </div>
    );
  }
}

export default Controls;
