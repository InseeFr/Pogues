import { connect } from 'react-redux';

import { loadQuestionnaireVersion } from '../../../actions/app-state';
import Versions from '../components/Versions';

const mapStateToProps = (state) => ({
  isQuestionnaireModified: state.appState.isQuestionnaireModified,
  questionnaire: state.appState.activeQuestionnaire,
});
const mapDispatchToProps = {
  loadQuestionnaireVersion,
};

const QuestionnaireListComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Versions);

export default QuestionnaireListComponentsContainer;
