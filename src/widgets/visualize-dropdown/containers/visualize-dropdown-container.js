import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisualizeDropdown from '../components/visualize-dropdown';

const mapStateToProps = state => {
  return {
    questionnaire: state.appState.activeQuestionnaire,
    calculatedVariables: state.appState.activeCalculatedVariablesById,
    externalVariables: state.appState.activeExternalVariablesById,
    collectedVariableByQuestion: state.appState.collectedVariableByQuestion,
    externalQuestionnairesVariables:
      state.metadataByType.externalQuestionnairesVariables,
  };
};

const VisualizeDropdownContainer = connect(mapStateToProps)(VisualizeDropdown);

VisualizeDropdownContainer.propTypes = {
  questionnaireId: PropTypes.string,
};
VisualizeDropdownContainer.defaultProps = {
  questionnaireId: undefined,
};

export default VisualizeDropdownContainer;
