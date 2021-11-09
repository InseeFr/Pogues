import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from './variables-utils';

import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SUBSEQUENCE, SEQUENCE } = COMPONENT_TYPE;

describe('variables-utils:', () => {
  test('should remove Orphans from collected variables', () => {
    const variablesIdsFromComponents = ['1', '3', '5', '7'];
    const variablesStore = {
      1: { id: '1' },
      2: { id: '2' },
      3: { id: '3' },
      4: { id: '4' },
      5: { id: '5' },
      6: { id: '6' },
      7: { id: '7' },
      8: { id: '8' },
    };

    const output = {
      1: { id: '1' },
      3: { id: '3' },
      5: { id: '5' },
      7: { id: '7' },
    };

    expect(
      removeOrphansCollectedVariables(
        variablesIdsFromComponents,
        variablesStore,
      ),
    ).toEqual(output);
  });
  test('should all collected variables if for all questions', () => {
    const componentsStore = {
      1: { type: SEQUENCE, collectedVariables: ['collectedVariables1'] },
      2: { type: SUBSEQUENCE, collectedVariables: ['collectedVariables2'] },
      3: { type: QUESTION, collectedVariables: ['collectedVariables3'] },
      4: { type: QUESTION, collectedVariables: ['collectedVariables4'] },
      5: { type: SUBSEQUENCE, collectedVariables: ['collectedVariables5'] },
      6: { type: QUESTION, collectedVariables: ['collectedVariables6'] },
      7: { type: QUESTION, collectedVariables: ['collectedVariables7'] },
    };
    const output = [
      'collectedVariables3',
      'collectedVariables4',
      'collectedVariables6',
      'collectedVariables7',
    ];

    expect(getCollectedVariablesIdsFromComponents(componentsStore)).toEqual(
      output,
    );
  });
});
