import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { SurveyModeEnum } from '@/api/models/pogues';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationsOverview from './PersonalizationOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('PersonalizationOverview', () => {
  const questionnaireId = '123';
  const mockData = {
    id: '1',
    poguesId: '1',
    label: 'LabelQuestionnaire',
    modes: [
      { name: SurveyModeEnum.CAWI, isWebMode: true },
      { name: SurveyModeEnum.CAPI, isWebMode: false },
    ],
    context: {
      name: 'BUSINESS',
      value: 'Entreprise',
    },
    surveyUnitData: undefined,
    isSynchronized: true,
  };

  const mockCsvData = {
    data: [
      { id: '1', name: 'Teemo' },
      { id: '2', name: 'Panda' },
    ],
    errors: [],
    meta: {
      fields: ['id', 'name'],
      delimiter: ',',
      linebreak: '\n',
      aborted: false,
      truncated: false,
    },
  };

  it('display my csv file', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={mockCsvData}
        />,
      ),
    );
    expect(getByText('LabelQuestionnaire')).toBeInTheDocument();
    expect(getByText('Teemo')).toBeInTheDocument();
    expect(getByText('Panda')).toBeInTheDocument();
  });
});
