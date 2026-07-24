import { queryOptions } from '@tanstack/react-query'

import type { Agency } from '@/models/agency'

import { instance } from './instance'

export const agencyKeys = {
  all: ['agency'] as const,
}

/**
 * Used to retrieve agencies.
 */
export const agencyQueryOptions = () =>
  queryOptions({
    queryKey: agencyKeys.all,
    queryFn: () => getAgencies(),
  })

/**
 * Retrieve DDI agencies.
 */
export async function getAgencies(): Promise<Agency[]> {
  return instance
    .get(`/agencies`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Agency[] }) => {
      return data
    })
}
