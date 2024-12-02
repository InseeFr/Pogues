import { describe, expect, test } from 'vitest';

import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  CREATE_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from '../actions/questionnaire-list';
import actionsHandlers, {
  loadQuestionnaireListSuccess,
  loadQuestionnaireSuccess,
} from './collected-variable-by-questionnaire';

describe('loadQuestionnaireSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireSuccess(
      { state: 'previous' },
      {
        update: {
          collectedVariableByQuestionnaire: {
            collectedVariableByQuestionnaire:
              'collectedVariableByQuestionnaire',
          },
        },
      },
    );
    expect(result).toEqual({
      state: 'previous',
      collectedVariableByQuestionnaire: 'collectedVariableByQuestionnaire',
    });
  });
  [
    LOAD_QUESTIONNAIRE_SUCCESS,
    CREATE_QUESTIONNAIRE_SUCCESS,
    SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  ].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              collectedVariableByQuestionnaire: {
                collectedVariableByQuestionnaire:
                  'collectedVariableByQuestionnaire',
              },
            },
          },
        },
      );
      expect(result).toEqual({
        state: 'previous',
        collectedVariableByQuestionnaire: 'collectedVariableByQuestionnaire',
      });
    });
  });
});

describe('loadQuestionnaireListSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireListSuccess({ state: 'previous' }, [
      { collectedVariableByQuestionnaire: { 1: { id: '1' } } },
      { collectedVariableByQuestionnaire: { 2: { id: '4' } } },
    ]);
    expect(result).toEqual({
      state: 'previous',
      1: { id: '1' },
      2: { id: '4' },
    });
  });
  [LOAD_QLIST_SUCCESS].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: [
            { collectedVariableByQuestionnaire: { 1: { id: '1' } } },
            { collectedVariableByQuestionnaire: { 2: { id: '4' } } },
          ],
        },
      );
      expect(result).toEqual({
        state: 'previous',
        1: { id: '1' },
        2: { id: '4' },
      });
    });
  });
});
