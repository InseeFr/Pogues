jest.dontMock('./goto-select');

import _ from 'lodash';

import GotoSelectContainer, { mapStateToProps } from './goto-select';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('Layout - Go to select container', () => {
  const activeComponentsById = {
    questionnaire: {
      id: 'questionnaire',
      type: 'QUESTIONNAIRE',
      parent: '',
      weight: 0,
      label: 'This is a questionnaire',
      children: ['sequence1', 'sequence2', 'sequence3'],
    },
    sequence1: {
      id: 'sequence1',
      type: 'SEQUENCE',
      parent: 'questionnaire',
      weight: 0,
      label: 'This is sequence 1',
      children: ['question1', 'subsequence11', 'subsequence12'],
    },
    sequence2: {
      id: 'sequence2',
      type: 'SEQUENCE',
      parent: 'questionnaire',
      weight: 1,
      label: 'This is sequence 2',
      children: ['subsequence21'],
    },
    sequence3: {
      id: 'sequence3',
      type: 'SEQUENCE',
      parent: 'questionnaire',
      weight: 2,
      label: 'This is sequence 3',
      children: ['subsequence31'],
    },
    question1: {
      id: 'question1',
      type: 'QUESTION',
      parent: 'sequence1',
      weight: 0,
      label: 'This is the question question 1',
      children: [],
    },
    subsequence11: {
      id: 'subsequence11',
      type: 'SUBSEQUENCE',
      parent: 'sequence1',
      weight: 1,
      label: 'This is sub-sequence 1 - 1',
      children: ['question3'],
    },
    question3: {
      id: 'question3',
      type: 'QUESTION',
      parent: 'subsequence11',
      weight: 0,
      label: 'This is the question question 3',
      children: [],
    },
    subsequence12: {
      id: 'subsequence12',
      type: 'SUBSEQUENCE',
      parent: 'sequence1',
      weight: 2,
      label: 'This is sub-sequence 1 - 2',
      children: [],
    },
    subsequence21: {
      id: 'subsequence21',
      type: 'SUBSEQUENCE',
      parent: 'sequence2',
      weight: 0,
      label: 'This is sub-sequence 2 - 1',
      children: [],
    },
    subsequence31: {
      id: 'subsequence31',
      type: 'SUBSEQUENCE',
      parent: 'sequence3',
      weight: 0,
      label: 'This is sub-sequence 3 - 1',
      children: ['question2'],
    },
    question2: {
      id: 'question2',
      type: 'QUESTION',
      parent: 'subsequence31',
      weight: 0,
      label: 'This is the question question 2',
      children: [],
    },
  };

  const question = {
    id: 'question',
    type: 'QUESTION',
    parent: '',
    weight: 0,
    label: 'This is a question',
    children: [],
  };

  test('should exist', () => {
    expect(GotoSelectContainer).toBeDefined();
  });
  describe('Updating existing component', () => {
    test('Targets when the parent is a sequence and the component a question', () => {
      let currentActiveComponentsById = _.cloneDeep(activeComponentsById);

      /*
       Questionnaire structure:

       questionnaire
       --> sequence1
       ----> question         <- Updating component
       ----> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: question1, subsequence11, question3, subsequence12, sequence2, subsequence21, sequence3,
       subsequence31, question2
       */

      currentActiveComponentsById = {
        ...currentActiveComponentsById,
        sequence1: {
          ...currentActiveComponentsById.sequence1,
          children: [...currentActiveComponentsById.sequence1.children, question.id],
        },
        question1: {
          ...currentActiveComponentsById.question1,
          weight: 1,
        },
        subsequence11: {
          ...currentActiveComponentsById.subsequence11,
          weight: 2,
        },
        subsequence12: {
          ...currentActiveComponentsById.subsequence12,
          weight: 3,
        },
        [question.id]: {
          ...question,
          parent: 'sequence1',
        },
      };

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById: currentActiveComponentsById,
          selectedComponentId: question.id,
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'question1',
            label: '-- This is the question question 1',
          },
          {
            value: 'subsequence11',
            label: '-- This is sub-sequence 1 - 1',
          },
          {
            value: 'question3',
            label: '--- This is the question question 3',
          },
          {
            value: 'subsequence12',
            label: '-- This is sub-sequence 1 - 2',
          },
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: QUESTION, isNewComponent: false })).toEqual(expectedValues);
    });

    test('Targets when the parent is a subsequence and the component a question', () => {
      let currentActiveComponentsById = _.cloneDeep(activeComponentsById);

      /*
       Questionnaire structure:

       questionnaire
       --> sequence1
       ----> question1
       ----> subsequence11
       ------> question3
       ------> question         <- Updating component
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: subsequence12, sequence2, subsequence21, sequence3, subsequence31, question2
       */

      currentActiveComponentsById = {
        ...currentActiveComponentsById,
        subsequence11: {
          ...currentActiveComponentsById.subsequence11,
          children: [...currentActiveComponentsById.subsequence11.children, question.id],
        },
        [question.id]: {
          ...question,
          parent: 'subsequence11',
          weight: 1,
        },
      };

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById: currentActiveComponentsById,
          selectedComponentId: question.id,
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'subsequence12',
            label: '-- This is sub-sequence 1 - 2',
          },
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: QUESTION, isNewComponent: false })).toEqual(expectedValues);
    });

    test('Targets when the parent is a sequence and the component a subsequence', () => {
      /*
       Questionnaire structure:

       questionnaire
       --> sequence1
       ----> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12         <- Updating component
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: sequence2, subsequence21, sequence3, subsequence31, question2
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: 'subsequence12',
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: SUBSEQUENCE, isNewComponent: false })).toEqual(expectedValues);
    });

    test('Targets when the parent is a questionnaire and the component a sequence', () => {
      /*
       Questionnaire structure:

       questionnaire
       --> sequence1
       ------> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12
       --> sequence2          <- Updating component
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: subsequence21, sequence3, subsequence31, question2
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: 'sequence2',
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: SEQUENCE, isNewComponent: false })).toEqual(expectedValues);
    });
  });

  describe('Creating a new component', () => {
    test('Targets when parent: sequence1, weight: 0 and type: QUESTION', () => {
      /*
       Questionnaire structure:

       questionnaire
       --> sequence1         <- Parent of the new component
       ---->                 <- Weight of the new component (0)
       ----> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: question1, subsequence11, question3, subsequence12, sequence2, subsequence21, sequence3,
       subsequence31, question2
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: 'sequence1',
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'question1',
            label: '-- This is the question question 1',
          },
          {
            value: 'subsequence11',
            label: '-- This is sub-sequence 1 - 1',
          },
          {
            value: 'question3',
            label: '--- This is the question question 3',
          },
          {
            value: 'subsequence12',
            label: '-- This is sub-sequence 1 - 2',
          },
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: QUESTION, isNewComponent: true })).toEqual(expectedValues);
    });

    test('Targets when parent: subsequence11, weight: 0 and type: QUESTION', () => {
      /*
       Questionnaire structure:

       questionnaire
       --> sequence1
       ----> question1
       ----> subsequence11    <- Parent of the new component
       ------>                <- Weight of the new component (0)
       ------> question3
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: question3, subsequence12, sequence2, subsequence21, sequence3, subsequence31, question2
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: 'subsequence11',
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'question3',
            label: '--- This is the question question 3',
          },
          {
            value: 'subsequence12',
            label: '-- This is sub-sequence 1 - 2',
          },
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: QUESTION, isNewComponent: true })).toEqual(expectedValues);
    });
    test('Targets when parent: sequence1, weight: 0 and type: SUBSEQUENCE', () => {
      /*
       Questionnaire structure:

       questionnaire
       --> sequence1          <- Parent of the new component
       ---->                  <- Weight of the new component (0)
       ----> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2

       Expected result: question1, subsequence11, question3, subsequence12, sequence2, subsequence21, sequence3,
       subsequence31, question2
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: 'sequence1',
        },
      };

      const expectedValues = {
        targets: [
          {
            value: 'question1',
            label: '-- This is the question question 1',
          },
          {
            value: 'subsequence11',
            label: '-- This is sub-sequence 1 - 1',
          },
          {
            value: 'question3',
            label: '--- This is the question question 3',
          },
          {
            value: 'subsequence12',
            label: '-- This is sub-sequence 1 - 2',
          },
          {
            value: 'sequence2',
            label: '- This is sequence 2',
          },
          {
            value: 'subsequence21',
            label: '-- This is sub-sequence 2 - 1',
          },
          {
            value: 'sequence3',
            label: '- This is sequence 3',
          },
          {
            value: 'subsequence31',
            label: '-- This is sub-sequence 3 - 1',
          },
          {
            value: 'question2',
            label: '--- This is the question question 2',
          },
        ],
      };

      expect(mapStateToProps(state, { componentType: SUBSEQUENCE, isNewComponent: true })).toEqual(expectedValues);
    });
    test('Targets when parent: questionnaire, weight: 0 and type: SEQUENCE', () => {
      /*
       Questionnaire structure:

       questionnaire          <- Parent of the new component
       --> sequence1
       ----> question1
       ----> subsequence11
       ------> question3
       ----> subsequence12
       --> sequence2
       ----> subsequence21
       --> sequence3
       ----> subsequence31
       ------> question2
       -->                    <- Weight of the new component (3)

       Expected result:
       */

      const state = {
        appState: {
          activeQuestionnaire: {
            id: 'questionnaire',
          },
          activeComponentsById,
          selectedComponentId: '',
        },
      };

      const expectedValues = {
        targets: [],
      };

      expect(mapStateToProps(state, { componentType: SEQUENCE, isNewComponent: true })).toEqual(expectedValues);
    });
  });
});
