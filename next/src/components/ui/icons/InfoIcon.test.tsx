import { render } from '@testing-library/react'

import InfoIcon from './InfoIcon'

it('InfoIcon renders correctly', () => {
  const { asFragment } = render(<InfoIcon />)
  expect(asFragment()).toMatchSnapshot()
})
