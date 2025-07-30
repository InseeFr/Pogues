import { queryOptions } from '@tanstack/react-query';
import Papa, { ParseResult } from 'papaparse';

import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import { getFileName, openDocument } from './utils/personalization';

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getPublicEnemyBaseData}
 */
export const basePersonalizationQueryOptions = (publicEnemyId: string) => ({
  queryKey: ['personalization', 'base', publicEnemyId],
  queryFn: () => getPublicEnemyBaseData(publicEnemyId),
});

export async function getPublicEnemyBaseData(
  publicEnemyId: string,
): Promise<[InterrogationModeDataResponse, ParseResult | string]> {
  try {
    const interrogations = await getAllInterrogationData(publicEnemyId);
    const fileData = await getExistingFileSchema(publicEnemyId);

    return [interrogations, fileData];
  } catch (error) {
    console.error('Error fetching Public Enemy base data:', error);
    throw error;
  }
}

/**
 * Used to retrieve questionnaireData used by Public Enemy from PoguesID.
 *
 * @see {@link getExistingPublicEnemyData}
 */
export const personalizationQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['personalization', { questionnaireId }],
    queryFn: () => getExistingPublicEnemyData(questionnaireId),
    retryOnMount: true,
  });

/** Fetch existing questionnaire data from Public Enemy Back Office. */
export async function getExistingPublicEnemyData(
  questionnaireId: string,
): Promise<PersonalizationQuestionnaire> {
  return instancePersonalization
    .get(`/questionnaires/${questionnaireId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PersonalizationQuestionnaire }) => {
      return data;
    });
}

/**
 * Used to retrieve data used to a create survey Units.
 *
 * @see {@link getPublicEnemyDataFromPogues}
 */
export const personalizationFromPoguesQueryOptions = (
  questionnaireId: string,
) =>
  queryOptions({
    queryKey: ['personalizationNewQuestionnaire', { questionnaireId }],
    queryFn: () => getPublicEnemyDataFromPogues(questionnaireId),
  });

/**
 * Fallback fetch questionnaire data if existing data is not found.
 * Uses poguesId to create the questionnaire data.
 */
export async function getPublicEnemyDataFromPogues(
  questionnaireId: string,
): Promise<PersonalizationQuestionnaire> {
  return instancePersonalization
    .get(`/questionnaires?poguesId=${questionnaireId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PersonalizationQuestionnaire }) => {
      return data;
    });
}

/**
 * Used to retrieve interrogations data.
 *
 * @see {@link getAllInterrogationData}
 */
export const getInterrogationDataQueryOptions = (publicEnemyId: string) =>
  queryOptions({
    queryKey: ['getPersonalizationInterrogationData', { publicEnemyId }],
    queryFn: () => getAllInterrogationData(publicEnemyId),
    retryOnMount: true,
  });

export async function getAllInterrogationData(
  publicEnemyId: string,
): Promise<InterrogationModeDataResponse> {
  return instancePersonalization
    .get(`/questionnaires/${publicEnemyId}/interrogations`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: InterrogationModeDataResponse }) => {
      return data;
    });
}

/* Fetch the empty csv file to be filled */
export async function getInitialCsvSchema(
  questionnaireId: string,
): Promise<void> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${questionnaireId}/csv`,
      {
        headers: { Accept: 'application/json' },
        responseType: 'blob',
      },
    );
    const disposition = response.headers['content-disposition'];
    const fileName = disposition
      ? getFileName(disposition)
      : `schema-${questionnaireId}.csv`;
    openDocument(new Blob([response.data], { type: 'text/csv' }), fileName);
  } catch (error) {
    console.error('Failed to download CSV schema:', error);
  }
}

/**
 * Used to retrieve data used to a create survey Units.
 *
 * @see {@link getExistingFileSchema}
 */
export const personalizationFileQueryOptions = (publicEnemyId: string) =>
  queryOptions({
    queryKey: ['personalizationFile', { publicEnemyId }],
    queryFn: () => getExistingFileSchema(publicEnemyId),
    retryOnMount: true,
  });

/**
 * Fetch the existing data file (CSV or JSON)
 * Returns ParseResult for CSV files, or the parsed JSON object for JSON files
 */
export async function getExistingFileSchema(
  publicEnemyId: string,
): Promise<ParseResult | string> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${publicEnemyId}/data`,
      {
        headers: { Accept: 'text/csv, application/json' },
        responseType: 'blob',
      },
    );
    const contentType = response.headers['content-type'] || '';
    const text = await response.data.text();

    if (
      contentType.includes('text/csv') ||
      contentType.includes('application/csv')
    ) {
      const result = Papa.parse(text, {
        skipEmptyLines: true,
        header: true,
        dynamicTyping: true,
      });
      return result;
    } else if (contentType.includes('application/json')) {
      return text;
    } else {
      const text = await response.data.text();
      const trimmed = text.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        return trimmed;
      } else {
        const result = Papa.parse(text, {
          skipEmptyLines: true,
          header: true,
        });
        return result;
      }
    }
  } catch (error) {
    console.error('Failed to download data:', error);
    return '';
  }
}

/** Check the survey units file for errors & warning messages */
export async function checkInterrogationsData(
  questionnaireId: string,
  interrogationData: File,
): Promise<UploadError> {
  const formData = new FormData();
  formData.append('interrogationData', interrogationData);
  return instancePersonalization.post(
    `/questionnaires/${questionnaireId}/checkdata`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

/** Upload questionnaire data with personalization to PE db */
export async function addQuestionnaireData(
  questionnaire: PersonalizationQuestionnaire,
): Promise<PersonalizationQuestionnaire> {
  const formData = new FormData();
  const questionnaireRest = {
    poguesId: questionnaire.poguesId,
    context: questionnaire.context,
  };
  formData.append('questionnaire', JSON.stringify(questionnaireRest));

  if (questionnaire.interrogationData) {
    formData.append('interrogationData', questionnaire.interrogationData);
  }
  return instancePersonalization.post(`/questionnaires`, formData);
}

/** Edit questionnaire data with personalization in PE db*/
export async function editQuestionnaireData(
  questionnaire: PersonalizationQuestionnaire,
): Promise<PersonalizationQuestionnaire> {
  const formData = new FormData();
  formData.append('context', JSON.stringify(questionnaire.context));

  if (questionnaire.interrogationData) {
    formData.append('interrogationData', questionnaire.interrogationData);
  }
  return instancePersonalization.put(`/questionnaires`, formData);
}

export async function resetInterrogation(
  interrogationId: string,
): Promise<void> {
  return instancePersonalization.put(
    `/interrogations/${interrogationId}/reset`,
    undefined,
  );
}
