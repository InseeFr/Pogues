import fetch from 'isomorphic-fetch';
import { getUrlFromCriterias } from 'utils/utils';
import { getEnvVar } from 'utils/env';

const baseURL = getEnvVar('API_URL');

const urlQuestionnaireList = `${baseURL}/persistence/questionnaires`;
const urlQuestionnaireListSearch = `${baseURL}/persistence/questionnaires/search`;
const urlQuestionnaire = `${baseURL}/persistence/questionnaire`;
const urlUserGetAttributes = `${baseURL}/user/attributes`;
const urlSearch = `${baseURL}/search`;
const urlSeriesList = `${urlSearch}/series`;
const urlOperationsList = `${urlSearch}/operations`;
const urlMetadata = `${baseURL}/meta-data`;
const urlVisualizePdf = `${baseURL}/transform/visualize-pdf`;
const urlVisualizeSpec = `${baseURL}/transform/visualize-spec`;
const urlVisualizeDDI = `${baseURL}/transform/visualize-ddi`;

export const visualisationUrl = `${baseURL}/transform/visualize`;

/**
 * This method will emulate the download of file, received from a POST request.
 * We will dynamically create a A element linked to the downloaded content, and
 * will click on it programmatically.
 * @param {*} data Binary content sent by the server
 */
function openDocument(data) {
  let filename = '';
  const disposition = data.headers.get('Content-Disposition');
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1])
      filename = matches[1].replace(/['"]/g, '');
  }
  data
    .blob()
    .then(blob => (window.URL || window.webkitURL).createObjectURL(blob))
    .then(downloadUrl => {
      if (filename) {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      } else {
        window.location = downloadUrl;
      }
    });
}

/**
 * This method will send a request in order to get the URL
 * of the generated HTML page for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeHtml = qr => {
  fetch(`${visualisationUrl}/${qr.DataCollection[0].id}/${qr.Name}`, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  })
    .then(response => response.text())
    .then(url => {
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.click();
    });
};

export const visualizeDDI = qr => {
  fetch(urlVisualizeDDI, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  }).then(openDocument);
};

/**
 * This method will send a request in order to get the content
 * of the generated PDF document for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizePdf = qr => {
  fetch(urlVisualizePdf, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  }).then(openDocument);
};

/**
 * This method will send a request in order to get the content
 * of the generated ODT document for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeSpec = qr => {
  fetch(urlVisualizeSpec, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr),
    credentials: 'include',
  }).then(openDocument);
};

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

export const getSeries = () =>
  fetch(urlSeriesList, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

export const getOperations = id =>
  fetch(`${urlSeriesList}/${id}/operations`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

export const getCampaigns = id =>
  fetch(`${urlOperationsList}/${id}/collections`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

export const getContextFromCampaign = id =>
  fetch(`${urlSearch}/context/collection/${id}`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

export const getUnitsList = () =>
  fetch(`${urlMetadata}/units`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => res.json());

export const getSearchResults = (typeItem, criterias, filter = '') => {
  return fetch(`${urlSearch}${getUrlFromCriterias(criterias)}`, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      // HACK needs to set content-type to text/html ; if not, server returns a 405 error
      // 'Content-Type': 'text/html',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      types: [typeItem],
      filter,
    }),
  }).then(res => res.json());
};
