import { expect } from 'vitest';

import { renderWithRouter } from '@/utils/tests';

import CodesListsOverview from './CodesListsOverview';

describe('CodesListOverview', () => {
  it('display my code lists', () => {
    const { getByText } = renderWithRouter(
      <CodesListsOverview
        codesLists={[
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
        ]}
        questionnaireId="q-id"
      />,
    );

    expect(getByText('my code list')).toBeInTheDocument();
    expect(getByText('my second code list')).toBeInTheDocument();
  });

  it('display a create code list button when no codes list are provided', () => {
    const { getAllByText } = renderWithRouter(
      <CodesListsOverview codesLists={[]} questionnaireId="q-id" />,
    );

    expect(getAllByText('Create a code list')).toHaveLength(2);
  });
});
