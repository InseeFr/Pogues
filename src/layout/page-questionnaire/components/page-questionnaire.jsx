import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
import { QuestionnaireListComponents } from 'layout/questionnaire-list-components';
import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { GenericInput } from 'layout/generic-input';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

// Prop types and default props

export const propTypes = {
  id: PropTypes.string.isRequired,
  loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
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
    questionnaire,
    components,
    codeLists,
    calculatedVariables,
    externalVariables,
    collectedVariablesByQuestion,
    activeQuestionnaire,
  } = props;
  
  const [idState, setIdState] = useState(id);
  const [questionnaireState, setQuestionnaireState] = useState(questionnaire);
  const [activeQuestionnaireState, setActiveQuestionnaireState] = useState(activeQuestionnaire);
  const [componentsState, setComponentsState] = useState(components);
  const [codeListsState, setCodeListsState] = useState(codeLists);
  const [externalVariablesState, setExternalVariables] = useState(externalVariables);
  const [calculatedVariablesState, setCalculatedVariables] = useState(calculatedVariables);
  const [collectedVariablesByQuestionState, setCollectedVariablesByQuestion] = useState(collectedVariablesByQuestion);

  useEffect(() => {
    if(idState) {
      props.loadQuestionnaireIfNeeded(id);
    }
    if (questionnaireState && questionnaireState.id) {
      const idCampaign = questionnaireState.campaigns[0];
      props.setActiveQuestionnaire(questionnaireState);
      props.setActiveComponents(componentsState);
      props.setActiveCodeLists(codeListsState);
      props.setActiveVariables({
        activeCalculatedVariablesById: calculatedVariablesState,
        activeExternalVariablesById: externalVariablesState,
        collectedVariableByQuestion: collectedVariablesByQuestionState,
      });
      props.loadStatisticalContext(idCampaign);
    }

  }, [idState, questionnaireState, componentsState, codeListsState, externalVariablesState, calculatedVariablesState, collectedVariablesByQuestionState]);

  useEffect(() => {

    if (activeQuestionnaire && !isEqual(activeQuestionnaire, activeQuestionnaireState)) {
      if (activeQuestionnaire.campaigns && activeQuestionnaire.campaigns.length > 0) {
        const idCampaign = activeQuestionnaire.campaigns[0];
        props.loadStatisticalContext(idCampaign);
      }
      if(activeQuestionnaire.operation !== activeQuestionnaireState.operation)
      props.loadCampaignsIfNeeded(activeQuestionnaire.operation);
      setActiveQuestionnaireState(activeQuestionnaire);
    }
    
    if (!isEqual(questionnaire, questionnaireState)) {
      props.setActiveQuestionnaire(questionnaire);
      setQuestionnaireState(questionnaire);
    }

  }, [activeQuestionnaire, questionnaire]);

  useEffect(() => {

    if (!isEqual(components, componentsState)) {
      props.setActiveComponents(components);
      setComponentsState(components);
    }

    if (!isEqual(codeLists, codeListsState)) {
      props.setActiveCodeLists(codeLists);
      setCodeListsState(codeLists);
    }

  }, [components, codeLists]);

  useEffect(() => {

    if (
      !isEqual(calculatedVariables, calculatedVariablesState) ||
      !isEqual(externalVariables, externalVariablesState) ||
      !isEqual(collectedVariablesByQuestion, collectedVariablesByQuestionState)
    ) {
      props.setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
      setExternalVariables(calculatedVariables);
      setCalculatedVariables(externalVariables);
      setCollectedVariablesByQuestion(collectedVariablesByQuestion);
    }

  }, [calculatedVariables, externalVariables, collectedVariablesByQuestion]);

  return (
    <div id={COMPONENT_ID}>
      <QuestionnaireNav />
      <QuestionnaireListComponents navigate={props.history.push} />
      <GenericInput />
    </div>
  );
  
}

export default PageQuestionnaire;
