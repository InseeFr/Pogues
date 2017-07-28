import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';

function InputRedirection() {
  return (
    <div>
      <Field type="text" name="label" id="redirection_text" component={Input} label={Dictionary.goTo_label} />
      <Field
        type="text"
        name="condition"
        id="redirection_condition"
        component={Textarea}
        label={Dictionary.expression}
        help
      />
      <Field help type="text" name="cible" id="redirection_cible" component={Input} label={Dictionary.target} />
    </div>
  );
}
class Redirections extends FormSection {
  static selectorPath = 'redirections';
  static defaultProps = {
    name: 'redirections',
  };

  render() {
    const inputControlView = <InputRedirection />;

    return (
      <div className="redirections">
        <ListEntryFormContainer
          inputView={inputControlView}
          listName="redirections"
          selectorPath={Redirections.selectorPath}
          submitLabel="defineGoTo"
          noValueLabel="noGoToYet"
        />
      </div>
    );
  }
}

export default Redirections;
