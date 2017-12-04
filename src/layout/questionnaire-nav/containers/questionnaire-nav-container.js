import { connect } from 'react-redux';

import QuestionnaireNav from '../components/questionnaire-nav';

import { setSelectedComponentId } from 'actions/app-state';

// Container

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  componentsStore: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
});

const mapDispatchToProps = {
  setSelectedComponentId,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNav);
