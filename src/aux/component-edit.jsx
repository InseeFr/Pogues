import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, getFormSubmitErrors } from 'redux-form';
import isEqual from 'lodash.isequal';

import ComponentFactory from '../../components/component/model/component';

import { updateComponent } from 'actions/component';
import { setInvalidItemsFromErrors, setTabErrors, clearTabErrors } from 'actions/app-state';
import ComponentNewEdit from '../../components/component/component-new-edit';
import { getComponentValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';

const mapStateToProps = (state, { componentId }) => ({
  componentsStore: state.appState.activeComponentsById,
  codesListsStore: state.appState.activeCodeListsById,
  calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
  externalVariablesStore: state.appState.activeExternalVariablesById,
  collectedVariablesStore: state.appState.collectedVariableByQuestion[componentId],
  errorsValidation: getFormSubmitErrors('component')(state),
  errorsByQuestionTab: state.appState.errorsByQuestionTab,
  invalidItems: state.appState.invalidItemsByActiveQuestion,
});

const mapDispatchToProps = {
  updateComponent,
  setTabErrors,
  clearTabErrors,
  setInvalidItemsFromErrors,
};

class ComponentEditContainer extends Component {
  static propTypes = {
    updateComponent: PropTypes.func.isRequired,
    setTabErrors: PropTypes.func.isRequired,
    clearTabErrors: PropTypes.func.isRequired,
    componentId: PropTypes.string.isRequired,
    componentsStore: PropTypes.object.isRequired,
    codesListsStore: PropTypes.object.isRequired,
    calculatedVariablesStore: PropTypes.object,
    externalVariablesStore: PropTypes.object,
    collectedVariablesStore: PropTypes.object,
    errorsValidation: PropTypes.object,
    errorsByQuestionTab: PropTypes.object,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    invalidItems: PropTypes.object,
    setInvalidItemsFromErrors: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    invalidItems: {},
    calculatedVariablesStore: {},
    externalVariablesStore: {},
    collectedVariablesStore: {},
    errorsValidation: {},
    errorsByQuestionTab: {},
  };

  componentWillMount() {
    this.props.clearTabErrors();
    this.props.setInvalidItemsFromErrors(this.props.componentId);
  }

  componentWillUpdate(nextProps) {
    if (
      !isEqual(this.props.errorsValidation, nextProps.errorsValidation) ||
      !isEqual(this.props.invalidItems, nextProps.invalidItems)
    ) {
      this.props.setTabErrors(nextProps.errorsValidation, nextProps.invalidItems);
    }
  }

  render() {
    const {
      componentId,
      componentsStore,
      codesListsStore,
      calculatedVariablesStore,
      externalVariablesStore,
      collectedVariablesStore,
      errorsByQuestionTab,
      onSuccess,
      onCancel,
      invalidItems,
    } = this.props;
    const componentType = componentsStore[componentId].type;
    const initialState = componentsStore[componentId];
    const stores = { codesListsStore, calculatedVariablesStore, externalVariablesStore, collectedVariablesStore };
    const componentTransformer = ComponentFactory(initialState, stores);
    const initialValues = componentTransformer.stateToForm();
    const submit = values => {
      const validationErrors = getComponentValidationErrors(values, codesListsStore);

      if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

      const updatedComponentsStore = componentTransformer.formToStore(values, componentId);
      const updatedCodesListsStore = componentTransformer.getCodesListStore();
      const updatedCalculatedVariablesStore = componentTransformer.getCalculatedVariablesStore();
      const updatedExternalVariablesStore = componentTransformer.getExternalVariablesStore();
      const updatedCollectedlVariablesStore = componentTransformer.getCollectedVariablesStore();

    };

    return (
      <ComponentNewEdit
        type={componentType}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
        invalidItems={invalidItems}
        errorsByQuestionTab={errorsByQuestionTab}
        componentId={componentId}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
