import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import Loader from 'react-loader-spinner';

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
    loading,
  } = props;

  const [idState, setIdState] = useState();
  const [questionnaireState, setQuestionnaireState] = useState();
  const [activeQuestionnaireState, setActiveQuestionnaireState] = useState();
  const [componentsState, setComponentsState] = useState();
  const [codeListsState, setCodeListsState] = useState();
  const [externalVariablesState, setExternalVariables] = useState();
  const [calculatedVariablesState, setCalculatedVariables] = useState();
  const [
    collectedVariablesByQuestionState,
    setCollectedVariablesByQuestion,
  ] = useState();

  useEffect(() => {
    if (idState !== id) {
      props.loadQuestionnaire(id);
      setIdState(id);
    }
    console.log('loading', loading);

    if (questionnaire && !isEqual(questionnaireState, questionnaire)) {
      const idCampaign =
        questionnaire.campaigns[questionnaire.campaigns.length - 1];
      props.setActiveQuestionnaire(questionnaire);
      props.loadStatisticalContext(idCampaign);
      setQuestionnaireState(questionnaire);
    }
    if (components && !isEqual(componentsState, components)) {
      props.setActiveComponents(components);
      setComponentsState(components);
    }
    if (codeLists && !isEqual(codeListsState, codeLists)) {
      props.setActiveCodeLists(codeLists);
      setCodeListsState(codeLists);
    }
    if (
      (calculatedVariablesState &&
        !isEqual(calculatedVariablesState, calculatedVariables)) ||
      (externalVariables &&
        !isEqual(externalVariablesState, externalVariables)) ||
      (collectedVariablesByQuestionState &&
        !isEqual(
          collectedVariablesByQuestionState,
          collectedVariablesByQuestion,
        ))
    ) {
      props.setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
      setExternalVariables(externalVariables);
      setCalculatedVariables(calculatedVariables);
      setCollectedVariablesByQuestion(collectedVariablesByQuestion);
    }
  }, [
    loading,
    idState,
    questionnaire,
    questionnaireState,
    components,
    componentsState,
    externalVariables,
    externalVariablesState,
    calculatedVariables,
    calculatedVariablesState,
    collectedVariablesByQuestion,
    collectedVariablesByQuestionState,
  ]);

  useEffect(() => {
    if (
      activeQuestionnaire &&
      activeQuestionnaireState &&
      activeQuestionnaire.id !== activeQuestionnaireState.id
    ) {
      if (
        activeQuestionnaire.operation !== activeQuestionnaireState.operation
      ) {
        props.loadCampaignsIfNeeded(activeQuestionnaire.operation);
      }
      setActiveQuestionnaireState(activeQuestionnaire);
    }
  }, [activeQuestionnaire, activeQuestionnaireState]);

  return (
    <div id={COMPONENT_ID}>
      {loading ? (
        <Loader
          className="loaderClass"
          type="RevolvingDot"
          color="#facb21"
          height={100}
          width={100}
        />
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
