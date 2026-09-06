import { render } from '@testing-library/react'

import CopyIcon from './CopyIcon'

it('CopyIcon renders correctly', () => {
  const { asFragment } = render(<CopyIcon />)
  expect(asFragment()).toMatchSnapshot()
})
