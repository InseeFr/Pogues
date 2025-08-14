import { fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { checkInterrogationsData } from '@/api/personalization';
import { createInterrogationFile } from '@/api/utils/personalization';
import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationCheckPanel from './PersonalizationCheckPanel';

vi.mock('@/api/personalization', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/personalization')>();

  return {
    ...actual,
    personalizationKeys: {
      base: (poguesId: string) =>
        ['personalization', 'base', poguesId] as const,
      fromPogues: (poguesId: string) =>
        ['personalizationFromPogues', { poguesId }] as const,
      file: (poguesId: string) =>
        ['personalizationFile', { poguesId }] as const,
      interrogationData: (poguesId: string) =>
        ['getPersonalizationInterrogationData', { poguesId }] as const,
      checkFileData: (poguesId: string) =>
        ['checkFileData', { poguesId }] as const,
      csvSchema: (poguesId: string) => ['csvSchema', { poguesId }] as const,
    },
    checkInterrogationsData: vi.fn(() => Promise.resolve()),
    editQuestionnaireData: vi.fn(() => Promise.resolve()),
  };
});

vi.mock('@/api/utils/personalization', () => ({
  openDocument: vi.fn(),
  openParsedCsv: vi.fn(),
  createInterrogationFile: vi.fn(() => Promise.resolve()),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), promise: vi.fn(), success: vi.fn() },
}));

describe('PersonalizationCheckPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
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
      cursor: 42,
    },
  };
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
    isOutdated: false,
    state: 'COMPLETED',
  };
  const mockInterrogationData = {
    CAPI: [
      { id: '1', displayableId: 1, url: 'https://CAPI1.com' },
      { id: '2', displayableId: 2, url: 'https://CAPI2.com' },
      { id: '3', displayableId: 3, url: 'https://CAPI3.com' },
    ],
    CAWI: [
      { id: '1', displayableId: 1, url: 'https://CAWI1.com' },
      { id: '2', displayableId: 2, url: 'https://CAWI2.com' },
    ],
    PAPI: [],
    CATI: [],
  };

  it('shows interrogation data when provided', async () => {
    const { container } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationCheckPanel
          questionnaireId={questionnaireId}
          data={mockData}
          fileData={mockCsvData}
          interrogationData={mockInterrogationData}
          hasValidInterrogationData={true}
        />,
      ),
    );
    expect(screen.getByText('CAWI')).toBeInTheDocument();
    expect(screen.queryByText('PAPI')).not.toBeInTheDocument();

    const capiLink = container.querySelector('a[href="https://CAPI1.com"]');
    expect(capiLink).toBeInTheDocument();
  });

  it('shows error message when interrogation data is invalid', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationCheckPanel
          questionnaireId={questionnaireId}
          data={mockData}
          fileData={mockCsvData}
          interrogationData={mockInterrogationData}
          hasValidInterrogationData={false}
        />,
      ),
    );
    expect(getByText('Error loading interrogation data')).toBeInTheDocument();
  });

  it('show warning message when the questionnaire is outdated', async () => {
    const outdatedData: PersonalizationQuestionnaire = {
      ...mockData,
      isOutdated: true,
    };
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationCheckPanel
          questionnaireId={questionnaireId}
          data={outdatedData}
          fileData={mockCsvData}
          interrogationData={mockInterrogationData}
          hasValidInterrogationData={true}
        />,
      ),
    );
    expect(
      screen.getByText(
        'The questionnaire is out of date. Please reload it by clicking the sync icon.',
      ),
    ).toBeInTheDocument();
  });

  it('calls the mutation to check file data when the update button is clicked', async () => {
    const outdatedData: PersonalizationQuestionnaire = {
      ...mockData,
      isOutdated: true,
    };
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationCheckPanel
          questionnaireId={questionnaireId}
          data={outdatedData}
          fileData={mockCsvData}
          interrogationData={mockInterrogationData}
          hasValidInterrogationData={true}
        />,
      ),
    );

    const updateButton = screen.getByRole('button', {
      name: 'update-button',
    });
    fireEvent.click(updateButton);

    expect(createInterrogationFile).toHaveBeenCalledWith(
      mockCsvData,
      questionnaireId,
    );
    await waitFor(() => {
      expect(checkInterrogationsData).toHaveBeenCalled();
    });
  });
});
