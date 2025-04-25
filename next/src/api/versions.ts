import { queryOptions } from '@tanstack/react-query';

import type { Version } from '@/models/version';

import { instance } from './instance';

export enum ERROR_CODES {
  RELATED_QUESTION_NAMES = 'codelist:relatedquestions:name',
}

/**
 * Used to retrieve version of a questionnaire.
 *
 * @see {@link getAllVersions}
 */
export const versionsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['versions', { questionnaireId }],
    queryFn: () => getAllVersions(questionnaireId),
  });

/** Retrieve all versions of a questionnaire. */
export async function getAllVersions(
  questionnaireId: string,
): Promise<Version[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/versions`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Version[] }) => {
      return data;
    });
}

/** Restore a version. */
export async function restoreVersion(versionId: string): Promise<Response> {
  return instance.post(`/persistence/questionnaire/restore/${versionId}`);
}

/** Delete all versions. */
export async function deleteAllVersions(
  questionnaireId: string,
): Promise<Response> {
  return instance.delete(
    `/persistence/questionnaire/${questionnaireId}/versions`,
  );
}
