import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import { TextAreaWithVariableAutoCompletion } from 'hoc/withCurrentFormVariables';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { redirectionsFormDefault } from 'utils/transformation-entities/redirection';
import TreeSelectGotoContainer from 'layout/connected-widget/tree-select-goto';
import { getComponentsTargetsByComponent, getComponentsTargetsByPosition } from 'utils/model/redirections-utils';

function mapStateToProps(state, { formName }) {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    componentsStore: state.appState.activeComponentsById,
    selectedComponentId: state.appState.selectedComponentId,
    selectedGoto: selector(state, 'redirections.id'),
    selectedTarget: selector(state, 'redirections.cible'),
  };
}

function getListTargets(componentsStore, componentId, componentType, selectedComponentId, selectedTarget) {
  const component = componentsStore[componentId];
  let notDisabledComponentsIds;

  if (component) {
    // When the component is a new one.
    notDisabledComponentsIds = getComponentsTargetsByComponent(componentsStore, component);
  } else {
    // When the component is been edited.
    notDisabledComponentsIds = getComponentsTargetsByPosition(componentsStore, componentType, selectedComponentId);
  }

  if (
    selectedTarget !== '' &&
    componentsStore[selectedTarget] &&
    notDisabledComponentsIds.indexOf(selectedTarget) === -1
  ) {
    notDisabledComponentsIds.unshift(selectedTarget);
  }

  return notDisabledComponentsIds.map(key => {
    return {
      value: key,
      label: `${componentsStore[key].name} - ${componentsStore[key].label}`,
    };
  });
}

function validationRedirections(selectedGoto, componentsStore, invalidItems) {
  return function(values) {
    const { label, condition, cible } = values;
    const errors = [];
    let errorEarlierTarget;
    let errorNotFoundTarget;

    if (invalidItems[selectedGoto]) {
      if (invalidItems[selectedGoto].code === 'TARGET_EARLIER') {
        errorEarlierTarget = invalidItems[selectedGoto];
      } else {
        errorNotFoundTarget = invalidItems[selectedGoto];
      }
    }

    if (label === '') errors.push(Dictionary.validation_goTo_label);
    if (condition === '') errors.push(Dictionary.validation_condition);
    if (cible === '') errors.push(Dictionary.validation_target);
    if (errorEarlierTarget && errorEarlierTarget.targetId === cible)
      errors.push(Dictionary[errorEarlierTarget.messageKey]);
    if (errorNotFoundTarget && !componentsStore[cible]) errors.push(Dictionary[errorNotFoundTarget.messageKey]);

    return errors;
  };
}

function InputRedirection({ listTargets }) {
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

      <TreeSelectGotoContainer listTargets={listTargets} />
    </div>
  );
}

InputRedirection.propTypes = {
  listTargets: PropTypes.array.isRequired,
};

class Redirections extends Component {
  static selectorPath = 'redirections';
  static propTypes = {
    componentsStore: PropTypes.object,
    selectedComponentId: PropTypes.string,
    selectedGoto: PropTypes.string,
    selectedTarget: PropTypes.string,
    componentId: PropTypes.string,
    componentType: PropTypes.string,
    invalidItems: PropTypes.object,
  };
  static defaultProps = {
    componentsStore: {},
    selectedComponentId: '',
    selectedGoto: '',
    selectedTarget: '',
    invalidItems: {},
    componentId: '',
    componentType: '',
  };

  render() {
    const { redirections, ...initialInputValues } = redirectionsFormDefault;
    const {
      componentsStore,
      componentId,
      componentType,
      selectedComponentId,
      selectedGoto,
      selectedTarget,
      invalidItems,
    } = this.props;
    const listTargets = getListTargets(
      componentsStore,
      componentId,
      componentType,
      selectedComponentId,
      selectedTarget
    );
    const inputControlView = <InputRedirection listTargets={listTargets} />;

    return (
      <FormSection name={Redirections.selectorPath} className="redirections">
        <ListEntryFormContainer
          inputView={inputControlView}
          initialInputValues={initialInputValues}
          selectorPath={Redirections.selectorPath}
          validationInput={validationRedirections(selectedGoto, componentsStore, invalidItems)}
          listName="redirections"
          submitLabel="reset"
          noValueLabel="noGoToYet"
          invalidItems={invalidItems}
        />
      </FormSection>
    );
  }
}

// export default Redirections;
export default connect(mapStateToProps)(Redirections);
