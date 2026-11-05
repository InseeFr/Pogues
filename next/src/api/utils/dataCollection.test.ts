import { computeDataCollection } from './dataCollection'

describe('computeDataCollection', () => {
  it('maps the serie from API data to a data collection serie', () => {
    const dataCollection = {
      serie: {
        id: 'serie-id',
        uri: 'serie-uri',
        Label: 'Serie label',
        altLabel: 'Serie alt label',
      },
    }

    expect(computeDataCollection(dataCollection)).toEqual({
      id: 'serie-id',
      uri: 'serie-uri',
      label: 'Serie label',
      altLabel: 'Serie alt label',
    })
  })

  it('returns undefined when API data has no serie', () => {
    expect(computeDataCollection({})).toBeUndefined()
  })
})
