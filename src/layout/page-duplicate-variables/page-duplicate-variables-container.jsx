import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PageDuplicateVariables } from './page-duplicate-variables';

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

const PageDuplicateVariablesContainer = connect(mapStateToProps)(
  PageDuplicateVariables,
);

PageDuplicateVariablesContainer.propTypes = propTypes;

export default PageDuplicateVariablesContainer;
