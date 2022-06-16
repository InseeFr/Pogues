import React, { useEffect } from 'react';
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
    // activeQuestionnaire,
    loading,
    loadQuestionnaire,
    setActiveQuestionnaire,
    loadStatisticalContext,
    setActiveComponents,
    setActiveCodeLists,
    setActiveVariables,
    // loadCampaignsIfNeeded,
    appState,
  } = props;

  // const [idState, setIdState] = useState();
  // const [questionnaireState, setQuestionnaireState] = useState();
  // const [activeQuestionnaireState, setActiveQuestionnaireState] = useState();
  // const [componentsState, setComponentsState] = useState({});
  // const [codeListsState, setCodeListsState] = useState();
  // const [externalVariablesState, setExternalVariables] = useState();
  // const [calculatedVariablesState, setCalculatedVariables] = useState();
  // const [collectedVariablesByQuestionState, setCollectedVariablesByQuestion] =
  //   useState();

  // useEffect(() => {
  //   console.log(id);
  //   console.log(questionnaire.id);
  //   if (questionnaire?.id !== id) {
  //     loadQuestionnaire(id, token);
  //   }

  //   if (questionnaire && !appState.activeQuestionnaire) {
  //     const idCampaign =
  //       questionnaire.campaigns[questionnaire.campaigns.length - 1];
  //     setActiveQuestionnaire(questionnaire);
  //     loadStatisticalContext(idCampaign, token);
  //   }
  //   if (components && !appState.activeComponentsById) {
  //     setActiveComponents(components);
  //   }
  //   if (codeLists && !appState.activeCodeListsById) {
  //     setActiveCodeLists(codeLists);
  //   }
  //   if (
  //     (calculatedVariables && !appState.activeCalculatedVariablesById) ||
  //     (externalVariables && !appState.activeExternalVariablesById) ||
  //     (collectedVariablesByQuestion && !appState.collectedVariableByQuestion)
  //   ) {
  //     setActiveVariables({
  //       activeCalculatedVariablesById: calculatedVariables,
  //       activeExternalVariablesById: externalVariables,
  //       collectedVariableByQuestion: collectedVariablesByQuestion,
  //     });
  //   }
  // }, [
  //   token,
  //   loading,
  //   questionnaire,
  //   components,
  //   externalVariables,
  //   calculatedVariables,
  //   collectedVariablesByQuestion,
  //   codeLists,
  //   id,
  //   loadQuestionnaire,
  //   loadStatisticalContext,
  //   setActiveCodeLists,
  //   setActiveComponents,
  //   setActiveQuestionnaire,
  //   setActiveVariables,
  //   appState.activeQuestionnaire,
  //   appState.activeComponentsById,
  //   appState.activeCodeListsById,
  //   appState.activeCalculatedVariablesById,
  //   appState.activeExternalVariablesById,
  //   appState.collectedVariableByQuestion,
  // ]);

  useEffect(() => {
    if (!questionnaire || questionnaire.id !== id) {
      loadQuestionnaire(id, token);
    }

    if (
      questionnaire &&
      Object.keys(appState.activeQuestionnaire).length === 0
    ) {
      const idCampaign =
        questionnaire.campaigns[questionnaire.campaigns.length - 1];
      setActiveQuestionnaire(questionnaire);
      loadStatisticalContext(idCampaign, token);
    }
    if (components && Object.keys(appState.activeComponentsById).length === 0) {
      setActiveComponents(components);
    }
    if (codeLists && Object.keys(appState.activeCodeListsById).length === 0) {
      setActiveCodeLists(codeLists);
    }
    if (
      (calculatedVariables &&
        Object.keys(calculatedVariables).length !== 0 &&
        Object.keys(appState.activeCalculatedVariablesById).length === 0) ||
      (externalVariables &&
        Object.keys(externalVariables).length !== 0 &&
        Object.keys(appState.activeExternalVariablesById).length === 0) ||
      (collectedVariablesByQuestion &&
        Object.keys(collectedVariablesByQuestion).length !== 0 &&
        Object.keys(appState.collectedVariableByQuestion).length === 0)
    ) {
      setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
    }

    // if (
    //   calculatedVariables &&
    //   Object.keys(calculatedVariables).length !== 0 &&
    //   Object.keys(appState.activeCalculatedVariablesById).length === 0
    // ) {
    //   setActiveVariables({
    //     activeCalculatedVariablesById: calculatedVariables,
    //     activeExternalVariablesById: {},
    //     collectedVariableByQuestion: {},
    //   });
    // }
    // if (externalVariables) console.log(Object.keys(externalVariables).length);
    // if (
    //   externalVariables &&
    //   Object.keys(externalVariables).length !== 0 &&
    //   Object.keys(appState.activeExternalVariablesById).length === 0
    // ) {
    //   console.log('Dans externalVariables');
    //   setActiveVariables({
    //     activeCalculatedVariablesById: {},
    //     activeExternalVariablesById: externalVariables,
    //     collectedVariableByQuestion: {},
    //   });
    // }
    // if (
    //   calculatedVariables &&
    //   Object.keys(calculatedVariables).length !== 0 &&
    //   Object.keys(appState.activeCalculatedVariablesById).length === 0
    // ) {
    //   setActiveVariables({
    //     activeCalculatedVariablesById: calculatedVariables,
    //     activeExternalVariablesById: {},
    //     collectedVariableByQuestion: {},
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    loadQuestionnaire,
    token,
    questionnaire,
    setActiveQuestionnaire,
    loadStatisticalContext,
    externalVariables,
    calculatedVariables,
    components,
    setActiveComponents,
    codeLists,
    setActiveCodeLists,
    appState.activeQuestionnaire,
    appState.activeComponentsById,
    appState.activeCodeListsById,
    appState.activeCalculatedVariablesById,
    appState.activeExternalVariablesById,
    appState.collectedVariableByQuestion,
    // collectedVariablesByQuestion,
    setActiveVariables,
  ]);

  // useEffect(() => {
  //   if (appState.activeQuestionnaire) {
  //     if (appState.activeQuestionnaire.campaigns) {
  //       const idCampaign =
  //         appState.activeQuestionnaire.campaigns[
  //           appState.activeQuestionnaire.campaigns.length - 1
  //         ];
  //       loadStatisticalContext(idCampaign, token);
  //     }
  //     if (appState.activeQuestionnaire.operation) {
  //       loadCampaignsIfNeeded(appState.activeQuestionnaire.operation, token);
  //     }
  //   }
  // }, [
  //   token,
  //   appState.activeQuestionnaire,
  //   loadStatisticalContext,
  //   loadCampaignsIfNeeded,
  // ]);

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
