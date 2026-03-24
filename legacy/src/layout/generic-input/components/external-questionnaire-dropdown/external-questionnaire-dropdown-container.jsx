import { connect } from 'react-redux';

import ExternalQuestionnaireDropdown from './external-questionnaire-dropdown';

const mapStateToProps = (state) => ({
  questionnaireId: state.appState.activeQuestionnaire.id,
});

const ExternalQuestionnaireDropdownContainer = connect(mapStateToProps)(
  ExternalQuestionnaireDropdown,
);

export default ExternalQuestionnaireDropdownContainer;
