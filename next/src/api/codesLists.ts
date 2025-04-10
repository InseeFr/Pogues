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

/**
 * Used to retrieve codes lists associated to a questionnaire.
 *
 * @see {@link getCodesLists}
 */
export const codesListsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['codesLists', { questionnaireId }],
    queryFn: () => getCodesLists(questionnaireId),
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
