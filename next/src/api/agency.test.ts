import nock from 'nock'

import type { Agency } from '@/models/agency'

import { getAgencies } from './agency'

vi.mock('@/lib/auth/oidc')

const agencyApi: Agency[] = [
  { id: 'id1', label: 'fr.agency1' },
  { id: 'id2', label: 'fr.agency2' },
]

it('Get agencies works', async () => {
  nock('https://mock-api').get('/agencies').reply(200, agencyApi)

  const res = await getAgencies()
  expect(res).toEqual(agencyApi)
})
