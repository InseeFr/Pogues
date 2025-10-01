import { queryOptions } from '@tanstack/react-query';

import { MultimodeIsMovedRules } from '@/models/multimode';

import { instance } from './instance';
import { MultimodeDTO } from './models/multimodeDTO';
import {
  computeMultimodeIsMovedRules,
  computePoguesMultimodeFromIsMovedRules,
} from './utils/multimode';

export const multimodeKeys = {
  all: (questionnaireId: string) => ['multimode', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['multimodeVersion', questionnaireId, versionId] as const,
};

/**
 * Used to retrieve multimode used by a questionnaire.
 *
 * @see {@link getMultimode}
 */
export const multimodeQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: multimodeKeys.all(questionnaireId),
    queryFn: () => getMultimode(questionnaireId),
  });

/**
 * Used to retrieve multimode used by an older version of a questionnaire.
 *
 * @see {@link getMultimodeFromVersion}
 */
export const multimodeFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: multimodeKeys.version(questionnaireId, versionId),
    queryFn: () => getMultimodeFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  });

/** Retrieve multimode specified for a version of a questionnaire. */
export async function getMultimode(
  questionnaireId: string,
): Promise<MultimodeIsMovedRules> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/multimode`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: MultimodeDTO }) => {
      return computeMultimodeIsMovedRules(data);
    });
}

/** Retrieve multimode specified for a version of a questionnaire. */
export async function getMultimodeFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<MultimodeIsMovedRules> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/multimode`,
      {
        headers: { Accept: 'application/json' },
      },
    )
    .then(({ data }: { data: MultimodeDTO }) => {
      return computeMultimodeIsMovedRules(data);
    });
}

/** Upsert multimode with rules. */
export async function putMultimode(
  questionnaireId: string,
  isMovedRules: MultimodeIsMovedRules,
): Promise<Response> {
  return instance.put(
    `/persistence/questionnaire/${questionnaireId}/multimode`,
    computePoguesMultimodeFromIsMovedRules(isMovedRules),
    { headers: { 'Content-Type': 'application/json' } },
  );
}

/** Delete multimode. */
export async function deleteMultimode(
  questionnaireId: string,
): Promise<Response> {
  return instance.delete(
    `/persistence/questionnaire/${questionnaireId}/multimode`,
  );
}
