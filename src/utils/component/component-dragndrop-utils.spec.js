import { getDragnDropLevel, calculateMargin } from './component-dragndrop-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('getDragnDropLevel', () => {
  test('if the draggedComponent is undefined, should return 0', () => {
    expect(getDragnDropLevel(undefined, {})).toEqual(0);
  });

  test('if the droppedComponent is undefined, should return 0', () => {
    expect(getDragnDropLevel({}, undefined)).toEqual(0);
  });

  test('if couldInsertToSibling return true, should return 0', () => {
    expect(getDragnDropLevel({ type: QUESTION }, { type: QUESTION })).toEqual(0);
  });

  test('if couldInsertAsChild return true, should return 1', () => {
    expect(getDragnDropLevel({ type: SUBSEQUENCE }, { type: QUESTION })).toEqual(1);
    expect(getDragnDropLevel({ type: SEQUENCE }, { type: SUBSEQUENCE })).toEqual(1);
  });

  test('if there is only level between both component, should return -1', () => {
    expect(getDragnDropLevel({ type: QUESTION }, { type: SUBSEQUENCE })).toEqual(-1);
  });

  test('if we dragging a sequence to a question, should return -2', () => {
    expect(getDragnDropLevel({ type: QUESTION }, { type: SEQUENCE })).toEqual(-2);
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
    expect(calculateMargin({ type: QUESTION }, {}, -1, SEQUENCE)).toEqual(-20);
  });
  test('should return (dragdropLevel-1)*20 otherwise', () => {
    expect(calculateMargin({ type: QUESTION }, {}, -1, SUBSEQUENCE)).toEqual(-40);
  });
});
