import type { Scopes } from '@/models/scopes';

import {
  DimensionTypeEnum,
  type QuestionType,
  QuestionTypeEnum,
  type Questionnaire,
  type Sequence,
} from '../models/poguesModel';

/** Compute scopes that can be used in our app from API data. */
export function computeScopes(questionnaire: Questionnaire): Scopes {
  const res = computeScopesForComponents(questionnaire.Child);

  const iterations = questionnaire.Iterations?.Iteration;
  if (iterations === undefined) return res;

  for (const iteration of iterations) {
    if (!iteration.IterableReference) {
      // Directly push iteration as a scope
      res.set(iteration.id, iteration.Name);
      continue;
    }

    // The iteration is based on another element, we need to get its name.

    // The scope mapping has already be done.
    if (res.get(iteration.IterableReference)) continue;

    // We search if it is linked to a question which is not table or pairwise.
    const question = getQuestionById(
      iteration.IterableReference,
      questionnaire.Child,
    );
    if (question) {
      res.set(iteration.IterableReference, question.Name);
    }

    // If it is linked to another iteration, it will be computed either way
    // since every "main" iterations are computed as a scope, so we don't need
    // to do anything.
  }
  return res;
}

/**
 * Compute the scopes from a list of components (which can be (sub)sequence
 * with compoonents).
 *
 * A scope can be computed from questions that are dynamic table or pairwise.
 */
function computeScopesForComponents(
  components?: (Sequence | QuestionType)[],
): Map<string, string> {
  let res = new Map();
  if (!components) return res;

  for (const component of components) {
    if (
      isQuestion(component) &&
      (isPairwiseQuestion(component) || isDynamicTable(component))
    ) {
      res.set(component.id, component.Name);
    } else if (isSequence(component)) {
      res = new Map([...res, ...computeScopesForComponents(component.Child)]);
    }
  }

  return res;
}

/**
 * Find the question associated to the provided ID from a list of components
 * (which can be (sub)sequences with compoonents).
 */
function getQuestionById(
  id: string,
  components?: (Sequence | QuestionType)[],
): Sequence | undefined {
  if (!components) return undefined;

  for (const component of components) {
    if (component.id === id) {
      return component;
    }
  }

  for (const component of components) {
    if (isSequence(component)) {
      const res = getQuestionById(id, component.Child);
      if (res) return res;
    }
  }

  return undefined;
}

function isSequence(o: Sequence | QuestionType): o is Sequence {
  return o && Object.hasOwn(o, 'Child');
}

function isQuestion(o: Sequence | QuestionType): o is QuestionType {
  return o && Object.hasOwn(o, 'questionType');
}

function isPairwiseQuestion(o: QuestionType): boolean {
  return o.questionType === QuestionTypeEnum.Pairwise;
}

function isDynamicTable(o: QuestionType): boolean {
  return (
    o.questionType === QuestionTypeEnum.Table &&
    o.ResponseStructure?.Dimension.find(
      (v) => v.dimensionType === DimensionTypeEnum.Primary,
    )?.dynamic !== 'NON_DYNAMIC'
  );
}
