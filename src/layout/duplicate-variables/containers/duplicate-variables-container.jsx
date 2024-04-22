import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DuplicateVariables } from '../components/duplicate-variables';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => {
  return {
    id,
    collectedVariableByQuestion: state.appState.collectedVariableByQuestion ?? {
      questions: state.collectedVariableByQuestionnaire[id],
    },
    activeExternalVariablesById:
      state.appState.activeExternalVariablesById ??
      state.externalVariablesByQuestionnaire[id],
    activeCalculatedVariablesById:
      state.appState.activeCalculatedVariablesById ??
      state.calculatedVariableByQuestionnaire[id],
    activeQuestionnaire:
      state.appState.activeQuestionnaire ?? state.questionnaire[id],
    externalQuestionnairesVariables:
      state.metadataByType.externalQuestionnairesVariables ?? {},
    activeComponentsById: state.appState.activeComponentsById,
  };
};

const DuplicateVariablesContainer =
  connect(mapStateToProps)(DuplicateVariables);

DuplicateVariablesContainer.propTypes = propTypes;

export default DuplicateVariablesContainer;
