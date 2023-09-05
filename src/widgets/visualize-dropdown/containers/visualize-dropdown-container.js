import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisualizeDropdown from '../components/visualize-dropdown';

const mapStateToProps = state => {
  return {
    questionnaire: state.appState.activeQuestionnaire,
    components: state.appState.activeComponentById,
    calculatedVariables: state.appState.activeCalculatedVariablesById,
    externalVariables: state.appState.activeExternalVariablesById,
    collectedVariableByQuestion: state.appState.collectedVariableByQuestion,
    externalQuestionnairesVariables:
      state.metadataByType.externalQuestionnairesVariables,
  };
};

const PageQuestionnaireContainer = connect(mapStateToProps)(VisualizeDropdown);

PageQuestionnaireContainer.propTypes = {
  questionnaireId: PropTypes.string,
};
PageQuestionnaireContainer.defaultProps = {
  questionnaireId: undefined,
};

export default PageQuestionnaireContainer;
