import { queryOptions } from '@tanstack/react-query';

import type { CodesList } from '@/models/codesLists';
import type { Questionnaire } from '@/models/questionnaires';

import { instance } from './instance';
import type { Questionnaire as PoguesQuestionnaire } from './models/pogues';
import { computePoguesCodesLists } from './utils/codesLists';
import {
  computeNewPoguesQuestionnaire,
  computeQuestionnaire,
} from './utils/questionnaires';

/**
 * Used to retrieve questionnaires associated to a stamp.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnairesQueryOptions = (stamp: string) =>
  queryOptions({
    queryKey: ['questionnaires', { stamp }],
    queryFn: () => getQuestionnaires(stamp),
  });

/**
 * Used to retrieve a questionnaire associated to its id.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnaireQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['questionnaire', { questionnaireId }],
    queryFn: () => getQuestionnaire(questionnaireId),
  });

/**
 * Retrieve questionnaires associated to the provided stamp (e.g. "DR59-SNDI59").
 */
export async function getQuestionnaires(
  stamp: string,
): Promise<Questionnaire[]> {
  return instance
    .get('/persistence/questionnaires/search/meta', {
      params: { owner: stamp },
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesQuestionnaire[] }) => {
      const res: Questionnaire[] = [];
      for (const datum of data) {
        res.push(computeQuestionnaire(datum));
      }
      return res;
    });
}

/** Retrieve a questionnaire by id. */
export async function getQuestionnaire(id: string): Promise<Questionnaire> {
  return instance
    .get(`/persistence/questionnaire/${id}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesQuestionnaire }) => {
      return computeQuestionnaire(data);
    });
}

/** Create a new questionnaire. */
export async function postQuestionnaire(
  qr: Questionnaire,
  stamp: string,
): Promise<Response> {
  return instance.post(
    '/persistence/questionnaires',
    computeNewPoguesQuestionnaire(qr, stamp),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

/** Update a questionnaire by id. */
export async function putQuestionnaire(
  id: string,
  qr: PoguesQuestionnaire,
): Promise<Response> {
  return instance.put(`/persistence/questionnaire/${id}`, qr, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Update the questionnaire of the provided id with a new codes list. */
export async function addQuestionnaireCodesList(
  questionnaireId: string,
  codesList: CodesList,
): Promise<Response> {
  const questionnaire = await getPoguesQuestionnaire(questionnaireId);
  const codesLists = questionnaire.CodeLists?.CodeList || [];
  codesLists.push(...computePoguesCodesLists([codesList]));
  questionnaire.CodeLists = { CodeList: codesLists };

  return putQuestionnaire(questionnaireId, questionnaire);
}

/** Retrieve a questionnaire by id with the pogues model. */
async function getPoguesQuestionnaire(
  id: string,
): Promise<PoguesQuestionnaire> {
  return instance
    .get(`/persistence/questionnaire/${id}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesQuestionnaire }) => data);
}
