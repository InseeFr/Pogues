import {
  getQuestionnaire,
  postQuestionnaire,
  deleteQuestionnaire,
} from 'utils/remote-api';
import { uuid, getSupWeight } from 'utils/utils';
import { questionnaireRemoteToStores } from 'model/remote-to-stores';

import * as Questionnaire from 'model/transformations/questionnaire';
import { Component } from 'widgets/component-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_START = 'LOAD_QUESTIONNAIRE_START';
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS';
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE';
export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE';
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS';
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE_SUCCESS = 'DELETE_QUESTIONNAIRE_SUCCESS';
export const DELETE_QUESTIONNAIRE_FAILURE = 'DELETE_QUESTIONNAIRE_FAILURE';
export const DUPLICATE_QUESTIONNAIRE = 'DUPLICATE_QUESTIONNAIRE';
export const MERGE_QUESTIONNAIRE = 'MERGE_QUESTIONNAIRE';
export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

/**
 * Load questionnaire success
 *
 * It's executed after the remote fetch of a questionnaire.
 *
 * The parameter "update" is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to represent locally the questionnaire.
 *
 * It will update the stores:
 * - questionnaireById
 * - componentById
 * - componentByQuestionnaire
 * - conditionById
 *
 * @param   {object} update The new values to update in the different stores affected.
 * @return  {object}        LOAD_QUESTIONNAIRE_SUCCESS action.
 */
export const loadQuestionnaireSuccess = update => ({
  type: LOAD_QUESTIONNAIRE_SUCCESS,
  payload: {
    update,
  },
});

/**
 * Load questionnaire failure
 *
 * It's executed after the fail of a remote questionnaire's fetch.
 *
 * @param   {string} id    The questionnaire id
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_QUESTIONNAIRE_FAILURE action
 */
