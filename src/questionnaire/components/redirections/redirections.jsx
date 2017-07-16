import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';

function InputRedirection(props) {
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
class Redirections extends React.Component {
  static selectorPath = 'AXISREDIRECTIONS';

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
      ? `${selectorPathParent}.${Redirections.selectorPath}`
      : Redirections.selectorPath;
  }

  render() {
    const inputControlView = <InputRedirection selectorPath={this.selectorPathComposed} />;

    return (
      <FormSection name={Redirections.selectorPath}>
        <ListEntryFormContainer
          inputView={inputControlView}
          listName="redirections"
          selectorPath={this.selectorPathComposed}
          submitLabel="defineGoTo"
          noValueLabel="noGoToYet"
        />
      </FormSection>
    );
  }
}

export default Redirections;
