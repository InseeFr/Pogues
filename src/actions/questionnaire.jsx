import {
  deleteQuestionnaire,
  getQuestionnaire,
  getQuestionnaireWithVersion,
  postQuestionnaire,
} from '../api/questionnaires';
import { COMPONENT_TYPE } from '../constants/pogues-constants';
import { Component } from '../model';
import { questionnaireRemoteToStores } from '../model/remote-to-stores';
import * as Questionnaire from '../model/transformations/questionnaire';
import { getSupWeight, uuid } from '../utils/utils';

const { QUESTION, SEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_WITH_VERSION =
  'LOAD_QUESTIONNAIRE_WITH_VERSION';
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
 * The parameter "update" is a complex object.
 * Entries correspond to reducers. they contain an update to apply to the piece of state
 * handled by the reducer to represent locally the questionnaire.
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
export const loadQuestionnaireSuccess = (update) => ({
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
export const loadQuestionnaire = (id, token) => async (dispatch) => {
  dispatch(loadQuestionnaireStart());
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  try {
    const qr = await getQuestionnaire(id, token);
    dispatch(loadQuestionnaireSuccess(questionnaireRemoteToStores(qr)));
  } catch (err) {
    dispatch(loadQuestionnaireFailure(id, err));
  }
};

/**
 * Load questionnaire
 *
 * Asyc action that fetch a questionnaire.
 *
 * @param   {string}    id  The questionnaire id.
 * @return  {function}      Thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or LOAD_QUESTIONNAIRE_FAILURE
 */
export const loadQuestionnaireWithVersion =
  (id, versionId, token) => async (dispatch) => {
    dispatch(loadQuestionnaireStart());
    dispatch({
      type: LOAD_QUESTIONNAIRE_WITH_VERSION,
      payload: { id, versionId },
    });
    try {
      const qr = await getQuestionnaireWithVersion(versionId, token);
      dispatch(loadQuestionnaireSuccess(questionnaireRemoteToStores(qr)));
    } catch (err) {
      dispatch(loadQuestionnaireFailure(id, err));
    }
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
export const createQuestionnaireFailure = (err) => ({
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
      .catch((err) => {
        return dispatch(createQuestionnaireFailure(err));
      });
  };

export const removeQuestionnaireSuccess = (payload) => ({
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
      .catch((err) => {
        return dispatch(removeQuestionnaireFailure(idQuestionnaire, err));
      });
  };

export const duplicateQuestionnaire =
  (idQuestionnaire, token) => (dispatch) => {
    getQuestionnaire(idQuestionnaire, token).then((question) => {
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
        .catch((err) => {
          return dispatch(createQuestionnaireFailure(err));
        });
    });
  };

/**
 * Method used when we click on merge question to merge 2 questions
 *
 * @param {string} idMerge the id of the question we want to merge
 */
export const mergeQuestionnaires = (idMerge, token) => (dispatch, getState) => {
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

  const manageDuplicateCollectedVariable = (mergedCollectedVariable) => {
    Object.values(collectedVariableByQuestion).forEach((element) => {
      const find = Object.values(element).find(
        (varib) => varib.name === mergedCollectedVariable.name,
      );
      if (find) {
        mergedCollectedVariable.name = `${mergedCollectedVariable.name}_2`;
      }
    });
  };
  const manageDuplicateCodeList = (mergedCodeList) => {
    const find = Object.values(activeCodeListsById).find(
      (element) => element.label === mergedCodeList.label,
    );
    if (find && mergedCodeList.id !== find.id) {
      mergedCodeList.label = `${mergedCodeList.label}_2`;
    }
  };
  const manageDuplicateCalculatedVariable = (mergedCalculatedVariable) => {
    const find = Object.values(activeCalculatedVariablesById).find(
      (element) => element.name === mergedCalculatedVariable.name,
    );
    if (find) {
      mergedCalculatedVariable.name = `${mergedCalculatedVariable.name}_2`;
      mergedCalculatedVariable.id = uuid();
    }
    activeCalculatedVariablesById[mergedCalculatedVariable.id] =
      mergedCalculatedVariable;
  };
  const manageDuplicateExternalVariable = (mergedExternalVariable) => {
    const find = Object.values(activeExternalVariablesById).find(
      (element) => element.name === mergedExternalVariable.name,
    );
    if (find) {
      mergedExternalVariable.name = `${mergedExternalVariable.name}_2`;
      mergedExternalVariable.id = uuid();
    }
    activeExternalVariablesById[mergedExternalVariable.id] =
      mergedExternalVariable;
  };

  const manageComponentOnMerge = (
    mergedComponent,
    QuestionnaireId,
    mergedComponentByQuestionnaire,
    mergedCollectedVariables,
    mergedCodeListByQuestionnaire,
    addedWeight,
  ) => {
    const findName = Object.values(activeComponentsById).find(
      (active) => active.name === mergedComponent.name,
    );
    if (findName) {
      mergedComponent.name = `${mergedComponent.name}_2`;
    }
    const findId = Object.values(activeComponentsById).find(
      (active) => active.id === mergedComponent.id,
    );
    if (findId) {
      mergedComponent.id = uuid();
      Object.values(mergedComponentByQuestionnaire).forEach((element) => {
        if (element.parent === findId.id) {
          element.parent = mergedComponent.id;
        }
        if (
          element.children &&
          element.children.length > 0 &&
          element.children.includes(findId.id)
        ) {
          const index = element.children.indexOf(findId.id);
          element.children[index] = mergedComponent.id;
        }
      });
    }
    const collectedVariables = {};
    if (mergedComponent.type === SEQUENCE) {
      mergedComponent.weight += addedWeight;
      mergedComponent.parent = QuestionnaireId;
      const questionnaire = activeComponentsById[QuestionnaireId];
      questionnaire.children.push(mergedComponent.id);
      const activeComponent = {
        [mergedComponent.id]: mergedComponent,
      };
      dispatch({
        type: CREATE_COMPONENT,
        payload: {
          id: mergedComponent.id,
          update: {
            activeComponentsById: activeComponent,
            activeCalculatedVariablesById: activeCalculatedVariablesById,
            activeExternalVariablesById: activeExternalVariablesById,
            activeCodeListsById: mergedCodeListByQuestionnaire,
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
            activeCodeListsById: mergedCodeListByQuestionnaire,
          },
        },
      });
    } else {
      if (mergedComponent.type === QUESTION) {
        mergedComponent.collectedVariables =
          mergedComponent.collectedVariables.map((variable) => {
            const find = Object.values(mergedCollectedVariables).find(
              (element) => element.id === variable,
            );
            const newId = uuid();
            find.id = newId;
            collectedVariables[newId] = find;
            return newId;
          });
        // We change Id of the responseFormat (to deal with the case of the fusion of questionnaires sharing the same ids (duplication))
        Object.values(mergedComponent.responseFormat).forEach((resp) => {
          if (resp?.id) resp.id = uuid();
        });
      }
      const activeComponent = {
        [mergedComponent.id]: mergedComponent,
      };
      dispatch({
        type: CREATE_COMPONENT,
        payload: {
          id: mergedComponent.id,
          update: {
            activeComponentsById: activeComponent,
            activeCalculatedVariablesById: activeCalculatedVariablesById,
            activeExternalVariablesById: activeExternalVariablesById,
            activeCollectedVariablesById: {
              [mergedComponent.id]: collectedVariables,
            },
            activeCodeListsById: mergedCodeListByQuestionnaire,
          },
        },
      });
    }
  };

  return getQuestionnaire(idMerge, token).then((qr) => {
    const mergedQuestionnaire = questionnaireRemoteToStores(qr);
    const mergedQuestionnaireId = Object.keys(
      mergedQuestionnaire.questionnaireById,
    )[0];
    const mergedCollectedVariables =
      mergedQuestionnaire.collectedVariableByQuestionnaire[
        mergedQuestionnaireId
      ];
    const mergedCodeListByQuestionnaire =
      mergedQuestionnaire.codeListByQuestionnaire[mergedQuestionnaireId];
    const mergedCalculatedVariableByQuestionnaire =
      mergedQuestionnaire.calculatedVariableByQuestionnaire[
        mergedQuestionnaireId
      ];
    const mergedExternalVariableByQuestionnaire =
      mergedQuestionnaire.externalVariableByQuestionnaire[
        mergedQuestionnaireId
      ];
    const mergedComponentByQuestionnaire =
      mergedQuestionnaire.componentByQuestionnaire[mergedQuestionnaireId];
    const QuestionnaireId = activeQuestionnaire.id;
    Object.values(mergedCollectedVariables).forEach((variable) =>
      manageDuplicateCollectedVariable(variable),
    );
    Object.values(mergedCodeListByQuestionnaire).forEach((codelist) =>
      manageDuplicateCodeList(codelist),
    );
    Object.values(mergedCalculatedVariableByQuestionnaire).forEach((variable) =>
      manageDuplicateCalculatedVariable(variable),
    );
    Object.values(mergedExternalVariableByQuestionnaire).forEach((variable) =>
      manageDuplicateExternalVariable(variable),
    );
    Object.values(mergedComponentByQuestionnaire)
      .filter(
        (element) =>
          element.type !== QUESTIONNAIRE && element.id !== 'idendquest',
      )
      .forEach((component) => {
        manageComponentOnMerge(
          component,
          QuestionnaireId,
          mergedComponentByQuestionnaire,
          mergedCollectedVariables,
          mergedCodeListByQuestionnaire,
          getSupWeight(activeComponentsById),
        );
      });
  });
};
