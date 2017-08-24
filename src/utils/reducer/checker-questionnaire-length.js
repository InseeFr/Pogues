import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

function checkerQuestionnaireLength({ appState: { activeComponentsById, activeQuestionnaire: { id } } }) {
  const errorsByCode = {
    QUESTIONNAIRE: {
      type: 'global',
      code: 'QUESTIONNAIRE',
      dictionary: 'errorQuestionnaireTooShort',
      errors: [],
    },
  };
  const numSequences = Object.keys(activeComponentsById).filter(key => activeComponentsById[key].type === SEQUENCE);
  const numQuestions = Object.keys(activeComponentsById).filter(key => activeComponentsById[key].type === QUESTION);

  if (id && (numSequences.length < 1 || numQuestions.length < 1)) {
    errorsByCode.QUESTIONNAIRE = {
      type: 'global',
      code: 'QUESTIONNAIRE',
      dictionary: 'errorQuestionnaireTooShort',
      errors: [
        {
          id,
          params: {},
        },
      ],
    };
  }
  return errorsByCode;
}

export default checkerQuestionnaireLength;
