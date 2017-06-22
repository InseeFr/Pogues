const errorQuestionnaireTooShort = 'errorQuestionnaireTooShort';

export default function checkerQuestionnaireLength({ appState: { activeComponentsById } }) {
  let message = [];
  if (activeComponentsById.length < 3) {
    message = [
      {
        params: ['QUESTIONNAIRE'],
        message: errorQuestionnaireTooShort,
      },
    ];
  }
  return message;
}
