import { queryOptions } from '@tanstack/react-query';

import { Stamp } from '@/models/stamps';

import { instance } from './instance';

const stampsKeys = {
  all: ['stamps'] as const,
};

/**
 * Used to retrieve stamps.
 *
 * @see {@link getStamps}
 */
export const stampsQueryOptions = () =>
  queryOptions({
    queryKey: stampsKeys.all,
    queryFn: () => getStamps(),
  });

/** Retrieve stamps which allow to fetch questionnaires associated to one. */
export async function getStamps(): Promise<Stamp[]> {
  return instance
    .get('/persistence/questionnaires/stamps', {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }) => data as Stamp[]);
}
