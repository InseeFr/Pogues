import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  loadStatisticalContext,
  setActiveCodeLists,
  setActiveComponents,
  setActiveQuestionnaire,
  setActiveVariables,
} from '../../actions/app-state';
import {
  loadCampaignsIfNeeded,
  loadExternalQuestionnairesIfNeeded,
} from '../../actions/metadata';
import {
  loadQuestionnaire,
  loadQuestionnaireWithVersion,
} from '../../actions/questionnaire';
import { getCollectedVariablesByQuestion } from '../../utils/variables/collected-variables-utils';
import PageQuestionnaire from './page-questionnaire';

// Prop types and default props

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  history: PropTypes.object.isRequired,
};

// Container

const mapStateToProps = (
  state,
  {
    match: {
      params: { id, versionId },
    },
  },
) => {
  return {
    id,
    versionId,
    appState: state.appState,
    questionnaire: state.questionnaireById[id],
    activeQuestionnaire: state.appState.activeQuestionnaire,
    components: state.componentByQuestionnaire[id],
    codeLists: state.codeListByQuestionnaire[id],
    calculatedVariables: state.calculatedVariableByQuestionnaire[id],
    externalVariables: state.externalVariableByQuestionnaire[id],
    collectedVariablesByQuestion: getCollectedVariablesByQuestion(
      state.componentByQuestionnaire[id],
      state.collectedVariableByQuestionnaire[id],
    ),
    loading: state.questionnaireById.loader,
    loadingError: state.questionnaireById.loadingError,
  };
};

const mapDispatchToProps = {
  loadCampaignsIfNeeded,
  loadExternalQuestionnairesIfNeeded,
  loadStatisticalContext,
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
  setActiveVariables,
  loadQuestionnaire,
  loadQuestionnaireWithVersion,
};

const PageQuestionnaireContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageQuestionnaire);

PageQuestionnaireContainer.propTypes = propTypes;

export default PageQuestionnaireContainer;
