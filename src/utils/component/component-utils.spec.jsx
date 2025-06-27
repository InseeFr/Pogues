import { describe, expect, test } from 'vitest';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import {
  getSortedChildren,
  isLoop,
  isQuestion,
  isSequence,
  isSubSequence,
  toComponents,
  toId,
  updateNewComponentParent,
} from './component-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP } = COMPONENT_TYPE;

describe('isQuestion', () => {
  test(`should return true when calling isQuestion with a QUESTION as a parameter`, () => {
    expect(isQuestion({ type: QUESTION })).toBeTruthy();
  });

  test(`should return false when calling isQuestion without a QUESTION as a parameter`, () => {
    expect(isQuestion()).toBeFalsy();
  });
});

describe('isSubSequence', () => {
  test(`should return true when calling isSubSequence with a SUBSEQUENCE as a parameter`, () => {
    expect(isSubSequence({ type: SUBSEQUENCE })).toBeTruthy();
  });

  test(`should return false when calling isSubSequence without a SUBSEQUENCE as a parameter`, () => {
    expect(isSubSequence()).toBeFalsy();
  });
});

describe('isLoop', () => {
  test(`should return true when calling isLoop with a LOOP as a parameter`, () => {
    expect(isLoop({ type: LOOP })).toBeTruthy();
  });

  test(`should return false when calling isLoop without a LOOP as a parameter`, () => {
    expect(isLoop()).toBeFalsy();
  });
});

describe('isSequence', () => {
  test(`should return true when calling isSequence with a SEQUENCE as a parameter`, () => {
    expect(isSequence({ type: SEQUENCE })).toBeTruthy();
  });

  test(`should return false when calling isSequence without a SEQUENCE as a parameter`, () => {
    expect(isSequence()).toBeFalsy();
  });
});

describe('toComponents', () => {
  test('should return a list of components', () => {
    expect(
      toComponents(['1', '2'], {
        1: { id: '1' },
        2: { id: '2' },
        3: { id: '3' },
      }),
    ).toEqual([{ id: '1' }, { id: '2' }]);
  });
});

describe('toComponents', () => {
  test('should return a list of ids', () => {
    expect(toId([{ id: '1' }, { id: '2' }])).toEqual(['1', '2']);
  });
});

describe('getSortedChildren', () => {
  test('should return a sorted array', () => {
    const components = {
      1: { id: '1', weight: 0, children: ['2', '3', '4'] },
      2: { id: '2', weight: 1, parent: '1', children: [] },
      3: { id: '3', weight: 2, parent: '1', children: [] },
      4: { id: '4', weight: 0, parent: '1', children: [] },
    };
    const result = getSortedChildren(components, '1');
    expect(result).toEqual(['4', '2', '3']);
  });
});

describe('updateNewComponentParent', () => {
  test('should return an parent component with the new children', () => {
    const activeComponents = {
      1: {
        id: '1',
        children: ['2', '3'],
      },
    };
    expect(updateNewComponentParent(activeComponents, '1', '4')).toEqual({
      1: {
        id: '1',
        children: ['2', '3', '4'],
      },
    });
  });
});
