import type { Iteration } from '@/models/iteration';

import type { IterationType } from '../models/pogues';

/** Compute iterations that can be used in our app from API data. */
export function computeIterations(iterations?: IterationType[]): Iteration[] {
  if (iterations === undefined) return [];

  const res = [];
  for (const iteration of iterations) {
    res.push({
      id: iteration.id,
      name: iteration.Name,
    });
  }
  return res;
}
