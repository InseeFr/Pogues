import { queryOptions } from '@tanstack/react-query';

import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import { getFileName, openDocument } from './utils/personalization';

/**
 * Used to retrieve questionnaireData used by a Public Enemy.
 *
 * @see {@link getPublicEnemyData}
 */
export const personalizationQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['personalizationQuestionnaire', { questionnaireId }],
    queryFn: () => getPublicEnemyData(questionnaireId),
  });

/** Fetch questionnaire data from Public Enemy Back Office. */
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
  console.log('getInitialCsvSchema', questionnaireId);
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

export async function resetSurveyUnit(surveyUnitId: string): Promise<void> {
  return instancePersonalization.post(
    `/survey-units/${surveyUnitId}/reset`,
    undefined,
  );
}
