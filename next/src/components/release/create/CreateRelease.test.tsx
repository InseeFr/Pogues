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

  it('should show the form when there is at least one mode other than PAPI', async () => {
    await renderWithRouter(
      <CreateRelease
        questionnaireId="q-id"
        targetModes={[TargetModes.CAWI, TargetModes.PAPI]}
        serie={{
          id: 's-id',
          label: 'series-label',
          altLabel: 'series-alt-label',
          uri: 'series-uri',
        }}
        isPublishDisabled={false}
      />,
    )

    expect(
      screen.getByRole('textbox', { name: /Description/i }),
    ).toBeInTheDocument()
  })

  it('should not show the form and display a message when only PAPI is available', async () => {
    await renderWithRouter(
      <CreateRelease questionnaireId="q-id" targetModes={[TargetModes.PAPI]} isPublishDisabled={false} />,
    )

    expect(
      screen.queryByRole('textbox', { name: /Description/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Release is not available for PAPI only questionnaire'),
    ).toBeInTheDocument()
  })
})