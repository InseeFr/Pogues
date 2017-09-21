import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, actions, formValueSelector, getFormSubmitErrors } from 'redux-form';
import isEqual from 'lodash.isequal';

import { createComponent, orderComponents, updateParentChildren } from 'actions/component';
import { setSelectedComponentId, setTabErrors, clearTabErrors } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import CollectedVariableTransformerFactory from 'utils/transformation-entities/collected-variable';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { getValidationErrors, getErrorsObject } from 'utils/component/component-utils';
import { markdownToRaw } from 'layout/forms/controls/rich-textarea';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    currentCodesListsIdsStore: state.appState.codeListsByActiveQuestion,
    activeCodesListsStore: state.appState.activeCodeListsById,
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
    currentCodesListsIdsStore: PropTypes.object,
    activeCodesListsStore: PropTypes.object,
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
    currentCodesListsIdsStore: {},
    activeCodesListsStore: {},
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
      const rawName = type === QUESTION ? markdownToRaw(currentLabel || '').blocks[0].text : currentLabel;
      const name = rawName.replace(/[^a-z0-9_]/gi, '').toUpperCase().slice(0, 10);
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
      currentCodesListsIdsStore,
      activeCodesListsStore,
      errorsByQuestionTab,
    } = this.props;
    const componentTransformer = ComponentTransformerFactory({
      calculatedVariablesStore,
      externalVariablesStore,
      currentCodesListsIdsStore,
      codesListsStore: activeCodesListsStore,
    });
    const initialValues = componentTransformer.stateToForm({ type });
    const submit = values => {
      let updatedCalculatedVariablesStore = {};
      let updatedExternalVariablesStore = {};
      let updatedCodesListsStore = {};
      let updatedCollectedlVariablesStore = {};

      if (type === QUESTION) {
        const validationErrors = getValidationErrors(values, activeCodesListsStore);
        if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));
      }

      const componentState = componentTransformer.formToState(values, { parent: parentId, weight, type });

      if (type === QUESTION) {
        updatedCodesListsStore = CodesListTransformerFactory({
          initialComponentState: componentState.responseFormat,
        }).formToStore(values.responseFormat);

        updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(
          values.calculatedVariables
        );
        updatedExternalVariablesStore = ExternalVariableTransformerFactory().formToStore(values.externalVariables);
        updatedCollectedlVariablesStore = CollectedVariableTransformerFactory().formToStore(values.collectedVariables);
      }

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
