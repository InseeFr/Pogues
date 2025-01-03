import { connect } from 'react-redux';

import { loadQuestionnaireVersion } from '../../../actions/questionnaire';
import Versions from '../components/Versions';

const mapStateToProps = (state) => ({
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
