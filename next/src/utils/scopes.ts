import type { Questionnaire } from '@/models/questionnaires'

/** Compute scopes of the questionnaire, with a mapping between id and name */
export function computeQuestionnaireScopes(
  questionnaire: Questionnaire,
): Map<string, string> {
  const res = new Map()
  const iterations = questionnaire.iterations || []

  for (const iteration of iterations) {
    res.set(iteration.id, iteration.name)
  }

  return res
}
