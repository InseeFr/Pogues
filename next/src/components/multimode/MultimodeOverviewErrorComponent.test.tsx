import {
  makeAPIErrorWithErrorCode,
  makeAPIErrorWithNoErrorCode,
} from '@/testing/api';
import { renderWithRouter } from '@/testing/render';

import MultimodeOverviewErrorComponent from './MultimodeOverviewErrorComponent';

describe('MultimodeOverviewErrorComponent', () => {
  it('displays custom error when questionnaire language formula is not VTL', async () => {
    const error = makeAPIErrorWithErrorCode(
      'questionnaire:formulalanguage:notvtl',
    );
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewErrorComponent error={error} />,
    );

    expect(
      getByText('Multimode is available only to questionnaires in VTL'),
    ).toBeInTheDocument();
  });

  it('displays generic error when no code is returned by the API', async () => {
    const error = makeAPIErrorWithNoErrorCode();
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewErrorComponent error={error} />,
    );

    expect(getByText('An unexpected error occured')).toBeInTheDocument();
  });
});
