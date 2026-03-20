import { describe, expect, test } from 'vitest';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import {
  getNewLoopPlaceholder,
  getNewQuestionPlaceholder,
  getNewSubsequencePlaceholder,
} from './generic-input-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('getNewSubsequencePlaceholder', () => {
  test(`if we don't have any selected component, we will get the latest SEQUENCE`, () => {
    const components = {
      0: { id: '0', weight: 0, type: SEQUENCE, children: [] },
      1: { id: '1', weight: 1, type: SEQUENCE, children: [] },
      2: { id: '2', weight: 2, type: SEQUENCE, children: [] },
    };

    expect(
      getNewSubsequencePlaceholder(components, components['2']).parent,
    ).toEqual('2');
  });

  test(`if the selected component is a QUESTION, and its parent a SUBSEQUENCE, the weight should be egal to the weight of the parent + 1 `, () => {
    const components = {
      0: { id: '0', weight: 0, type: SEQUENCE, children: ['1', '3'] },
      1: {
        id: '1',
        weight: 1,
        type: SUBSEQUENCE,
        children: ['2'],
        parent: '0',
      },
      2: { id: '2', weight: 0, type: QUESTION, parent: '1' },
      3: { id: '3', weight: 2, type: SUBSEQUENCE, parent: '3' },
    };

    expect(getNewSubsequencePlaceholder(components, components['2'])).toEqual({
      parent: '0',
      weight: 2,
    });
  });

  test(`if the selected component is a QUESTION, and its parent a SEQUENCE, the weight should be egal to the weight of the selected component + 1 `, () => {
    const components = {
      0: { id: '0', weight: 0, type: SEQUENCE, children: ['1', '2'] },
      1: { id: '1', weight: 0, type: QUESTION, parent: '0' },
      2: { id: '2', weight: 1, type: QUESTION, parent: '0' },
    };

    expect(getNewSubsequencePlaceholder(components, components['2'])).toEqual({
      parent: '0',
      weight: 2,
    });
  });

  test('if the selected component is a SUBSEQUENCE, the weight should be equal to 0', () => {
    const components = {
      j59pzbd3: {
        id: 'j59pzbd3',
        type: 'QUESTIONNAIRE',
        parent: '',
        weight: 0,
        children: ['j59qt6xa'],
        depth: 0,
      },
      j59qt6xa: {
        id: 'j59qt6xa',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 0,
        children: ['j59qh9bp'],
      },
      j59qh9bp: {
        id: 'j59qh9bp',
        type: 'SUBSEQUENCE',
        parent: 'j59qt6xa',
        weight: 0,
        children: ['j59qn2it', 'j59qvcxl'],
      },
      j59qn2it: {
        id: 'j59qn2it',
        type: 'QUESTION',
        parent: 'j59qh9bp',
        weight: 0,
        children: [],
      },
      j59qvcxl: {
        id: 'j59qvcxl',
        type: 'QUESTION',
        parent: 'j59qh9bp',
        weight: 1,
        children: [],
      },
    };
    expect(
      getNewSubsequencePlaceholder(components, components.j59qt6xa),
    ).toEqual({
      parent: 'j59qt6xa',
      weight: 0,
    });
  });
});
describe('getNewQuestionPlaceholder', () => {
  test(`if we add a question to a subsequence, the weight should be equal to 0`, () => {
    const components = {
      j59pzbd3: {
        id: 'j59pzbd3',
        type: 'QUESTIONNAIRE',
        parent: '',
        weight: 0,
        children: ['j59q5m8i'],
        depth: 0,
      },
      j59q5m8i: {
        id: 'j59q5m8i',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 0,
        children: ['j59qj2q7'],
      },
      j59qj2q7: {
        id: 'j59qj2q7',
        type: 'SUBSEQUENCE',
        parent: 'j59q5m8i',
        weight: 0,
        children: ['j59qgb36', 'j59qmada'],
      },
      j59qgb36: {
        id: 'j59qgb36',
        type: 'QUESTION',
        parent: 'j59qj2q7',
        weight: 0,
        children: [],
      },
      j59qmada: {
        id: 'j59qmada',
        type: 'QUESTION',
        parent: 'j59qj2q7',
        weight: 1,
        children: [],
      },
    };
    const activeComponent = components.j59qj2q7;
    const result = getNewQuestionPlaceholder(components, activeComponent);
    expect(result.weight).toEqual(0);
  });

  test(`if we add a question to a subsequence, the weight should be equal to 0`, () => {
    const components = {
      j59pzbd3: {
        id: 'j59pzbd3',
        type: 'QUESTIONNAIRE',
        parent: '',
        weight: 0,
        children: ['j59q5m8i'],
        depth: 0,
      },
      j59q5m8i: {
        id: 'j59q5m8i',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 0,
        children: ['j59qj2q7'],
      },
      j59qj2q7: {
        id: 'j59qj2q7',
        type: 'SUBSEQUENCE',
        parent: 'j59q5m8i',
        weight: 0,
        children: ['j59qgb36', 'j59qmada'],
      },
      j59qgb36: {
        id: 'j59qgb36',
        type: 'QUESTION',
        parent: 'j59qj2q7',
        weight: 0,
        children: [],
      },
      j59qmada: {
        id: 'j59qmada',
        type: 'QUESTION',
        parent: 'j59qj2q7',
        weight: 1,
        children: [],
      },
    };
    const activeComponent = components.j59q5m8i;
    const result = getNewQuestionPlaceholder(components, activeComponent);
    expect(result.weight).toEqual(0);
  });
});
describe('getNewLoopPlaceholder', () => {
  test(`if component dont have any sequence`, () => {
    const components = {};
    const result = getNewLoopPlaceholder(components);
    expect(result).toEqual(false);
  });

  test(`if we component have one sequence`, () => {
    const components = {
      j59q5m8i: {
        id: 'j59q5m8i',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 0,
        children: ['j59qj2q7'],
      },
    };
    const result = getNewLoopPlaceholder(components);
    expect(result).toEqual(true);
  });
});
