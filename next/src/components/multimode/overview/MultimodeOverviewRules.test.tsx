import { fireEvent, waitFor } from '@testing-library/dom';
import nock from 'nock';

import { renderWithRouter } from '@/testing/render';

import MultimodeOverviewRules from './MultimodeOverviewRules';

vi.mock('@/lib/auth/oidc');

describe('MultimodeOverviewRules', () => {
  it('displays multimode questionnaire rule and empty roundabout rule', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewRules
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    expect(getByText('my-q-formula')).toBeInTheDocument();
    expect(
      getByText('There is no rule at the roundabout level.'),
    ).toBeInTheDocument();
  });

  it('displays multimode leaf rule and empty questionnaire rule', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewRules
        questionnaireId="q-id"
        isMovedRules={{ leafFormula: 'my-l-formula' }}
      />,
    );

    expect(
      getByText('There is no rule at the questionnaire level.'),
    ).toBeInTheDocument();
    expect(getByText('my-l-formula')).toBeInTheDocument();
  });

  it('allows to update multimode rules', async () => {
    const { getByRole } = await renderWithRouter(
      <MultimodeOverviewRules
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    const button = getByRole('link', { name: 'Edit' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      '/questionnaire/q-id/multimode/edit',
    );
  });

  it('allows to delete multimode rules', async () => {
    const { getByRole } = await renderWithRouter(
      <MultimodeOverviewRules
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    expect(getByRole('button', { name: 'Delete' })).toBeEnabled();

    const scope = nock('https://mock-api')
      .delete('/persistence/questionnaire/q-id/multimode')
      .reply(200);

    // click on delete button
    fireEvent.click(getByRole('button', { name: 'Delete' }));
    // confirm in dialog
    fireEvent.click(getByRole('button', { name: 'Validate' }));

    // multimode has been deleted
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy();
    });
  });

  it('does not allow to update or delete multimode rules in readonly', async () => {
    const { queryByRole } = await renderWithRouter(
      <MultimodeOverviewRules
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
        readonly
      />,
    );

    expect(queryByRole('link', { name: 'Edit' })).toBeNull();
    expect(queryByRole('button', { name: 'Delete' })).toBeNull();
  });
});
