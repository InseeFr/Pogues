import {
  makeAPIErrorWithErrorCode,
  makeAPIErrorWithNoErrorCode,
} from '@/testing/api';
import { renderWithI18n } from '@/testing/render';

import ArticulationOverviewErrorComponent from './ArticulationOverviewErrorComponent';

describe('ArticulationOverviewErrorComponent', () => {
  it('displays custom error when questionnaire language formula is not VTL', () => {
    const error = makeAPIErrorWithErrorCode(
      'questionnaire:formulalanguage:notvtl',
    );
    const { getByText } = renderWithI18n(
      <ArticulationOverviewErrorComponent error={error} />,
    );

    expect(
      getByText('Articulation is available only to questionnaires in VTL'),
    ).toBeInTheDocument();
  });

  it('displays custom error when questionnaire has no roundabouts', () => {
    const error = makeAPIErrorWithErrorCode('questionnaire:roundaboutnotfound');
    const { getByText } = renderWithI18n(
      <ArticulationOverviewErrorComponent error={error} />,
    );

    expect(
      getByText(
        'Articulation is available only to questionnaires with a roundabout',
      ),
    ).toBeInTheDocument();
  });

  it('displays generic error when no code is returned by the API', () => {
    const error = makeAPIErrorWithNoErrorCode();
    const { getByText } = renderWithI18n(
      <ArticulationOverviewErrorComponent error={error} />,
    );

    expect(getByText('An unexpected error occured')).toBeInTheDocument();
  });
});
