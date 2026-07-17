import { queryOptions } from '@tanstack/react-query'

import { SerieItem } from '@/models/series'

import { instance } from './instance'
import { SerieDetailDTO } from './models/questionnaireDetailsDTO'
import { detailsKeys } from './questionnaireDetails'

export const seriesQueryOptions = () =>
  queryOptions({
    queryKey: detailsKeys.series,
    queryFn: getSeries,
  })

export async function getSeries(): Promise<SerieItem[]> {
  return instance
    .get(`/metadata/series`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }: { data: SerieItem[] }) => {
      return data
    })
}

export const serieDetailsQueryOptions = (serieId: string) =>
  queryOptions({
    queryKey: detailsKeys.serie(serieId),
    queryFn: () => getSerieById(serieId),
    enabled: !!serieId,
  })

export async function getSerieById(serieId: string): Promise<SerieDetailDTO> {
  return instance
    .get(`/metadata/series/${serieId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: SerieDetailDTO }) => {
      return data
    })
}
