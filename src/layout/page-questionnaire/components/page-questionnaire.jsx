import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'layout/loader';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
import { QuestionnaireListComponents } from 'layout/questionnaire-list-components';
import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { GenericInput } from 'layout/generic-input';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

// Prop types and default props

export const propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string,
  loadQuestionnaire: PropTypes.func.isRequired,
  loadStatisticalContext: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  setActiveQuestionnaire: PropTypes.func.isRequired,
  setActiveComponents: PropTypes.func.isRequired,
  setActiveCodeLists: PropTypes.func.isRequired,
  setActiveVariables: PropTypes.func.isRequired,
  questionnaire: PropTypes.object,
  components: PropTypes.object,
  activeQuestionnaire: PropTypes.object,
  codeLists: PropTypes.object,
  calculatedVariables: PropTypes.object,
  externalVariables: PropTypes.object,
  collectedVariablesByQuestion: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export const defaultProps = {
  token: '',
  questionnaire: {},
  activeQuestionnaire: {},
  components: {},
  codeLists: {},
  calculatedVariables: {},
  externalVariables: {},
  collectedVariablesByQuestion: {},
};

const PageQuestionnaire = props => {
  const {
    id,
    token,
    questionnaire,
    components,
    codeLists,
    calculatedVariables,
    externalVariables,
    collectedVariablesByQuestion,
    loading,
    loadQuestionnaire,
    setActiveQuestionnaire,
    loadStatisticalContext,
    setActiveComponents,
    setActiveCodeLists,
    setActiveVariables,
    loadExternalQuestionnairesIfNeeded,
    appState,
  } = props;

  const [toInitialize, setToInitialize] = useState(false);

  useEffect(() => {
    if (
      !questionnaire ||
      questionnaire.id !== id ||
      Object.keys(appState.activeComponentsById).length === 0
    ) {
      loadQuestionnaire(id, token);
      setToInitialize(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, questionnaire?.id]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toInitialize, questionnaire?.id]);

  useEffect(() => {
    if (
      appState.activeQuestionnaire.childQuestionnaireRef &&
      appState.activeQuestionnaire.childQuestionnaireRef.length !== 0
    ) {
      appState.activeQuestionnaire.childQuestionnaireRef.map(ref =>
        loadExternalQuestionnairesIfNeeded(ref, token),
      );
    }
  }, [
    appState.activeQuestionnaire.childQuestionnaireRef,
    loadExternalQuestionnairesIfNeeded,
    token,
  ]);

  return (
    <div id={COMPONENT_ID}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <QuestionnaireNav />
          <QuestionnaireListComponents navigate={props.history.push} />
          <GenericInput />
        </div>
      )}
    </div>
  );
};

export default PageQuestionnaire;
