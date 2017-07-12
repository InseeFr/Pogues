jest.dontMock('./component.js');

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Component, { defaultComponentState } from './component';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

describe('Transformation entities - Component', () => {
  test('modelToState with a QUESTION', () => {
    const model = {
      depth: 2,
      genericName: '',
      id: 'j4fa6x79',
      label: ['This is the label'],
      name: 'THISIS',
      questionType: 'SIMPLE',
      type: 'QuestionType',
      parent: 'j4e9h4f9',
      weight: '0',
      responses: [
        {
          datatype: {
            type: 'NumericDatatypeType',
            maximum: 99999999,
            minimum: 0,
            decimals: 2,
            typeName: 'NUMERIC',
          },
          mandatory: false,
        },
      ],
    };
    const expected = {
      ...defaultComponentState,
      id: model.id,
      type: QUESTION,
      depth: model.depth,
      name: model.name,
      label: model.label[0],
      rawLabel: model.label[0],
      parent: model.parent,
      weight: model.weight,
      responseFormat: {
        type: model.questionType,
        [model.questionType]: {
          type: 'NUMERIC',
          mandatory: false,
          NUMERIC: {
            maximum: 99999999,
            minimum: 0,
            decimals: 2,
          },
        },
      },
    };

    // console.log(Component.modelToState(model));

    expect(Component.modelToState(model)).toEqual(expected);
  });
  test('modelToState with a QUESTIONNAIRE', () => {
    const model = {
      depth: 0,
      genericName: 'QUESTIONNAIRE',
      id: 'j4e9h4f9',
      label: ['This is the label'],
      name: 'THISIS',
      type: 'SequenceType',
      children: [
        {
          id: 'ret5454',
        },
        {
          id: 'aer5454',
        },
      ],
    };
    const expected = {
      ...defaultComponentState,
      id: model.id,
      type: QUESTIONNAIRE,
      depth: model.depth,
      name: model.name,
      label: model.label[0],
      parent: '',
      weight: 0,
      children: ['ret5454', 'aer5454'],
    };
    expect(Component.modelToState(model)).toEqual(expected);
  });
  test('modelToState with a SEQUENCE', () => {
    const model = {
      depth: 1,
      genericName: 'MODULE',
      id: 'j4e9h4f9',
      label: ['This is the label'],
      name: 'THISIS',
      type: 'SequenceType',
      parent: '545sdf',
      weight: 5,
      children: [
        {
          id: 'ret5454',
        },
        {
          id: 'aer5454',
        },
      ],
    };
    const expected = {
      ...defaultComponentState,
      id: model.id,
      type: SEQUENCE,
      depth: model.depth,
      name: model.name,
      label: model.label[0],
      parent: model.parent,
      weight: model.weight,
      children: ['ret5454', 'aer5454'],
    };
    expect(Component.modelToState(model)).toEqual(expected);
  });
  test('modelToState with a SUBSEQUENCE', () => {
    const model = {
      depth: 2,
      genericName: 'MODULE',
      id: 'j4e9h4f9',
      label: ['This is the label'],
      name: 'THISIS',
      type: 'SequenceType',
      parent: '545sdf',
      weight: 2,
      children: [
        {
          id: 'ret5454',
        },
        {
          id: 'aer5454',
        },
      ],
    };
    const expected = {
      ...defaultComponentState,
      id: model.id,
      type: SUBSEQUENCE,
      depth: model.depth,
      name: model.name,
      label: model.label[0],
      parent: model.parent,
      weight: model.weight,
      children: ['ret5454', 'aer5454'],
    };
    expect(Component.modelToState(model)).toEqual(expected);
  });
  test('stateToModel with QUESTION', () => {
    const state = {
      ...defaultComponentState,
      id: 'j4e9h4f9',
      type: QUESTION,
      depth: 4,
      name: 'THISISQ',
      label: 'This is a question',
    };
    const expected = {
      depth: state.depth,
      genericName: '',
      id: 'j4e9h4f9',
      label: ['This is a question'],
      name: 'THISISQ',
      type: 'QuestionType',
    };
    expect(Component.stateToModel(state)).toEqual(expected);
  });
  test('stateToModel with QUESTIONNAIRE', () => {
    const state = {
      ...defaultComponentState,
      id: 'j4e9h4f9',
      type: QUESTIONNAIRE,
      depth: 0,
      name: 'THISISQ',
      label: 'This is a questionnaire',
    };
    const expected = {
      depth: state.depth,
      genericName: 'QUESTIONNAIRE',
      id: 'j4e9h4f9',
      label: ['This is a questionnaire'],
      name: 'THISISQ',
      type: 'SequenceType',
    };
    expect(Component.stateToModel(state)).toEqual(expected);
  });
  test('formToState with SEQUENCE', () => {
    const form = {
      label: 'This is the sequence/subsequence',
    };
    const id = 'xxxxxx01';
    const parent = 'j4tv05xr';
    const type = 'SEQUENCE';
    const weight = 0;
    const expected = {
      id,
      type,
      parent,
      weight: 0,
      name: 'THISISTHES',
      label: 'This is the sequence/subsequence',
      rawLabel: undefined,
      responseFormat: undefined,
      children: [],
    };
    expect(Component.formToState({ ...form, id, parent, type, weight })).toEqual(expected);
  });
  test('formToState with QUESTION', () => {
    const form = {
      label: 'This is the question',
      responseFormat: {
        type: 'SIMPLE',
        SIMPLE: {
          mandatory: true,
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: 'This is the pattern',
          },
        },
      },
    };
    const id = 'xxxxxx01';
    const parent = 'j4tv05xr';
    const type = 'QUESTION';
    const weight = 0;
    const expected = {
      id,
      type,
      parent,
      weight: 0,
      name: 'THISISTHEQ',
      label: 'This is the question',
      rawLabel: 'This is the question',
      children: [],
      responseFormat: {
        type: 'SIMPLE',
        SIMPLE: {
          mandatory: true,
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: 'This is the pattern',
          },
        },
      },
    };
    expect(Component.formToState({ ...form, id, parent, type, weight })).toEqual(expected);
  });
});
