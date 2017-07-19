import { canMoveTo, toComponents, toId, isQuestion, isSequence, isSubSequence } from './component-utils';
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

describe('canMoveTo', () => {
  test('should return false if we want to move a QUESTION next to QUESTIONNAIRE', () => {
    expect(canMoveTo({ type: QUESTION }, { type: QUESTIONNAIRE, children: [] })).toBeFalsy();
  });
  test('should return true if we want to move a QUESTION next to QUESTION', () => {
    expect(canMoveTo({ type: QUESTION }, { type: QUESTION, children: [] })).toBeTruthy();
  });
  test('should return false if we want to move a SUBSEQUENCE next to QUESTIONNAIRE', () => {
    expect(canMoveTo({ type: SUBSEQUENCE }, { type: QUESTIONNAIRE, children: [] })).toBeFalsy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to SUBSEQUENCE', () => {
    expect(canMoveTo({ type: SUBSEQUENCE }, { type: SUBSEQUENCE, children: [] })).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to QUESTION', () => {
    expect(canMoveTo({ type: SUBSEQUENCE }, { type: QUESTION, children: [] })).toBeTruthy();
  });
  test('should return false if we want to move a SEQUENCE next to SUBSEQUENCE', () => {
    expect(canMoveTo({ type: SEQUENCE }, { type: SUBSEQUENCE, children: [] })).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to QUESTION', () => {
    expect(canMoveTo({ type: SEQUENCE }, { type: QUESTION, children: [] })).toBeFalsy();
  });
  test('should return true if we want to move a QUESTION next to SEQUENCE without children', () => {
    expect(canMoveTo({ type: QUESTION }, { type: SEQUENCE, children: [] })).toBeTruthy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE with children', () => {
    expect(canMoveTo({ type: QUESTION }, { type: SEQUENCE, children: ['id'] })).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE with children', () => {
    expect(canMoveTo({ type: SUBSEQUENCE }, { type: SEQUENCE, children: ['id'] })).toBeFalsy();
  });
  test('should return true if we want to move a QUESTION next to SUBSEQUENCE', () => {
    expect(canMoveTo({ type: QUESTION }, { type: SUBSEQUENCE, children: [] })).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to a SEQUENCE without children', () => {
    expect(canMoveTo({ type: SUBSEQUENCE }, { type: SEQUENCE, children: [] })).toBeTruthy();
  });
  test('should return false if we want to move a SEQUENCE next to a QUESTIONNAIRE', () => {
    expect(canMoveTo({ type: SEQUENCE }, { type: QUESTIONNAIRE, children: [] })).toBeFalsy();
  });
});