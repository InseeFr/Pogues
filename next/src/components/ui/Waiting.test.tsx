import { expect } from 'vitest'

import { renderWithI18n } from '@/testing/render'

import DefaultPendingComponent from './Waiting'

describe('Pending Component', () => {
  it('display waiting message ', async () => {
    const { getByText } = renderWithI18n(<DefaultPendingComponent />)

    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
