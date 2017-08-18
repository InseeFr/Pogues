jest.dontMock('./component.js');

import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import Component, { defaultComponentForm, defaultComponentState, defaultComponentModel } from './component';
import { defaultResponseFormatForm, defaultResponseFormatState, defaultResponseFormatModel } from './response-format';
import { defaultDeclarationForm, defaultDeclarationState } from './declaration';
import { defaultControlForm, defaultControlState } from './control';
import { defaultRedirectionForm, defaultRedirectionState } from './redirection';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

describe('Transformation entities - Component', () => {
  // Form

  const questionnaireForm = {
    label: 'This is a questionnaire',
  };

  const sequenceForm = {
    label: 'This is a sequence',
  };

  const subsequence = {
    label: 'This is a subsequence',
  };

  const questionForm = {
    label: 'This is a question',
    responseFormat: defaultResponseFormatForm,
    declarations: defaultDeclarationForm,
    controls: defaultControlForm,
    redirections: defaultRedirectionForm,
  };

  // State

  const questionnaireState = {
    id: 'jx564532',
    type: QUESTIONNAIRE,
    parent: '',
    weight: 0,
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    rawLabel: undefined,
    responseFormat: undefined,
    children: [],
    declarations: [],
    controls: [],
    redirections: [],
  };

  const sequenceState = {
    id: 'jx5hj532',
    type: SEQUENCE,
    parent: 'jx564532',
    weight: 0,
    name: 'THISISASEQ',
    label: 'This is a sequence',
    rawLabel: undefined,
    children: [],
    responseFormat: undefined,
    declarations: [],
    controls: [],
    redirections: [],
  };

  const subsequenceState = {
    id: 'jx504532',
    type: SUBSEQUENCE,
    parent: 'jx5hj532',
    weight: 0,
    name: 'THISISASUB',
    label: 'This is a subsequence',
    rawLabel: undefined,
    children: [],
    responseFormat: undefined,
    declarations: [],
    controls: [],
    redirections: [],
  };

  const questionState = {
    id: 'jxaz4532',
    type: QUESTION,
    parent: 'jx5hj532',
    weight: 0,
    name: 'THISISAQUE',
    label: 'This is a question',
    rawLabel: 'This is a question',
    children: [],
    responseFormat: defaultResponseFormatState,
    declarations: defaultDeclarationState,
    controls: defaultControlState,
    redirections: defaultRedirectionState,
  };

  const components = {
    jx564532: questionnaireState,
    jx5hj532: sequenceState,
    jx504532: subsequenceState,
    jxaz4532: questionState,
  };

  // Model

  const questionnaireModel = {
    id: 'jx564532',
    type: SEQUENCE_TYPE_NAME,
    name: 'THISISAQUE',
    label: ['This is a questionnaire'],
    genericName: 'QUESTIONNAIRE',
    depth: 0,
    questionType: '',
    children: [],
    responses: [],
    responseStructure: {
      dimensions: {},
    },
    declarations: [],
    controls: [],
    redirections: [],
  };
  const sequenceModel = {
    id: 'jx5hj532',
    type: SEQUENCE_TYPE_NAME,
    name: 'THISISASEQ',
    label: ['This is a sequence'],
    genericName: 'MODULE',
    depth: 1,
    questionType: '',
    children: [],
    responses: [],
    responseStructure: {
      dimensions: {},
    },
    declarations: [],
    controls: [],
    redirections: [],
  };

  const subsequenceModel = {
    id: 'jx504532',
    type: SEQUENCE_TYPE_NAME,
    name: 'THISISASUB',
    label: ['This is a subsequence'],
    genericName: 'MODULE',
    depth: 2,
    questionType: '',
    children: [],
    responses: [],
    responseStructure: {
      dimensions: {},
    },
    declarations: [],
    controls: [],
    redirections: [],
  };

  const questionModel = {
    id: 'jxaz4532',
    type: QUESTION_TYPE_NAME,
    name: 'THISISAQUE',
    label: ['This is a question'],
    genericName: '',
    depth: 2,
    children: [],
    declarations: [],
    controls: [],
    redirections: [],
    ...defaultResponseFormatModel,
  };

  test('Default form shape should be the expected', () => {
    const expectedForm = {
      label: '',
      name: '',
    };
    expect(defaultComponentForm).toEqual(expectedForm);
  });

  test('Default state shape should be the expected', () => {
    const expectedState = {
      id: undefined,
      type: undefined,
      parent: undefined,
      weight: undefined,
      name: undefined,
      label: undefined,
      rawLabel: undefined,
      children: [],
      responseFormat: undefined,
      declarations: [],
      controls: [],
      redirections: [],
    };
    expect(defaultComponentState).toEqual(expectedState);
  });

  test('Default model shape should be the expected', () => {
    const expectedModel = {
      id: '',
      type: '',
      name: '',
      label: [],
      genericName: '',
      depth: 0,
      questionType: '',
      children: [],
      responses: [],
      responseStructure: {
        dimensions: {},
      },
      declarations: [],
      controls: [],
      redirections: [],
    };
    expect(defaultComponentModel).toEqual(expectedModel);
  });

  describe('Form to state', () => {
    test('Questionnaire new', () => {
      const form = {
        ...questionnaireForm,
        id: 'jx564532',
        type: QUESTIONNAIRE,
      };
      expect(Component.formToState(form)).toEqual(questionnaireState);
    });

    test('Questionnaire update', () => {
      const form = {
        ...questionnaireForm,
        id: 'jx564532',
        type: QUESTIONNAIRE,
        name: 'custom name',
        children: ['jx5hj532'],
      };
      const expectedState = {
        ...questionnaireState,
        name: 'custom name',
        children: ['jx5hj532'],
      };
      expect(Component.formToState(form)).toEqual(expectedState);
    });

    test('Sequence new', () => {
      const form = {
        ...sequenceForm,
        id: 'jx5hj532',
        type: SEQUENCE,
        parent: 'jx564532',
        weight: 0,
      };
      expect(Component.formToState(form)).toEqual(sequenceState);
    });

    test('Sequence update', () => {
      const form = {
        ...sequenceForm,
        id: 'jx5hj532',
        type: SEQUENCE,
        parent: 'jx564532',
        weight: 0,
        name: 'custom name',
        children: ['x543479e'],
      };
      const expectedState = {
        ...sequenceState,
        name: 'custom name',
        children: ['x543479e'],
      };
      expect(Component.formToState(form)).toEqual(expectedState);
    });

    test('Sub-sequence new', () => {
      const form = {
        ...subsequence,
        id: 'jx504532',
        type: SUBSEQUENCE,
        parent: 'jx5hj532',
        weight: 0,
      };
      expect(Component.formToState(form)).toEqual(subsequenceState);
    });

    test('Sub-subsequence update', () => {
      const form = {
        ...subsequence,
        id: 'jx504532',
        type: SUBSEQUENCE,
        parent: 'jx5hj532',
        weight: 0,
        name: 'custom name',
        children: ['x543479e'],
      };
      const expectedState = {
        ...subsequenceState,
        name: 'custom name',
        children: ['x543479e'],
      };
      expect(Component.formToState(form)).toEqual(expectedState);
    });

    test('Question new', () => {
      const form = {
        ...questionForm,
        id: 'jxaz4532',
        type: QUESTION,
        parent: 'jx5hj532',
        weight: 0,
      };
      expect(Component.formToState(form)).toEqual(questionState);
    });

    test('Question update', () => {
      const form = {
        ...questionForm,
        id: 'jxaz4532',
        type: QUESTION,
        parent: 'jx5hj532',
        weight: 0,
        name: 'custom name',
      };
      const expectedState = {
        ...questionState,
        name: 'custom name',
      };
      expect(Component.formToState(form)).toEqual(expectedState);
    });
  });

  describe('State to form', () => {
    test('Questionnaire', () => {
      const expectedForm = {
        ...questionnaireForm,
        name: 'THISISAQUE',
      };
      expect(Component.stateToForm(questionnaireState)).toEqual(expectedForm);
    });

    test('Sequence', () => {
      const expectedForm = {
        ...sequenceForm,
        name: 'THISISASEQ',
      };
      expect(Component.stateToForm(sequenceState)).toEqual(expectedForm);
    });

    test('Sub-sequence', () => {
      const expectedForm = {
        ...subsequence,
        name: 'THISISASUB',
      };
      expect(Component.stateToForm(subsequenceState)).toEqual(expectedForm);
    });

    test('Question', () => {
      const expectedForm = {
        ...questionForm,
        name: 'THISISAQUE',
      };
      expect(Component.stateToForm(questionState)).toEqual(expectedForm);
    });
  });

  describe('State to Model', () => {
    test('Questionnaire', () => {
      const state = {
        ...questionnaireState,
        depth: 0,
      };
      expect(Component.stateToModel(state, components)).toEqual(questionnaireModel);
    });

    test('Questionnaire with sequence', () => {
      const state = {
        ...questionnaireState,
        depth: 0,
        children: ['jx5hj532'],
      };
      const expectedModel = {
        ...questionnaireModel,
        children: [sequenceModel],
      };
      expect(Component.stateToModel(state, components)).toEqual(expectedModel);
    });

    test.only('Questionnaire with sequence -> subsequence', () => {
      const customComponents = {
        ...components,
        aa5hj532: {
          id: 'aa5hj532',
          type: SEQUENCE,
          parent: 'jx564532',
          weight: 0,
          name: 'THISISASEQ',
          label: 'This is a sequence',
          rawLabel: undefined,
          children: ['jx504532'],
          responseFormat: undefined,
          declarations: [],
          controls: [],
          redirections: [],
        },
      };
      const state = {
        ...questionnaireState,
        depth: 0,
        children: ['aa5hj532'],
      };
      const expectedModel = {
        ...questionnaireModel,
        children: [
          {
            ...sequenceModel,
            id: 'aa5hj532',
            children: [subsequenceModel],
          },
        ],
      };
      expect(Component.stateToModel(state, customComponents)).toEqual(expectedModel);
    });

    test('Sequence', () => {
      const state = {
        ...sequenceState,
        depth: 1,
      };
      expect(Component.stateToModel(state, components)).toEqual(sequenceModel);
    });

    test('Sequence with subsequence', () => {
      const state = {
        ...sequenceState,
        depth: 1,
        children: ['jx504532'],
      };
      const expectedModel = {
        ...sequenceModel,
        children: [subsequenceModel],
      };
      expect(Component.stateToModel(state, components)).toEqual(expectedModel);
    });

    test('Sequence with subsequence and question', () => {
      const state = {
        ...sequenceState,
        depth: 1,
        children: ['jx504532', 'jxaz4532'],
      };
      const expectedModel = {
        ...sequenceModel,
        children: [subsequenceModel, questionModel],
      };
      expect(Component.stateToModel(state, components)).toEqual(expectedModel);
    });

    test('Subsequence', () => {
      const state = {
        ...subsequenceState,
        depth: 2,
      };
      expect(Component.stateToModel(state, components)).toEqual(subsequenceModel);
    });

    test('Question', () => {
      const state = {
        ...questionState,
        depth: 2,
      };
      expect(Component.stateToModel(state, components)).toEqual(questionModel);
    });
  });

  describe('Model to State', () => {
    test('Questionnaire', () => {
      expect(Component.modelToState(questionnaireModel)).toEqual(questionnaireState);
    });
    test('Questionnaire with sequence', () => {
      const model = {
        ...questionnaireModel,
        children: [sequenceModel],
      };
      const expectedState = {
        ...questionnaireState,
        children: ['jx5hj532'],
      };
      expect(Component.modelToState(model)).toEqual(expectedState);
    });
    test('Questionnaire with sequence -> question', () => {
      const model = {
        ...questionnaireModel,
        children: [
          {
            ...sequenceModel,
            children: [questionModel],
          },
        ],
      };
      const expectedState = {
        ...questionnaireState,
        children: ['jx5hj532'],
      };
      expect(Component.modelToState(model)).toEqual(expectedState);
    });
    test('Sequence', () => {
      const model = {
        ...sequenceModel,
        parent: 'jx564532',
        weight: 0,
      };

      expect(Component.modelToState(model)).toEqual(sequenceState);
    });
    test('Sequence with subsequence', () => {
      const model = {
        ...sequenceModel,
        parent: 'jx564532',
        weight: 0,
        children: [subsequenceModel],
      };
      const expectedState = {
        ...sequenceState,
        children: ['jx504532'],
      };
      expect(Component.modelToState(model)).toEqual(expectedState);
    });
    test('Subsequence', () => {
      const model = {
        ...subsequenceModel,
        parent: 'jx5hj532',
        weight: 0,
      };

      expect(Component.modelToState(model)).toEqual(subsequenceState);
    });
    test('Question', () => {
      const model = {
        ...questionModel,
        parent: 'jx5hj532',
        weight: 0,
      };

      expect(Component.modelToState(model)).toEqual(questionState);
    });
  });
});
