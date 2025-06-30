import nock from 'nock';

import { DatatypeType } from '@/models/datatype';
import { Variable, VariableType } from '@/models/variables';

import {
  DatatypeTypeEnum as PoguesDatatypeType,
  type Variable as PoguesVariable,
  VariableTypeType as PoguesVariableType,
} from './models/pogues';
import { getVariables } from './variables';

vi.mock('@/contexts/oidc');

const poguesVariable: PoguesVariable = {
  Datatype: {
    MaxLength: 125,
    type: 'TextDatatypeType',
    typeName: PoguesDatatypeType.Text,
  },
  id: 'my-variable',
  Label: 'a collected variable that likes strawberries',
  Name: 'MY_VARIABLE',
  Scope: 'a magnificent scope',
  type: PoguesVariableType.CollectedVariableType,
};

const variable: Variable = {
  datatype: {
    maxLength: 125,
    typeName: DatatypeType.Text,
  },
  id: 'my-variable',
  label: 'a collected variable that likes strawberries',
  name: 'MY_VARIABLE',
  scope: 'a magnificent scope',
  type: VariableType.Collected,
};

it('Get variables works', async () => {
  const variables: PoguesVariable[] = [poguesVariable];

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/variables')
    .reply(200, { Variable: variables });

  const res = await getVariables('my-questionnaire');
  expect(res).toEqual([variable]);
});
