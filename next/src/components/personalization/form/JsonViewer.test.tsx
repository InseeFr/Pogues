import { screen } from '@testing-library/react'

import { renderWithI18n } from '@/testing/render'

import JsonViewer from './JsonViewer'

const jsonString = JSON.stringify(
  { Name: 'Rathalos', Age: '30', City: 'Ancient Forest' },
  null,
  2,
)

describe('JsonViewer', () => {
  it('renders highlighted JSON', () => {
    renderWithI18n(<JsonViewer data={jsonString} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Rathalos')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Ancient Forest')).toBeInTheDocument()
  })

  it('renders the error message if the data cannot be parsed', () => {
    renderWithI18n(<JsonViewer data="{ invalid json" />)

    expect(
      screen.getByText('An error occurred while reading the JSON'),
    ).toBeInTheDocument()
  })
})
