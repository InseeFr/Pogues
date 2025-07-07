import { fireEvent, screen, waitFor } from '@testing-library/react';
import toast from 'react-hot-toast';
import { expect } from 'vitest';

import {
  deleteQuestionnaireData,
  getExistingCsvSchema,
} from '@/api/personalize';
import { openDocument } from '@/api/utils/personalization';
import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { TargetModes } from '@/models/questionnaires';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationsOverview from './PersonalizationOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

vi.mock('@/api/personalize', () => ({
  getExistingCsvSchema: vi.fn(() => Promise.resolve({ data: null })),
  deleteQuestionnaireData: vi.fn(() => Promise.resolve()),
}));
vi.mock('@/api/utils/personalization', () => ({
  openDocument: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), promise: vi.fn() },
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
      { name: TargetModes.CAWI, isWebMode: true },
      { name: TargetModes.CAPI, isWebMode: false },
    ],
    context: {
      name: SurveyContextEnum.HOUSEHOLD,
      value: SurveyContextValueEnum.HOUSEHOLD,
    },
    surveyUnitData: undefined,
    isSynchronized: true,
  };

  it('display my csv file', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={mockCsvData}
          surveyUnitData={null}
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
          surveyUnitData={null}
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
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={undefined}
          surveyUnitData={null}
        />,
      ),
    );
    const button = getByText('Existing dataset');

    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });

    await expect(async () => {
      fireEvent.click(button);
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    }).not.toThrow();

    expect(openDocument).not.toHaveBeenCalled();
  });

  it('should successfully download when blob has data', async () => {
    const mockBlob = new Blob(['test,data\n1,value'], { type: 'text/csv' });
    Object.defineProperty(mockBlob, 'size', { value: 100, writable: false });

    vi.mocked(getExistingCsvSchema).mockResolvedValueOnce(mockBlob);

    await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview
          questionnaireId={questionnaireId}
          data={mockData}
          csvData={undefined}
          surveyUnitData={null}
        />,
      ),
    );

    const button = screen.getByText('Existing dataset');
    fireEvent.click(button);

    await waitFor(() => {
      expect(openDocument).toHaveBeenCalledWith(
        mockBlob,
        `survey-units-${123}.csv`,
      );
    });

    expect(toast.promise).toHaveBeenCalledWith(
      expect.any(Promise),
      expect.objectContaining({
        loading: 'Loading...',
        success: 'CSV schema downloaded successfully',
        error: expect.any(Function),
      }),
    );
  });
});
