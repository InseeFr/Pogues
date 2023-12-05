import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestionnaireListComponents from '../components/questionnaire-list-components';

import {
  dragComponent,
  removeComponent,
  duplicateComponentAndVariables,
} from 'actions/component';
import { removeQuestionnaireRef } from 'actions/external-questionnaire';
import {
  setSelectedComponentId,
  setEditingComponentId,
  visualizeActiveQuestionnaire,
} from 'actions/app-state';
import { removeQuestionnaire } from 'actions/questionnaire';
import { getToken } from 'reducers/selectors';

// Prop types and default props

const propTypes = {
  navigate: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => ({
  token: getToken(state),
  questionnaire: state.appState.activeQuestionnaire,
  componentsStore: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
  editingComponentId: state.appState.editingComponentId,
  errorsIntegrity: state.errors.errorsIntegrity,
  activeCalculatedVariables: state.appState.activeCalculatedVariablesById,
  calculatedVariables: state.calculatedVariableByQuestionnaire,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  setEditingComponentId,
  removeComponent,
  removeQuestionnaireRef,
  duplicateComponentAndVariables,
  removeQuestionnaire,
  visualizeActiveQuestionnaire,
  dragComponent,
};

const QuestionnaireListComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireListComponents);

QuestionnaireListComponentsContainer.propTypes = propTypes;

export default QuestionnaireListComponentsContainer;
