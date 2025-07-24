import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Papa from 'papaparse';
import { expect } from 'vitest';

import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
  UploadError,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationForm from './PersonalizationForm';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

vi.mock('papaparse', () => ({
  __esModule: true,
  default: {
    parse: vi.fn((file, opts) => {
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
    isSynchronized: true,
  };

  const setQuestionnaire = vi.fn();
  const setErrorUpload = vi.fn();

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
          errorUpload={null}
          setErrorUpload={setErrorUpload}
          handleSubmit={vi.fn()}
        />,
      ),
    );
    expect(screen.getByText('Upload survey units data')).toBeInTheDocument();
  });

  it('displays uploaded CSV file content', async () => {
    renderWithRouter(
      <PersonalizationForm
        questionnaireId="1"
        questionnaire={baseQuestionnaire}
        setQuestionnaire={setQuestionnaire}
        errorUpload={null}
        setErrorUpload={setErrorUpload}
        handleSubmit={vi.fn()}
      />,
    );

    const uploadBtn = screen.getByRole('button', {
      name: /upload survey units data/i,
    });
    fireEvent.click(uploadBtn);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(fileInput).toBeTruthy();

    const file = new File(['id,name\n1,Teemo\n2,Panda'], 'test.csv', {
      type: 'text/csv',
    });
    await userEvent.upload(fileInput, file);

    expect(Papa.parse).toHaveBeenCalledWith(
      file,
      expect.objectContaining({
        header: true,
        complete: expect.any(Function),
      }),
    );
  });

  it('shows error component if there is errors', () => {
    renderWithRouter(
      <PersonalizationForm
        questionnaireId="1"
        questionnaire={baseQuestionnaire}
        setQuestionnaire={setQuestionnaire}
        errorUpload={
          { message: 'error', details: ['error message 1'] } as UploadError
        }
        setErrorUpload={setErrorUpload}
        handleSubmit={vi.fn()}
      />,
    );
    expect(screen.getByText('error message 1')).toBeInTheDocument();
  });

  it('disables validate button if no file is uploaded', async () => {
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={{ ...baseQuestionnaire, interrogationData: undefined }}
          setQuestionnaire={setQuestionnaire}
          errorUpload={null}
          setErrorUpload={setErrorUpload}
          handleSubmit={vi.fn()}
        />,
      ),
    );
    const button = screen.getByText('Validate');
    expect(button).toBeDisabled();
  });

  it('disables validate button if errorUpload is present', async () => {
    await waitFor(() =>
      renderWithRouter(
        <PersonalizationForm
          questionnaireId="1"
          questionnaire={{
            ...baseQuestionnaire,
            interrogationData: new File([''], 'a.csv'),
          }}
          setQuestionnaire={setQuestionnaire}
          errorUpload={
            { message: 'error', details: ['error message 1'] } as UploadError
          }
          setErrorUpload={setErrorUpload}
          handleSubmit={vi.fn()}
        />,
      ),
    );
    const button = screen.getByText('Validate');
    expect(button).toBeDisabled();
  });
});
