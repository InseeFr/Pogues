import { describe, expect, test } from 'vitest';

import { COMPONENT_TYPE } from '../constants/pogues-constants';
import * as component from './component-insert';

const { SEQUENCE, SUBSEQUENCE, QUESTION } = COMPONENT_TYPE;

describe('moveComponents', () => {
  test(`should return an empty object if the parameter is undefined`, () => {
    expect(component.moveComponents()).toEqual({});
  });

  test(`should return an updated object with children component moved to a new parent`, () => {
    const parent = {
      id: '1',
      prop: 'value',
    };
    const componentsToMove = [
      { id: '2', prop: 'value2' },
      { id: '3', prop: 'value3' },
    ];

    expect(component.moveComponents(componentsToMove, parent)).toEqual({
      1: {
        id: '1',
        prop: 'value',
        children: ['2', '3'],
      },
      2: { id: '2', prop: 'value2', parent: '1' },
      3: { id: '3', prop: 'value3', parent: '1' },
    });
  });
});

describe('moveQuestionToSubSequence', () => {
  function transformToComponentsObject(components) {
    const res = {};
    for (const c of components) {
      res[c.id] = c;
    }
    return res;
  }
  test(`should return nothing if the parameter is undefined`, () => {
    expect(component.moveQuestionToSubSequence([], { parent: '1' })).toEqual();
  });
  test(`should return the previous activeComponents object if no question has to be moved`, () => {
    const parent = { id: '1', children: ['2', '3'] };
    const children = [
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: QUESTION },
    ];
    const activeComponents = transformToComponentsObject([parent, ...children]);
    expect(
      component.moveQuestionToSubSequence(activeComponents, children[1]),
    ).toEqual(activeComponents);
  });

  test(`should return the previous activeComponents object if the next component is not a question`, () => {
    const components = [
      { id: '1', children: ['2', '3'], type: SEQUENCE },
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: SUBSEQUENCE },
    ];
    const activeComponents = transformToComponentsObject(components);
    const newSubSequence = {
      id: '4',
      weight: 1,
      parent: '1',
      type: SUBSEQUENCE,
    };

    expect(
      component.moveQuestionToSubSequence(
        activeComponents,
        components[1],
        newSubSequence,
      ),
    ).toEqual(activeComponents);
  });

  test(`should return an object with the move of a question to the new subsequence`, () => {
    const components = [
      { id: '1', children: ['2', '3'], type: SEQUENCE },
      { id: '2', weight: 0, parent: '1', type: QUESTION },
      { id: '3', weight: 1, parent: '1', type: QUESTION },
    ];
    const activeComponents = transformToComponentsObject(components);
    const newSubSequence = {
      id: '4',
      weight: 1,
      parent: '1',
      type: SUBSEQUENCE,
    };

    const result = component.moveQuestionToSubSequence(
      activeComponents,
      components[1],
      newSubSequence,
    );

    expect(result['1']).toEqual({ id: '1', children: ['2'], type: SEQUENCE });
    expect(result['3']).toEqual({
      id: '3',
      weight: 0,
      parent: '4',
      type: QUESTION,
    });
    expect(result['4']).toEqual({
      id: '4',
      weight: 1,
      parent: '1',
      children: ['3'],
      type: SUBSEQUENCE,
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
    const newSubSequence = {
      id: '6',
      weight: 1,
      parent: '1',
      type: SUBSEQUENCE,
    };

    const results = component.moveQuestionToSubSequence(
      activeComponents,
      components[2],
      newSubSequence,
    );
    expect(results['2']).toEqual({
      id: '2',
      weight: 0,
      children: ['3'],
      type: SUBSEQUENCE,
    });
    expect(results['3']).toEqual({
      id: '3',
      weight: 0,
      parent: '2',
      type: QUESTION,
    });
    expect(results['4']).toEqual({
      id: '4',
      weight: 0,
      parent: '6',
      type: QUESTION,
    });
    expect(results['5']).toEqual({
      id: '5',
      weight: 2,
      parent: '1',
      type: QUESTION,
    });
    expect(results['6']).toEqual({
      id: '6',
      weight: 1,
      children: ['4'],
      parent: '1',
      type: SUBSEQUENCE,
    });
  });
});

