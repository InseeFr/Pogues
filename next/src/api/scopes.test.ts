import nock from 'nock'

import type { Scopes } from '@/models/scopes'

import { getScopes } from './scopes'

vi.mock('@/lib/auth/oidc')

const questionnaireScope: Scopes = new Map<string, string>([
  ['id1', 'scope1'],
  ['id2', 'scope2'],
])

// Convert Map to plain object for JSON serialization
const questionnaireScopeObject = Object.fromEntries(questionnaireScope)

it('Get scopes works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire-id/variables-scopes')
    .reply(200, questionnaireScopeObject)

  const res = await getScopes('my-questionnaire-id')
  expect(res).toEqual(questionnaireScope)
})
