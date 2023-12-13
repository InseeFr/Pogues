import {
  COMPONENT_TYPE,
  INTEGRITY_TYPES,
} from '../../constants/pogues-constants';

const { QUESTION, SEQUENCE, EXTERNAL_ELEMENT } = COMPONENT_TYPE;

function checkerQuestionnaireLength({
  appState: {
    activeComponentsById,
    activeQuestionnaire: { id },
  },
}) {
  const errors = [];
  const numSequences = Object.keys(activeComponentsById).filter(
    key => activeComponentsById[key].type === SEQUENCE,
  );
  const numQuestions = Object.keys(activeComponentsById).filter(
    key => activeComponentsById[key].type === QUESTION,
  );
  const numReferences = Object.keys(activeComponentsById).filter(
    key => activeComponentsById[key].type === EXTERNAL_ELEMENT,
  );

  if (
    id &&
    (numSequences.length < 1 || numQuestions.length < 1) &&
    numReferences.length === 0
  ) {
    errors.push({ dictionary: 'errorQuestionnaireTooShort' });
  }
  return {
    [id]: {
      [INTEGRITY_TYPES.QUESTIONNAIRE_LENGTH]: errors,
    },
  };
}

export default checkerQuestionnaireLength;
