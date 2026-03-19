import { describe, expect, test } from 'vitest';

import {
  CHOICE_TYPE,
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
} from '@/constants/pogues-constants';

import { isLoopsValid } from './loops-validity';

const { QUESTION, LOOP } = COMPONENT_TYPE;
const { SINGLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { VARIABLE } = CHOICE_TYPE;

describe('isLoopsValid', () => {
  const activeQuestionnaire = { childQuestionnaireRef: [] };

  test('returns false when single choice variable scope points to a deleted loop', () => {
    const componentsStore = {
      question1: {
        id: 'question1',
        type: QUESTION,
        responseFormat: {
          type: SINGLE_CHOICE,
          [SINGLE_CHOICE]: {
            choiceType: VARIABLE,
            Variable: {
              id: 'variable1',
            },
          },
        },
      },
    };

    const codeListsStore = {
      variable1: {
        id: 'variable1',
        label: 'variable 1',
        name: 'VAR1',
        scope: 'loop1',
      },
    };

    expect(
      isLoopsValid(componentsStore, activeQuestionnaire, {}, codeListsStore),
    ).toBe(false);
  });

  test('returns false when table variable scope points to a deleted loop', () => {
    const componentsStore = {
      question1: {
        id: 'question1',
        type: QUESTION,
        responseFormat: {
          type: TABLE,
          [TABLE]: {
            PRIMARY: {
              type: 'LIST',
            },
            LIST_MEASURE: [
              {
                type: SINGLE_CHOICE,
                [SINGLE_CHOICE]: {
                  choiceType: VARIABLE,
                  Variable: {
                    id: 'variable1',
                  },
                },
              },
            ],
          },
        },
      },
    };

    const codeListsStore = {
      variable1: {
        id: 'variable1',
        label: 'variable 1',
        name: 'VAR1',
        scope: 'loop1',
      },
    };

    expect(
      isLoopsValid(componentsStore, activeQuestionnaire, {}, codeListsStore),
    ).toBe(false);
  });

  test('returns true when variable scope points to an existing loop', () => {
    const componentsStore = {
      sequenceStart: {
        id: 'sequenceStart',
        type: COMPONENT_TYPE.SEQUENCE,
        weight: 1,
      },
      sequenceEnd: {
        id: 'sequenceEnd',
        type: COMPONENT_TYPE.SEQUENCE,
        weight: 1,
      },
      loop1: {
        id: 'loop1',
        type: LOOP,
        initialMember: 'sequenceStart',
        finalMember: 'sequenceEnd',
      },
      question1: {
        id: 'question1',
        type: QUESTION,
        responseFormat: {
          type: SINGLE_CHOICE,
          [SINGLE_CHOICE]: {
            choiceType: VARIABLE,
            Variable: {
              id: 'variable1',
            },
          },
        },
      },
      question2: {
        id: 'question2',
        type: QUESTION,
        responseFormat: {
          type: TABLE,
          [TABLE]: {
            PRIMARY: {
              type: 'LIST',
            },
            LIST_MEASURE: [
              {
                type: SINGLE_CHOICE,
                [SINGLE_CHOICE]: {
                  choiceType: VARIABLE,
                  Variable: {
                    id: 'variable1',
                  },
                },
              },
            ],
          },
        },
      },
    };

    const codeListsStore = {
      variable1: {
        id: 'variable1',
        label: 'variable 1',
        name: 'VAR1',
        scope: 'loop1',
      },
    };

    expect(
      isLoopsValid(componentsStore, activeQuestionnaire, {}, codeListsStore),
    ).toBe(true);
  });
});
