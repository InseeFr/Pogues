export const CREATE_QUESTIONNAIRE_REF = 'CREATE_QUESTIONNAIRE_REF';
export const REMOVE_QUESTIONNAIRE_REF = 'REMOVE_QUESTIONNAIRE_REF';

export const handleNewChildQuestionnaireRef = id => ({
  type: CREATE_QUESTIONNAIRE_REF,
  payload: {
    id,
  },
});

export const removeQuestionnaireRef = id => ({
  type: REMOVE_QUESTIONNAIRE_REF,
  payload: {
    id,
  },
});
