import { describe, expect, test } from 'vitest';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import {
  calculateMargin,
  couldInsertAsChild,
  couldInsertToSibling,
  getDragnDropLevel,
} from './component-dragndrop-utils';

const { QUESTION, QUESTIONNAIRE, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('getDragnDropLevel', () => {
  test('if the draggedComponent is undefined, should return 0', () => {
    expect(getDragnDropLevel(undefined, {})).toEqual(0);
  });

  test('if the droppedComponent is undefined, should return 0', () => {
    expect(getDragnDropLevel({}, undefined)).toEqual(0);
  });

  test('if couldInsertToSibling return true, should return 0', () => {
    expect(
      getDragnDropLevel({ component: { type: QUESTION } }, { type: QUESTION }),
    ).toEqual(0);
  });

  test('if couldInsertAsChild return true, should return 1', () => {
    expect(
      getDragnDropLevel(
        { component: { type: SUBSEQUENCE } },
        { type: QUESTION },
      ),
    ).toEqual(1);
    expect(
      getDragnDropLevel(
        { component: { type: SEQUENCE } },
        { type: SUBSEQUENCE },
      ),
    ).toEqual(1);
  });

  test('if there is only level between both component, should return -1', () => {
    expect(
      getDragnDropLevel(
        { component: { type: QUESTION } },
        { type: SUBSEQUENCE },
      ),
    ).toEqual(-1);
  });

  test('if we dragging a sequence to a question, should return -2', () => {
    expect(
      getDragnDropLevel({ component: { type: QUESTION } }, { type: SEQUENCE }),
    ).toEqual(-2);
  });
});

describe('calculateMargin', () => {
  test('should return 0 if the dragndrop level is 0', () => {
    expect(calculateMargin({}, {}, 1)).toEqual(0);
  });
  test('should return -20 if the dragndrop level is 0', () => {
    expect(calculateMargin({}, {}, 0)).toEqual(-20);
  });
  test('should return dragdropLevel*20 if the droppedComponent is a QUESTION and its grand parent a SEQUENCE', () => {
    expect(
      calculateMargin({ component: { type: QUESTION } }, {}, -1, SEQUENCE),
    ).toEqual(-20);
  });
  test('should return (dragdropLevel-1)*20 otherwise', () => {
    expect(
      calculateMargin({ component: { type: QUESTION } }, {}, -1, SUBSEQUENCE),
    ).toEqual(-40);
  });
});

describe('couldInsertToSibling', () => {
  test('should return true if we want to move a QUESTION next to QUESTION', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: QUESTION, children: [] },
      ),
    ).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeTruthy();
  });
  test('should return true if we want to move a SEQUENCE next to SEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: SEQUENCE, children: [] },
      ),
    ).toBeTruthy();
  });

  test('should return true if we want to move a QUESTION next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return true if we want to move a SUBSEQUENCE next to QUESTION', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: QUESTION, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: QUESTIONNAIRE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: QUESTION },
        { type: SEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a SUBSEQUENCE next to QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: QUESTIONNAIRE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a QUESTION next to SEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SUBSEQUENCE },
        { type: SEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to a QUESTIONNAIRE', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: QUESTIONNAIRE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to SUBSEQUENCE', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return false if we want to move a SEQUENCE next to QUESTION', () => {
    expect(
      couldInsertToSibling(
        { type: SEQUENCE },
        { type: QUESTION, children: [] },
      ),
    ).toBeFalsy();
  });
});

describe('couldInsertAsChild', () => {
  test('should return true if we want to move a QUESTION into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: QUESTION, children: [] }),
    ).toBeTruthy();
  });
  test('should return true if we want to move a QUESTION into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: QUESTION, children: [] }),
    ).toBeTruthy();
  });
  test('should return dalse if we want to move a QUESTION into a QUESTION', () => {
    expect(
      couldInsertAsChild({ type: QUESTION }, { type: QUESTION, children: [] }),
    ).toBeFalsy();
  });

  test('should return true if we want to move a SUBSEQUENCE into a SEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SEQUENCE },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeTruthy();
  });
  test('should return true if we want to move a SUBSEQUENCE into a SUBSEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SUBSEQUENCE },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return true if we want to move a SUBSEQUENCE into a QUESTION', () => {
    expect(
      couldInsertAsChild(
        { type: QUESTION },
        { type: SUBSEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });

  test('should return true if we want to move a SEQUENCE into a QUESTION', () => {
    expect(
      couldInsertAsChild({ type: QUESTION }, { type: SEQUENCE, children: [] }),
    ).toBeFalsy();
  });
  test('should return true if we want to move a SEQUENCE into a SUBSEQUENCE', () => {
    expect(
      couldInsertAsChild(
        { type: SUBSEQUENCE },
        { type: SEQUENCE, children: [] },
      ),
    ).toBeFalsy();
  });
  test('should return true if we want to move a SEQUENCE into a SEQUENCE', () => {
    expect(
      couldInsertAsChild({ type: SEQUENCE }, { type: SEQUENCE, children: [] }),
    ).toBeFalsy();
  });
});
