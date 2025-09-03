import { queryOptions } from '@tanstack/react-query';
// I have to use ParseResult<unknown> because the type changes based on the CSV content.
import Papa, { ParseResult } from 'papaparse';

import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
  UploadMessage,
} from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import { getFileName, openDocument } from './utils/personalization';

export const personalizationKeys = {
  base: (poguesId: string) => ['personalization', 'base', poguesId] as const,
  fromPogues: (poguesId: string) =>
    ['personalizationFromPogues', { poguesId }] as const,
  file: (poguesId: string) => ['personalizationFile', { poguesId }] as const,
  interrogationData: (poguesId: string) =>
    ['getPersonalizationInterrogationData', { poguesId }] as const,
  checkFileData: (poguesId: string) => ['checkFileData', { poguesId }] as const,
  csvSchema: (poguesId: string) => ['csvSchema', { poguesId }] as const,
};

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getPublicEnemyBaseData}
 */
export const basePersonalizationQueryOptions = (poguesId: string) => ({
  queryKey: personalizationKeys.base(poguesId),
  queryFn: () => getPublicEnemyBaseData(poguesId),
});

export async function getPublicEnemyBaseData(
  poguesId: string,
): Promise<[InterrogationModeDataResponse, ParseResult<unknown> | string]> {
  try {
    const [interrogations, fileData] = await Promise.all([
      getAllInterrogationData(poguesId),
      getExistingFileSchema(poguesId),
    ]);
    return [interrogations, fileData];
  } catch (error) {
    console.error('Error fetching Public Enemy base data:', error);
    throw error;
  }
}

/**
 * Used to retrieve data used to a create survey Units.
 *
 * @see {@link getPublicEnemyDataFromPogues}
 */
export const personalizationFromPoguesQueryOptions = (poguesId: string) =>
  queryOptions({
    queryKey: personalizationKeys.fromPogues(poguesId),
    queryFn: () => getPublicEnemyDataFromPogues(poguesId),
    staleTime: 0,
    gcTime: 0,
  });

/**
 * Fallback fetch questionnaire data if existing data is not found.
 * Uses poguesId to create the questionnaire data.
 */
export async function getPublicEnemyDataFromPogues(
  poguesId: string,
): Promise<PersonalizationQuestionnaire> {
  return instancePersonalization
    .get(`/questionnaires/${poguesId}`, {
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
export const getInterrogationDataQueryOptions = (poguesId: string) =>
  queryOptions({
    queryKey: personalizationKeys.interrogationData(poguesId),
    queryFn: () => getAllInterrogationData(poguesId),
    retryOnMount: true,
  });

export async function getAllInterrogationData(
  poguesId: string,
): Promise<InterrogationModeDataResponse> {
  return instancePersonalization
    .get(`/questionnaires/${poguesId}/interrogations`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: InterrogationModeDataResponse }) => {
      return data;
    });
}

/* Fetch the empty csv file to be filled */
export async function getInitialCsvSchema(poguesId: string): Promise<void> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${poguesId}/csv`,
      {
        headers: { Accept: 'application/json' },
        responseType: 'blob',
      },
    );
    const disposition = response.headers['content-disposition'];
    const fileName = disposition
      ? getFileName(disposition)
      : `schema-${poguesId}.csv`;
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
export const personalizationFileQueryOptions = (poguesId: string) =>
  queryOptions({
    queryKey: personalizationKeys.file(poguesId),
    queryFn: () => getExistingFileSchema(poguesId),
    retryOnMount: true,
  });

/**
 * Fetch the existing data file (CSV or JSON)
 * Returns ParseResult for CSV files, or the parsed JSON object for JSON files
 */
export async function getExistingFileSchema(
  poguesId: string,
): Promise<ParseResult<unknown> | string> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${poguesId}/data`,
      {
        headers: { Accept: 'text/csv, application/json' },
        responseType: 'blob',
      },
    );
    const contentType = response.headers['content-type'] || '';
    const text: string = await response.data.text();

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
  poguesId: string,
  interrogationData: File,
): Promise<UploadMessage> {
  const formData = new FormData();
  formData.append('interrogationData', interrogationData);
  const response = await instancePersonalization.post(
    `/questionnaires/${poguesId}/checkdata`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
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
  const response = await instancePersonalization.post(
    `/questionnaires`,
    formData,
  );
  return response.data;
}

/** Edit questionnaire data with personalization in PE db*/
export async function editQuestionnaireData(
  questionnaire: PersonalizationQuestionnaire,
  isOutdated: boolean = false,
): Promise<PersonalizationQuestionnaire> {
  const formData = new FormData();
  const questionnaireRest = {
    poguesId: questionnaire.poguesId,
    context: questionnaire.context,
  };
  formData.append('questionnaire', JSON.stringify(questionnaireRest));
  if (questionnaire.interrogationData && !isOutdated) {
    formData.append('interrogationData', questionnaire.interrogationData);
  }

  const response = await instancePersonalization.put(
    `/questionnaires`,
    formData,
  );
  return response.data;
}

export async function resetInterrogation(
  interrogationId: string,
): Promise<void> {
  return instancePersonalization.put(
    `/interrogations/${interrogationId}/reset`,
    undefined,
  );
}

export async function deleteQuestionnaireData(poguesId: string): Promise<void> {
  return instancePersonalization.delete(`/questionnaires/${poguesId}`);
}

/* Fetch the pdf file which represents data filled */
export async function getPdfRecapOfInterrogation(
  interrogationId: string,
): Promise<void> {
  try {
    const response = await instancePersonalization.get(
      `/interrogations/${interrogationId}/recap-pdf`,
      {
        headers: { Accept: 'application/pdf' },
        responseType: 'blob',
      },
    );
    const disposition = response.headers['content-disposition'];
    const fileName = disposition
      ? getFileName(disposition)
      : `pdf-${interrogationId}.pdf`;
    openDocument(
      new Blob([response.data], { type: 'application/pdf' }),
      fileName,
    );
  } catch (error) {
    console.error('Failed to download PDF:', error);
  }
}
