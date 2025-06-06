import { fireEvent, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/utils/tests';

import CodesListsOverview from './CodesListsOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('CodesListOverview', () => {
  const mockCodesLists = [
    {
      id: 'cl-id1',
      label: 'my code list',
      codes: [],
    },
    {
      id: 'cl-id2',
      label: 'my second code list',
      codes: [],
    },
  ];
  it('display my code lists', () => {
    const { getByText } = renderWithRouter(
      <CodesListsOverview codesLists={mockCodesLists} questionnaireId="q-id" />,
    );

    expect(getByText('my code list')).toBeInTheDocument();
    expect(getByText('my second code list')).toBeInTheDocument();
  });

  it('display a create code list button when no codes list are provided', () => {
    const { getAllByText } = renderWithRouter(
      <CodesListsOverview codesLists={[]} questionnaireId="q-id" />,
    );

    expect(getAllByText('Create a code list')).toHaveLength(1);
  });

  it('filters the code lists based on the search input', () => {
    const { getByText } = renderWithRouter(
      <CodesListsOverview codesLists={mockCodesLists} questionnaireId="123" />,
    );

    const input = screen.getByPlaceholderText('Search for a code list');

    fireEvent.change(input, { target: { value: 'second' } });

    expect(getByText('my second code list')).toBeInTheDocument();
  });
});
