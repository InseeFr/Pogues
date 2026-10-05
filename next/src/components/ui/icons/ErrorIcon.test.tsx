import { render } from '@testing-library/react'

import ErrorIcon from './ErrorIcon'

it('ErrorIcon renders correctly', () => {
  const { asFragment } = render(<ErrorIcon />)
  expect(asFragment()).toMatchSnapshot()
})
