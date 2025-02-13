import { queryOptions } from '@tanstack/react-query';

import { Stamp } from '@/models/stamps';

import { computeAuthorizationHeader, getBaseURI } from './utils';

/**
 * Used to retrieve available stamps.
 *
 * @see {@link getStamps}
 */
export const stampsQueryOptions = (token: string) =>
  queryOptions({
    queryKey: ['stamps'],
    queryFn: () => getStamps(token),
  });

/**
 * Retrieve stamps which allow to fetch questionnaires associated to one.
 */
async function getStamps(token: string): Promise<Stamp[]> {
  const url = `${getBaseURI()}/persistence/questionnaires/stamps`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  const response = await fetch(url, { headers });
  const json = (await response.json()) as Promise<Stamp[]>;
  return json;
}
