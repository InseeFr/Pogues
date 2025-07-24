import { waitFor } from '@testing-library/react';

import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';
import { TargetModes } from '@/models/questionnaires';
import { renderWithRouter } from '@/tests/tests';

import PersonalizationsOverview from './PersonalizationOverview';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('PersonalizationsOverview', () => {
  const baseProps = {
    questionnaireId: '123',
    csvData: null,
    interrogationData: null,
  };

  const mockData: PersonalizationQuestionnaire = {
    id: '1',
    poguesId: '1',
    label: 'LabelQuestionnaire',
    modes: [
      { name: TargetModes.CAWI, isWebMode: true },
      { name: TargetModes.CAPI, isWebMode: false },
    ],
    context: {
      name: SurveyContextEnum.HOUSEHOLD,
      value: SurveyContextValueEnum.HOUSEHOLD,
    },
    interrogationData: undefined,
    isSynchronized: true,
  };

  it('renders PersonalizationContent when data is present', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <PersonalizationsOverview {...baseProps} data={mockData} />,
      ),
    );
    expect(getByText('LabelQuestionnaire')).toBeInTheDocument();
  });
});
