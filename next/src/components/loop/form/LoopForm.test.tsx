import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { type InitialLoopMember, LoopMemberType } from '@/models/loops'
import { renderWithRouter } from '@/testing/render'

import LoopForm from './LoopForm'
import { type FormValues } from './schema'

vi.mock('@/components/ui/form/VTLEditor')

const loopMembers: InitialLoopMember[] = [
  {
    id: 'S1',
    name: 'Sequence 1',
    type: LoopMemberType.Sequence,
    finalMembers: [
      { id: 'S1', name: 'Sequence 1', type: LoopMemberType.Sequence },
      { id: 'S2', name: 'Sequence 2', type: LoopMemberType.Sequence },
    ],
  },
  {
    id: 'S2',
    name: 'Sequence 2',
    type: LoopMemberType.Sequence,
    finalMembers: [
      { id: 'S2', name: 'Sequence 2', type: LoopMemberType.Sequence },
    ],
  },
]

async function selectOption(combobox: HTMLElement, name: string) {
  const user = userEvent.setup()
  await user.click(combobox)
  const listbox = await screen.findByRole('listbox')
  await user.click(within(listbox).getByRole('option', { name }))
  await waitFor(() => expect(combobox).toHaveTextContent(name))
}

describe('LoopForm members', () => {
  it('requires an initial member to choose the final member and clears it when the initial member changes', async () => {
    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map()}
        loopMembers={loopMembers}
        onSubmit={async () => {}}
      />,
    )

    const comboboxes = screen.getAllByRole('combobox')
    const initialMember = comboboxes.at(-2)!
    const finalMember = comboboxes.at(-1)!

    expect(finalMember).toHaveAttribute('data-disabled')

    await selectOption(initialMember, 'Sequence 1')
    expect(finalMember).not.toHaveAttribute('data-disabled')

    await selectOption(finalMember, 'Sequence 2')

    await selectOption(initialMember, 'Sequence 2')
    await waitFor(() =>
      expect(finalMember).toHaveTextContent('Specify final member'),
    )
  })

  it('requires both members to submit', async () => {
    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map()}
        loopMembers={loopMembers}
        loop={{
          name: 'my loop',
          isFixedLength: false,
          minimum: '1',
          maximum: '2',
          initialMember: '',
          finalMember: '',
        }}
        onSubmit={async () => {}}
      />,
    )

    const comboboxes = screen.getAllByRole('combobox')
    const initialMember = comboboxes.at(-2)!
    const finalMember = comboboxes.at(-1)!

    await selectOption(initialMember, 'Sequence 1')
    expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    expect(
      await screen.findByText('You must provide a final member'),
    ).toBeInTheDocument()

    await selectOption(finalMember, 'Sequence 2')
    await waitFor(() =>
      expect(screen.getByTestId('form-submit-button')).toBeEnabled(),
    )
  })
})

