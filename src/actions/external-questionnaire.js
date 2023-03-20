export const CREATE_QUESTIONNAIRE_REF = 'CREATE_QUESTIONNAIRE_REF';

export const handleNewChildQuestionnaireRef = id => ({
  type: CREATE_QUESTIONNAIRE_REF,
  payload: {
    id,
  },
});
