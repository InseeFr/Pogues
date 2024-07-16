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
} from './code-list-by-questionnaire';

describe('loadQuestionnaireSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireSuccess(
      { state: 'previous' },
      {
        update: {
          codeListByQuestionnaire: {
            codeListByQuestionnaire: 'codeListByQuestionnaire',
          },
        },
      },
    );
    expect(result).toEqual({
      codeListByQuestionnaire: 'codeListByQuestionnaire',
    });
  });
  [
    LOAD_QUESTIONNAIRE_SUCCESS,
    CREATE_QUESTIONNAIRE_SUCCESS,
    SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  ].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              codeListByQuestionnaire: {
                codeListByQuestionnaire: 'codeListByQuestionnaire',
              },
            },
          },
        },
      );
      expect(result).toEqual({
        codeListByQuestionnaire: 'codeListByQuestionnaire',
      });
    });
  });
});

describe('loadQuestionnaireListSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireListSuccess({ state: 'previous' }, [
      { codeListByQuestionnaire: { 1: { id: '1' } } },
      { codeListByQuestionnaire: { 2: { id: '4' } } },
    ]);
    expect(result).toEqual({
      state: 'previous',
      1: { id: '1' },
      2: { id: '4' },
    });
  });
  [LOAD_QLIST_SUCCESS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: [
            { codeListByQuestionnaire: { 1: { id: '1' } } },
            { codeListByQuestionnaire: { 2: { id: '4' } } },
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
