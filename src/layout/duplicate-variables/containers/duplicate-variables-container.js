import { connect } from 'react-redux';
import { DuplicateVariables } from '../components/duplicate-variables';

const mapStateToProps = state => {
  return {
    collectedVariableById:
      state.collectedVariableByQuestionnaire[
        state.appState.activeQuestionnaire.id
      ],
    activeExternalVariablesById: state.appState.activeExternalVariablesById,
    activeCalculatedVariablesById: state.appState.activeCalculatedVariablesById,
    activeQuestionnaire: state.appState.activeQuestionnaire,
    externalQuestionnairesVariables:
      state.metadataByType.externalQuestionnairesVariables ?? {},
    activeComponentsById: state.appState.activeComponentsById,
  };
};

const DuplicateVariablesContainer =
  connect(mapStateToProps)(DuplicateVariables);

export default DuplicateVariablesContainer;
