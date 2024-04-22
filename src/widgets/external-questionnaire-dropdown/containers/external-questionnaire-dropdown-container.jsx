import { connect } from 'react-redux';

import ExternalQuestionnaireDropdown from '../components/external-questionnaire-dropdown';

const mapStateToProps = state => ({
  questionnaireId: state.appState.activeQuestionnaire.id,
});

const ExternalQuestionnaireDropdownContainer = connect(mapStateToProps)(
  ExternalQuestionnaireDropdown,
);

export default ExternalQuestionnaireDropdownContainer;
