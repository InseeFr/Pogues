import {
  couldInsertToSibling,
  couldInsertAsChild,
  toComponents,
  toId,
  isQuestion,
  isSequence,
  isSubSequence,
  getSortedChildren,
  updateNewComponentParent
} from './component-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

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
        '1': { id: '1' },
        '2': { id: '2' },
        '3': { id: '3' }
      })
    ).toEqual([{ id: '1' }, { id: '2' }]);
  });
});

describe('toComponents', () => {
  test('should return a list of ids', () => {
    expect(toId([{ id: '1' }, { id: '2' }])).toEqual(['1', '2']);
  });
});

describe('couldInsertToSibling', () => {
  test('should return true if we want to move a QUESTION next to QUESTION', () => {
    expect(
      couldInsertToSibling({ type: QUESTION }, { type: QUESTION, children: [] })
    ).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeTruthy();
  });
  test('should return true if we want to move a SEQUENCE next to SEQUENCE', () => {
    expect(
      couldInsertToSibling({ type: SEQUENCE }, { type: SEQUENCE, children: [] })
    ).toBeTruthy();
  });

  test('should return true if we want to move a QUESTION next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to QUESTION', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: QUESTION, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: QUESTIONNAIRE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE', () => {
    expect(
      couldInsertToSibling({ type: QUESTION }, { type: SEQUENCE, children: [] })
    ).toBeFalsy();
  });
  test('should return false if we want to move a SUBSEQUENCE next to QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: QUESTIONNAIRE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: SEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to a QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: QUESTIONNAIRE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to QUESTION', () => {
    expect(
      couldInsertToSibling({ type: SEQUENCE }, { type: QUESTION, children: [] })
    ).toBeFalsy();
  });
});

describe('couldInsertAsChild', () => {
  test('should return true if we want to move a QUESTION into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: QUESTION, children: [] })
    ).toBeTruthy();
  });
  test('should return true if we want to move a QUESTION into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: QUESTION, children: [] })
    ).toBeTruthy();
  });
  test('should return dalse if we want to move a QUESTION into a QUESTION', () => {
    expect(
      couldInsertAsChild({ type: QUESTION }, { type: QUESTION, children: [] })
    ).toBeFalsy();
  });

  test('should return true if we want to move a SUBSEQUENCE into a SEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SEQUENCE },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE into a SUBSEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SUBSEQUENCE },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return true if we want to move a SUBSEQUENCE into a QUESTION', () => {
    expect(
      couldInsertAsChild(
        { type: QUESTION },
        { type: SUBSEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });

  test('should return true if we want to move a SEQUENCE into a QUESTION', () => {
    expect(
      couldInsertAsChild({ type: QUESTION }, { type: SEQUENCE, children: [] })
    ).toBeFalsy();
  });
  test('should return true if we want to move a SEQUENCE into a SUBSEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SUBSEQUENCE },
        { type: SEQUENCE, children: [] }
      )
    ).toBeFalsy();
  });
  test('should return true if we want to move a SEQUENCE into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: SEQUENCE, children: [] })
    ).toBeFalsy();
  });
});

describe('getSortedChildren', () => {
  test('should return a sorted array', () => {
    const components = {
      '1': { id: '1', weight: 0, children: ['2', '3', '4'] },
      '2': { id: '2', weight: 1, parent: '1', children: [] },
      '3': { id: '3', weight: 2, parent: '1', children: [] },
      '4': { id: '4', weight: 0, parent: '1', children: [] }
    };
    const result = getSortedChildren(components, '1');
    expect(result).toEqual(['4', '2', '3']);
  });
});

describe('updateNewComponentParent', () => {
  test('should return an parent component with the new children', () => {
    const activeComponents = {
      '1': {
        id: '1',
        children: ['2', '3']
      }
    };
    expect(updateNewComponentParent(activeComponents, '1', '4')).toEqual({
      '1': {
        id: '1',
        children: ['2', '3', '4']
      }
    });
  });
});
