import { render } from '@testing-library/react'

import CloseSmallIcon from './CloseSmallIcon'

it('CloseSmallIcon renders correctly', () => {
  const { asFragment } = render(<CloseSmallIcon />)
  expect(asFragment()).toMatchSnapshot()
})
