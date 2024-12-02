import { describe, expect, test } from 'vitest';

import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  CREATE_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import actionsHandlers, {
  loadQuestionnaireSuccess,
} from './component-by-questionnaire';

describe('loadQuestionnaireSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireSuccess(
      { state: 'previous' },
      {
        update: {
          componentByQuestionnaire: {
            componentByQuestionnaire: 'componentByQuestionnaire',
          },
        },
      },
    );
    expect(result).toEqual({
      componentByQuestionnaire: 'componentByQuestionnaire',
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
              componentByQuestionnaire: {
                componentByQuestionnaire: 'componentByQuestionnaire',
              },
            },
          },
        },
      );
      expect(result).toEqual({
        componentByQuestionnaire: 'componentByQuestionnaire',
      });
    });
  });
});
