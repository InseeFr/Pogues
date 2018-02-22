import actionsHandlers, {
  loadQuestionnaireSuccess,
  loadQuestionnaireListSuccess
} from './component-by-questionnaire';
import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS
} from 'actions/questionnaire';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
describe('loadQuestionnaireSuccess', () => {
  test('when called directly', () => {
    const result = loadQuestionnaireSuccess(
      { state: 'previous' },
      {
        update: {
          componentByQuestionnaire: {
            componentByQuestionnaire: 'componentByQuestionnaire'
          }
        }
      }
    );
    expect(result).toEqual({
      state: 'previous',
      componentByQuestionnaire: 'componentByQuestionnaire'
    });
  });
  [
    LOAD_QUESTIONNAIRE_SUCCESS,
    CREATE_QUESTIONNAIRE_SUCCESS,
    SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS
  ].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              componentByQuestionnaire: {
                componentByQuestionnaire: 'componentByQuestionnaire'
              }
            }
          }
        }
      );
      expect(result).toEqual({
        state: 'previous',
        componentByQuestionnaire: 'componentByQuestionnaire'
      });
    });
  });
});
