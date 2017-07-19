import * as component from './component-moves';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

describe('resetChildren', () => {
  test(`should return the same component but a new version of children`, () => {
    const children = [{ id: '1' }];
    expect(component.resetChildren({ id: 'key' }, children)).toEqual({
      key: {
        id: 'key',
        children: ['1'],
      },
    });
  });
});

describe('increaseWeightOfAll', () => {
  test(`should increase the weight of children for all child with the weight equal or bigger than the new component`, () => {
    const newComponent = {
      id: '2',
      weight: 2,
      parent: '1',
    };

    const components = {
      '1': {
        id: '1',
        weight: 1,
        parent: '1',
        children: ['5', '3', '4'],
      },
      '4': {
        id: '5',
        weight: 1,
        parent: '1',
      },
      '5': {
        id: '5',
        weight: 2,
        parent: '1',
      },
      '3': {
        id: '3',
        weight: 3,
        parent: '1',
      },
      '7': {
        id: '4',
        weight: 0,
        parent: '2',
      },
    };
    expect(component.increaseWeightOfAll(components, newComponent)).toEqual({
      '5': {
        id: '5',
        weight: 3,
        parent: '1',
      },
      '3': {
        id: '3',
        weight: 4,
        parent: '1',
      },
    });
  });
});

describe('resetWeight', () => {
  test(`should sort first before the reset`, () => {
    const children = [{ id: '1', weight: 7 }, { id: '3', weight: 2 }, { id: '5', weight: 4 }];
    expect(component.resetWeight(children)['3']).toEqual({ id: '3', weight: 0 });
    expect(component.resetWeight(children)['5']).toEqual({ id: '5', weight: 1 });
    expect(component.resetWeight(children)['1']).toEqual({ id: '1', weight: 2 });
  });
});

describe('moveComponents', () => {
  test(`should return an empty object if the parameter is undefined`, () => {
    expect(component.moveComponents()).toEqual({});
  });

  test(`should return an updated object with children component moved to a new parent`, () => {
    const parent = {
      id: '1',
      prop: 'value',
    };
    const componentsToMove = [{ id: '2', prop: 'value2' }, { id: '3', prop: 'value3' }];

    expect(component.moveComponents(componentsToMove, parent)).toEqual({
      '1': {
        id: '1',
        prop: 'value',
        children: ['2', '3'],
      },
      '2': { id: '2', prop: 'value2', parent: '1' },
      '3': { id: '3', prop: 'value3', parent: '1' },
    });
  });
});

