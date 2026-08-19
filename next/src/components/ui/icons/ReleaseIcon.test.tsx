import { render } from '@testing-library/react'

import ReleaseIcon from './ReleaseIcon'

it('ReleaseIcon renders correctly', () => {
  const { asFragment } = render(<ReleaseIcon />)
  expect(asFragment()).toMatchSnapshot()
})
