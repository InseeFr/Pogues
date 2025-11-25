import type { Questionnaire as PoguesQuestionnaire } from '../models/poguesModel';
import { computeScopes } from './scopes';

it('computeScopes works', () => {
  const poguesQuestionnaire: PoguesQuestionnaire = {
    id: 'id',
    Name: 'TITLE',
    Label: ['title'],
    DataCollection: [],
    Child: [
      {
        id: 'idseq1',
        Name: 'SEQ_1',
        Label: ['SEQ_1'],
        Child: [
          {
            id: 'id-q-1',
            Name: 'ma_question_1',
            Label: ['Q_1'],
          },
          {
            id: 'id-q-2',
            Name: 'ma_question_2',
            Label: ['Q_2'],
          },
        ],
      },
    ],
    Iterations: {
      Iteration: [
        { id: 'id-iteration-1', Name: 'mon_itération_1' },
        {
          id: 'id-iteration-2',
          Name: 'mon_itération_2',
          IterableReference: 'id-q-2',
        },
        { id: 'id-iteration-3', Name: 'mon_itération_3' },
      ],
    },
  };

  const expected = new Map();
  expected.set('id-iteration-1', 'mon_itération_1');
  expected.set('id-q-2', 'ma_question_2');
  expected.set('id-iteration-3', 'mon_itération_3');

  expect(computeScopes(poguesQuestionnaire)).toEqual(expected);
});
