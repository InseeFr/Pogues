import getNomenclaturesContent from '../utils/codes-lists/__mocks__/get-nomenclatures.json';
import { getUrlFromCriterias } from '../utils/utils';
import { getBaseURI } from './utils';

const pathInit = 'init';
const pathQuestionnaireList = 'persistence/questionnaires';
const pathQuestionnaireListSearch = 'persistence/questionnaires/search/meta';
const pathQuestionnaire = 'persistence/questionnaire';
const pathSearch = 'search';
const pathSeriesList = 'search/series';
const pathOperationsList = 'search/operations';
const pathMetadata = 'meta-data';

/**
 * Mutualised getter
 * @param {*} address : where to fetch data
 * @param {*} token : the token
 * @returns the json data
 */
const mutualizedGet = async (address, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${address}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then((res) => res.json());
};

/**
 * This method adds the OIDC token to the headers of the request
 */
const getHeaders = (base, token) => {
  if (!token) return base;
  return {
    ...base,
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Retrieve all questionnaires
 */
export const getQuestionnaireList = (stamp, token) =>
  mutualizedGet(`${pathQuestionnaireListSearch}?owner=${stamp}`, token);

/**
 * Create new questionnaire
 */
export const postQuestionnaire = async (qr, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaireList}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  }).then((res) => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
};

/**
 * Update questionnaire by id
 */
export const putQuestionnaire = async (id, qr, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaire}/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  }).then((res) => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
};

/**
 * Retrieve questionnaire by id
 */
export const getQuestionnaire = (id, token) =>
  mutualizedGet(`${pathQuestionnaire}/${id}`, token);

/**
 * Retrieve the variables of a given questionnaire
 */
export const getVariablesById = (id, token) =>
  mutualizedGet(`${pathQuestionnaire}/${id}/variables`, token);

/**
 * Will send a DELETE request in order to remove an existing questionnaire
 *
 * @param {deleteQuestionnaire} id The id of the questionnaire we want to delete
 */
export const deleteQuestionnaire = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaire}/${id}`, {
    method: 'DELETE',
    headers: getHeaders({}, token),
  });
};

export const getInit = async () => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathInit}`, {
    headers: getHeaders({ Accept: 'application/json' }),
  }).then((res) => res.json());
};

export const getSeries = (token) => mutualizedGet(`${pathSeriesList}`, token);

export const getOperations = (id, token) =>
  mutualizedGet(`${pathSeriesList}/${id}/operations`, token);

export const getCampaigns = (id, token) =>
  mutualizedGet(`${pathOperationsList}/${id}/collections`, token);

export const getContextFromCampaign = (id, token) =>
  mutualizedGet(`${pathSearch}/context/collection/${id}`, token);

export const getUnitsList = (token) =>
  mutualizedGet(`${pathMetadata}/units`, token);

export const getStampsList = async (token) =>
  mutualizedGet(`persistence/questionnaires/stamps`, token);

export const getSearchResults = async (
  token,
  typeItem,
  criterias,
  filter = '',
) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathSearch}${getUrlFromCriterias(criterias)}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify({
      types: [typeItem],
      filter,
    }),
  }).then((res) => res.json());
};

export const getNomenclatures = async () => {
  return getNomenclaturesContent;
};

export const getNomenclature = async (id) => {
  return getNomenclaturesContent.nomenclatures[id];
};
