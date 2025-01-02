import { connect } from 'react-redux';

import Versions from '../components/Versions';

const mapStateToProps = (state) => ({
  questionnaire: state.appState.activeQuestionnaire,
});

const QuestionnaireListComponentsContainer = connect(mapStateToProps)(Versions);

export default QuestionnaireListComponentsContainer;
