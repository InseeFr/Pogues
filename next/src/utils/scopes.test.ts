import { computeQuestionnaireScopes } from './scopes';

it('Compute scopes from questionnaire as a map', () => {
  // nominal case
  const expected = new Map();
  expected.set('id1', '1');
  expected.set('id2', '2');
  expect(
    computeQuestionnaireScopes({
      id: 'id',
      title: 'title',
      targetModes: new Set(),
      iterations: [
        { id: 'id1', name: '1' },
        { id: 'id2', name: '2' },
      ],
    }),
  ).toEqual(expected);

  // empty/default case
  expect(
    computeQuestionnaireScopes({
      id: 'id',
      title: 'title',
      targetModes: new Set(),
    }),
  ).toEqual(new Map());
});
