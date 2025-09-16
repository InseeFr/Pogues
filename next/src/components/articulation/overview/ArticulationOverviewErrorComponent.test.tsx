import { waitFor } from '@testing-library/react';

import {
  makeAPIErrorWithErrorCode,
  makeAPIErrorWithNoErrorCode,
} from '@/testing/api';
import { renderWithRouter } from '@/testing/render';

import ArticulationOverviewErrorComponent from './ArticulationOverviewErrorComponent';

describe('ArticulationOverviewErrorComponent', () => {
  it('displays custom error when questionnaire language formula is not VTL', async () => {
    const error = makeAPIErrorWithErrorCode(
      'questionnaire:formulalanguage:notvtl',
    );
    const { getByText } = await waitFor(() =>
      renderWithRouter(<ArticulationOverviewErrorComponent error={error} />),
    );

    expect(
      getByText('Articulation is available only to questionnaires in VTL'),
    ).toBeInTheDocument();
  });

  it('displays custom error when questionnaire has no roundabouts', async () => {
    const error = makeAPIErrorWithErrorCode('questionnaire:roundaboutnotfound');
    const { getByText } = await waitFor(() =>
      renderWithRouter(<ArticulationOverviewErrorComponent error={error} />),
    );

    expect(
      getByText(
        'Articulation is available only to questionnaires with a roundabout',
      ),
    ).toBeInTheDocument();
  });

  it('displays generic error when no code is returned by the API', async () => {
    const error = makeAPIErrorWithNoErrorCode();
    const { getByText } = await waitFor(() =>
      renderWithRouter(<ArticulationOverviewErrorComponent error={error} />),
    );

    expect(getByText('An unexpected error occured')).toBeInTheDocument();
  });
});
