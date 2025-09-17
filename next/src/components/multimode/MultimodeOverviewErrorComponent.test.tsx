import {
  makeAPIErrorWithErrorCode,
  makeAPIErrorWithNoErrorCode,
} from '@/testing/api';
import { renderWithI18n } from '@/testing/render';

import MultimodeOverviewErrorComponent from './MultimodeOverviewErrorComponent';

describe('MultimodeOverviewErrorComponent', () => {
  it('displays custom error when questionnaire language formula is not VTL', () => {
    const error = makeAPIErrorWithErrorCode(
      'questionnaire:formulalanguage:notvtl',
    );
    const { getByText } = renderWithI18n(
      <MultimodeOverviewErrorComponent error={error} />,
    );

    expect(
      getByText('Multimode is available only to questionnaires using VTL.'),
    ).toBeInTheDocument();
  });

  it('displays generic error when no code is returned by the API', () => {
    const error = makeAPIErrorWithNoErrorCode();
    const { getByText } = renderWithI18n(
      <MultimodeOverviewErrorComponent error={error} />,
    );

    expect(getByText('An unexpected error occured')).toBeInTheDocument();
  });
});
