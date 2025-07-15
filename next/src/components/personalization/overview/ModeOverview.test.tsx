import { waitFor } from '@testing-library/react';

import {
  Mode,
  SurveyUnitModeData,
} from '@/models/personalizationQuestionnaire';
import { renderWithRouter } from '@/tests/tests';

import ModeOverview from './ModeOverview';

const mockModes: Mode[] = [
  { name: 'CAWI', isWebMode: true },
  { name: 'CAPI', isWebMode: true },
  { name: 'PAPI', isWebMode: false },
];

const surveyUnitData: SurveyUnitModeData[] = [
  {
    id: '185-CAWI-1',
    displayableId: 123,
    url: 'https://visu.com/milk',
  },
  {
    id: '185-CAPI-1',
    displayableId: 234,
    url: 'https://visu.com/tea',
  },
  {
    id: '185-PAPI-1',
    displayableId: 345,
    url: 'https://visu.com/coffee',
  },
];

describe('ModeOverview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers for web modes only', async () => {
    const { getByText, container } = await waitFor(() =>
      renderWithRouter(
        <ModeOverview modes={mockModes} surveyUnitData={surveyUnitData} />,
      ),
    );
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('CAPI')).toBeInTheDocument();
    const headerRow = container.querySelector('thead tr');
    expect(headerRow?.querySelectorAll('th')).toHaveLength(3);
  });

  it('renders a row for each unique displayableId', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <ModeOverview modes={mockModes} surveyUnitData={surveyUnitData} />,
      ),
    );
    expect(getByText('123')).toBeInTheDocument();
    expect(getByText('234')).toBeInTheDocument();
  });

  it('renders links for available URLs', async () => {
    const { getAllByRole } = await waitFor(() =>
      renderWithRouter(
        <ModeOverview modes={mockModes} surveyUnitData={surveyUnitData} />,
      ),
    );
    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://visu.com/milk');
    expect(links[1]).toHaveAttribute('href', 'https://visu.com/tea');
  });
});
