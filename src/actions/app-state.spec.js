import {
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
  setActiveDeclarations,
  setSelectedComponentId,
  updateActiveQuestionnaire,
  saveActiveQuestionnaireSuccess,
  saveActiveQuestionnaireFailure,
  saveActiveQuestionnaire,
  SET_ACTIVE_QUESTIONNAIRE,
  SET_ACTIVE_COMPONENTS,
  SET_ACTIVE_CODE_LISTS,
  SET_ACTIVE_DECLARATIONS,
  SET_SELECTED_COMPONENT,
  UPDATE_ACTIVE_QUESTIONNAIRE,
  SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
} from './app-state';

describe('setActiveQuestionnaire', () => {
  test('should return the right payload', () => {
    expect(setActiveQuestionnaire('setActiveQuestionnaire')).toEqual({
      type: SET_ACTIVE_QUESTIONNAIRE,
      payload: 'setActiveQuestionnaire',
    });
  });
});

describe('setActiveComponents', () => {
  test('should return the right payload', () => {
    expect(setActiveComponents('setActiveComponents')).toEqual({
      type: SET_ACTIVE_COMPONENTS,
      payload: 'setActiveComponents',
    });
  });
});

describe('setActiveCodeLists', () => {
  test('should return the right payload', () => {
    expect(setActiveCodeLists('activeCodeLists', 'activeCodes')).toEqual({
      type: SET_ACTIVE_CODE_LISTS,
      payload: {
        activeCodeLists: 'activeCodeLists',
        activeCodes: 'activeCodes',
      },
    });
  });
});

describe('setActiveDeclarations', () => {
  test('should return the right payload', () => {
    expect(setActiveDeclarations('setActiveDeclarations')).toEqual({
      type: SET_ACTIVE_DECLARATIONS,
      payload: 'setActiveDeclarations',
    });
  });
});

describe('setSelectedComponentId', () => {
  test('should return the right payload', () => {
    expect(setSelectedComponentId('setSelectedComponentId')).toEqual({
      type: SET_SELECTED_COMPONENT,
      payload: 'setSelectedComponentId',
    });
  });
});

describe('updateActiveQuestionnaire', () => {
  test('should return the right payload', () => {
    expect(updateActiveQuestionnaire('id', 'name', 'label')).toEqual({
      type: UPDATE_ACTIVE_QUESTIONNAIRE,
      payload: {
        id: 'id',
        name: 'name',
        label: 'label',
      },
    });
  });
});

describe('saveActiveQuestionnaireSuccess', () => {
  test('should return the right payload', () => {
    expect(saveActiveQuestionnaireSuccess('id', 'update')).toEqual({
      type: SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
      payload: {
        id: 'id',
        update: 'update',
      },
    });
  });
});

describe('saveActiveQuestionnaireFailure', () => {
  test('should return the right payload', () => {
    expect(saveActiveQuestionnaireFailure('id', 'err')).toEqual({
      type: SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
      payload: {
        id: 'id',
        err: 'err',
      },
    });
  });
});
