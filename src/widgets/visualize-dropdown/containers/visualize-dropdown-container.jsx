import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisualizeDropdown from '../components/visualize-dropdown';
import { visualizeActiveQuestionnaire } from '../../../actions/app-state';

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

const mapDispatchToProps = {
  visualizeActiveQuestionnaire,
};
const VisualizeDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisualizeDropdown);

VisualizeDropdownContainer.propTypes = {
  questionnaireId: PropTypes.string,
};
VisualizeDropdownContainer.defaultProps = {
  questionnaireId: undefined,
};

export default VisualizeDropdownContainer;
