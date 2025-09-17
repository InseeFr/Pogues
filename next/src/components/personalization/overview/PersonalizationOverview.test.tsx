import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { expect, vi } from 'vitest';

import { deleteQuestionnaireData } from '@/api/personalization';
import { openParsedCsv } from '@/api/utils/personalization';
import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/testing/render';

import PersonalizationsOverview from './PersonalizationOverview';

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
    getExistingCsvSchema: vi.fn(() => Promise.resolve({ data: null })),
    deleteQuestionnaireData: vi.fn(() => Promise.resolve()),
  };
});

vi.mock('@/api/utils/personalization', () => ({
  openDocument: vi.fn(),
  openParsedCsv: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), promise: vi.fn(), success: vi.fn() },
}));

describe('PersonalizationOverview', () => {
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
    state: 'STARTED',
  };

  it('display my csv file', async () => {
    const { getByText } = await renderWithRouter(
      <PersonalizationsOverview
        questionnaireId={questionnaireId}
        data={mockData}
        fileData={mockCsvData}
        interrogationData={null}
      />,
    );

    expect(getByText('LabelQuestionnaire')).toBeInTheDocument();
    expect(getByText('Teemo')).toBeInTheDocument();
    expect(getByText('Panda')).toBeInTheDocument();
  });

  it('display my json file', async () => {
    const mockJsonData = [
      { id: '1', name: 'Teemo' },
      { id: '2', name: 'Panda' },
    ];
    const { getByText } = await renderWithRouter(
      <PersonalizationsOverview
        questionnaireId={questionnaireId}
        data={mockData}
        fileData={JSON.stringify(mockJsonData)}
        interrogationData={null}
      />,
    );

    expect(
      getByText((content) => content.includes('Teemo')),
    ).toBeInTheDocument();
    expect(
      getByText((content) => content.includes('Panda')),
    ).toBeInTheDocument();
  });

  it('delete the personalzation when the delete button is clicked', async () => {
    const { getByText } = await renderWithRouter(
      <PersonalizationsOverview
        questionnaireId={questionnaireId}
        data={mockData}
        fileData={mockCsvData}
        interrogationData={null}
      />,
    );

    const button = getByText('Delete');
    fireEvent.click(button);

    const validateButton = await screen.findByText('Validate');
    fireEvent.click(validateButton);

    await waitFor(() => {
      expect(deleteQuestionnaireData).toHaveBeenCalledWith(mockData.id);
    });
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
    } as unknown as ParseResult<unknown>;

    await renderWithRouter(
      <PersonalizationsOverview
        questionnaireId={questionnaireId}
        data={mockData}
        fileData={mockParsedCsv}
        interrogationData={null}
      />,
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
