import { expect } from 'vitest';

import { renderWithRouter } from '@/utils/tests';

import QuestionnaireLine from './QuestionnaireLine';

describe('QuestionnaireLine', () => {
  it('display the main questionnaire information', async () => {
    const origDate = Date.prototype.toLocaleDateString;
    vi.spyOn(Date.prototype, 'toLocaleDateString').mockImplementationOnce(
      function () {
        // @ts-expect-error vitest locale shenanigans
        return origDate.call(this, 'fr-FR');
      },
    );

    const { getByText } = renderWithRouter(
      <QuestionnaireLine
        questionnaire={{
          title: 'My questionnaire',
          id: 'my-id',
          lastUpdatedDate: new Date('02-01-2023'),
          targetModes: new Set(),
        }}
      />,
    );

    expect(getByText('My questionnaire')).toBeInTheDocument();
    expect(getByText('01/02/2023')).toBeInTheDocument();
  });
});
