import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import NomenclaturesOverview from './NomenclatureOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('NomenclatureOverview', () => {
  const questionnaireId = '123';
  const mockNomenclatures = [
    {
      id: '1',
      label: 'Le poisson steve',
      version: '4.5.6',
      externalLink: {
        urn: 'urn:ddi:fr.poisson',
      },
      relatedQuestionNames: ['LE_POISSON_STEVE'],
    },
    {
      id: '2',
      label: 'Il est orange',
      version: '1.09',
      externalLink: {
        urn: 'urn:ddi:fr.steve',
      },
      relatedQuestionNames: ['IL_EST_ORANGE'],
    },
  ];
  it('display my nomenclatures', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <NomenclaturesOverview
          questionnaireId={questionnaireId}
          nomenclatures={mockNomenclatures}
        />,
      ),
    );

    expect(getByText('Le poisson steve')).toBeInTheDocument();
    expect(getByText('Il est orange')).toBeInTheDocument();
  });

  it('filters the nomenclature list based on the search input', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <NomenclaturesOverview
          questionnaireId={questionnaireId}
          nomenclatures={mockNomenclatures}
        />,
      ),
    );

    const input = screen.getByPlaceholderText('Search for a nomenclature');

    fireEvent.change(input, { target: { value: 'orange' } });

    expect(getByText('Il est orange')).toBeInTheDocument();
    expect(screen.queryByText('Le poisson steve')).not.toBeInTheDocument();
  });

  it('sorts the nomenclatures by label', async () => {
    const { container } = await waitFor(() =>
      renderWithRouter(
        <NomenclaturesOverview
          questionnaireId={questionnaireId}
          nomenclatures={mockNomenclatures}
        />,
      ),
    );

    const items = container.querySelectorAll('h3');

    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('Il est orange'); // Alphabetically before "Le poisson steve"
    expect(items[1].textContent).toBe('Le poisson steve');
  });
});
