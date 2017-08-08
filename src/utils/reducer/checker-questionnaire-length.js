function checkerQuestionnaireLength({ appState: { activeComponentsById, activeQuestionnaire: { id } } }) {
  const errorsByComponent = {};
  if (id && Object.keys(activeComponentsById).length < 3) {
    errorsByComponent[id] = {
      id,
      errors: [
        {
          type: 'global',
          code: 'QUESTIONNAIRE',
          params: {},
          dictionary: 'errorQuestionnaireTooShort',
        },
      ],
    };
  }
  return errorsByComponent;
}

export default checkerQuestionnaireLength;
