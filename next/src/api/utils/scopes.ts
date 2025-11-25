import type { Scopes } from '@/models/scopes';

import type {
  IterationType,
  Questionnaire,
  Sequence,
} from '../models/poguesModel';

/** Compute iterations that can be used in our app from API data. */
export function computeScopes(questionnaire: Questionnaire): Scopes {
  const iterations = questionnaire.Iterations?.Iteration;
  if (iterations === undefined) return new Map();

  const res = new Map();
  for (const iteration of iterations) {
    if (iteration.IterableReference) {
      // The iteration is based on another element,
      // we need to get this element name.

      // The scope mapping has already be done.
      if (res.get(iteration.IterableReference)) continue;

      // We search if it is linked to a loop.
      const linkedIteration = getIterationById(
        iteration.IterableReference,
        iterations,
      );
      if (linkedIteration) {
        res.set(iteration.IterableReference, linkedIteration.Name);
        continue;
      }

      // We search if it is linked to a question.
      const question = getQuestionById(
        iteration.IterableReference,
        questionnaire.Child,
      );
      if (question) {
        res.set(iteration.IterableReference, question.Name);
        continue;
      }
    }

    // Directly push iteration as a scope
    res.set(iteration.id, iteration.Name);
  }
  return res;
}

/**
 * Find the iteration associated to the provided ID from a list of iterations.
 */
function getIterationById(
  id: string,
  iterations: IterationType[],
): IterationType | undefined {
  for (const linkedIteration of iterations) {
    if (linkedIteration.id === id) {
      return linkedIteration;
    }
  }

  return undefined;
}

/**
 * Find the question associated to the provided ID from a list of components
 * (which can be (sub)sequences with compoonents).
 */
function getQuestionById(
  id: string,
  components?: Sequence[],
): Sequence | undefined {
  if (!components) return undefined;

  for (const component of components) {
    if (component.id === id) {
      return component;
    }
  }

  for (const component of components) {
    const res = getQuestionById(id, component.Child);
    if (res) return res;
  }

  return undefined;
}
