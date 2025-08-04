import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useOidc } from '../../utils/oidc';
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

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  useEffect(() => {
    if (!questionnaire || questionnaire.id !== id) {
      if (versionId) {
        loadQuestionnaireWithVersion(id, versionId, token);
      } else {
        loadQuestionnaire(id, token);
      }
      setToInitialize(true);
    }
  }, [id, questionnaire?.id, versionId]);

  useEffect(() => {
    if (toInitialize && questionnaire) {
      const idCampaign =
        questionnaire.campaigns[questionnaire.campaigns.length - 1];
      setActiveQuestionnaire(questionnaire);
      loadStatisticalContext(idCampaign, token);
      setActiveComponents(components);
      setActiveCodeLists(codeLists);
      setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
      setToInitialize(false);
    }
  }, [toInitialize, questionnaire?.id]);

  useEffect(() => {
    if (
      appState.activeQuestionnaire.childQuestionnaireRef &&
      appState.activeQuestionnaire.childQuestionnaireRef.length !== 0
    ) {
      appState.activeQuestionnaire.childQuestionnaireRef.map((ref) =>
        loadExternalQuestionnairesIfNeeded(ref, token),
      );
    }
  }, [
    appState.activeQuestionnaire.childQuestionnaireRef,
    loadExternalQuestionnairesIfNeeded,
    token,
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
            <QuestionnaireListComponents
              navigate={history.push}
              token={token}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageQuestionnaire;
