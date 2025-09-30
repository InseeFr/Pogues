import { renderWithRouter } from '@/testing/render';

import MultimodeOverview from './MultimodeOverview';

describe('MultimodeOverview', () => {
  it('displays multimode rules', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverview
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    expect(getByText('my-q-formula')).toBeInTheDocument();
  });
});
