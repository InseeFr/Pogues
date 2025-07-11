import { HttpResponseError } from '@/errors/error';
import { Version } from '@/models/versions';

import { computeAuthorizationHeader, getBaseURI } from './utils';

const pathQuestionnaire = 'persistence/questionnaire';
const pathQuestionnaireList = 'persistence/questionnaires';
const pathQuestionnaireVersion = 'persistence/version';

/**
 * Retrieve questionnaires associated to the provided stamp (e.g. "DR59-SNDI59")
 */
export async function getQuestionnaireList(
  stamp: string,
  token: string,
): Promise<unknown[]> {
  const url = `${getBaseURI()}/${pathQuestionnaireList}/search/meta?owner=${stamp}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  }).then((res) => res.json() as Promise<unknown[]>);
}

export async function getStampsList(token: string): Promise<unknown> {
  const url = `${getBaseURI()}/${pathQuestionnaireList}/stamps`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  }).then((res) => res.json());
}

/**
 * Create new questionnaire
 */
export async function postQuestionnaire(qr: unknown, token: string) {
  const url = `${getBaseURI()}/${pathQuestionnaireList}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(qr),
  }).then((res) => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
}

/**
 * Update questionnaire by id
 */
export async function putQuestionnaire(id: string, qr: unknown, token: string) {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(qr),
  }).then((res) => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
}

/**
 * Retrieve questionnaire by id
 */
export async function getQuestionnaire(
  id: string,
  token: string,
): Promise<unknown> {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  }).then((res) => {
    if (res.ok) return res.json();
    else throw new HttpResponseError(res.status, res.statusText);
  });
}

/**
 * Retrieve questionnaire by id
 */
export async function getQuestionnaireWithVersion(
  versionId: string,
  token: string,
): Promise<Version['data']> {
  const url = `${getBaseURI()}/${pathQuestionnaireVersion}/${versionId}?withData=true`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new HttpResponseError(res.status, res.statusText);
    })
    .then((json: Version) => json.data);
}

/**
 * Will send a DELETE request in order to remove an existing questionnaire
 *
 * @param {deleteQuestionnaire} id The id of the questionnaire we want to delete
 */
export async function deleteQuestionnaire(id: string, token: string) {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'DELETE',
    headers,
  });
}

export async function getVariablesById(
  id: string,
  token: string,
): Promise<unknown> {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}/variables`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  }).then((res) => res.json());
}
