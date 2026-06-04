import { expect } from 'vitest'

import { renderWithI18n } from '@/testing/render'

import WaitingComponent from './WaitingComponent'

describe('Waiting Component', () => {
  it('display waiting message ', async () => {
    const { getByText } = renderWithI18n(<WaitingComponent />)

    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
