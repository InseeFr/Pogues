export function setActiveExternalQuestionnaires(state, { id }) {
  const newChildQuestionnaireRef = [
    ...Object.values(state.activeQuestionnaire.childQuestionnaireRef).filter(
      extQR => extQR !== id,
    ),
    id,
  ];
  return {
    ...state,
    activeQuestionnaire: {
      ...state.activeQuestionnaire,
      childQuestionnaireRef: newChildQuestionnaireRef,
    },
  };
}