describe('LoopForm occurrences', () => {
  it('submits only the fields displayed to the user', async () => {
    const user = userEvent.setup()
    const submitFn = vi.fn()

    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map([['scope1', 'Scope One']])}
        loopMembers={loopMembers}
        loop={{
          name: 'my loop',
          isFixedLength: false,
          minimum: '1',
          maximum: '2',
          initialMember: 'S1',
          finalMember: 'S2',
        }}
        onSubmit={submitFn}
      />,
    )

    // Minimum and maximum are hidden when the loop is based on a scope
    const basedOn = screen.getAllByRole('combobox')[0]
    await selectOption(basedOn, 'Scope One')
    await user.click(screen.getByTestId('form-submit-button'))

    await waitFor(() =>
      expect(submitFn).toHaveBeenCalledWith(
        {
          name: 'my loop',
          basedOn: 'scope1',
          initialMember: 'S1',
          finalMember: 'S2',
        },
        expect.anything(),
      ),
    )
  })

  it('restores the length kind when the scope is removed', async () => {
    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map([['scope1', 'Scope One']])}
        loopMembers={loopMembers}
        loop={{
          name: 'my loop',
          isFixedLength: true,
          size: '3',
          shouldSplitIterations: true,
          initialMember: 'S1',
          finalMember: 'S2',
        }}
        onSubmit={async () => {}}
      />,
    )

    const basedOn = screen.getAllByRole('combobox')[0]
    await selectOption(basedOn, 'Scope One')
    expect(
      screen.queryByText('Number of maximum occurrences identical to min'),
    ).not.toBeInTheDocument()

    await selectOption(basedOn, 'Specify a scope')
    const [isFixedLengthGroup] = await screen.findAllByRole('radiogroup')
    expect(
      within(within(isFixedLengthGroup).getByText('Yes')).getByRole('radio'),
    ).toBeChecked()
  })

  it('allows to remove the scope of a loop based on a scope', async () => {
    const user = userEvent.setup()
    const submitFn = vi.fn()

    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map([['scope1', 'Scope One']])}
        loopMembers={loopMembers}
        loop={
          {
            name: 'my loop',
            basedOn: 'scope1',
            // Hidden field, filled so that the mocked editors' native
            // validation does not prevent the submission.
            size: '3',
            initialMember: 'S1',
            finalMember: 'S2',
          } as FormValues
        }
        onSubmit={submitFn}
      />,
    )

    const basedOn = screen.getAllByRole('combobox')[0]
    await selectOption(basedOn, 'Specify a scope')
    const [isFixedLengthGroup] = await screen.findAllByRole('radiogroup')
    expect(
      within(within(isFixedLengthGroup).getByText('No')).getByRole('radio'),
    ).toBeChecked()

    await user.type(screen.getByLabelText(/Minimum number of occurrences/), '1')
    await user.type(screen.getByLabelText(/Maximum number of occurrences/), '2')
    await waitFor(() =>
      expect(screen.getByTestId('form-submit-button')).toBeEnabled(),
    )
    await user.click(screen.getByTestId('form-submit-button'))

    await waitFor(() =>
      expect(submitFn).toHaveBeenCalledWith(
        {
          name: 'my loop',
          basedOn: '',
          isFixedLength: false,
          minimum: '1',
          maximum: '2',
          initialMember: 'S1',
          finalMember: 'S2',
        },
        expect.anything(),
      ),
    )
  })

  it('displays all occurrences on a single page by default', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <LoopForm
        questionnaireId="q1"
        scopes={new Map()}
        loopMembers={loopMembers}
        onSubmit={async () => {}}
      />,
    )

    const [isFixedLengthGroup, shouldSplitIterationsGroup] =
      screen.getAllByRole('radiogroup', { hidden: true })
    await user.click(
      within(within(isFixedLengthGroup).getByText('Yes')).getByRole('radio'),
    )

    expect(
      within(within(shouldSplitIterationsGroup).getByText('Yes')).getByRole(
        'radio',
      ),
    ).toBeChecked()
    expect(
      screen.queryByText(
        'Reminder: for business surveys, all occurrences must be displayed on a single page.',
      ),
    ).not.toBeInTheDocument()
  })

  it.each([
    ['Yes', false],
    ['No', true],
  ])(
    'splits iterations according to the single page answer "%s"',
    async (answer, shouldSplitIterations) => {
      const user = userEvent.setup()
      const submitFn = vi.fn()

      await renderWithRouter(
        <LoopForm
          questionnaireId="q1"
          scopes={new Map()}
          loopMembers={loopMembers}
          loop={
            {
              name: 'my loop',
              isFixedLength: true,
              size: '3',
              shouldSplitIterations: !shouldSplitIterations,
              // Hidden fields, filled so that the mocked editors' native
              // validation does not prevent the submission.
              minimum: '1',
              maximum: '2',
              initialMember: 'S1',
              finalMember: 'S2',
            } as FormValues
          }
          onSubmit={submitFn}
        />,
      )

      const [, shouldSplitIterationsGroup] = screen.getAllByRole('radiogroup')
      await user.click(
        within(within(shouldSplitIterationsGroup).getByText(answer)).getByRole(
          'radio',
        ),
      )
      await waitFor(() =>
        expect(screen.getByTestId('form-submit-button')).toBeEnabled(),
      )
      await user.click(screen.getByTestId('form-submit-button'))

      await waitFor(() =>
        expect(submitFn).toHaveBeenCalledWith(
          {
            name: 'my loop',
            isFixedLength: true,
            size: '3',
            shouldSplitIterations,
            initialMember: 'S1',
            finalMember: 'S2',
          },
          expect.anything(),
        ),
      )
      expect(
        screen.queryByText(
          'Reminder: for business surveys, all occurrences must be displayed on a single page.',
        ) !== null,
      ).toBe(shouldSplitIterations)
    },
  )
})
