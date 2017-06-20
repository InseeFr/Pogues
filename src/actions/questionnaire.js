import { getQuestionnaire, postQuestionnaire } from 'utils/remote-api';
import { normalizeQuestionnaire, removeUnderscore, getQuestionnaireIdFromUri } from 'utils/model/model-to-state-utils';
import { addUnderscore } from 'utils/model/state-to-model-utils';

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS';
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE';
export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE';
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS';
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE';

/**
 * Value the questionnaire returned to update the state
 *
 * `update` is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to
 * represent locally the questionnaire.
 *
 * @param   {string} id     questionnaire id
 * @param   {object} update update to apply to the state in order to store the
 *                          questionnaire
 * @returns {object}        LOAD_QUESTIONNAIRE_SUCCESS action
 */
export const loadQuestionnaireSuccess = (id, update) => ({
  type: LOAD_QUESTIONNAIRE_SUCCESS,
  payload: { id, update },
});

/**
 * Track error when loading questionnaire failed
 *
 * @param   {string} id    questionnaire id
 * @param   {string} err   error object
 * @returns {object}       LOAD_QUESTIONNAIRE_FAILURE action
 */
export const loadQuestionnaireFailure = (id, err) => ({
  type: LOAD_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

/**
 * Load the questionnaire
 *
 * Asynchronous, relies on Redux Thunk.
 *
 * The questionnaire returned by the server will be processed to comply with
 * the reducers requirements.
 *
 * @param   {string} id questionnaire id
 * @returns {function}  thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or
 *                      LOAD_QUESTIONNAIRE_FAILURE
 */
export const loadQuestionnaire = id => dispatch => {
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  // @TODO: removeUnderscore should be removed after model changes.
  return getQuestionnaire(id)
    .then(qr => {
      dispatch(loadQuestionnaireSuccess(id, normalizeQuestionnaire(removeUnderscore(qr))));
    })
    .catch(err => {
      dispatch(loadQuestionnaireFailure(id, err));
    });
};

/**
 * Load the questionnaire if not present in the state
 *
 * Relies on Redux Thunk
 *
 * @param {id} id questionnaire id
 * @returns {function} thunk which may dispatch LOAD_QUESTIONNAIRE
 */
export const loadQuestionnaireIfNeeded = id => (dispatch, getState) => {
  const state = getState();
  const qr = state.questionnaireById[id];
  if (!qr) dispatch(loadQuestionnaire(id));
};

/**
 * Value success when the questionnaire has been created remotely
 *
 * @param   {id}       id       local id for the new questionnaire
 * @param   {object}   newQuestionnaire the questionnaire created
 * @returns {object}            CREATE_QUESTIONNAIRE_SUCCESS action
 */
export const createQuestionnaireSuccess = (id, newQuestionnaire) => ({
  type: CREATE_QUESTIONNAIRE_SUCCESS,
  payload: {
    id: newQuestionnaire.id,
    newQuestionnaire: newQuestionnaire,
  },
});

/**
 * Track when remote creation of a questionnaire failed
 *
 * @param   {string} err error message
 * @param   {object} validation validation messages
 * @returns {object}     CREATE_QUESTIONNAIRE_FAILURE action
 */
export const createQuestionnaireFailure = (err, validation) => ({
  type: CREATE_QUESTIONNAIRE_FAILURE,
  payload: { err, validation },
});

/**
 * Create a new questionnaire
 *
 * Asynchronous, relies on Redux Thunk to be processed.
 *
 * Create the new questionnaire locally AND remotely.
 *
 * @param   {string}   name  questionnaire name
 * @param   {string}   label questionnaire label
 * @returns {function}       CREATE_QUESTIONNAIRE action
 */

export const createQuestionnaire = (name, label) => dispatch => {
  dispatch({
    type: CREATE_QUESTIONNAIRE,
    payload: null,
  });

  // @TODO: We have to create a function to do this job in state-to-model-utils
  const newQuestionnaire = {
    id: 'Thisisatest',
    name: name,
    label: [label],
    declarations: [],
    goTos: [],
    controls: [],
    genericName: 'QUESTIONNAIRE',
    children: [],
    depth: 0,
    type: 'SequenceType',
    agency: 'fr.insee',
    survey: { agency: 'fr.insee', name: 'POPO', id: 'j3bjk140' },
    componentGroups: [{ name: 'PAGE_1', label: 'Components for page 1', Member: ['j3bjt7hj'], id: 'j3bjpkjl' }],
    codeLists: { codeList: [], codeListSpecification: [] },
  };

  return postQuestionnaire(addUnderscore(newQuestionnaire))
    .then(getQuestionnaireIdFromUri)
    .then(questionnaireId => {
      newQuestionnaire.id = questionnaireId;
      return dispatch(createQuestionnaireSuccess(questionnaireId, newQuestionnaire));
    })
    .catch(err => {
      return dispatch(createQuestionnaireFailure(err, err.errors));
    });
};
