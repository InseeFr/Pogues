import { queryOptions } from '@tanstack/react-query';

import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import { getFileName, openDocument } from './utils/personalization';

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getExistingPublicEnemyData}
 */
export const personalizationQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['personalizationQuestionnaire', { questionnaireId }],
    queryFn: () => getExistingPublicEnemyData(questionnaireId),
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

export async function getTest(publicEnemyId: string): Promise<void> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${publicEnemyId}/data`,
      {
        headers: { Accept: 'application/json' },
        responseType: 'blob',
      },
    );
    const disposition = response.headers['content-disposition'];
    const fileName = disposition
      ? getFileName(disposition)
      : `data-${publicEnemyId}.csv`;
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
    queryKey: ['personalizationNewQuestionnaire', { publicEnemyId }],
    queryFn: () => getExistingCsvSchema(publicEnemyId),
  });

/* Fetch the existing csv file */
export async function getExistingCsvSchema(
  publicEnemyId: string,
): Promise<Blob> {
  try {
    const response = await instancePersonalization.get(
      `/questionnaires/${publicEnemyId}/data`,
      {
        headers: { Accept: 'text/csv' },
        responseType: 'blob',
      },
    );
    return new Blob([response.data], { type: 'text/csv' });
  } catch (error) {
    console.error('Failed to download CSV schema:', error);
    return new Blob([], { type: 'text/csv' });
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
  console.log('Edit questionnaire data', questionnaire);
  const formData = new FormData();
  const questionnaireRest = {
    poguesId: questionnaire.poguesId,
    context: questionnaire.context,
  };
  formData.append('questionnaire', JSON.stringify(questionnaireRest));

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
  return instancePersonalization.delete(`/questionnaires/${questionnaireId}/delete`);
}

export async function resetSurveyUnit(surveyUnitId: string): Promise<void> {
  return instancePersonalization.put(
    `/survey-units/${surveyUnitId}/reset`,
    undefined,
  );
}
