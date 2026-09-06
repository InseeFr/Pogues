import { render } from '@testing-library/react'

import VisualizeIcon from './VisualizeIcon'

it('VisualizeIcon renders correctly', () => {
  const { asFragment } = render(<VisualizeIcon />)
  expect(asFragment()).toMatchSnapshot()
})
