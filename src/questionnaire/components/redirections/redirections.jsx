import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, FormSection } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultRedirectionForm } from 'utils/transformation-entities/redirection';
import GotoSelectContainer from 'layout/connected-widget/goto-select';

function validationRedirections(values) {
  const { label, condition, cible } = values;
  const errors = [];

  if (label === '') errors.push(Dictionary.validation_goTo_label);
  if (condition === '') errors.push(Dictionary.validation_condition);
  if (cible === '') errors.push(Dictionary.validation_target);

  return errors;
}

function InputRedirection({ componentType, isNewComponent }) {
  return (
    <div>
      <Field type="text" name="label" id="redirection_text" component={Input} label={Dictionary.goTo_label} required />
      <Field
        type="text"
        name="condition"
        id="redirection_condition"
        component={Textarea}
        label={Dictionary.expression}
        help
        required
      />

      <GotoSelectContainer componentType={componentType} isNewComponent={isNewComponent} />
    </div>
  );
}

InputRedirection.propTypes = {
  componentType: PropTypes.string.isRequired,
  isNewComponent: PropTypes.bool.isRequired,
};

class Redirections extends Component {
  static selectorPath = 'redirections';
  static propTypes = {
    componentType: PropTypes.string.isRequired,
    isNewComponent: PropTypes.bool.isRequired,
    errors: PropTypes.array,
  };
  static defaultProps = {
    errors: [],
  };

  render() {
    const { componentType, isNewComponent, errors } = this.props;
    const { redirections, ...initialInputValues } = defaultRedirectionForm;
    const invalidItems = errors.map(e => e.params.redirectionId);

    const inputControlView = <InputRedirection componentType={componentType} isNewComponent={isNewComponent} />;

    return (
      <FormSection name={Redirections.selectorPath} className="redirections">
        <ListEntryFormContainer
          inputView={inputControlView}
          initialInputValues={initialInputValues}
          selectorPath={Redirections.selectorPath}
          validationInput={validationRedirections}
          listName="redirections"
          submitLabel="defineGoTo"
          noValueLabel="noGoToYet"
          invalidItems={invalidItems}
        />
      </FormSection>
    );
  }
}

export default Redirections;
