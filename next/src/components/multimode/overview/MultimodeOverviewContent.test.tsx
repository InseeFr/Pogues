import { renderWithRouter } from '@/testing/render';

import MultimodeOverviewContent from './MultimodeOverviewContent';

describe('MultimodeOverviewContent', () => {
  it('displays multimode rules', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewContent
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    expect(getByText('my-q-formula')).toBeInTheDocument();
  });

  it('allows to set multimode rules from scratch when empty ', async () => {
    const { getByRole } = await renderWithRouter(
      <MultimodeOverviewContent questionnaireId="q-id" />,
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

  it('displays that there are no multimode rules when empty in readonly and does not allow to set rules', async () => {
    const { queryByRole, getByText } = await renderWithRouter(
      <MultimodeOverviewContent questionnaireId="q-id" readonly />,
    );

    const button = queryByRole('link', {
      name: '+ Specify multimode rules for the questionnaire',
    });
    expect(button).toBeNull();
    expect(
      getByText('Multimode has not been specified in this version.'),
    ).toBeInTheDocument();
  });
});
