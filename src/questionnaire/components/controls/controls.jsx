import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import Checkbox from 'layout/forms/controls/checkbox';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';

function InputControl(props) {
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
  const { selectorPath } = props;
  return (
    <div>
      <Field type="text" name="label" id="control_text" component={Input} label={Dictionary.control_label} required />
      <Field
        name="condition"
        id="control_condition"
        help="true"
        component={Textarea}
        label={Dictionary.expression}
        required
      />
      <Field name="message" id="control_message" component={Textarea} label={Dictionary.control_message} required />
      <Field name="type" id="control_type" component={Select} label={Dictionary.type} required options={levels} />
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
class Controls extends React.Component {
  static selectorPath = 'AXISCONTROLS';
  static propTypes = {
    selectorPathParent: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
  };

  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${Controls.selectorPath}`
      : Controls.selectorPath;
  }

  render() {
    const inputControlView = <InputControl selectorPath={this.selectorPathComposed} />;

    return (
      <FormSection name={Controls.selectorPath}>
        <ListEntryFormContainer
          inputView={inputControlView}
          submit={this.submit}
          selectorPath={this.selectorPathComposed}
          submitLabel="addControl"
          noValueLabel="noControlYet"
        />
      </FormSection>
    );
  }
}

export default Controls;
