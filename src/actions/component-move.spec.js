import * as component from './component-move';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { SEQUENCE, QUESTION, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

jest.mock('./component-remove');

const activesComponents = {
  '0': { id: '0', weight: 0, type: QUESTIONNAIRE, children: ['1', '11', '12'] },
  '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
  '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
  '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
  '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
  '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
  '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
  '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
  '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
  '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
  '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
  '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
  '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
};

describe('getWeightAndParentId', () => {
  test('id dragndropLevel = -2', () => {
    const result = component.getWeightAndParentId(
      activesComponents,
      activesComponents['5'],
      activesComponents['12'],
      -2
    );
    expect(result.newWeight).toEqual(1);
    expect(result.newParentComponentId).toEqual('0');
  });

  test('id dragndropLevel = -1 and if the parent has the same type as the dragged component', () => {
    const result = component.getWeightAndParentId(
      activesComponents,
      activesComponents['4'],
      activesComponents['8'],
      -1
    );
    expect(result.newWeight).toEqual(2);
    expect(result.newParentComponentId).toEqual('1');
  });

  test('id dragndropLevel = 0', () => {
    const result = component.getWeightAndParentId({}, { weight: 1, parent: '1' }, {}, 0);
    expect(result.newWeight).toEqual(2);
    expect(result.newParentComponentId).toEqual('1');
  });

  test('id dragndropLevel = 1', () => {
    const result = component.getWeightAndParentId({}, { weight: 1, id: '1' }, {}, 1);
    expect(result.newWeight).toEqual(0);
    expect(result.newParentComponentId).toEqual('1');
  });
});

describe('moveComponent', () => {
  test('should return all moves from the new and old parent when their are not the same', () => {
    const result = component.moveComponent(activesComponents, activesComponents['9'], activesComponents['6']);

    expect(result['2']).toEqual({ id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] });
    expect(result['3']).toEqual({ id: '3', weight: 1, type: SUBSEQUENCE, children: ['4', '5'], parent: '1' });
    expect(result['5']).toEqual({ id: '5', weight: 1, type: QUESTION, parent: '3', children: [] });
    expect(result['6']).toEqual({
      id: '6',
      weight: 1,
      type: QUESTION,
      parent: '8',
      children: [],
    });
    expect(result['7']).toEqual({ id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] });
    expect(result['8']).toEqual({ id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10', '6'] });
    expect(result['10']).toEqual({ id: '10', weight: 2, type: QUESTION, parent: '8', children: [] });
  });

  test('should return only the update of the weight when the new and old parent are the same', () => {
    const activesComponents = {
      '1': { id: '1', weight: 0, type: SEQUENCE, children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
    };

    const result = component.moveComponent(activesComponents, activesComponents['6'], activesComponents['4']);

    expect(result['1']).toEqual({ id: '1', weight: 0, type: SEQUENCE, children: ['2', '3', '7', '8'] });
    expect(result['2']).toEqual({ id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] });
    expect(result['3']).toEqual({ id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] });

    expect(result['5']).toEqual({ id: '5', weight: 0, type: QUESTION, parent: '3', children: [] });
    expect(result['4']).toEqual({ id: '4', weight: 2, type: QUESTION, parent: '3', children: [] });
    expect(result['6']).toEqual({ id: '6', weight: 1, type: QUESTION, parent: '3', children: [] });

    expect(result['7']).toEqual({ id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] });
    expect(result['8']).toEqual({ id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] });
    expect(result['9']).toEqual({ id: '9', weight: 0, type: QUESTION, parent: '8', children: [] });
    expect(result['10']).toEqual({ id: '10', weight: 1, type: QUESTION, parent: '8', children: [] });
  });

  test('when we move a sequence on a question', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['5'],
        childrenId: activesComponents['5'].children,
      },
      {
        ...activesComponents['12'],
        childrenId: activesComponents['12'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '12': { id: '12', weight: 1, type: SEQUENCE, parent: '0', children: ['6', '7', '8'] },
      '6': { id: '6', weight: 0, type: QUESTION, parent: '12', children: [] },
      '7': { id: '7', weight: 1, type: SUBSEQUENCE, parent: '12', children: [] },
      '8': { id: '8', weight: 2, type: SUBSEQUENCE, parent: '12', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('when we move a subsequence on a question', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['5'],
        childrenId: activesComponents['5'].children,
      },
      {
        ...activesComponents['7'],
        childrenId: activesComponents['7'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: ['6'] },
      '6': { id: '6', weight: 0, type: QUESTION, parent: '7', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('can insert sequence right after a sequence', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['1'],
        childrenId: activesComponents['1'].children,
      },
      {
        ...activesComponents['12'],
        childrenId: activesComponents['12'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 1, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '12', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '12', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '12', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '12', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('can insert subsequence right after a subsequence', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['3'],
        childrenId: activesComponents['3'].children,
      },
      {
        ...activesComponents['8'],
        childrenId: activesComponents['8'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 2, type: SUBSEQUENCE, parent: '1', children: ['9', '10', '4', '5', '6'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '4': { id: '4', weight: 2, type: QUESTION, parent: '8', children: [] },
      '5': { id: '5', weight: 3, type: QUESTION, parent: '8', children: [] },
      '6': { id: '6', weight: 4, type: QUESTION, parent: '8', children: [] },
      '7': { id: '7', weight: 3, type: SUBSEQUENCE, parent: '1', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('can insert sequence right after a subsequence', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['2'],
        childrenId: activesComponents['2'].children,
      },
      {
        ...activesComponents['11'],
        childrenId: activesComponents['11'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: ['3', '7', '8'] },
      '3': { id: '3', weight: 0, type: SUBSEQUENCE, parent: '11', children: ['4', '5', '6'] },
      '4': { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      '5': { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      '6': { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      '7': { id: '7', weight: 1, type: SUBSEQUENCE, parent: '11', children: [] },
      '8': { id: '8', weight: 2, type: SUBSEQUENCE, parent: '11', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },

      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('all questions should be attached to its closest sibling subsequence', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '3': { id: '3', weight: 1, type: QUESTION, parent: '1', children: [] },
      '7': { id: '7', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
      '8': { id: '8', weight: 3, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['2'],
        childrenId: activesComponents['2'].children,
      },
      {
        ...activesComponents['7'],
        childrenId: activesComponents['7'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '11', '12'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '7', '8'] },
      '2': { id: '2', weight: 0, type: SUBSEQUENCE, parent: '1', children: [] },
      '7': { id: '7', weight: 1, type: SUBSEQUENCE, parent: '1', children: ['3'] },
      '3': { id: '3', weight: 0, type: QUESTION, parent: '7', children: [] },
      '8': { id: '8', weight: 2, type: SUBSEQUENCE, parent: '1', children: ['9', '10'] },
      '9': { id: '9', weight: 0, type: QUESTION, parent: '8', children: [] },
      '10': { id: '10', weight: 1, type: QUESTION, parent: '8', children: [] },
      '11': { id: '11', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '12': { id: '12', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('can insert sequence right after a sequence, but the sequence right after do not become a child of the inserted one', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '2', '3'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: [] },
      '2': { id: '2', weight: 1, type: SEQUENCE, parent: '0', children: [] },
      '3': { id: '3', weight: 2, type: SEQUENCE, parent: '0', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['1'],
        childrenId: activesComponents['1'].children,
      },
      {
        ...activesComponents['3'],
        childrenId: activesComponents['3'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1', '2', '3'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: [] },
      '2': { id: '2', weight: 2, type: SEQUENCE, parent: '0', children: [] },
      '3': { id: '3', weight: 1, type: SEQUENCE, parent: '0', children: [] },
    });
  });

  test('when we move a subsequence right before a question, this question become a child of the subsequence', () => {
    const activesComponents = {
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['2', '3'] },
      '2': { id: '2', weight: 1, type: QUESTION, parent: '1', children: [] },
      '3': { id: '3', weight: 2, type: SUBSEQUENCE, parent: '1', children: [] },
    };

    const result = component.moveComponent(
      activesComponents,
      {
        ...activesComponents['1'],
        childrenId: activesComponents['1'].children,
      },
      {
        ...activesComponents['3'],
        childrenId: activesComponents['3'].children,
      }
    );

    expect(result).toEqual({
      '0': { id: '0', weight: 0, type: QUESTIONNAIRE, parent: '', children: ['1'] },
      '1': { id: '1', weight: 0, type: SEQUENCE, parent: '0', children: ['3'] },
      '2': { id: '2', weight: 0, type: QUESTION, parent: '3', children: [] },
      '3': { id: '3', weight: 0, type: SUBSEQUENCE, parent: '1', children: ['2'] },
    });
  });
});
