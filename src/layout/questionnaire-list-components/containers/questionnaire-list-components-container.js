import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestionnaireListComponents from '../components/questionnaire-list-components';

import { dragComponent, removeComponent, duplicateComponent } from 'actions/component';
import { setSelectedComponentId, setEditingComponentId, visualizeActiveQuestionnaire } from 'actions/app-state';
import { removeQuestionnaire } from 'actions/questionnaire';

// Prop types and default props

const propTypes = {
  navigate: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  componentsStore: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
  editingComponentId: state.appState.editingComponentId,
  errorsByComponent: state.errors.errorsByComponent,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  setEditingComponentId,
  removeComponent,
  duplicateComponent,
  removeQuestionnaire,
  visualizeActiveQuestionnaire,
  dragComponent,
};

const QuestionnaireListComponentsContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireListComponents);

QuestionnaireListComponentsContainer.propTypes = propTypes;

export default QuestionnaireListComponentsContainer;
