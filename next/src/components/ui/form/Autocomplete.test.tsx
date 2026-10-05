import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Autocomplete from './Autocomplete'

describe('Autocomplete', () => {
  it('filters options ignoring case and accents', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        options={[
          { label: 'Études', value: 'etudes' },
          { label: 'Économie', value: 'economie' },
          { label: 'À propos', value: 'a-propos' },
          { label: 'Sciences', value: 'sciences' },
        ]}
      />,
    )

    await user.type(screen.getByRole('combobox'), 'e')

    expect(await screen.findByText('Études')).toBeInTheDocument()
    expect(screen.getByText('Économie')).toBeInTheDocument()

    expect(screen.queryByText('À propos')).not.toBeInTheDocument()
  })

  it('matches options when typing an accented character for an unaccented one', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete options={[{ label: 'A propos', value: 'a-propos' }]} />,
    )

    await user.type(screen.getByRole('combobox'), 'à')

    expect(await screen.findByText('A propos')).toBeInTheDocument()
  })
})
