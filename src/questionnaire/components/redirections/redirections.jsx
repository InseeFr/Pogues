import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, FormSection } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import { TextAreaWithVariableAutoCompletion } from 'hoc/withCurrentFormVariables';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { redirectionsFormDefault } from 'utils/transformation-entities/redirection';
import TreeSelectGotoContainer from 'layout/connected-widget/tree-select-goto';

function validationRedirections(values) {
  const { label, condition, cible } = values;
  const errors = [];

  if (label === '') errors.push(Dictionary.validation_goTo_label);
  if (condition === '') errors.push(Dictionary.validation_condition);
  if (cible === '-1' || cible === '') errors.push(Dictionary.validation_target);

  return errors;
}

function InputRedirection({ componentId, componentType }) {
  return (
    <div>
      <Field type="text" name="label" id="redirection_text" component={Input} label={Dictionary.goTo_label} required />
      <Field
        type="text"
        name="condition"
        id="redirection_condition"
        component={TextAreaWithVariableAutoCompletion}
        label={Dictionary.expression}
        help
        required
      />

      <TreeSelectGotoContainer componentId={componentId} componentType={componentType} />
    </div>
  );
}

InputRedirection.propTypes = {
  componentId: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
};

class Redirections extends Component {
  static selectorPath = 'redirections';
  static propTypes = {
    componentId: PropTypes.string,
    componentType: PropTypes.string,
    invalidItems: PropTypes.object,
  };
  static defaultProps = {
    invalidItems: {},
    componentId: '',
    componentType: '',
  };

  render() {
    const { componentId, componentType, invalidItems } = this.props;
    const { redirections, ...initialInputValues } = redirectionsFormDefault;

    const inputControlView = <InputRedirection componentId={componentId} componentType={componentType} />;
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
