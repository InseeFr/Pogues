import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setEditingComponentId,
  setSelectedComponentId,
} from '../../actions/app-state';
import {
  dragComponent,
  duplicateComponentAndVariables,
  removeComponent,
} from '../../actions/component';
import { removeQuestionnaireRef } from '../../actions/external-questionnaire';
import {
  duplicateQuestionnaire,
  removeQuestionnaire,
} from '../../actions/questionnaire';
import QuestionnaireListComponents from './questionnaire-list-components';

const mapStateToProps = (state) => ({
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
  duplicateQuestionnaire,
  removeQuestionnaire,
  dragComponent,
};

const QuestionnaireListComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireListComponents);

QuestionnaireListComponentsContainer.propTypes = {
  token: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

export default QuestionnaireListComponentsContainer;
