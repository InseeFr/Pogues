import { connect } from 'react-redux';

import {
  setEditingComponentId,
  setSelectedComponentId,
} from '../../actions/app-state';
import { removeComponent } from '../../actions/component';
import QuestionnaireNav from './questionnaire-nav';

// Container

const mapStateToProps = (state) => ({
  questionnaire: state.appState.activeQuestionnaire,
  componentsStore: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
  editingComponentId: state.appState.editingComponentId,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  setEditingComponentId,
  removeComponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNav);
