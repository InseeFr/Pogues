import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, getFormSubmitErrors } from 'redux-form';
import _ from 'lodash';

import { updateComponent } from 'actions/component';
import { setInvalidItemsFromErrors, setTabErrors, clearTabErrors } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
// import { getCurrentCodesListsIdsStore } from 'utils/model/state-to-form-utils';
import { getActiveCodesListsStore } from 'utils/model/form-to-state-utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import CollectedVariableTransformerFactory from 'utils/transformation-entities/collected-variable';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { getValidationErrors, getErrorsObject } from 'utils/component/component-utils';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = (state, { componentId }) => ({
  activeComponentsStore: state.appState.activeComponentsById,
  activeCodesListsStore: state.appState.activeCodeListsById,
  activeCalculatedVariablesStore: state.appState.activeCalculatedVariablesById,
  activeExternalVariablesStore: state.appState.activeExternalVariablesById,
  currentCodesListsIdsStore: state.appState.codeListsByActiveQuestion,
  activeCollectedVariablesStore: state.appState.collectedVariableByQuestion[componentId],
  errorsValidation: getFormSubmitErrors('component')(state),
  errorsByQuestionTab: state.appState.errorsByQuestionTab,
  invalidItems: state.appState.invalidItemsByActiveQuestion,
});

const mapDispatchToProps = {
  updateComponent,
  setTabErrors,
  clearTabErrors,
  // setCurrentCodesListsInQuestion,
  setInvalidItemsFromErrors,
};

class ComponentEditContainer extends Component {
  static propTypes = {
    updateComponent: PropTypes.func.isRequired,
    setTabErrors: PropTypes.func.isRequired,
    clearTabErrors: PropTypes.func.isRequired,
    // setCurrentCodesListsInQuestion: PropTypes.func.isRequired,
    componentId: PropTypes.string.isRequired,
    activeComponentsStore: PropTypes.object.isRequired,
    activeCodesListsStore: PropTypes.object.isRequired,
    activeCalculatedVariablesStore: PropTypes.object,
    activeExternalVariablesStore: PropTypes.object,
    activeCollectedVariablesStore: PropTypes.object,
    errorsValidation: PropTypes.object,
    errorsByQuestionTab: PropTypes.object,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    currentCodesListsIdsStore: PropTypes.object,
    invalidItems: PropTypes.object,
    setInvalidItemsFromErrors: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    currentCodesListsIdsStore: {},
    invalidItems: {},
    activeCalculatedVariablesStore: {},
    activeExternalVariablesStore: {},
    activeCollectedVariablesStore: {},
    errorsValidation: {},
    errorsByQuestionTab: {},
  };

  // componentWillMount() {
  //   const {
  //     activeComponentsStore,
  //     componentId,
  //     // setCurrentCodesListsInQuestion,
  //     // setInvalidItemsFromErrors,
  //   } = this.props;
  //   // const component = activeComponentsStore[componentId];
  //   // let currentCodesListsStoreFromQuestion = {};
  //
  //   // setInvalidItemsFromErrors(componentId);
  //
  //   // if (component.type === QUESTION) {
  //   //   currentCodesListsStoreFromQuestion = getCurrentCodesListsIdsStore(component.responseFormat);
  //   // }
  //
  //   // setCurrentCodesListsInQuestion(currentCodesListsStoreFromQuestion);
  // }

  componentWillMount() {
    this.props.clearTabErrors();
    this.props.setInvalidItemsFromErrors(this.props.componentId);
  }

  componentWillUpdate(nextProps) {
    if (
      !_.isEqual(this.props.errorsValidation, nextProps.errorsValidation) ||
      !_.isEqual(this.props.invalidItems, nextProps.invalidItems)
    ) {
      this.props.setTabErrors(nextProps.errorsValidation, nextProps.invalidItems);
    }
  }

  render() {
    const {
      componentId,
      activeComponentsStore,
      activeCodesListsStore,
      activeCalculatedVariablesStore,
      activeExternalVariablesStore,
      activeCollectedVariablesStore,
      errorsByQuestionTab,
      onSuccess,
      onCancel,
      currentCodesListsIdsStore,
      invalidItems,
    } = this.props;
    const componentType = activeComponentsStore[componentId].type;
    const componentTransformer = ComponentTransformerFactory({
      initialStore: activeComponentsStore,
      codesListsStore: activeCodesListsStore,
      calculatedVariablesStore: activeCalculatedVariablesStore,
      externalVariablesStore: activeExternalVariablesStore,
      collectedVariablesStore: activeCollectedVariablesStore,
      currentCodesListsIdsStore,
    });
    const initialValues = componentTransformer.stateToForm({
      id: componentId,
    });
    const submit = values => {
      let updatedCalculatedVariablesStore = {};
      let updatedExternalVariablesStore = {};
      let updatedCollectedlVariablesStore = {};
      let updatedCodesListsStore = {};

      if (componentType === QUESTION) {
        const validationErrors = getValidationErrors(values, activeCodesListsStore);
        if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));
      }

      const updatedComponentsStore = componentTransformer.formToStore(values, componentId);

      if (componentType === QUESTION) {
        updatedCodesListsStore = getActiveCodesListsStore(updatedComponentsStore[componentId].responseFormat);
        updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(
          values.calculatedVariables
        );
        updatedExternalVariablesStore = ExternalVariableTransformerFactory().formToStore(values.externalVariables);
        updatedCollectedlVariablesStore = CollectedVariableTransformerFactory().formToStore(values.collectedVariables);
      }

      this.props.updateComponent(
        componentId,
        updatedComponentsStore,
        updatedCalculatedVariablesStore,
        updatedExternalVariablesStore,
        updatedCollectedlVariablesStore,
        updatedCodesListsStore
      );
      if (onSuccess) onSuccess();
    };

    return (
      <ComponentNewEdit
        type={componentType}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
        invalidItems={invalidItems}
        errorsByQuestionTab={errorsByQuestionTab}
        edit
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