describe('moveQuestionAndSubSequenceToSequence', () => {
  test('should return nothing if the parent does not exist', () => {
    const activeComponents = {
      2: { id: '2', parent: '1', children: [] },
    };
    expect(
      component.moveQuestionAndSubSequenceToSequence(activeComponents, '2'),
    ).toBe();
  });

  test('should return nothing if the selected component is a SEQUENCE', () => {
    const activeComponents = {
      1: { id: '1', children: ['2'] },
      2: { id: '2', parent: '1', type: SEQUENCE, children: [] },
    };
    expect(
      component.moveQuestionAndSubSequenceToSequence(activeComponents, '2'),
    ).toBe();
  });

  test('should return all changes need', () => {
    const activesComponents = {
      0: { id: '0', children: ['1', '7'] },
      1: { id: '1', weight: 0, type: SEQUENCE, children: ['2', '3', '4'] },
      2: { id: '2', weight: 0, type: QUESTION, parent: '1', children: [] },
      3: { id: '3', weight: 1, type: QUESTION, parent: '1', children: [] },
      4: {
        id: '4',
        weight: 2,
        type: SUBSEQUENCE,
        parent: '1',
        children: ['5', '6'],
      },
      5: { id: '5', weight: 0, type: QUESTION, parent: '4', children: [] },
      6: { id: '6', weight: 1, type: QUESTION, parent: '4', children: [] },
      7: { id: '7', weight: 1, type: SEQUENCE, children: ['8'] },
      8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
    };
    const newComponent = {
      id: '9',
      weight: 1,
      parent: '0',
      type: SEQUENCE,
      children: [],
    };

    const result = component.moveQuestionAndSubSequenceToSequence(
      activesComponents,
      activesComponents[2],
      newComponent,
    );
    expect(result['1']).toEqual({
      id: '1',
      weight: 0,
      type: SEQUENCE,
      children: ['2'],
    });
    expect(result['3']).toEqual({
      id: '3',
      weight: 0,
      type: QUESTION,
      parent: '9',
      children: [],
    });
    expect(result['4']).toEqual({
      id: '4',
      weight: 1,
      type: SUBSEQUENCE,
      parent: '9',
      children: ['5', '6'],
    });
    expect(result['7']).toEqual({
      id: '7',
      weight: 2,
      type: SEQUENCE,
      children: ['8'],
    });
    expect(result['9']).toEqual({
      id: '9',
      weight: 1,
      type: SEQUENCE,
      children: ['3', '4'],
      parent: '0',
    });
  });

  test('should move all child and sub-child when we have a complete tree', () => {
    const activesComponent = {
      j59pzbd3: {
        id: 'j59pzbd3',
        type: 'QUESTIONNAIRE',
        parent: '',
        weight: 0,
        children: ['j59prhlh', 'j59q527n'],
      },
      j59prhlh: {
        id: 'j59prhlh',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 0,
        children: ['j59q5b0a', 'j59pzrpn'],
      },
      j59q527n: {
        id: 'j59q527n',
        type: 'SEQUENCE',
        parent: 'j59pzbd3',
        weight: 1,
        children: ['j59psmyx'],
      },
      j59psmyx: {
        id: 'j59psmyx',
        type: 'SUBSEQUENCE',
        parent: 'j59q527n',
        weight: 0,
        children: ['j59q7yz4', 'j59q776o'],
      },
      j59q7yz4: {
        id: 'j59q7yz4',
        type: 'QUESTION',
        parent: 'j59psmyx',
        weight: 0,
        children: [],
      },
      j59q776o: {
        id: 'j59q776o',
        type: 'QUESTION',
        parent: 'j59psmyx',
        weight: 1,
        children: [],
      },
      j59q5b0a: {
        id: 'j59q5b0a',
        type: 'SUBSEQUENCE',
        parent: 'j59prhlh',
        weight: 0,
        name: 'SS1',
        label: 'SS1',
        children: ['j59q43n7', 'j59pzimf'],
      },
      j59pzrpn: {
        id: 'j59pzrpn',
        type: 'SUBSEQUENCE',
        parent: 'j59prhlh',
        weight: 1,
        name: 'SS2',
        label: 'SS2',
        children: ['j59py8s4', 'j59q5rk2'],
      },
      j59q43n7: {
        id: 'j59q43n7',
        type: 'QUESTION',
        parent: 'j59q5b0a',
        weight: 0,
        children: [],
      },
      j59pzimf: {
        id: 'j59pzimf',
        type: 'QUESTION',
        parent: 'j59q5b0a',
        weight: 1,
        children: [],
      },
      j59py8s4: {
        id: 'j59py8s4',
        type: 'QUESTION',
        parent: 'j59pzrpn',
        weight: 0,
        children: [],
      },
      j59q5rk2: {
        id: 'j59q5rk2',
        type: 'QUESTION',
        parent: 'j59pzrpn',
        weight: 1,
        children: [],
      },
    };
    const newComponent = {
      id: '9',
      weight: 0,
      parent: 'j59psmyx',
      type: SEQUENCE,
      children: [],
    };

    const result = component.moveQuestionAndSubSequenceToSequence(
      activesComponent,
      activesComponent.j59q43n7,
      newComponent,
    );
    expect(result['9']).toEqual({
      id: '9',
      weight: 0,
      parent: 'j59psmyx',
      type: SEQUENCE,
      children: ['j59pzimf', 'j59pzrpn'],
    });
  });
});

