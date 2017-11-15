import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, actions, formValueSelector, getFormSubmitErrors } from 'redux-form';
import isEqual from 'lodash.isequal';

import ComponentFactory from '../../components/component/model/component';

import { createComponent, orderComponents, updateParentChildren } from 'actions/component';
import { setSelectedComponentId, setTabErrors, clearTabErrors } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { getComponentValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';
import { markdownVtlToString } from 'forms/controls/rich-textarea';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    codesListsStore: state.appState.activeCodeListsById,
    errorsValidation: getFormSubmitErrors('component')(state),
    errorsByQuestionTab: state.appState.errorsByQuestionTab,
    currentLabel: selector(state, 'label'),
    currentName: selector(state, 'name'),
  };
};

const mapDispatchToProps = {
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
  setTabErrors,
  clearTabErrors,
  change: actions.change,
};

class ComponentNewContainer extends Component {
  static propTypes = {
    createComponent: PropTypes.func.isRequired,
    orderComponents: PropTypes.func.isRequired,
    updateParentChildren: PropTypes.func.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    setTabErrors: PropTypes.func.isRequired,
    clearTabErrors: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    weight: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    calculatedVariablesStore: PropTypes.object,
    externalVariablesStore: PropTypes.object,
    codesListsStore: PropTypes.object,
    errorsValidation: PropTypes.object,
    errorsByQuestionTab: PropTypes.object,
    currentLabel: PropTypes.string,
    currentName: PropTypes.string,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    calculatedVariablesStore: {},
    externalVariablesStore: {},
    codesListsStore: {},
    errorsValidation: {},
    errorsByQuestionTab: {},
    currentLabel: '',
    currentName: '',
  };

  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
  }

  componentWillMount() {
    this.props.clearTabErrors();
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props.errorsValidation, nextProps.errorsValidation)) {
      this.props.setTabErrors(nextProps.errorsValidation);
    }
  }

  updateName() {
    const { type, currentLabel, currentName, change } = this.props;

    if (currentName === '') {
      const rawName = type === QUESTION ? markdownVtlToString(currentLabel || '') : currentLabel;
      const name = rawName
        .replace(/[^a-z0-9_]/gi, '')
        .toUpperCase()
        .slice(0, 10);
      change('component', 'name', name);
    }
  }

  render() {
    const {
      parentId,
      weight,
      type,
      onSuccess,
      onCancel,
      calculatedVariablesStore,
      externalVariablesStore,
      codesListsStore,
      errorsByQuestionTab,
    } = this.props;

    const initialState = { type, parent: parentId, weight };
    const stores = { calculatedVariablesStore, externalVariablesStore, codesListsStore };
    const componentTransformer = ComponentFactory(initialState, stores);
    const initialValues = componentTransformer.stateToForm();
    const submit = values => {
      const validationErrors = getComponentValidationErrors(values, codesListsStore);

      if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

      const componentState = componentTransformer.formToState(values);
      const updatedCodesListsStore = componentTransformer.getCodesListStore();
      const updatedCalculatedVariablesStore = componentTransformer.getCalculatedVariablesStore();
      const updatedExternalVariablesStore = componentTransformer.getExternalVariablesStore();
      const updatedCollectedlVariablesStore = componentTransformer.getCollectedVariablesStore();

      this.props
        .createComponent(
          componentState,
          updatedCalculatedVariablesStore,
          updatedExternalVariablesStore,
          updatedCollectedlVariablesStore,
          updatedCodesListsStore
        )
        .then(this.props.updateParentChildren)
        .then(this.props.orderComponents)
        .then(result => {
          const { payload: { id } } = result;
          this.props.setSelectedComponentId(id);
          if (onSuccess) onSuccess(id);
        });
    };

    return (
      <ComponentNewEdit
        type={type}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
        errorsByQuestionTab={errorsByQuestionTab}
        updateName={this.updateName}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNewContainer);
