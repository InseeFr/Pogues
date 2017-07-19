import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { getNewSubsequencePlaceholder } from './generic-input-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('getNewSubsequencePlaceholder', () => {
  test(`if we don't have any selected component, we will get the latest SEQUENCE`, () => {
    const components = {
      '0': { id: '0', weight: 0, type: SEQUENCE, children: [] },
      '1': { id: '1', weight: 1, type: SEQUENCE, children: [] },
      '2': { id: '2', weight: 2, type: SEQUENCE, children: [] },
    };

    expect(getNewSubsequencePlaceholder(components, components['2']).parent).toEqual('2');
  });

  test(`if the selected component is a QUESTION, and its parent a SUBSEQUENCE, the weight should be egal to the weight of the parent + 1 `, () => {
    const components = {
      '0': { id: '0', weight: 0, type: SEQUENCE, children: ['1', '3'] },
      '1': { id: '1', weight: 1, type: SUBSEQUENCE, children: ['2'], parent: '0' },
      '2': { id: '2', weight: 0, type: QUESTION, parent: '1' },
      '3': { id: '3', weight: 2, type: SUBSEQUENCE, parent: '3' },
    };

    expect(getNewSubsequencePlaceholder(components, components['2'])).toEqual({
      parent: '0',
      weight: 2,
    });
  });

  test(`if the selected component is a QUESTION, and its parent a SEQUENCE, the weight should be egal to the weight of the selected component + 1 `, () => {
    const components = {
      '0': { id: '0', weight: 0, type: SEQUENCE, children: ['1', '2'] },
      '1': { id: '1', weight: 0, type: QUESTION, parent: '0' },
      '2': { id: '2', weight: 1, type: QUESTION, parent: '0' },
    };

    expect(getNewSubsequencePlaceholder(components, components['2'])).toEqual({
      parent: '0',
      weight: 2,
    });
  });
});