describe('moveQuestionToSubSequence', () => {
  function transformToComponentsObject(components) {
    return components.reduce((acc, c) => {
      return {
        ...acc,
        [c.id]: c,
      };
    }, {});
  }
  test(`should return nothing if the parameter is undefined`, () => {
    expect(component.moveQuestionToSubSequence([], '1')).toEqual();
  });
  test(`should return an empty object if no question has to be moved`, () => {
    const parent = { id: '1', children: ['2', '3'] };
    const children = [
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: QUESTION },
    ];
    const activeComponents = transformToComponentsObject([parent, ...children]);
    expect(component.moveQuestionToSubSequence(activeComponents, '3')).toEqual({});
  });

  test(`should return an empty object if the next component is not a function`, () => {
    const components = [
      { id: '1', children: ['2', '3'], type: SEQUENCE },
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: SUBSEQUENCE },
    ];
    const activeComponents = transformToComponentsObject(components);
    const newSubSequence = { id: '4', weight: 1, parent: '1', type: SUBSEQUENCE };

    expect(component.moveQuestionToSubSequence(activeComponents, '2', newSubSequence)).toEqual({});
  });

  test(`should return an object with the move of a question to the new subsequence`, () => {
    const components = [
      { id: '1', children: ['2', '3'], type: SEQUENCE },
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: QUESTION },
    ];
    const activeComponents = transformToComponentsObject(components);
    const newSubSequence = { id: '4', weight: 1, parent: '1', type: SUBSEQUENCE };

    expect(component.moveQuestionToSubSequence(activeComponents, '2', newSubSequence)).toEqual({
      '1': { id: '1', children: ['2'], type: SEQUENCE },
      '3': { id: '3', weight: 0, parent: '4', type: QUESTION },
      '4': { id: '4', weight: 1, parent: '1', children: ['3'], type: SUBSEQUENCE },
    });
  });

  test(`should reset weight of all children if the parent is a subsequence`, () => {
    const components = [
      { id: '1', weight: 0, children: ['2', '5'], type: SEQUENCE },
      { id: '2', weight: 0, children: ['3', '4'], type: SUBSEQUENCE },
      { id: '3', weight: 0, parent: '2', type: QUESTION },
      { id: '4', weight: 1, parent: '2', type: QUESTION },
      { id: '5', weight: 1, parent: '1', type: QUESTION },
    ];
    const activeComponents = transformToComponentsObject(components);
    const newSubSequence = { id: '6', weight: 1, parent: '1', type: SUBSEQUENCE };

    const results = component.moveQuestionToSubSequence(activeComponents, '3', newSubSequence);
    expect(results['2']).toEqual({ id: '2', weight: 0, children: ['3'], type: SUBSEQUENCE });
    expect(results['3']).toEqual({ id: '3', weight: 0, parent: '2', type: QUESTION });
    expect(results['4']).toEqual({ id: '4', weight: 0, parent: '6', type: QUESTION });
    expect(results['5']).toEqual({ id: '5', weight: 2, parent: '1', type: QUESTION });
    expect(results['6']).toEqual({ id: '6', weight: 1, children: ['4'], parent: '1', type: SUBSEQUENCE });
  });
});

describe('moveQuestionAndSubSequenceToSequence', () => {
  test('should return nothing if the parent does not exist', () => {
    const activeComponents = {
      '2': { id: '2', parent: '1' },
    };
    expect(component.moveQuestionAndSubSequenceToSequence(activeComponents, '2')).toBe();
  });

  test('should return nothing if the selected component is a SEQUENCE', () => {
    const activeComponents = {
      '1': { id: '1', children: ['2'] },
      '2': { id: '2', parent: '1', type: SEQUENCE },
    };
    expect(component.moveQuestionAndSubSequenceToSequence(activeComponents, '2')).toBe();
  });

  test('should return all changes need', () => {
    const activesComponents = {
      '0': { id: '0', children: ['1', '7'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, children: ['2', '3', '4'] },
      '2': { id: '2', weight: 0, type: QUESTION, parent: '1' },
      '3': { id: '3', weight: 1, type: QUESTION, parent: '1' },
      '4': { id: '4', weight: 2, type: SUBSEQUENCE, parent: '1', children: ['5', '6'] },
      '5': { id: '5', weight: 0, type: QUESTION, parent: '4' },
      '6': { id: '6', weight: 1, type: QUESTION, parent: '4' },
      '7': { id: '7', weight: 1, type: SEQUENCE, children: ['8'] },
      '8': { id: '8', weight: 0, type: QUESTION, parent: '7' },
    };
    const newComponent = {
      id: '9',
      weight: 1,
      parent: '0',
      type: SEQUENCE,
    };

    const result = component.moveQuestionAndSubSequenceToSequence(activesComponents, '2', newComponent);
    expect(result['1']).toEqual({ id: '1', weight: 0, type: SEQUENCE, children: ['2'] });
    expect(result['2']).toBeUndefined();
    expect(result['3']).toEqual({ id: '3', weight: 0, type: QUESTION, parent: '9' });
    expect(result['4']).toEqual({ id: '4', weight: 1, type: SUBSEQUENCE, parent: '9', children: ['5', '6'] });
    expect(result['5']).toBeUndefined();
    expect(result['6']).toBeUndefined();
    expect(result['7']).toEqual({ id: '7', weight: 2, type: SEQUENCE, children: ['8'] });
    expect(result['8']).toBeUndefined();
    expect(result['9']).toEqual({ id: '9', weight: 1, type: SEQUENCE, children: ['3', '4'], parent: '0' });
  });
});
