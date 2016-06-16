import { flatten } from '../utils/data-utils'

/**
 * A checker analyses the state and returns a number of errors and a list
 * of error descriptions
 */

export function nbQuestionsChecker(state) {
  const {
    componentById, appState: { questionnaire, questionnaireById }
  } = state
  if (!questionnaire || !questionnaireById[questionnaire].loaded) return null
  const { flat, idToRank, labelToId, idToLabel } =
    flatten(componentById, questionnaire)
  if (flat.length < 3) return {
    nbErrors: 1,
    errors: ['Your questionnaire is way too short']
  }
  else return {
    nbErrors: 0
  }
}