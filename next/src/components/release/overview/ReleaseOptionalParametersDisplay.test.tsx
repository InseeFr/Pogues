import { renderWithI18n } from '@/testing/render'

import { ReleaseOptionalParametersDisplay } from './ReleaseOptionalParametersDisplay'

describe('ReleaseOptionalParametersDisplay', () => {
  it('renders optional parameters header', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: false,
          questionNumberingMode: 'NONE',
        }}
      />,
    )

    expect(
      getByText((content) => content.startsWith('Optional parameters')),
    ).toBeInTheDocument()
  })

  it('renders checkbox checked when responseTimeQuestion is true', () => {
    const { getByRole } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: true,
          questionNumberingMode: 'NONE',
        }}
      />,
    )

    const checkbox = getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
    expect(checkbox).toBeDisabled()
  })

  it('renders checkbox unchecked when responseTimeQuestion is false', () => {
    const { getByRole } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: false,
          questionNumberingMode: 'NONE',
        }}
      />,
    )

    const checkbox = getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it('displays questionNumberingMode value', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: false,
          questionNumberingMode: 'SEQUENCE',
        }}
      />,
    )

    expect(getByText('By sequence')).toBeInTheDocument()
  })

  it('applies custom innerClassName', () => {
    const { container } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: false,
          questionNumberingMode: 'ALL',
        }}
        innerClassName="custom-class"
      />,
    )

    const inner = container.querySelector('.custom-class')
    expect(inner).toBeInTheDocument()
  })
})
