import { flatten } from '../utils/data-utils'
const errorQuestionnaireTooShort = 'errorQuestionnaireTooShort'

export default function questionnaireLengthChecker({
  componentById, appState: { questionnaire, questionnaireById }
}) {

  if (!questionnaire || !questionnaireById[questionnaire].loaded) return []

  const { flat } = flatten(componentById, questionnaire)

  if (flat.length < 3) return [{
    params: ['QUESTIONNAIRE'],
    message: errorQuestionnaireTooShort
  }]
  else return []
}

