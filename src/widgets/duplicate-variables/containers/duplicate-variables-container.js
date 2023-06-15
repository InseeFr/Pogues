import { connect } from 'react-redux';

import { questionnaireDuplicateVariables } from '../utils/duplicate-variables-utils';
import { DuplicateVariables } from '../components/duplicate-variables';

const mapStateToProps = state => {
  return {
    questionnaireDuplicateVariables: questionnaireDuplicateVariables(
      state.appState.collectedVariableByQuestion,
      state.appState.activeExternalVariablesById,
      state.appState.activeCalculatedVariablesById,
      state.appState.activeQuestionnaire,
      state.metadataByType.externalQuestionnairesVariables,
      state.appState.activeComponentsById,
    ),
  };
};

const DuplicateVariablesContainer =
  connect(mapStateToProps)(DuplicateVariables);

export default DuplicateVariablesContainer;
