import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { renderWithRouter } from '@/testing/render';

import ReadonlyWarning from './ReadonlyWarning';

vi.mock('@/lib/auth/oidc');

describe('ReadonlyWarning', () => {
  it('display restore button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = await renderWithRouter(
      <ReadonlyWarning
        questionnaireId="my-questionnaire"
        versionId="my-version"
      />,
    );

    expect(getByRole('button', { name: /Restore/i })).toBeInTheDocument();

    const scope = nock('https://mock-api')
      .post('/persistence/questionnaire/restore/my-version')
      .reply(200);

    await user.click(getByRole('button', { name: /Restore/i }));

    expect(
      getByText(/A new save will be created with this save data./i),
    ).toBeInTheDocument();

    await user.click(getByRole('button', { name: /Validate/i }));

    expect(scope.isDone()).toBeTruthy();
  });

  it('do not display restore button when a version is not provided', async () => {
    const { queryByRole } = await renderWithRouter(<ReadonlyWarning />);

    expect(queryByRole('button', { name: /Restore/i })).toBeNull();
  });
});
