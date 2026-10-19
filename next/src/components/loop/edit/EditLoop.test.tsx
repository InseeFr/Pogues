import { screen, within } from '@testing-library/react'

import { type InitialLoopMember, LoopMemberType } from '@/models/loops'
import { renderWithRouter } from '@/testing/render'

import EditLoop from './EditLoop'

vi.mock('@/components/ui/form/VTLEditor')

const scopes = new Map([['my-scope', 'My scope']])

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
]

function getRadio(groupIndex: number, label: string) {
  const group = screen.getAllByRole('radiogroup', { hidden: true })[groupIndex]
  return within(within(group).getByText(label)).getByRole('radio')
}

describe('EditLoop', () => {
  it('should show the loop form filled with the values of a loop based on a scope', async () => {
    await renderWithRouter(
      <EditLoop
        questionnaireId="q-id"
        loop={{
          id: 'my-loop',
          name: 'MY_LOOP',
          initialMember: 'S1',
          finalMember: 'S2',
          basedOn: 'my-scope',
          filter: '$AGE$ > 18',
        }}
        scopes={scopes}
        loopMembers={loopMembers}
      />,
    )

    const [basedOn, initialMember, finalMember] =
      screen.getAllByRole('combobox')
    expect(screen.getByRole('textbox', { name: /Loop name/i })).toHaveValue(
      'MY_LOOP',
    )
    expect(basedOn).toHaveTextContent('My scope')
    expect(screen.getByLabelText(/Occurrences filter/)).toHaveValue(
      '$AGE$ > 18',
    )
    expect(initialMember).toHaveTextContent('Sequence 1')
    expect(finalMember).toHaveTextContent('Sequence 2')

    // Occurrences are those of the scope
    expect(
      screen.queryByText('Number of maximum occurrences identical to min'),
    ).not.toBeInTheDocument()
  })

  it('should show the loop form filled with the values of a loop with a fixed number of occurrences', async () => {
    await renderWithRouter(
      <EditLoop
        questionnaireId="q-id"
        loop={{
          id: 'my-loop',
          name: 'MY_LOOP',
          initialMember: 'S1',
          finalMember: 'S2',
          isFixedLength: true,
          size: '3',
          shouldSplitIterations: true,
        }}
        scopes={scopes}
        loopMembers={loopMembers}
      />,
    )

    const [basedOn, initialMember, finalMember] =
      screen.getAllByRole('combobox')
    expect(screen.getByRole('textbox', { name: /Loop name/i })).toHaveValue(
      'MY_LOOP',
    )
    expect(basedOn).not.toHaveTextContent('My scope')
    expect(
      screen.queryByLabelText(/Occurrences filter/),
    ).not.toBeInTheDocument()
    expect(getRadio(0, 'Yes')).toBeChecked()
    expect(screen.getByLabelText(/Occurrences number/)).toHaveValue('3')
    // Occurrences are displayed on their own page
    expect(getRadio(1, 'No')).toBeChecked()
    expect(
      screen.getByText(
        'Reminder: for business surveys, all occurrences must be displayed on a single page.',
      ),
    ).toBeVisible()
    expect(
      screen.getByLabelText(/Minimum number of occurrences/),
    ).not.toBeVisible()
    expect(initialMember).toHaveTextContent('Sequence 1')
    expect(finalMember).toHaveTextContent('Sequence 2')
  })

  it('should show the loop form filled with the values of a loop with a dynamic number of occurrences', async () => {
    await renderWithRouter(
      <EditLoop
        questionnaireId="q-id"
        loop={{
          id: 'my-loop',
          name: 'MY_LOOP',
          initialMember: 'S1',
          finalMember: 'S2',
          isFixedLength: false,
          minimum: '1',
          maximum: '5',
          addButtonLabel: 'Add a person',
        }}
        scopes={scopes}
        loopMembers={loopMembers}
      />,
    )

    const [basedOn, initialMember, finalMember] =
      screen.getAllByRole('combobox')
    expect(screen.getByRole('textbox', { name: /Loop name/i })).toHaveValue(
      'MY_LOOP',
    )
    expect(basedOn).not.toHaveTextContent('My scope')
    expect(getRadio(0, 'No')).toBeChecked()
    expect(screen.getByLabelText(/Minimum number of occurrences/)).toHaveValue(
      '1',
    )
    expect(screen.getByLabelText(/Maximum number of occurrences/)).toHaveValue(
      '5',
    )
    expect(screen.getByLabelText(/Add button label/)).toHaveValue(
      'Add a person',
    )
    expect(screen.getByLabelText(/Occurrences number/)).not.toBeVisible()
    expect(initialMember).toHaveTextContent('Sequence 1')
    expect(finalMember).toHaveTextContent('Sequence 2')
  })
})
