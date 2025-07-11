import { queryOptions } from '@tanstack/react-query';

import type { CodesList } from '@/models/codesLists';

import { instance } from './instance';

export enum ERROR_CODES {
  RELATED_QUESTION_NAMES = 'codelist:relatedquestions:name',
}

export type CodeListError =
  | CodeListRelatedQuestionError
  | { errorCode?: string };
export type CodeListRelatedQuestionError = {
  errorCode: ERROR_CODES.RELATED_QUESTION_NAMES;
  relatedQuestionNames: string[];
};

export const codesListsKeys = {
  all: (questionnaireId: string) => ['codesLists', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['codesListsVersion', questionnaireId, versionId] as const,
};

/**
 * Used to retrieve codes lists associated to a questionnaire.
 *
 * @see {@link getCodesLists}
 */
export const codesListsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: codesListsKeys.all(questionnaireId),
    queryFn: () => getCodesLists(questionnaireId),
  });

/**
 * Used to retrieve codes lists associated to an older version of a questionnaire.
 *
 * @see {@link getCodesListsFromVersion}
 */
export const codesListsFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: codesListsKeys.version(questionnaireId, versionId),
    queryFn: () => getCodesListsFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  });

/** Retrieve codes lists associated to the questionnaire. */
export async function getCodesLists(
  questionnaireId: string,
): Promise<CodesList[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/codes-lists`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: CodesList[] }) => {
      return data;
    });
}

/** Retrieve codes lists associated to an older version of the questionnaire. */
export async function getCodesListsFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<CodesList[]> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/codes-lists`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: CodesList[] }) => {
      return data;
    });
}

/** Create or update a codes list. */
export async function putCodesList(
  questionnaireId: string,
  codeListId: string,
  codeList: CodesList,
): Promise<Response> {
  return instance.put(
    `/persistence/questionnaire/${questionnaireId}/codes-list/${codeListId}`,
    codeList,
    { headers: { 'Content-Type': 'application/json' } },
  );
}

/** Delete a codes list. */
export async function deleteCodesList(
  questionnaireId: string,
  codeListId: string,
): Promise<Response> {
  return instance.delete(
    `/persistence/questionnaire/${questionnaireId}/codes-list/${codeListId}`,
  );
}
