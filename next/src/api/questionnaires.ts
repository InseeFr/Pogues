import { queryOptions } from '@tanstack/react-query';

import { CodesList } from '@/models/codesLists';
import { Questionnaire } from '@/models/questionnaires';

import { Questionnaire as PoguesQuestionnaire } from './models/pogues';
import { computeAuthorizationHeader, getBaseURI } from './utils';
import { computePoguesCodesLists } from './utils/codesLists';
import {
  computePoguesQuestionnaire,
  computeQuestionnaireFromPogues,
} from './utils/questionnaires';

const pathQuestionnaire = 'persistence/questionnaire';
const pathQuestionnaireList = 'persistence/questionnaires';

/**
 * Used to retrieve questionnaires associated to a stamp.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnairesQueryOptions = (stamp: string, token: string) =>
  queryOptions({
    queryKey: ['questionnaires', { stamp }],
    queryFn: () => getQuestionnaires(stamp, token),
  });

/**
 * Used to retrieve a questionnaire associated to its id.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnaireQueryOptions = (
  questionnaireId: string,
  token: string,
) =>
  queryOptions({
    queryKey: ['questionnaire', { questionnaireId }],
    queryFn: () => getQuestionnaire(questionnaireId, token),
  });

/**
 * Retrieve questionnaires associated to the provided stamp (e.g. "DR59-SNDI59").
 */
async function getQuestionnaires(
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

/** Retrieve a questionnaire by id. */
async function getQuestionnaire(
  id: string,
  token: string,
): Promise<Questionnaire> {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  const response = await fetch(url, { headers });
  const json = (await response.json()) as Promise<PoguesQuestionnaire>;
  const res = computeQuestionnaireFromPogues(await json);
  return res;
}

/**
 * Create a new questionnaire.
 */
export async function postQuestionnaire(
  qr: Questionnaire,
  stamp: string,
  token: string,
): Promise<Response> {
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
    throw new Error(`Network request failed: ${res.statusText}`);
  });
}

/** Update a questionnaire by id. */
export async function putQuestionnaire(
  id: string,
  qr: PoguesQuestionnaire,
  token: string,
): Promise<Response> {
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

/** Update the questionnaire of the provided id with a new codes list. */
export async function addQuestionnaireCodesList(
  questionnaireId: string,
  codesList: CodesList,
  token: string,
): Promise<Response> {
  const questionnaire = await getPoguesQuestionnaire(questionnaireId, token);
  const codesLists = questionnaire.CodeLists?.CodeList || [];
  codesLists.push(...computePoguesCodesLists([codesList]));
  questionnaire.CodeLists = { CodeList: codesLists };

  return putQuestionnaire(questionnaireId, questionnaire, token);
}

/** Retrieve a questionnaire by id with the pogues model. */
async function getPoguesQuestionnaire(
  id: string,
  token: string,
): Promise<PoguesQuestionnaire> {
  const url = `${getBaseURI()}/${pathQuestionnaire}/${id}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  const response = await fetch(url, { headers });
  const json = (await response.json()) as Promise<PoguesQuestionnaire>;
  return await json;
}
