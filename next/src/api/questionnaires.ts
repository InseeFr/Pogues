import { Questionnaire } from '@/models/questionnaires';
import { Stamp } from '@/models/stamps';

import { Questionnaire as PoguesQuestionnaire } from './models/pogues';
import { computeAuthorizationHeader, getBaseURI } from './utils';
import {
  computePoguesQuestionnaire,
  computeQuestionnaireFromPogues,
} from './utils/questionnaires';

const pathQuestionnaire = 'persistence/questionnaire';
const pathQuestionnaireList = 'persistence/questionnaires';

/**
 * Retrieve questionnaires associated to the provided stamp (e.g. "DR59-SNDI59").
 */
export async function getQuestionnaires(
  stamp: string,
  token: string,
): Promise<Questionnaire[]> {
  const url = `${getBaseURI()}/${pathQuestionnaireList}/search/meta?owner=${stamp}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  const response = await fetch(url, { headers });
  const json = (await response.json()) as Promise<PoguesQuestionnaire[]>;
  const res: Questionnaire[] = [];
  for (const datum of await json) {
    res.push(computeQuestionnaireFromPogues(datum));
  }
  return res;
}

/**
 * Retrieve stamps which allow to fetch questionnaires associated to one.
 */
export async function getStamps(token: string): Promise<Stamp[]> {
  const url = `${getBaseURI()}/${pathQuestionnaireList}/stamps`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  const response = await fetch(url, { headers });
  const json = (await response.json()) as Promise<Stamp[]>;
  return json;
}

/**
 * Create new questionnaire
 */
export async function postQuestionnaire(
  qr: Questionnaire,
  stamp: string,
  token: string,
) {
  const url = `${getBaseURI()}/${pathQuestionnaireList}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(computePoguesQuestionnaire(qr, stamp)),
  }).then((res) => {
    if (res.ok) return res;
    throw new Error(`Network request failed :${res.statusText}`);
  });
}

/**
 * Update questionnaire by id
 */
export async function putQuestionnaire(
  id: string,
  qr: PoguesQuestionnaire,
  token: string,
) {
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
): Promise<PoguesQuestionnaire> {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    headers,
  }).then((res) => res.json());
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