export const loadQuestionnaireFailure = (id, err) => ({
  type: LOAD_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

/**
 * Load questionnaire failure
 *
 *  * It's executed before the remote fetch of a questionnaire.
 *
 * @return  {object}       LOAD_QUESTIONNAIRE_START action
 */
export const loadQuestionnaireStart = () => ({
  type: LOAD_QUESTIONNAIRE_START,
  payload: {},
});

/**
 * Load questionnaire
 *
 * Asyc action that fetch a questionnaire.
 *
 * @param   {string}    id  The questionnaire id.
 * @return  {function}      Thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or LOAD_QUESTIONNAIRE_FAILURE
 */
export const loadQuestionnaire = (id, token) => dispatch => {
  dispatch(loadQuestionnaireStart());
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  return getQuestionnaire(id, token)
    .then(qr => {
      dispatch(loadQuestionnaireSuccess(questionnaireRemoteToStores(qr)));
    })
    .catch(err => {
      dispatch(loadQuestionnaireFailure(id, err));
    });
};

/**
 * Create Questionnaire success
 *
 * It's executed after the remote creation of a questionnaire.
 *
 *  * It will update the stores:
 * - questionnaireById
 * - componentByQuestionnaire
 *
 * @param   {id}      id      The questionnaire id.
 * @param   {object}  update  The new values to update in the different stores affected.
 * @return  {object}          CREATE_QUESTIONNAIRE_SUCCESS action
 */
export const createQuestionnaireSuccess = (id, update) => ({
  type: CREATE_QUESTIONNAIRE_SUCCESS,
  payload: {
    id,
    update,
  },
});

/**
 * Create questionnaire failure
 *
 * @param   {string}  err The error returned for the creation process.
 * @return  {object}      CREATE_QUESTIONNAIRE_FAILURE action
 */
export const createQuestionnaireFailure = err => ({
  type: CREATE_QUESTIONNAIRE_FAILURE,
  payload: err,
});

/**
 * Create a questionnaire
 *
 * Asyc action that creates a questionnaire.
 *
 * @param   {string}   name  The questionnaire name.
 * @param   {string}   label The questionnaire label.
 * @return  {function}       Thunk which may dispatch CREATE_QUESTIONNAIRE_SUCCESS or CREATE_QUESTIONNAIRE_FAILURE
 */
export const createQuestionnaire =
  (questionnaireNewState, token) => (dispatch, getState) => {
    const state = getState();
    const stores = {
      componentsStore: Component({
        ...questionnaireNewState,
        type: QUESTIONNAIRE,
      }).getStore(),
      codesListsStore: {},
      calculatedVariablesStore: {},
      externalVariablesStore: {},
      collectedVariableByQuestionStore: {},
      campaignsStore: state.metadataByType.campaigns,
    };
    const questionnaireModel = Questionnaire.stateToRemote(
      questionnaireNewState,
      stores,
    );

    dispatch({
      type: CREATE_QUESTIONNAIRE,
      payload: null,
    });

    return postQuestionnaire(questionnaireModel, token)
      .then(() => {
        return dispatch(
          createQuestionnaireSuccess(
            questionnaireNewState.id,
            questionnaireRemoteToStores(questionnaireModel),
          ),
        );
      })
      .catch(err => {
        return dispatch(createQuestionnaireFailure(err));
      });
  };

export const removeQuestionnaireSuccess = payload => ({
  type: DELETE_QUESTIONNAIRE_SUCCESS,
  payload,
});

export const removeQuestionnaireFailure = (id, err) => ({
  type: DELETE_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

export const removeQuestionnaire =
  (idQuestionnaire, token) => (dispatch, getState) => {
    dispatch({
      type: DELETE_QUESTIONNAIRE,
      payload: idQuestionnaire,
    });

    const state = getState().questionnaireById;

    const questionnairesList = Object.keys(state).reduce((acc, currentId) => {
      if (currentId !== idQuestionnaire) {
        return {
          ...acc,
          [currentId]: {
            ...state[currentId],
          },
        };
      }
      return acc;
    }, {});

    return deleteQuestionnaire(idQuestionnaire, token)
      .then(() => {
        return dispatch(removeQuestionnaireSuccess(questionnairesList));
      })
      .catch(err => {
        return dispatch(removeQuestionnaireFailure(idQuestionnaire, err));
      });
  };

export const duplicateQuestionnaire = (idQuestionnaire, token) => dispatch => {
  getQuestionnaire(idQuestionnaire, token).then(question => {
    question.id = uuid();
    question.Label[0] += ' Copie';
    return postQuestionnaire(question, token)
      .then(() => {
        return dispatch(
          createQuestionnaireSuccess(
            question.id,
            questionnaireRemoteToStores(question),
          ),
        );
      })
      .catch(err => {
        return dispatch(createQuestionnaireFailure(err, err.errors));
      });
  });
};

/**
 * Method used when we click on merge question to merge 2 questions
 *
 * @param {string} idMerge the id of the question we want to merge
 */
export const mergeQuestions = (idMerge, token) => (dispatch, getState) => {
  const state = getState();
  const {
    activeQuestionnaire,
    activeComponentsById,
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariableByQuestion,
    activeCodeListsById,
  } = state.appState;
  dispatch({
    type: MERGE_QUESTIONNAIRE,
    payload: idMerge,
  });
  return getQuestionnaire(idMerge, token).then(qr => {
    const medgerQuestion = questionnaireRemoteToStores(qr);
    const medgerQuestionId = Object.keys(medgerQuestion.questionnaireById)[0];
    const mergedCollectedVariables =
      medgerQuestion.collectedVariableByQuestionnaire[medgerQuestionId];
    const mergesCodeListByQuestionnaire =
      medgerQuestion.codeListByQuestionnaire[medgerQuestionId];
    const mergesCalculatedVariableByQuestionnaire =
      medgerQuestion.calculatedVariableByQuestionnaire[medgerQuestionId];
    const mergesExternalVariableByQuestionnaire =
      medgerQuestion.externalVariableByQuestionnaire[medgerQuestionId];
    const mergesComponentByQuestionnaire =
      medgerQuestion.componentByQuestionnaire[medgerQuestionId];
    const QuestionnaireId = activeQuestionnaire.id;
    Object.values(mergedCollectedVariables).forEach(variable => {
      Object.values(collectedVariableByQuestion).forEach(element => {
        const find = Object.values(element).find(
          varib => varib.name === variable.name,
        );
        if (find) {
          variable.name = `${variable.name}_2`;
        }
      });
    });
    Object.values(mergesCodeListByQuestionnaire).forEach(code => {
      const find = Object.values(activeCodeListsById).find(
        element => element.label === code.label,
      );
      if (find && code.id !== find.id) {
        code.label = `${code.label}_2`;
      }
    });
    Object.values(mergesCalculatedVariableByQuestionnaire).forEach(variable => {
      const find = Object.values(activeCalculatedVariablesById).find(
        element => element.name === variable.name,
      );
      if (find) {
        variable.name = `${variable.name}_2`;
        variable.id = uuid();
      }
      activeCalculatedVariablesById[variable.id] = variable;
    });
    Object.values(mergesExternalVariableByQuestionnaire).forEach(variable => {
      const find = Object.values(activeExternalVariablesById).find(
        element => element.name === variable.name,
      );
      if (find) {
        variable.name = `${variable.name}_2`;
        variable.id = uuid();
      }
      activeExternalVariablesById[variable.id] = variable;
    });
    const supSequence = getSupWeight(activeComponentsById);
    Object.values(mergesComponentByQuestionnaire)
      .filter(
        element =>
          element.type !== QUESTIONNAIRE && element.id !== 'idendquest',
      )
      .forEach(component => {
        const find = Object.values(activeComponentsById).find(
          active => active.name === component.name,
        );
        if (find) {
          if (find.id === component.id) {
            component.id = uuid();
            Object.values(mergesComponentByQuestionnaire).forEach(element => {
              if (element.parent === find.id) {
                element.parent = component.id;
              }
              if (
                element.children?.length > 0 &&
                element.children.includes(find.id)
              ) {
                const index = element.children.indexOf(find.id);
                element.children[index] = component.id;
              }
            });
          }
          component.name = `${component.name}_2`;
        }
        const collectedVaribles = {};
        if (component.type === SEQUENCE) {
          component.weight += supSequence;
          component.parent = QuestionnaireId;
          if (component.id !== 'idendquest') {
            const questionnaire = activeComponentsById[QuestionnaireId];
            questionnaire.children.push(component.id);
            const activeComponent = {
              [component.id]: component,
            };
            dispatch({
              type: CREATE_COMPONENT,
              payload: {
                id: component.id,
                update: {
                  activeComponentsById: activeComponent,
                  activeCalculatedVariablesById: activeCalculatedVariablesById,
                  activeExternalVariablesById: activeExternalVariablesById,
                  activeCollectedVariablesById: {
                    [component.id]: collectedVaribles,
                  },
                  activeCodeListsById: mergesCodeListByQuestionnaire,
                },
              },
            });
            dispatch({
              type: UPDATE_COMPONENT,
              payload: {
                QuestionnaireId,
                update: {
                  activeComponentsById: { [questionnaire.id]: questionnaire },
                  activeCalculatedVariablesById: activeCalculatedVariablesById,
                  activeExternalVariablesById: activeExternalVariablesById,
                  activeCollectedVariablesById: {
                    [QuestionnaireId]: {},
                  },
                  activeCodeListsById: mergesCodeListByQuestionnaire,
                },
              },
            });
          }
        } else {
          if (component.type === QUESTION) {
            component.collectedVariables.forEach(variable => {
              const find = Object.values(mergedCollectedVariables).find(
                element => element.id === variable,
              );
              collectedVaribles[variable] = find;
            });
          }
          const activeComponent = {
            [component.id]: component,
          };
          dispatch({
            type: CREATE_COMPONENT,
            payload: {
              id: component.id,
              update: {
                activeComponentsById: activeComponent,
                activeCalculatedVariablesById: activeCalculatedVariablesById,
                activeExternalVariablesById: activeExternalVariablesById,
                activeCollectedVariablesById: {
                  [component.id]: collectedVaribles,
                },
                activeCodeListsById: mergesCodeListByQuestionnaire,
              },
            },
          });
        }
      });
  });
};
