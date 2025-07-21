import { queryOptions } from '@tanstack/react-query';
import Papa, { ParseResult } from 'papaparse';

import {
  Mode,
  PersonalizationQuestionnaire,
  SurveyUnitModeData,
  SurveyUnitModeDataResponse,
} from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import { getFileName, openDocument } from './utils/personalization';

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getPublicEnemyBaseData}
 */
export const basePersonalizationQueryOptions = (questionnaireId: string) => ({
  queryKey: ['personalization', 'base', questionnaireId],
  queryFn: () => getPublicEnemyBaseData(questionnaireId),
});
export async function getPublicEnemyBaseData(
  questionnaireId: string,
): Promise<[PersonalizationQuestionnaire, ParseResult]> {
  try {
    const existingData = await getExistingPublicEnemyData(questionnaireId);
    const fileData = await getExistingCsvSchema(existingData.id);
    return [existingData, fileData];
  } catch (error) {
    console.error('Error fetching Public Enemy base data:', error);
    throw error;
  }
}

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getExistingPublicEnemyData}
 */
export const personalizationQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['personalization', { questionnaireId }],
    queryFn: () => getExistingPublicEnemyData(questionnaireId),
    retryOnMount: true,
  });

/** Fetch questionnaire data from Public Enemy Back Office. */
export async function getExistingPublicEnemyData(
  questionnaireId: string,
): Promise<PersonalizationQuestionnaire> {
  return instancePersonalization
    .get(`/questionnaires/${questionnaireId}/db`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PersonalizationQuestionnaire }) => {
      return data;
    });
}

/**
 * Used to retrieve data used to a create survey Units.
 *
 * @see {@link getPublicEnemyData}
 */
export const personalizationNewQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['personalizationNewQuestionnaire', { questionnaireId }],
    queryFn: () => getPublicEnemyData(questionnaireId),
  });

/** Fallback fetch questionnaire data if existing data is not found. */
export async function getPublicEnemyData(
  questionnaireId: string,
): Promise<PersonalizationQuestionnaire> {
  return instancePersonalization
    .get(`/questionnaires/pogues/${questionnaireId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PersonalizationQuestionnaire }) => {
      return data;
    });
}

/**
 * Used to retrieve data used to a create survey Units.
 *
 * @see {@link getAllSurveyUnitData}
 */
export const getSurveyUnitDataQueryOptions = (
  publicEnemyId: string,
  modes: Mode[],
) =>
  queryOptions({
    queryKey: ['getPersonalizationSurveyUnitData', { publicEnemyId, modes }],
    queryFn: () => getAllSurveyUnitData(publicEnemyId, modes),
    retryOnMount: true,
  });

export async function getSurveyUnitData(
  publicEnemyId: string,
  mode: Mode,
): Promise<SurveyUnitModeData[]> {
  return instancePersonalization
    .get(`/questionnaires/${publicEnemyId}/modes/${mode.name}/survey-units`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: SurveyUnitModeData[] }) => {
      return data;
    });
}

export async function getAllSurveyUnitData(
  publicEnemyId: string,
  mode: Mode[] = [],
): Promise<SurveyUnitModeData[]> {
  const filteredModes = mode.filter((m) => m.isWebMode);

  const promises = filteredModes.map((m) =>
    instancePersonalization.get(
      `/questionnaires/${publicEnemyId}/modes/${m.name}/survey-units`,
      {
        headers: { Accept: 'application/json' },
      },
    ),
  );

  const responses = await Promise.all(promises);
  return responses.flatMap(
    ({ data }: { data: SurveyUnitModeDataResponse }) => data.surveyUnits,
  );
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
 * @see {@link getExistingCsvSchema}
 */
export const personalizationFileQueryOptions = (publicEnemyId: string) =>
  queryOptions({
    queryKey: ['personalizationFile', { publicEnemyId }],
    queryFn: () => getExistingCsvSchema(publicEnemyId),
    retryOnMount: true,
  });

/* Fetch the existing csv file */
export async function getExistingCsvSchema(
  publicEnemyId: string,
): Promise<ParseResult> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${publicEnemyId}/data`,
      {
        headers: { Accept: 'text/csv' },
        responseType: 'blob',
      },
    );
    const csvData = new Blob([response.data], { type: 'text/csv' });
    const csvText = await csvData.text();
    const result = Papa.parse(csvText, {
      skipEmptyLines: true,
      header: true,
    });
    return result;
  } catch (error) {
    console.error('Failed to download CSV schema:', error);
    return { data: [], errors: [], meta: {} };
  }
}

/** Check the survey units CSV file for errors & warning messages */
export async function checkSurveyUnitsCSV(
  questionnaireId: string,
  surveyUnitCSVData: File,
): Promise<string[]> {
  const formData = new FormData();
  formData.append('surveyUnitData', surveyUnitCSVData);

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

  if (questionnaire.surveyUnitData) {
    formData.append('surveyUnitData', questionnaire.surveyUnitData);
  }
  return instancePersonalization.post(`/questionnaires/add`, formData);
}

/** Edit questionnaire data with personalization in PE db*/
export async function editQuestionnaireData(
  questionnaire: PersonalizationQuestionnaire,
): Promise<PersonalizationQuestionnaire> {
  const formData = new FormData();
  formData.append('context', JSON.stringify(questionnaire.context));

  if (questionnaire.surveyUnitData) {
    formData.append('surveyUnitData', questionnaire.surveyUnitData);
  }
  return instancePersonalization.post(
    `/questionnaires/${questionnaire.id}`,
    formData,
  );
}

export async function deleteQuestionnaireData(
  questionnaireId: string,
): Promise<void> {
  return instancePersonalization.delete(
    `/questionnaires/${questionnaireId}/delete`,
  );
}

export async function resetSurveyUnit(surveyUnitId: string): Promise<void> {
  return instancePersonalization.put(
    `/survey-units/${surveyUnitId}/reset`,
    undefined,
  );
}