describe('duplicate', () => {
  const activesComponents = {
    0: { id: '0', children: ['1', '7'] },
    1: { id: '1', weight: 0, type: SEQUENCE, children: ['2', '3', '4'] },
    2: { id: '2', weight: 0, type: QUESTION, parent: '1', children: [] },
    3: { id: '3', weight: 1, type: QUESTION, parent: '1', children: [] },
    4: {
      id: '4',
      weight: 2,
      type: SUBSEQUENCE,
      parent: '1',
      children: ['5', '6'],
    },
    5: { id: '5', weight: 0, type: QUESTION, parent: '4', children: [] },
    6: { id: '6', weight: 1, type: QUESTION, parent: '4', children: [] },
    7: { id: '7', weight: 1, type: SEQUENCE, children: ['8'] },
    8: { id: '8', weight: 0, type: QUESTION, parent: '7', children: [] },
  };

  test('should duplicate the question', () => {
    const result = component.duplicate(activesComponents, '2');
    const newId = Object.keys(result).find(
      (id) => Object.keys(activesComponents).indexOf(id) < 0,
    );

    expect(result['1']).toEqual({
      id: '1',
      weight: 0,
      type: SEQUENCE,
      children: ['2', '3', '4', newId],
    });
    expect(result[newId]).toEqual({
      id: newId,
      weight: 1,
      type: result['2'].type,
      parent: result['2'].parent,
      children: [],
    });
    expect(result['3']).toEqual({
      id: '3',
      weight: 2,
      type: QUESTION,
      parent: '1',
      children: [],
    });
    expect(result['4']).toEqual({
      id: '4',
      weight: 3,
      type: SUBSEQUENCE,
      parent: '1',
      children: ['5', '6'],
    });
  });

  test('should not duplicate a subsequence', () => {
    const result = component.duplicate(activesComponents, '4');
    expect(result).toEqual({});
  });

  test('should not duplicate a sequence', () => {
    const result = component.duplicate(activesComponents, '7');
    expect(result).toEqual({});
  });
});

describe('duplicateComponentAndVars', () => {
  const activesComponents = {
    jkwc0i4n: {
      id: 'jkwc0i4n',
      name: 'S',
      parent: 'jkwbl1oe',
      weight: 0,
      children: ['jkwdir4v'],
      declarations: {},
      controls: {},
      redirections: {},
      TargetMode: [''],
      label: 's',
      type: 'SEQUENCE',
    },
    jkwdir4v: {
      id: 'jkwdir4v',
      name: 'QUESTIONTO',
      parent: 'jkwc0i4n',
      weight: 0,
      children: [],
      declarations: {
        jkwdi6l9: {
          id: 'jkwdi6l9',
          label: 'nouvelle declaration',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
        },
      },
      controls: {
        jkwdfr6t: {
          id: 'jkwdfr6t',
          label: 'nouveau controle',
          condition: 'controle',
          message: 'erreur',
          criticity: 'INFO',
          during_collect: false,
          post_collect: false,
        },
      },
      redirections: {
        jkwdewpy: {
          id: 'jkwdewpy',
          label: 'redirection',
          condition: 'true',
          cible: 'jkwdgfco',
        },
      },
      TargetMode: [''],
      type: 'QUESTION',
      label: 'question to duplicate',
      responseFormat: {
        type: 'SIMPLE',
        SIMPLE: {
          id: 'jkwdhl3h',
          type: 'TEXT',
          mandatory: false,
          TEXT: {
            maxLength: 255,
          },
        },
      },
      collectedVariables: ['jkwd6r31'],
    },
    jkwbl1oe: {
      id: 'jkwbl1oe',
      name: 'sdfsSDFS',
      parent: '',
      weight: 0,
      children: ['jkwc0i4n'],
      declarations: {},
      controls: {},
      redirections: {},
      TargetMode: [''],
      label: 'sdfs',
      type: 'QUESTIONNAIRE',
    },
  };
  const collectedVariables = {
    jkwd6r31: {
      id: 'jkwd6r31',
      name: 'QUESTIONTO',
      label: 'QUESTIONTO label',
      type: 'TEXT',
      codeListReferenceLabel: '',
      TEXT: {
        maxLength: 255,
      },
    },
  };
  const idComponent = 'jkwdir4v';
  const output = component.duplicateComponentAndVars(
    activesComponents,
    collectedVariables,
    idComponent,
  );

  const newId = Object.keys(output.activeComponentsById).find(
    (id) => Object.keys(activesComponents).indexOf(id) < 0,
  );

  const duplicated = output.activeComponentsById[idComponent];
  const duplicate = output.activeComponentsById[newId];

  test('should reset controls and redirections for the duplicate', () => {
    expect(duplicate.redirections).toEqual({});
    expect(duplicate.controls).toEqual({});
  });
  test('should regenerate an ID for the collected variable', () => {
    expect(duplicate.collectedVariables).not.toEqual(
      duplicated.collectedVariables,
    );
    expect(
      Object.keys(output.activeCollectedVariablesById[duplicate.id]),
    ).toEqual(duplicate.collectedVariables);
  });
  test('should regenerate an ID for the responses', () => {
    expect(
      duplicate.responseFormat[duplicate.responseFormat.type].id,
    ).not.toEqual(duplicated.responseFormat[duplicated.responseFormat.type].id);
  });
  test('should regenerate an ID for the declarations', () => {
    expect(Object.keys(duplicate.declarations)).not.toEqual(
      Object.keys(duplicated.declarations),
    );
    Object.keys(duplicate.declarations).forEach((declarationId) => {
      expect(declarationId).toBe(duplicate.declarations[declarationId].id);
    });
  });
});
