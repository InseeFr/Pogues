import { toComponents, toId, isQuestion, isSequence, isSubSequence } from './component-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

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
    expect(toComponents(['1', '2'], { '1': { id: '1' }, '2': { id: '2' }, '3': { id: '3' } })).toEqual([
      { id: '1' },
      { id: '2' },
    ]);
  });
});

describe('toComponents', () => {
  test('should return a list of ids', () => {
    expect(toId([{ id: '1' }, { id: '2' }])).toEqual(['1', '2']);
  });
});
