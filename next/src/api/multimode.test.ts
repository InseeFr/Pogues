import nock from 'nock';

import { MultimodeIsMovedRules } from '@/models/multimode';

import { MultimodeDTO, MultimodeRuleName } from './models/multimodeDTO';
import {
  getMultimode,
  getMultimodeFromVersion,
  putMultimode,
} from './multimode';

vi.mock('@/contexts/oidc');

const multimodeDTO: MultimodeDTO = {
  questionnaire: {
    rules: [
      {
        name: MultimodeRuleName.isMoved,
        value: 'nvl(HABITEZ_VOUS_ICI, true)',
      },
    ],
  },
  leaf: {
    rules: [
      {
        name: MultimodeRuleName.isMoved,
        value: 'nvl(PRENOM_HABITE_PLUS_LA, false)',
      },
      {
        name: MultimodeRuleName.isSplit,
        value: 'nvl(PRENOM_HABITE_PLUS_LA, false)',
      },
    ],
  },
};

const multimodeIsMovedRules: MultimodeIsMovedRules = {
  questionnaireFormula: 'nvl(HABITEZ_VOUS_ICI, true)',
  leafFormula: 'nvl(PRENOM_HABITE_PLUS_LA, false)',
};

it('Get multimode works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/multimode')
    .reply(200, multimodeDTO);

  const res = await getMultimode('my-questionnaire');
  expect(res).toEqual(multimodeIsMovedRules);
});

it('Get multimode from version works', async () => {
  nock('https://mock-api')
    .get(
      '/persistence/questionnaire/my-questionnaire/version/my-version/multimode',
    )
    .reply(200, multimodeDTO);

  const res = await getMultimodeFromVersion('my-questionnaire', 'my-version');
  expect(res).toEqual(multimodeIsMovedRules);
});

it('Put multimode works', async () => {
  nock('https://mock-api')
    .put('/persistence/questionnaire/my-questionnaire/multimode')
    .reply(204);

  const res = await putMultimode('my-questionnaire', multimodeIsMovedRules);
  expect(res.status).toEqual(204);
});
