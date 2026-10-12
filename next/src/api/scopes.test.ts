import nock from 'nock'

import type { Scopes } from '@/models/scopes'

import { VariableScope } from './models/variableDTO'
import { getScopes, getScopesFromVersion } from './scopes'

vi.mock('@/lib/auth/oidc')

const questionnaireScopeApi: VariableScope[] = [
  { id: 'id1', label: 'scope1' },
  { id: 'id2', label: 'scope2' },
]

const questionnaireScope: Scopes = new Map<string, string>(
  questionnaireScopeApi.map((scope) => [scope.id, scope.label]),
)

it('Get scopes works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire-id/variables-scopes')
    .reply(200, questionnaireScopeApi)

  const res = await getScopes('my-questionnaire-id')
  expect(res).toEqual(questionnaireScope)
})

it('Get scopes from version works', async () => {
  nock('https://mock-api')
    .get(
      '/persistence/questionnaire/my-questionnaire-id/version/my-version/variables-scopes',
    )
    .reply(200, questionnaireScopeApi)

  const res = await getScopesFromVersion('my-questionnaire-id', 'my-version')
  expect(res).toEqual(questionnaireScope)
})
