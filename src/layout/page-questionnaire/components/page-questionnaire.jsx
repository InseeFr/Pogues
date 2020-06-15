import React, { useEffect, useState } from 'react';
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
  const [activeQuestionnaireState, setActiveQuestionnaireState] = useState(props.activeQuestionnaire);
  const [questionnaireState, setQuestionnaireState] = useState(props.questionnaire);
  const [componentsState, setComponentsState] = useState(props.components);
  const [codeListsState, setCodeListsState] = useState(props.codeLists);
  const [calculatedVariablesState, setCalculatedVariablesState] = useState(props.calculatedVariables);
  const [externalVariablesState, setExternalVariablesState] = useState(props.externalVariables);
  const [collectedVariablesByQuestionState, setCollectedVariablesByQuestionState] = useState(props.collectedVariablesByQuestion);

  const {
    id,
    questionnaire,
    components,
    codeLists,
    calculatedVariables,
    externalVariables,
    collectedVariablesByQuestion,
  } = props;

  console.log('questionnaire', questionnaire)
  console.log('activeQuestionnaireState', activeQuestionnaireState)
  useEffect(() => {
    if(id) {
      props.loadQuestionnaireIfNeeded(id);
      if (questionnaire && questionnaire.id) {
        const idCampaign = questionnaire.campaigns[0];
        props.setActiveQuestionnaire(questionnaire);
        props.setActiveComponents(components);
        props.setActiveCodeLists(codeLists);
        props.setActiveVariables({
          activeCalculatedVariablesById: calculatedVariables,
          activeExternalVariablesById: externalVariables,
          collectedVariableByQuestion: collectedVariablesByQuestion,
        });
        props.loadStatisticalContext(idCampaign);
      }
    }
  }, []);

  useEffect(() => {
    if(!isEqual(props.activeQuestionnaire, activeQuestionnaireState)) {
      if (
        !isEqual(props.activeQuestionnaire.id, activeQuestionnaireState.id) &&
        props.activeQuestionnaire.campaigns &&
        props.activeQuestionnaire.campaigns.length > 0
      ) 
      {
        const idCampaign = props.activeQuestionnaire.campaigns[0];
        props.loadStatisticalContext(idCampaign);
        setActiveQuestionnaireState(props.activeQuestionnaire);
      }
      if(!isEqual(props.activeQuestionnaire.operation, activeQuestionnaireState.operation)) {
        props.loadCampaignsIfNeeded(props.activeQuestionnaire.operation);
        setActiveQuestionnaireState(props.activeQuestionnaire);
      }
    }

    if(!isEqual(props.questionnaire, questionnaireState)) {
      props.setActiveQuestionnaire(props.questionnaire);
      setQuestionnaireState(props.activeQuestionnaire);
    }

    if( !isEqual(props.components, componentsState)) {
      props.setActiveComponents(props.components);
      setComponentsState(props.components);
    }

    if (!isEqual(props.codeLists, codeListsState)) {
      props.setActiveCodeLists(props.codeLists);
      setCodeListsState(props.codeLists);
    }
    if (
      !isEqual(props.calculatedVariables, calculatedVariablesState) ||
      !isEqual(props.externalVariables, externalVariablesState) ||
      !isEqual(
        props.collectedVariablesByQuestion,
        collectedVariablesByQuestionState,
      )
    ) {
      props.setActiveVariables({
        activeCalculatedVariablesById: props.calculatedVariables,
        activeExternalVariablesById: props.externalVariables,
        collectedVariableByQuestion: props.collectedVariablesByQuestion,
      });
      setCalculatedVariablesState(props.calculatedVariables)
      setExternalVariablesState(props.externalVariables)
      setCollectedVariablesByQuestionState(props.collectedVariablesByQuestion)
    }
  }, [props.activeQuestionnaire, props.questionnaire, props.components, props.codeLists, props.calculatedVariables, props.externalVariables, props.collectedVariablesByQuestion]);

    return ( 
      <div id={COMPONENT_ID}>
        <QuestionnaireNav />
        <QuestionnaireListComponents navigate={props.history.push} />
        <GenericInput />
      </div>
    );
}

export default PageQuestionnaire;
