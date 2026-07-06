import { renderWithI18n } from '@/testing/render'

import NomenclatureOverviewItemContent from './NomenclatureOverviewItemContent'

const mockNomenclature = {
  id: '1',
  label: 'MIO: Memory in orbits',
  version: '4.5.6',
  theme: 'Metroid',
  referenceYear: '2064',
  externalLink: { urn: 'urn:ddi:fr.mio' },
  relatedQuestionNames: ['MIO_QUESTION'],
}

describe('NomenclatureOverviewItemContent', () => {
  it('displays the nomenclature label as a heading', () => {
    const { getByRole } = renderWithI18n(
      <NomenclatureOverviewItemContent nomenclature={mockNomenclature} />,
    )

    expect(getByRole('heading', { level: 3 })).toHaveTextContent(
      'MIO: Memory in orbits',
    )
  })

  it('displays the theme, reference year, and version', () => {
    const { getByText } = renderWithI18n(
      <NomenclatureOverviewItemContent nomenclature={mockNomenclature} />,
    )

    expect(getByText(/^Theme: Metroid$/)).toBeInTheDocument()
    expect(getByText(/^Reference Year: 2064$/)).toBeInTheDocument()
    expect(getByText(/^Version: 4.5.6$/)).toBeInTheDocument()
  })

  it('handles undefined theme and referenceYear', () => {
    const { container } = renderWithI18n(
      <NomenclatureOverviewItemContent
        nomenclature={{
          ...mockNomenclature,
          theme: undefined,
          referenceYear: undefined,
        }}
      />,
    )

    const listItems = container.querySelectorAll('ul')
    expect(listItems[0]).toHaveTextContent(/Theme: Not provided/)
    expect(listItems[1]).toHaveTextContent(/Reference Year: Not provided/)
  })

  it('handles null theme and referenceYear', () => {
    const { container } = renderWithI18n(
      <NomenclatureOverviewItemContent
        nomenclature={{
          ...mockNomenclature,
          theme: undefined,
          referenceYear: undefined,
        }}
      />,
    )

    const listItems = container.querySelectorAll('ul')
    expect(listItems[0]).toHaveTextContent(/Theme: Not provided/)
    expect(listItems[1]).toHaveTextContent(/Reference Year: Not provided/)
  })

  it('renders RelatedQuestions with the related question names', () => {
    const { getByText } = renderWithI18n(
      <NomenclatureOverviewItemContent nomenclature={mockNomenclature} />,
    )

    expect(getByText('1 question')).toBeInTheDocument()
  })

  it('renders RelatedQuestions with zero questions when the list is empty', () => {
    const { getByText } = renderWithI18n(
      <NomenclatureOverviewItemContent
        nomenclature={{ ...mockNomenclature, relatedQuestionNames: [] }}
      />,
    )

    expect(getByText('0 questions')).toBeInTheDocument()
  })
})
