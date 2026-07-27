import { render } from '@testing-library/react'

import DetailsIcon from './DetailsIcon'

it('DetailsIcon renders correctly', () => {
  const { asFragment } = render(<DetailsIcon />)
  expect(asFragment()).toMatchSnapshot()
})
