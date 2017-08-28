import fetch from 'isomorphic-fetch';
import Config from 'Config';

const { baseURL, persistancePath, userPath } = Config;

const urlQuestionnaireList = `${baseURL + persistancePath}/questionnaires`;
const urlQuestionnaireListSearch = `${baseURL + persistancePath}/questionnaires/search`;
const urlQuestionnaire = `${baseURL + persistancePath}/questionnaire`;
const urlUserGetAttributes = `${baseURL + userPath}/attributes`;

export const visualisationUrl = `${baseURL}/transform/visualize/`;

/**
 * Retrieve all questionnaires
 */
export const getQuestionnaireList = permission =>
  fetch(`${urlQuestionnaireListSearch}?owner=${permission}`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

/**
 * Create new questionnaire
 */
export const postQuestionnaire = qr =>
  fetch(urlQuestionnaireList, {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json'
      // HACK needs to set content-type to text/html ; if not, server returns a 405 error
      // 'Content-Type': 'text/html',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  }).then(res => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });

/**
 * Update questionnaire by id
 */
export const putQuestionnaire = (id, qr) =>
  fetch(`${urlQuestionnaire}/${id}`, {
    method: 'PUT',
    headers: {
      // 'Accept': 'application/json'
      // HACK needs to set content-type to text/html ; if not, server returns a 500 error
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  }).then(res => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });

/**
 * Retrieve questionnaire by id
 */
export const getQuestionnaire = id =>
  fetch(`${urlQuestionnaire}/${id}`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

/**
 * Retrieve user attributes
 */
export const getUserAttributes = () =>
  fetch(urlUserGetAttributes, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return res.json();
  });

/**
 * Will send a DELETE request in order to remove an existing questionnaire
 * 
 * @param {deleteQuestionnaire} id The id of the questionnaire we want to delete
 */
export const deleteQuestionnaire = id =>
  fetch(`${urlQuestionnaire}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
