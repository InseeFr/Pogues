import { renderWithRouter } from '@/testing/render';

import VersionsOverview from './VersionsOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('VersionsOverview', () => {
  const questionnaireId = '123';
  const mockVersions = [
    {
      id: '1',
      poguesId: '1',
      timestamp: '2023-10-01T12:00:00Z',
      day: '2023-10-01',
      author: 'John',
    },
    {
      id: '2',
      poguesId: '2',
      timestamp: '2024-10-01T12:00:00Z',
      day: '2024-10-01',
      author: 'Panda',
    },
  ];

  it('display my saves', async () => {
    const { getByText } = await renderWithRouter(
      <VersionsOverview
        questionnaireId={questionnaireId}
        versions={mockVersions}
      />,
    );

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Panda')).toBeInTheDocument();
  });
});
