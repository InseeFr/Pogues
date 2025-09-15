import nock from 'nock';

import { DatatypeType } from '@/models/datatype';
import { Variable, VariableType } from '@/models/variables';

import {
  VariableDTO,
  VariableDTODatatypeTypename,
  VariableDTOType,
} from './models/variableDTO';
import {
  getRoundaboutVariables,
  getVariables,
  getVariablesFromVersion,
  postVariable,
} from './variables';

vi.mock('@/lib/auth/oidc');

const variableDTO: VariableDTO = {
  id: 'my-variable',
  datatype: {
    typeName: VariableDTODatatypeTypename.Text,
    maxLength: 125,
  },
  description: 'a collected variable that likes strawberries',
  name: 'MY_VARIABLE',
  type: VariableDTOType.Collected,
  scope: 'a magnificent scope',
};

const variable: Variable = {
  id: 'my-variable',
  datatype: {
    maxLength: 125,
    typeName: DatatypeType.Text,
  },
  description: 'a collected variable that likes strawberries',
  name: 'MY_VARIABLE',
  scope: 'a magnificent scope',
  type: VariableType.Collected,
};

it('Get variables works', async () => {
  const variables: VariableDTO[] = [variableDTO];

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/variables')
    .reply(200, variables);

  const res = await getVariables('my-questionnaire');
  expect(res).toEqual([variable]);
});

describe('Get variables from roundabout', () => {
  it('works', async () => {
    const variables: VariableDTO[] = [variableDTO];

    nock('https://mock-api')
      .get('/persistence/questionnaire/my-questionnaire/articulation/variables')
      .reply(200, variables);

    const res = await getRoundaboutVariables('my-questionnaire');
    expect(res).toEqual([variable]);
  });

  it('returns an empty array when there is roundabout', async () => {
    nock('https://mock-api')
      .get('/persistence/questionnaire/my-questionnaire/articulation/variables')
      .reply(422, { errorCode: 'questionnaire:roundaboutnotfound' });

    const res = await getRoundaboutVariables('my-questionnaire');
    expect(res).toEqual([]);
  });
});

it('Get variables from version works', async () => {
  const variables: VariableDTO[] = [variableDTO];

  nock('https://mock-api')
    .get(
      '/persistence/questionnaire/my-questionnaire/version/my-version/variables',
    )
    .reply(200, variables);

  const res = await getVariablesFromVersion('my-questionnaire', 'my-version');
  expect(res).toEqual([variable]);
});

it('Post variable works', async () => {
  nock('https://mock-api')
    .post('/persistence/questionnaire/my-questionnaire/variables')
    .reply(201);

  const res = await postVariable(variable, 'my-questionnaire');
  expect(res.status).toEqual(201);
});
