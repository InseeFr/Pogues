import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireListComponents from '../components/questionnaire-list-components';

import {
  setEditingComponentId,
  setSelectedComponentId,
} from '../../../actions/app-state';
import {
  dragComponent,
  duplicateComponentAndVariables,
  removeComponent,
} from '../../../actions/component';
import { removeQuestionnaireRef } from '../../../actions/external-questionnaire';
import { removeQuestionnaire } from '../../../actions/questionnaire';

const mapStateToProps = state => ({
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
  dragComponent,
};

const QuestionnaireListComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireListComponents);

QuestionnaireListComponentsContainer.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default QuestionnaireListComponentsContainer;
