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
const pathVisualisation = 'transform/visualize';

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
  }).then(res => res.json());
};

/**
 * This method will call the endpoint of visualization
 * and render an url or a document
 * depending on the type of visualization called
 * @param {*} type : the type of visualisation called (cf. visualiseType underneath)
 * @param {*} qr : the questionnaire to visualize
 * @param {*} ref : a boolean that indicates if the questionnaire contains a reference to another questionnaire
 * @param {*} token : the token
 */
export const getVisualization = async (type, qr, ref, token) => {
  const visualiseType = {
    pdf: { response: 'document', path: `-pdf` },
    spec: { response: 'document', path: `-spec` },
    ddi: { response: 'document', path: `-ddi` },
    html: {
      response: 'url',
      path: `/${qr.DataCollection[0].id}/${qr.Name}`,
    },
    'stromae-v2': { response: 'url', path: `-stromae-v2/${qr.Name}` },
    'stromae-v3': { response: 'url', path: `-stromae-v3/${qr.Name}` },
    'queen-capi': { response: 'url', path: `-queen/${qr.Name}` },
    'queen-cati': { response: 'url', path: `-queen-telephone/${qr.Name}` },
  };

  if (visualiseType[type].response === 'document') {
    return postVisualization(visualiseType[type].path, qr, ref, token).then(
      openDocument,
    );
  }
  if (visualiseType[type].response === 'url') {
    return postVisualization(visualiseType[type].path, qr, ref, token)
      .then(response => response.text())
      .then(url => {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click();
      });
  }
  return null;
};

/**
 * mutualised call of the visualization endpoints
 * @param {*} path : the personalized part of the endpoint address
 * @param {*} qr : the questionnaire to visualize
 * @param {*} ref : a boolean that indicates if the questionnaire contains a reference to another questionnaire
 * @param {*} token : the token
 * @returns a data to interpret
 */
const postVisualization = async (path, qr, ref, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathVisualisation}${path}?references=${ref}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }, token),
    body: JSON.stringify(qr),
  }).then(async response => {
    if (response.ok) {
      return response;
    }
    if (response.status === 500) {
      const { message } = await response.json();
      throw new Error(message);
    }
    throw new Error('The error did not directly come from Eno');
  });
};

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
  }).then(res => res.json());
};

export const getSeries = token => mutualizedGet(`${pathSeriesList}`, token);

export const getOperations = (id, token) =>
  mutualizedGet(`${pathSeriesList}/${id}/operations`, token);

export const getCampaigns = (id, token) =>
  mutualizedGet(`${pathOperationsList}/${id}/collections`, token);

export const getContextFromCampaign = (id, token) =>
  mutualizedGet(`${pathSearch}/context/collection/${id}`, token);

export const getUnitsList = token =>
  mutualizedGet(`${pathMetadata}/units`, token);

export const getStampsList = async token =>
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
  }).then(res => res.json());
};

export const getNomenclatures = async () => {
  return {
    nomenclatures: [
      {
        name: 'naf-rev2',
        parameters: {
          fields: [
            {
              name: 'label',
              rules: ['[\\w]+'],
              language: 'French',
              min: 2,
            },
            { name: 'id' },
          ],
          queryParser: {
            type: 'tokenized',
            params: { language: 'French', pattern: '[\\w.]+' },
          },
        },
        urn: 'naf-rev2:1',
      },
      {
        name: 'naf-rev2-stop',
        parameters: {
          fields: [
            {
              name: 'label',
              rules: ['[\\w]+'],
              language: 'French',
              min: 2,
            },
            { name: 'id' },
          ],
          queryParser: {
            type: 'tokenized',
            params: { language: 'French', pattern: '[\\w.]+' },
          },
        },
        urn: 'naf-rev2-stop:1',
      },
      {
        name: 'cog-communes',
        parameters: {
          fields: [
            { name: 'label', rules: 'soft' },
            { name: 'nccenr', rules: 'soft' },
            { name: 'id', rules: 'soft' },
          ],
          queryParser: { type: 'soft' },
        },
        urn: 'cog-communes:1',
      },
      {
        id: 'in-error',
        name: 'in-error',
        parameters: {
          fields: [{ name: 'id', rules: 'soft' }],
          queryParser: { type: 'soft' },
        },
        urn: 'in-error:1',
      },
    ],
  };
};

export const getNomenclature = async id => ({
  id: id,
  name: id,
  parameters: {
    fields: [{ name: 'id', rules: 'soft' }],
    queryParser: { type: 'soft' },
  },
  urn: 'in-error:1',
  codes: [
    { id: 'un', label: '1' },
    { id: 'deux', label: '2' },
  ],
});
