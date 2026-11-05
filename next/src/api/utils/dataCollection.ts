import { DataCollectionSerie } from '@/models/series'

/** Compute dataCollection that can be used in our app from API data.
 * This function will be updated once the new endpoint will be ready
 */
export function computeDataCollection(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataCollection: any,
): DataCollectionSerie | undefined {
  if (dataCollection.serie) {
    return {
      id: dataCollection.serie.id,
      uri: dataCollection.serie.uri,
      label: dataCollection.serie.Label,
      altLabel: dataCollection.serie.altLabel,
    } as DataCollectionSerie
  }

  return undefined
}
