import { describe, expect, test } from 'vitest';
import { COMPONENT_TYPE } from '../constants/pogues-constants';
import * as component from './component-remove';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

describe('remove', () => {
  const config = {
    SEQUENCE: {
      id: '6',
      result: {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4', '5'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        5: {
          id: '5',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
      },
    },
    SUBSEQUENCE: {
      id: '4',
      result: {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '6'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '5'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        5: {
          id: '5',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        6: { id: '6', weight: 1, type: SEQUENCE, parent: '1', children: [] },
      },
    },
    QUESTION: {
      id: '3',
      result: {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '6'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['4', '5'],
        },
        4: {
          id: '4',
          weight: 0,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        5: {
          id: '5',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        6: { id: '6', weight: 1, type: SEQUENCE, parent: '1', children: [] },
      },
    },
  };
  [SEQUENCE, SUBSEQUENCE, QUESTION].forEach(type => {
    test(`should only remove the component if it is a ${type} without child`, () => {
      const activesComponents = {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '6'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4', '5'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        5: {
          id: '5',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        6: { id: '6', weight: 1, type: SEQUENCE, parent: '1', children: [] },
      };

      const result = component.removeLeafComponent(
        activesComponents,
        activesComponents[config[type].id],
      );
      expect(result).toEqual(config[type].result);
    });
  });

  describe('when we remove a sequence', () => {
    test('if its n first children are question, they become the last children of the last subsequence of the previous sequence, only if the last component is a subsquence', () => {
      const activesComponents = {
        1: {
          id: '1',
          weight: 0,
          type: QUESTIONNAIRE,
          children: ['2', '7', '12'],
        },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['5', '6'],
        },
        5: { id: '5', weight: 0, type: QUESTION, parent: '4', children: [] },
        6: { id: '6', weight: 1, type: QUESTION, parent: '4', children: [] },
        7: {
          id: '7',
          weight: 2,
          type: SEQUENCE,
          parent: '1',
          children: ['8', '9'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
        9: {
          id: '9',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '7',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      };

      const result = component.removeSequence(
        activesComponents,
        activesComponents['7'],
      );

      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '12'] },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4', '9'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['5', '6', '8'],
        },
        5: { id: '5', weight: 0, type: QUESTION, parent: '4', children: [] },
        6: { id: '6', weight: 1, type: QUESTION, parent: '4', children: [] },
        8: { id: '8', weight: 2, type: QUESTION, parent: '4', children: [] },
        9: {
          id: '9',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      });
    });
    test('if its n first children are question, they become the last children of the previous sequence, only if the last component is a question', () => {
      const activesComponents = {
        1: {
          id: '1',
          weight: 0,
          type: QUESTIONNAIRE,
          children: ['2', '7', '12'],
        },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        7: {
          id: '7',
          weight: 2,
          type: SEQUENCE,
          parent: '1',
          children: ['8', '9'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
        9: {
          id: '9',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '7',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      };

      const result = component.removeSequence(
        activesComponents,
        activesComponents['7'],
      );

      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '12'] },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '8', '9'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        8: { id: '8', weight: 1, type: QUESTION, parent: '2', children: [] },
        9: {
          id: '9',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      });
    });
    test('if its first children is a subsequence, the children become the last children of the previous sequence', () => {
      const activesComponents = {
        1: {
          id: '1',
          weight: 0,
          type: QUESTIONNAIRE,
          children: ['2', '7', '12'],
        },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        7: {
          id: '7',
          weight: 2,
          type: SEQUENCE,
          parent: '1',
          children: ['9'],
        },
        9: {
          id: '9',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '7',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      };

      const result = component.removeSequence(
        activesComponents,
        activesComponents['7'],
      );

      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '12'] },
        12: {
          id: '12',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4'],
        },
        2: {
          id: '2',
          weight: 1,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '9'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        9: {
          id: '9',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['10', '11'],
        },
        10: {
          id: '10',
          weight: 0,
          type: QUESTION,
          parent: '9',
          children: [],
        },
        11: {
          id: '11',
          weight: 1,
          type: QUESTION,
          parent: '9',
          children: [],
        },
      });
    });
  });

  describe('when we remove a subsequence', () => {
    test('if the subsequence was the the first child of its parent, its children become the first children of the parent', () => {
      const activesComponents = {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '7'],
        },
        3: {
          id: '3',
          weight: 0,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['4', '5', '6'],
        },
        4: { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
        5: { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
        6: { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
        7: {
          id: '7',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['8'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
      };

      const result = component.removeSubSequence(
        activesComponents,
        activesComponents['3'],
      );
      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['7', '4', '5', '6'],
        },
        4: { id: '4', weight: 0, type: QUESTION, parent: '2', children: [] },
        5: { id: '5', weight: 1, type: QUESTION, parent: '2', children: [] },
        6: { id: '6', weight: 2, type: QUESTION, parent: '2', children: [] },
        7: {
          id: '7',
          weight: 3,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['8'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
      });
    });

    test('if the subsequence was not the the first child of its parent, its children become the last children of the previous siblings component if it is a SUBSEQUENCE', () => {
      const activesComponents = {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '7', '9'],
        },
        9: {
          id: '9',
          weight: 0,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        7: {
          id: '7',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['8'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
        3: {
          id: '3',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['4', '5', '6'],
        },
        4: { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
        5: { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
        6: { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      };

      const result = component.removeSubSequence(
        activesComponents,
        activesComponents['3'],
      );
      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['7', '9'],
        },
        9: {
          id: '9',
          weight: 0,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        7: {
          id: '7',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['8', '4', '5', '6'],
        },
        8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
        4: { id: '4', weight: 1, type: QUESTION, parent: '7', children: [] },
        5: { id: '5', weight: 2, type: QUESTION, parent: '7', children: [] },
        6: { id: '6', weight: 3, type: QUESTION, parent: '7', children: [] },
      });
    });

    test('if the subsequence was not the the first child of its parent, its children replace the deleted component in the parent if the previous component is a QUESTION', () => {
      const activesComponents = {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '7', '8'],
        },
        7: { id: '7', weight: 0, type: QUESTION, parent: '2', children: [] },
        3: {
          id: '3',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: ['4', '5', '6'],
        },
        4: { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
        5: { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
        6: { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
        8: { id: '8', weight: 2, type: QUESTION, parent: '2', children: [] },
      };

      const result = component.removeSubSequence(
        activesComponents,
        activesComponents['3'],
      );
      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['7', '8', '4', '5', '6'],
        },
        7: { id: '7', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: { id: '4', weight: 1, type: QUESTION, parent: '2', children: [] },
        5: { id: '5', weight: 2, type: QUESTION, parent: '2', children: [] },
        6: { id: '6', weight: 3, type: QUESTION, parent: '2', children: [] },
        8: { id: '8', weight: 4, type: QUESTION, parent: '2', children: [] },
      });
    });
  });
});

describe('remove', () => {
  [SEQUENCE, SUBSEQUENCE, QUESTION].forEach(type => {
    test(`For a ${type} without children, should call removeLeafComponent`, () => {
      const activesComponents = {
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '6'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4', '5'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        5: {
          id: '5',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        6: { id: '6', weight: 1, type: SEQUENCE, parent: '1', children: [] },
      };
      const result = component.remove(activesComponents, '6');
      expect(result).toEqual({
        1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
        2: {
          id: '2',
          weight: 0,
          type: SEQUENCE,
          parent: '1',
          children: ['3', '4', '5'],
        },
        3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
        4: {
          id: '4',
          weight: 1,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
        5: {
          id: '5',
          weight: 2,
          type: SUBSEQUENCE,
          parent: '2',
          children: [],
        },
      });
    });
  });
  test(`For a SEQUENCE with children, should call removeSequence`, () => {
    const activesComponents = {
      1: {
        id: '1',
        weight: 0,
        type: QUESTIONNAIRE,
        children: ['2', '7', '12'],
      },
      12: {
        id: '12',
        weight: 0,
        type: SEQUENCE,
        parent: '1',
        children: ['3', '4'],
      },
      2: { id: '2', weight: 1, type: SEQUENCE, parent: '1', children: ['3'] },
      3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
      7: {
        id: '7',
        weight: 2,
        type: SEQUENCE,
        parent: '1',
        children: ['8', '9'],
      },
      8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
      9: {
        id: '9',
        weight: 1,
        type: SUBSEQUENCE,
        parent: '7',
        children: ['10', '11'],
      },
      10: { id: '10', weight: 0, type: QUESTION, parent: '9', children: [] },
      11: { id: '11', weight: 1, type: QUESTION, parent: '9', children: [] },
    };

    const result = component.remove(activesComponents, '7');

    expect(result).toEqual({
      1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2', '12'] },
      12: {
        id: '12',
        weight: 0,
        type: SEQUENCE,
        parent: '1',
        children: ['3', '4'],
      },
      2: {
        id: '2',
        weight: 1,
        type: SEQUENCE,
        parent: '1',
        children: ['3', '8', '9'],
      },
      3: { id: '3', weight: 0, type: QUESTION, parent: '2', children: [] },
      8: { id: '8', weight: 1, type: QUESTION, parent: '2', children: [] },
      9: {
        id: '9',
        weight: 2,
        type: SUBSEQUENCE,
        parent: '2',
        children: ['10', '11'],
      },
      10: { id: '10', weight: 0, type: QUESTION, parent: '9', children: [] },
      11: { id: '11', weight: 1, type: QUESTION, parent: '9', children: [] },
    });
  });
  test(`For a SUBSEQUENCE with children, should call removeSubSequence`, () => {
    const activesComponents = {
      1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
      2: {
        id: '2',
        weight: 0,
        type: SEQUENCE,
        parent: '1',
        children: ['3', '7'],
      },
      3: {
        id: '3',
        weight: 0,
        type: SUBSEQUENCE,
        parent: '2',
        children: ['4', '5', '6'],
      },
      4: { id: '4', weight: 0, type: QUESTION, parent: '3', children: [] },
      5: { id: '5', weight: 1, type: QUESTION, parent: '3', children: [] },
      6: { id: '6', weight: 2, type: QUESTION, parent: '3', children: [] },
      7: {
        id: '7',
        weight: 1,
        type: SUBSEQUENCE,
        parent: '2',
        children: ['8'],
      },
      8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
    };

    const result = component.remove(activesComponents, '3');
    expect(result).toEqual({
      1: { id: '1', weight: 0, type: QUESTIONNAIRE, children: ['2'] },
      2: {
        id: '2',
        weight: 0,
        type: SEQUENCE,
        parent: '1',
        children: ['7', '4', '5', '6'],
      },
      4: { id: '4', weight: 0, type: QUESTION, parent: '2', children: [] },
      5: { id: '5', weight: 1, type: QUESTION, parent: '2', children: [] },
      6: { id: '6', weight: 2, type: QUESTION, parent: '2', children: [] },
      7: {
        id: '7',
        weight: 3,
        type: SUBSEQUENCE,
        parent: '2',
        children: ['8'],
      },
      8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
    });
  });
});
