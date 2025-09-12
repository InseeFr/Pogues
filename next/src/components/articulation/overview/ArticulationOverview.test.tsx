import { waitFor } from '@testing-library/dom';

import OverviewItem from '@/components/ui/OverviewItem';
import { ArticulationItems } from '@/models/articulation';
import { renderWithI18n, renderWithRouter } from '@/tests/tests';

import { ArticulationOverview } from './ArticulationOverview';
import { ArticulationOverviewDetails } from './ArticulationOverviewDetails';

vi.mock('@/components/ui/OverviewItem', () => ({
  default: vi.fn(),
}));

describe('ArticulationOverview', () => {
  it('renders no articulation message when readonly and no items', () => {
    const { getByText } = renderWithI18n(
      <ArticulationOverview
        questionnaireId="q1"
        articulationItems={undefined}
        readonly
      />,
    );

    expect(
      getByText('Articulation has not been specified in this version.'),
    ).toBeInTheDocument();
  });

  it('renders create button when not readonly and no items', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <ArticulationOverview
          questionnaireId="q1"
          articulationItems={undefined}
          readonly={false}
        />,
      ),
    );

    const button = getByRole('link', {
      name: 'Create an articulation',
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      '/questionnaire/q1/articulation/new',
    );
  });

  it('renders OverviewItem and ArticulationOverviewDetails when items exist', async () => {
    const articulationItems: ArticulationItems = [
      { label: 'Prénom', value: 'name' },
      { label: 'Sexe', value: 'gender' },
      { label: 'Age', value: 'age' },
    ];

    await waitFor(() =>
      renderWithRouter(
        <ArticulationOverview
          questionnaireId="q1"
          articulationItems={articulationItems}
          readonly={false}
        />,
      ),
    );

    expect(OverviewItem).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultExpanded: true,
        disableExpandButton: true,
        content: expect.anything(),
        details: expect.objectContaining({
          type: ArticulationOverviewDetails,
          props: expect.objectContaining({
            questionnaireId: 'q1',
            articulationItems: articulationItems,
            readonly: false,
          }),
        }),
      }),
      expect.anything(),
    );
  });
});
