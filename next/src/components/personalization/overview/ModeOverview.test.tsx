import { fireEvent, waitFor } from '@testing-library/react';
import toast from 'react-hot-toast';

import { getPdfRecapOfInterrogation } from '@/api/personalization';
import { InterrogationModeDataResponse } from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/testing/render';

import ModeOverview from './ModeOverview';

const interrogationData: InterrogationModeDataResponse = {
  CAWI: [
    {
      id: '123-CAWI',
      displayableId: 1,
      url: 'https://visu.com/milk',
    },
    {
      id: '456-CAWI',
      displayableId: 2,
      url: 'https://visu.com/mocha',
    },
  ],
  CATI: [
    {
      id: '234-CATI',
      displayableId: 1,
      url: 'https://visu.com/tea',
    },
    {
      id: '456-CATI',
      displayableId: 2,
      url: 'https://visu.com/hot-chocolate',
    },
  ],
  PAPI: [],
  CAPI: [],
} as InterrogationModeDataResponse;

vi.mock('@/api/personalization', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/personalization')>();

  return {
    ...actual,
    getPdfRecapOfInterrogation: vi.fn(() => Promise.resolve()),
  };
});

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), promise: vi.fn(), success: vi.fn() },
}));

describe('ModeOverview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers for web modes only', async () => {
    const { getByText, container } = await waitFor(() =>
      renderWithRouter(<ModeOverview interrogationData={interrogationData} />),
    );
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('CAWI')).toBeInTheDocument();
    const headerRow = container.querySelector('thead tr');
    expect(headerRow?.querySelectorAll('th')).toHaveLength(3);
  });

  it('renders a row for each unique displayableId', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(<ModeOverview interrogationData={interrogationData} />),
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });

  it('renders links for available URLs', async () => {
    const { getAllByRole } = await waitFor(() =>
      renderWithRouter(<ModeOverview interrogationData={interrogationData} />),
    );
    const links = getAllByRole('link');
    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute('href', 'https://visu.com/milk');
    expect(links[1]).toHaveAttribute('href', 'https://visu.com/tea');
  });

  it('renders button for Download pdf', async () => {
    const { getAllByTitle } = await waitFor(() =>
      renderWithRouter(<ModeOverview interrogationData={interrogationData} />),
    );
    const buttons = getAllByTitle('Download PDF data summary');
    expect(buttons).toHaveLength(2);
    const downloadPdfBtn = buttons[1];
    expect(downloadPdfBtn).toHaveAttribute('type', 'button');
  });

  it('should download PDF when clicking on button', async () => {
    const { getAllByRole } = await waitFor(() =>
      renderWithRouter(<ModeOverview interrogationData={interrogationData} />),
    );
    const buttons = getAllByRole('button');
    const downloadPdfBtn = buttons[1];

    fireEvent.click(downloadPdfBtn);

    await waitFor(() => {
      expect(getPdfRecapOfInterrogation).toHaveBeenCalled();
    });

    expect(toast.promise).toHaveBeenCalled();
  });
});
