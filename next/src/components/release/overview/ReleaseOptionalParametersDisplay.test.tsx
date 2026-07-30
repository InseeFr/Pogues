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

  it('renders "Yes" when responseTimeQuestion is true', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: true,
          questionNumberingMode: 'NONE',
        }}
      />,
    )

    expect(getByText('Yes')).toBeInTheDocument()
  })

  it('renders "No" when responseTimeQuestion is false', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOptionalParametersDisplay
        overrideGenerationParameters={{
          responseTimeQuestion: false,
          questionNumberingMode: 'NONE',
        }}
      />,
    )

    expect(getByText('No')).toBeInTheDocument()
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
