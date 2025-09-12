import { waitFor } from '@testing-library/dom';

import { renderWithRouter } from '@/tests/tests';

import MultimodeOverview from './MultimodeOverview';

describe('MultimodeOverview', () => {
  it('display multimode questionnaire rule', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <MultimodeOverview
          questionnaireId="q-id"
          isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
        />,
      ),
    );

    expect(getByText('my-q-formula')).toBeInTheDocument();
    expect(
      getByText('There is no rule at the roundabout level.'),
    ).toBeInTheDocument();
  });

  it('display multimode leaf rule', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <MultimodeOverview
          questionnaireId="q-id"
          isMovedRules={{ leafFormula: 'my-l-formula' }}
        />,
      ),
    );

    expect(
      getByText('There is no rule at the questionnaire level.'),
    ).toBeInTheDocument();
    expect(getByText('my-l-formula')).toBeInTheDocument();
  });

  it('allow to set multimode rules from scratch when empty ', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(<MultimodeOverview questionnaireId="q-id" />),
    );

    const button = getByRole('link', {
      name: '+ Specify multimode rules for the questionnaire',
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      '/questionnaire/q-id/multimode/edit',
    );
  });

  it('display that there are no multimode rules when empty in readonly and does not allow to set rules', async () => {
    const { queryByRole, getByText } = await waitFor(() =>
      renderWithRouter(<MultimodeOverview questionnaireId="q-id" readonly />),
    );

    const button = queryByRole('link', {
      name: '+ Specify multimode rules for the questionnaire',
    });
    expect(button).toBeNull();
    expect(
      getByText('Multimode has not been specified in this version.'),
    ).toBeInTheDocument();
  });

  it('allow to update multimode rules', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <MultimodeOverview
          questionnaireId="q-id"
          isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
        />,
      ),
    );

    const button = getByRole('link', { name: 'Edit' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      '/questionnaire/q-id/multimode/edit',
    );
  });

  it('does not allow to update multimode rules in readonly', async () => {
    const { queryByRole } = await waitFor(() =>
      renderWithRouter(
        <MultimodeOverview
          questionnaireId="q-id"
          isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
          readonly
        />,
      ),
    );

    const button = queryByRole('link', { name: 'Edit' });
    expect(button).toBeNull();
  });
});
