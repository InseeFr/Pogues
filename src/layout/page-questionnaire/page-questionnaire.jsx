import { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { AuthContext } from '@/auth/context';

import { GenericInput } from '../generic-input';
import Loader from '../loader';
import LoaderError from '../loader-error';
import { QuestionnaireListComponents } from '../questionnaire-list-components';
import { QuestionnaireNav } from '../questionnaire-nav';

// Prop types and default props

export const propTypes = {
  id: PropTypes.string.isRequired,
  versionId: PropTypes.string,
  loadQuestionnaire: PropTypes.func.isRequired,
  loadQuestionnaireWithVersion: PropTypes.func.isRequired,
  loadStatisticalContext: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  setActiveQuestionnaire: PropTypes.func.isRequired,
  setActiveComponents: PropTypes.func.isRequired,
  setActiveCodeLists: PropTypes.func.isRequired,
  setActiveVariables: PropTypes.func.isRequired,
  questionnaire: PropTypes.shape({
    id: PropTypes.string,
  }),
  components: PropTypes.object,
  activeQuestionnaire: PropTypes.object,
  codeLists: PropTypes.object,
  calculatedVariables: PropTypes.object,
  externalVariables: PropTypes.object,
  collectedVariablesByQuestion: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export const defaultProps = {
  versionId: '',
  questionnaire: {},
  activeQuestionnaire: {},
  components: {},
  codeLists: {},
  calculatedVariables: {},
  externalVariables: {},
  collectedVariablesByQuestion: {},
};

const PageQuestionnaire = (props) => {
  const {
    id,
    versionId,
    questionnaire,
    components,
    codeLists,
    calculatedVariables,
    externalVariables,
    collectedVariablesByQuestion,
    loading,
    loadingError,
    loadQuestionnaire,
    loadQuestionnaireWithVersion,
    setActiveQuestionnaire,
    loadStatisticalContext,
    setActiveComponents,
    setActiveCodeLists,
    setActiveVariables,
    loadExternalQuestionnairesIfNeeded,
    history,
    appState,
  } = props;

  const [toInitialize, setToInitialize] = useState(false);

  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      const accessToken = await getAccessToken();
      if (versionId) {
        loadQuestionnaireWithVersion(id, versionId, accessToken);
      } else {
        loadQuestionnaire(id, accessToken);
      }
      setToInitialize(true);
    };

    if (!questionnaire || questionnaire.id !== id) load();
  }, [id, questionnaire?.id, versionId]);

  useEffect(() => {
    const load = async () => {
      const accessToken = await getAccessToken();
      const idCampaign =
        questionnaire.campaigns[questionnaire.campaigns.length - 1];
      setActiveQuestionnaire(questionnaire);
      loadStatisticalContext(idCampaign, accessToken);
      setActiveComponents(components);
      setActiveCodeLists(codeLists);
      setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
      setToInitialize(false);
    };

    if (toInitialize && questionnaire) {
      load();
    }
  }, [toInitialize, questionnaire?.id]);

  useEffect(() => {
    const loadExternalQuestionnairesIfNeededWithToken = async (ref) => {
      const accessToken = await getAccessToken();
      loadExternalQuestionnairesIfNeeded(ref, accessToken);
    };
    if (
      appState.activeQuestionnaire.childQuestionnaireRef &&
      appState.activeQuestionnaire.childQuestionnaireRef.length !== 0
    ) {
      appState.activeQuestionnaire.childQuestionnaireRef.map((ref) =>
        loadExternalQuestionnairesIfNeededWithToken(ref),
      );
    }
  }, [
    appState.activeQuestionnaire.childQuestionnaireRef,
    loadExternalQuestionnairesIfNeeded,
    getAccessToken,
  ]);

  return (
    <div id="page-questionnaire">
      {loadingError ? (
        <div>
          <QuestionnaireNav />
          <LoaderError message={loadingError} />
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <div>
          <GenericInput />
          <div className="questionnaire-content">
            <QuestionnaireNav />
            <QuestionnaireListComponents navigate={history.push} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageQuestionnaire;
