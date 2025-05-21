import { fireEvent, screen } from '@testing-library/react';

import { renderWithRouter } from '@/utils/tests';

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
  it('display my nomenclatures', () => {
    const { getByText } = renderWithRouter(
      <NomenclaturesOverview
        questionnaireId={questionnaireId}
        nomenclatures={mockNomenclatures}
      />,
    );

    expect(getByText('Le poisson steve')).toBeInTheDocument();
    expect(getByText('Il est orange')).toBeInTheDocument();
  });

  it('filters the nomenclature list based on the search input', () => {
    const { getByText } = renderWithRouter(
      <NomenclaturesOverview
        questionnaireId={questionnaireId}
        nomenclatures={mockNomenclatures}
      />,
    );

    const input = screen.getByPlaceholderText('Search for a nomenclature');

    fireEvent.change(input, { target: { value: 'orange' } });

    expect(getByText('Il est orange')).toBeInTheDocument();
    expect(screen.queryByText('Le poisson steve')).not.toBeInTheDocument();
  });
});
