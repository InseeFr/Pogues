import { screen } from '@testing-library/react'

import { TargetModes } from '@/models/questionnaires'
import { renderWithRouter } from '@/testing/render'

import CreateRelease from './CreateRelease'

const TARGET_MODES = [TargetModes.CAWI, TargetModes.CAPI, TargetModes.CATI]

describe('CreateRelease', () => {
  it('shows an alert banner above the form when publishing is blocked', async () => {
    await renderWithRouter(
      <CreateRelease
        questionnaireId="q-id"
        targetModes={TARGET_MODES}
        isPublishDisabled
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Cannot publish: a publication (or publication request) already exists for the latest version of this questionnaire',
    )
  })

  it('does not show the alert banner when publishing is allowed', async () => {
    await renderWithRouter(
      <CreateRelease
        questionnaireId="q-id"
        targetModes={TARGET_MODES}
        isPublishDisabled={false}
      />,
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
