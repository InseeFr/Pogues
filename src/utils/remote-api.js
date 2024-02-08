import fetch from 'isomorphic-fetch';
import { getUrlFromCriterias } from 'utils/utils';
import { getEnvVar } from 'utils/env';

const configurationURL = `${window.location.origin}/configuration.json`;

let saveApiURL = '';

const getBaseURI = () => {
  if (saveApiURL) return Promise.resolve(saveApiURL);
  return getEnvVar('INSEE')
    ? fetch(configurationURL).then(res => {
        saveApiURL = res.json().then(config => config.POGUES_API_BASE_HOST);
        return saveApiURL;
      })
    : Promise.resolve(getEnvVar('API_URL')).then(u => {
        saveApiURL = u;
        return u;
      });
};

const pathInit = 'init';
const pathQuestionnaireList = 'persistence/questionnaires';
const pathQuestionnaireListSearch = 'persistence/questionnaires/search/meta';
const pathQuestionnaire = 'persistence/questionnaire';
const pathSearch = 'search';
const pathSeriesList = 'search/series';
const pathOperationsList = 'search/operations';
const pathMetadata = 'meta-data';
const pathVisualizePdf = 'transform/visualize-pdf';
const pathVisualizeSpec = 'transform/visualize-spec';
const pathVisualizeDDI = 'transform/visualize-ddi';
const pathVisualizeQueenCapi = 'transform/visualize-queen';
const pathVisualizeQueenCati = 'transform/visualize-queen-telephone';

export const pathVisualisation = 'transform/visualize';

/**
 * This method will emulate the download of file, received from a POST request.
 * We will dynamically create a A element linked to the downloaded content, and
 * will click on it programmatically.
 * @param {*} data Binary content sent by the server
 */
function openDocument(data) {
  let filename = '';
  const disposition = data.headers.get('Content-Disposition');
  if (disposition?.indexOf('attachment') !== -1) {
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
 * This method will call the back in order to get an url for
 * the visualization of the questionnaire in Stromae V1/V2 and
 * Lunatic (Queen) formats
 */
export const getVizualisationUrl = async (path, qr, ref, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${path}?references=${ref}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  })
    .then(async response => {
      if (response.ok) {
        return response;
      }
      if (response.status === 500) {
        const { message } = await response.json();
        throw new Error(message);
      }
      throw new Error('erreur non renvoyée par Eno');
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

/**
 * This method will send a request in order to get the URL
 * of the generated HTML page for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeHtml = async (qr, ref, token) => {
  await getVizualisationUrl(
    `${pathVisualisation}/${qr.DataCollection[0].id}/${qr.Name}`,
    qr,
    ref,
    token,
  );
};

/**
 * This method will send a request in order to get the URL
 * of the generated Queen page for face to face and the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeQueenCapi = async (qr, ref, token) => {
  await getVizualisationUrl(
    `${pathVisualizeQueenCapi}/${qr.Name}`,
    qr,
    ref,
    token,
  );
};

/**
 * This method will send a request in order to get the URL
 * of the generated Queen page for telephone and the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeQueenCati = async (qr, ref, token) => {
  await getVizualisationUrl(
    `${pathVisualizeQueenCati}/${qr.Name}`,
    qr,
    ref,
    token,
  );
};

/**
 * This method will send a request in order to get the URL
 * of the generated Stromae v2 page for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeWebStromaeV2 = async (qr, ref, token) => {
  await getVizualisationUrl(
    `${pathVisualisation}-stromae-v2/${qr.Name}`,
    qr,
    ref,
    token,
  );
};

/**
 * This method will send a request in order to get the URL
 * of the generated Stromae v2 page for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeWebStromaeV3 = async (qr, ref, token) => {
  await getVizualisationUrl(
    `${pathVisualisation}-stromae-v3/${qr.Name}`,
    qr,
    ref,
    token,
  );
};

/**
 * This method will call the back in order to get a documpent for
 * the visualization of the questionnaire in DDI, PDF and ODT (Spec)
 */
export const getVizualisationDocument = async (path, qr, ref, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${path}?references=${ref}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      throw new Error('Something went wrong');
    })
    .then(openDocument);
};

/**
 * This method will send a request in order to get the content
 * of the generated DDI document for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeDDI = async (qr, ref, token) => {
  await getVizualisationDocument(`${pathVisualizeDDI}`, qr, ref, token);
};

/**
 * This method will send a request in order to get the content
 * of the generated PDF document for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizePdf = async (qr, ref, token) => {
  await getVizualisationDocument(`${pathVisualizePdf}`, qr, ref, token);
};

/**
 * This method will send a request in order to get the content
 * of the generated ODT document for the active questionnaire.
 * @param {*} qr The active questionnaire
 */
export const visualizeSpec = async (qr, ref, token) => {
  await getVizualisationDocument(`${pathVisualizeSpec}`, qr, ref, token);
};

/**
 * Retrieve all questionnaires
 */
export const getQuestionnaireList = async (stamp, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaireListSearch}?owner=${stamp}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

/**
 * Create new questionnaire
 */
export const postQuestionnaire = async (qr, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaireList}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  }).then(res => {
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
  }).then(res => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
};

/**
 * Retrieve questionnaire by id
 */
export const getQuestionnaire = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaire}/${id}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

/**
 * Retrieve the variables of a given questionnaire
 */
export const getVariablesById = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaire}/${id}/variables`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

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
  }).then(res => res.json());
};

export const getSeries = async token => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathSeriesList}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

export const getOperations = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathSeriesList}/${id}/operations`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

export const getCampaigns = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathOperationsList}/${id}/collections`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

export const getContextFromCampaign = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathSearch}/context/collection/${id}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

export const getUnitsList = async token => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathMetadata}/units`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

export const getStampsList = async token => {
  const b = await getBaseURI();
  return fetch(`${b}/persistence/questionnaires/stamps`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};

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
  }).then(res => res.json());
};
