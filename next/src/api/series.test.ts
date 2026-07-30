import nock from 'nock'

import { getSerieById, getSeries } from './series'

vi.mock('@/lib/auth/oidc')

it('Get series works', async () => {
  const series = [
    {
      id: 'serie1',
      urn: 'ur1',
      label: 'label1',
    },
    {
      id: 'serie2',
      urn: 'ur2',
      label: 'label2',
    },
  ]

  nock('https://mock-api').get('/metadata/series').reply(200, series)

  const res = await getSeries()
  expect(res).toEqual(series)
})

it('Get serie by id works', async () => {
  const serie = [
    {
      id: 'serie1',
      urn: 'ur1',
      label: 'label1',
    },
  ]

  nock('https://mock-api').get('/metadata/series/serie1').reply(200, serie)

  const res = await getSerieById('serie1')
  expect(res).toEqual(serie)
})
