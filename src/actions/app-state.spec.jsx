import { describe, expect, test } from 'vitest';

import {
  SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
  SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  SET_ACTIVE_CODE_LISTS,
  SET_ACTIVE_COMPONENTS,
  SET_ACTIVE_QUESTIONNAIRE,
  SET_SELECTED_COMPONENT,
  UPDATE_ACTIVE_QUESTIONNAIRE,
  removeControlsAndRedirections,
  saveActiveQuestionnaireFailure,
  saveActiveQuestionnaireSuccess,
  setActiveCodeLists,
  setActiveComponents,
  setActiveQuestionnaire,
  setSelectedComponentId,
  updateActiveQuestionnaire,
} from './app-state';

describe('removeControlsAndRedirections', () => {
  test('should reset redirections and controls properties of all components', () => {
    const input = {
      j6p0np9q: {
        id: 'j6p0np9q',
        name: 'READY',
        parent: 'j6p0ti5h',
        weight: 1,
        children: [],
        declarations: {},
        controls: {},
        redirections: {
          j6p6my1d: {
            id: 'j6p6my1d',
            label:
              'If you are not ready, please go to the end of the questionnaire',
            condition: "$READY != '1'",
            cible: 'j6z12s2d',
          },
        },
        TargetMode: [],
        type: 'QUESTION',
        label: 'Are you ready?',
        responseFormat: {
          type: 'SIMPLE',
          SIMPLE: {
            id: 'jbgd3set',
            type: 'BOOLEAN',
            mandatory: false,
            BOOLEAN: {},
          },
        },
        collectedVariables: ['jbcgm0ip'],
      },
      j6p0ti5h: {
        id: 'j6p0ti5h',
        name: 'MODULE1',
        parent: 'i6vwid',
        weight: 0,
        children: ['j6p0np9q'],
        declarations: {
          d1: {
            id: 'd1',
            label:
              "We're going to test your knowledge about the simpsons series.\n**Welcome in the simspons world!**",
            declarationType: 'COMMENT',
            position: 'AFTER_QUESTION_TEXT',
          },
        },
        controls: {},
        redirections: {},
        TargetMode: [],
        label: 'Introduction',
        type: 'SEQUENCE',
      },
      i6vwid: {
        id: 'i6vwid',
        name: 'SIMPSONS',
        parent: '',
        weight: 0,
        children: ['j6p0ti5h'],
        declarations: {},
        controls: {},
        redirections: {},
        TargetMode: ['CAWI'],
        label: 'Questionnaire SIMPSONS',
        type: 'QUESTIONNAIRE',
      },
    };
    const output = {
      j6p0np9q: {
        id: 'j6p0np9q',
        name: 'READY',
        parent: 'j6p0ti5h',
        weight: 1,
        children: [],
        declarations: {},
        controls: {},
        redirections: {},
        TargetMode: [],
        type: 'QUESTION',
        label: 'Are you ready?',
        responseFormat: {
          type: 'SIMPLE',
          SIMPLE: {
            id: 'jbgd3set',
            type: 'BOOLEAN',
            mandatory: false,
            BOOLEAN: {},
          },
        },
        collectedVariables: ['jbcgm0ip'],
      },
      j6p0ti5h: {
        id: 'j6p0ti5h',
        name: 'MODULE1',
        parent: 'i6vwid',
        weight: 0,
        children: ['j6p0np9q'],
        declarations: {
          d1: {
            id: 'd1',
            label:
              "We're going to test your knowledge about the simpsons series.\n**Welcome in the simspons world!**",
            declarationType: 'COMMENT',
            position: 'AFTER_QUESTION_TEXT',
          },
        },
        controls: {},
        redirections: {},
        TargetMode: [],
        label: 'Introduction',
        type: 'SEQUENCE',
      },
      i6vwid: {
        id: 'i6vwid',
        name: 'SIMPSONS',
        parent: '',
        weight: 0,
        children: ['j6p0ti5h'],
        declarations: {},
        controls: {},
        redirections: {},
        TargetMode: ['CAWI'],
        label: 'Questionnaire SIMPSONS',
        type: 'QUESTIONNAIRE',
      },
    };
    expect(removeControlsAndRedirections(input)).toEqual(output);
  });
});

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
    expect(setActiveCodeLists('activeCodeLists')).toEqual({
      type: SET_ACTIVE_CODE_LISTS,
      payload: {
        activeCodeLists: 'activeCodeLists',
      },
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
    expect(
      updateActiveQuestionnaire({
        id: 'id',
        name: 'name',
        label: 'label',
        serie: 'serie',
        operation: 'operation',
        campaigns: ['campaign'],
        final: 'final',
      }),
    ).toEqual({
      type: UPDATE_ACTIVE_QUESTIONNAIRE,
      payload: {
        name: 'name',
        label: 'label',
        serie: 'serie',
        operation: 'operation',
        campaigns: ['campaign'],
      },
    });
  });
});

describe('saveActiveQuestionnaireSuccess', () => {
  test('should return the right payload', () => {
    expect(saveActiveQuestionnaireSuccess('id', { update: 'update' })).toEqual({
      type: SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
      payload: {
        id: 'id',
        update: {
          update: 'update',
          isQuestionnaireModified: false,
          isQuestionnaireHaveError: false,
        },
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
        isQuestionnaireHaveError: true,
      },
    });
  });
});
