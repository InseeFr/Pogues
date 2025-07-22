import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { expect, vi } from 'vitest';

import {
  deleteQuestionnaireData,
  getExistingCsvSchema,
} from '@/api/personalization';
import { openParsedCsv } from '@/api/utils/personalization';
import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationsOverview from './PersonalizationOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

vi.mock('@/api/personalization', () => ({
  getExistingCsvSchema: vi.fn(() => Promise.resolve({ data: null })),
  deleteQuestionnaireData: vi.fn(() => Promise.resolve()),
}));
vi.mock('@/api/utils/personalization', () => ({
  openDocument: vi.fn(),
  openParsedCsv: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), promise: vi.fn(), success: vi.fn() },
}));

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
describe('PersonalizationOverview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const questionnaireId = '123';
  const mockData: PersonalizationQuestionnaire = {
    id: '1',
    poguesId: '1',
    label: 'LabelQuestionnaire',
    modes: [
      { name: 'CAWI', isWebMode: true },
      { name: 'CAPI', isWebMode: false },
    ],
    context: {
      name: SurveyContextEnum.HOUSEHOLD,
      value: SurveyContextValueEnum.HOUSEHOLD,
    },
    interrogationData: undefined,
    isSynchronized: true,
  };

  it('display my csv file', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={mockCsvData}
          interrogationData={null}
        />,
      ),
    );
    expect(getByText('LabelQuestionnaire')).toBeInTheDocument();
    expect(getByText('Teemo')).toBeInTheDocument();
    expect(getByText('Panda')).toBeInTheDocument();
  });

  it('delete the personalzation when the delete button is clicked', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={mockCsvData}
          interrogationData={null}
        />,
      ),
    );
    const button = getByText('Delete');
    fireEvent.click(button);

    const validateButton = await screen.findByText('Validate');
    fireEvent.click(validateButton);

    await waitFor(() => {
      expect(deleteQuestionnaireData).toHaveBeenCalledWith(mockData.id);
    });
  });

  it('handles empty blob if there is no data', async () => {
    vi.mocked(getExistingCsvSchema).mockRejectedValueOnce(
      new Error('No data available for download.'),
    );

    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={undefined}
          interrogationData={null}
        />,
      ),
    );
    const button = getByText('Existing dataset');

    fireEvent.click(button);

    expect(openParsedCsv).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });

  it('should successfully download when blob has data', async () => {
    const mockParsedCsv = {
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
    } as ParseResult;

    await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={mockParsedCsv}
          interrogationData={null}
        />,
      ),
    );

    const button = screen.getByText('Existing dataset');
    fireEvent.click(button);

    await waitFor(() => {
      expect(openParsedCsv).toHaveBeenCalledWith(
        mockParsedCsv,
        `interrogations-${123}.csv`,
      );
    });
    expect(toast.success).toHaveBeenCalled();
  });
});
