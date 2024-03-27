import actionsHandlers, {
  loadQuestionnaireSuccess,
  loadQuestionnaireListSuccess,
} from './external-variable-by-questionnaire';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from '../actions/questionnaire-list';

describe('loadQuestionnaireSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireSuccess(
      { state: 'previous' },
      {
        update: {
          externalVariableByQuestionnaire: {
            externalVariableByQuestionnaire: 'externalVariableByQuestionnaire',
          },
        },
      },
    );
    expect(result).toEqual({
      externalVariableByQuestionnaire: 'externalVariableByQuestionnaire',
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
              externalVariableByQuestionnaire: {
                externalVariableByQuestionnaire:
                  'externalVariableByQuestionnaire',
              },
            },
          },
        },
      );
      expect(result).toEqual({
        externalVariableByQuestionnaire: 'externalVariableByQuestionnaire',
      });
    });
  });
});

describe('loadQuestionnaireListSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireListSuccess({ state: 'previous' }, [
      { externalVariableByQuestionnaire: { 1: { id: '1' } } },
      { externalVariableByQuestionnaire: { 2: { id: '4' } } },
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
            { externalVariableByQuestionnaire: { 1: { id: '1' } } },
            { externalVariableByQuestionnaire: { 2: { id: '4' } } },
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
