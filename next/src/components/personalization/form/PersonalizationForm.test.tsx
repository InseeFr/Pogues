import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/testing/render';

import PersonalizationForm from './PersonalizationForm';

vi.mock('@/api/personalization', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/personalization')>();

  return {
    ...actual,
    // Had to redefine the whole constant to avoid vitest throwing an error
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
  };
});

vi.mock('papaparse', () => ({
  __esModule: true,
  default: {
    unparse: vi.fn(() => 'id,name\n1,Teemo\n2,Panda\n'),
    parse: vi.fn((_file, opts) => {
      if (opts && typeof opts.complete === 'function') {
        opts.complete({
          data: [{ id: '1', name: 'Test' }],
          errors: [],
          meta: {},
        });
      }
    }),
  },
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), success: vi.fn(), promise: vi.fn() },
}));

describe('PersonalizationForm', () => {
  const baseQuestionnaire: PersonalizationQuestionnaire = {
    id: '1',
    poguesId: '1',
    label: 'LabelQuestionnaire',
    modes: [],
    context: {
      name: SurveyContextEnum.HOUSEHOLD,
      value: SurveyContextValueEnum.HOUSEHOLD,
    },
    interrogationData: undefined,
    state: 'STARTED',
    isOutdated: false,
  };

  const setQuestionnaire = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders context select and file upload button', async () => {
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={baseQuestionnaire}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
          fileData={null}
        />,
      ),
    );
    expect(screen.getByText('Context')).toBeInTheDocument();
    const radiogroups = screen.getAllByRole('radiogroup');
    expect(radiogroups).toHaveLength(2);
    expect(screen.getByText('Personalization type')).toBeInTheDocument();
    expect(screen.getByText('Upload survey units data')).toBeInTheDocument();
  });

  it('does not show error component initially', () => {
    renderWithRouter(
      <PersonalizationForm
        questionnaireId="1"
        questionnaire={baseQuestionnaire}
        setQuestionnaire={setQuestionnaire}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText('error-component')).not.toBeInTheDocument();
  });

  it('disables validate button if no file is uploaded', async () => {
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={{ ...baseQuestionnaire, interrogationData: undefined }}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
        />,
      ),
    );
    const button = screen.getByText('Validate');
    expect(button).toBeDisabled();
  });

  it('shows my csv data', async () => {
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

    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={baseQuestionnaire}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
          fileData={mockCsvData}
        />,
      ),
    );

    expect(screen.queryByTestId('json-viewer')).not.toBeInTheDocument();
    expect(screen.getByText('Teemo')).toBeInTheDocument();
  });

  it('clear data on filetype change', async () => {
    const mockJsonData = [
      { id: '1', name: 'Teemo' },
      { id: '2', name: 'Panda' },
    ];

    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={baseQuestionnaire}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
          fileData={JSON.stringify(mockJsonData)}
        />,
      ),
    );
    const radiogroups = screen.getAllByRole('radiogroup');
    const personalizationTypeGroup = radiogroups.find((group) =>
      within(group).queryByText(/Personalization type/i),
    );
    expect(personalizationTypeGroup).toBeTruthy();

    const jsonOption = within(personalizationTypeGroup!).getByText(/JSON/i);
    fireEvent.click(jsonOption);

    expect(screen.queryByTestId('json-viewer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('csv-viewer-table')).not.toBeInTheDocument();
  });

  it('handle file input', async () => {
    const mockJsonFile = new File(
      [JSON.stringify({ id: '1', name: 'Teemo' })],
      'filename.json',
      { type: 'application/json' },
    );
    mockJsonFile.text = () =>
      Promise.resolve(JSON.stringify({ id: '1', name: 'Teemo' }));
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={baseQuestionnaire}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
          fileData={null}
        />,
      ),
    );

    const radiogroups = screen.getAllByRole('radiogroup');
    const personalizationTypeGroup = radiogroups.find((group) =>
      within(group).queryByText(/Personalization type/i),
    );
    expect(personalizationTypeGroup).toBeTruthy();

    const jsonOption = within(personalizationTypeGroup!).getByText(/JSON/i);
    fireEvent.click(jsonOption);

    const uploadButton = screen.getByText('Upload survey units data');
    fireEvent.click(uploadButton);
    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    await userEvent.upload(fileInput, mockJsonFile);

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files?.[0]).toEqual(mockJsonFile);
    await waitFor(() => {
      expect(setQuestionnaire).toHaveBeenCalledWith(
        expect.objectContaining({
          interrogationData: mockJsonFile,
        }),
      );
    });
  });

  it('handle context change', async () => {
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={baseQuestionnaire}
          setQuestionnaire={setQuestionnaire}
          handleSubmit={vi.fn()}
          fileData={null}
        />,
      ),
    );

    const radiogroups = screen.getAllByRole('radiogroup');
    const contextTypeGroup = radiogroups.find((group) =>
      within(group).queryByText(/Context/i),
    );
    expect(contextTypeGroup).toBeTruthy();

    const businessOption = within(contextTypeGroup!).getByText(/Entreprise/i);
    fireEvent.click(businessOption);

    expect(setQuestionnaire).toHaveBeenCalledWith(
      expect.objectContaining({
        context: {
          name: SurveyContextEnum.BUSINESS,
          value: SurveyContextValueEnum.BUSINESS,
        },
      }),
    );
  });
});
