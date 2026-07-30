import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithI18n } from '@/testing/render'

import SelectTargetMode from './SelectTargetMode'

function getCheckboxByLabel(label: string) {
  const parentLabel = screen.getByText(label).closest('label')!
  return within(parentLabel).getByRole('checkbox')
}

function getRadioByLabel(label: string) {
  const parentLabel = screen.getByText(label).closest('label')!
  return within(parentLabel).getByRole('radio')
}

describe('SelectTargetMode', () => {
  it('renders four unchecked checkboxes with a Set value', () => {
    renderWithI18n(
      <SelectTargetMode value={new Set()} onChange={() => {}} multiple />,
    )

    expect(getCheckboxByLabel('CAPI')).not.toBeChecked()
    expect(getCheckboxByLabel('CAWI')).not.toBeChecked()
    expect(getCheckboxByLabel('CATI')).not.toBeChecked()
    expect(getCheckboxByLabel('PAPI')).not.toBeChecked()
  })

  it('renders four unchecked checkboxes with an Array value', () => {
    renderWithI18n(<SelectTargetMode value={[]} onChange={() => {}} multiple />)

    expect(getCheckboxByLabel('CAPI')).not.toBeChecked()
    expect(getCheckboxByLabel('CAWI')).not.toBeChecked()
    expect(getCheckboxByLabel('CATI')).not.toBeChecked()
    expect(getCheckboxByLabel('PAPI')).not.toBeChecked()
  })

  it('checks pre-selected values with Set', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set([TargetModes.CAPI, TargetModes.CATI])}
        onChange={() => {}}
        multiple
      />,
    )

    expect(getCheckboxByLabel('CAPI')).toBeChecked()
    expect(getCheckboxByLabel('CAWI')).not.toBeChecked()
    expect(getCheckboxByLabel('CATI')).toBeChecked()
    expect(getCheckboxByLabel('PAPI')).not.toBeChecked()
  })

  it('checks pre-selected values with Array', () => {
    renderWithI18n(
      <SelectTargetMode
        value={[TargetModes.CAWI, TargetModes.PAPI]}
        onChange={() => {}}
        multiple
      />,
    )

    expect(getCheckboxByLabel('CAPI')).not.toBeChecked()
    expect(getCheckboxByLabel('CAWI')).toBeChecked()
    expect(getCheckboxByLabel('CATI')).not.toBeChecked()
    expect(getCheckboxByLabel('PAPI')).toBeChecked()
  })

  it('adds a mode when checking an unchecked checkbox ', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithI18n(
      <SelectTargetMode
        value={new Set([TargetModes.CAPI])}
        onChange={onChange}
        multiple
      />,
    )

    await user.click(getCheckboxByLabel('CAWI'))

    expect(onChange).toHaveBeenCalledOnce()
    const next = onChange.mock.calls[0][0] as Set<TargetModes>
    expect(next).toBeInstanceOf(Set)
    expect(next.has(TargetModes.CAPI)).toBeTruthy()
    expect(next.has(TargetModes.CAWI)).toBeTruthy()
    expect(next.size).toBe(2)
  })

  it('removes a mode when unchecking a checked checkbox ', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithI18n(
      <SelectTargetMode
        value={new Set([TargetModes.CAPI, TargetModes.CAWI])}
        onChange={onChange}
        multiple
      />,
    )

    await user.click(getCheckboxByLabel('CAPI'))

    expect(onChange).toHaveBeenCalledOnce()
    const next = onChange.mock.calls[0][0] as Set<TargetModes>
    expect(next).toBeInstanceOf(Set)
    expect(next.has(TargetModes.CAWI)).toBeTruthy()
    expect(next.has(TargetModes.CAPI)).toBeFalsy()
    expect(next.size).toBe(1)
  })

  it('disables all checkboxes', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={() => {}}
        multiple
        disabled
      />,
    )

    expect(getCheckboxByLabel('CAPI')).toHaveAttribute('aria-disabled', 'true')
    expect(getCheckboxByLabel('CAWI')).toHaveAttribute('aria-disabled', 'true')
    expect(getCheckboxByLabel('CATI')).toHaveAttribute('aria-disabled', 'true')
    expect(getCheckboxByLabel('PAPI')).toHaveAttribute('aria-disabled', 'true')
  })

  it('displays the error message', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={() => {}}
        multiple
        error="At least one mode is required"
      />,
    )

    expect(screen.getByText('At least one mode is required')).toBeVisible()
  })

  it('renders four unchecked radio buttons with Set value', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={() => {}}
        multiple={false}
      />,
    )

    expect(getRadioByLabel('CAPI')).not.toBeChecked()
    expect(getRadioByLabel('CAWI')).not.toBeChecked()
    expect(getRadioByLabel('CATI')).not.toBeChecked()
    expect(getRadioByLabel('PAPI')).not.toBeChecked()
  })

  it('renders four unchecked radio buttons with Array value', () => {
    renderWithI18n(
      <SelectTargetMode value={[]} onChange={() => {}} multiple={false} />,
    )

    expect(getRadioByLabel('CAPI')).not.toBeChecked()
    expect(getRadioByLabel('CAWI')).not.toBeChecked()
    expect(getRadioByLabel('CATI')).not.toBeChecked()
    expect(getRadioByLabel('PAPI')).not.toBeChecked()
  })

  it('selects the pre-set value from Set', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set([TargetModes.CAPI])}
        onChange={() => {}}
        multiple={false}
      />,
    )

    expect(getRadioByLabel('CAPI')).toBeChecked()
    expect(getRadioByLabel('CAWI')).not.toBeChecked()
    expect(getRadioByLabel('CATI')).not.toBeChecked()
    expect(getRadioByLabel('PAPI')).not.toBeChecked()
  })

  it('selects the pre-set value from Array', () => {
    renderWithI18n(
      <SelectTargetMode
        value={[TargetModes.PAPI]}
        onChange={() => {}}
        multiple={false}
      />,
    )

    expect(getRadioByLabel('CAPI')).not.toBeChecked()
    expect(getRadioByLabel('CAWI')).not.toBeChecked()
    expect(getRadioByLabel('CATI')).not.toBeChecked()
    expect(getRadioByLabel('PAPI')).toBeChecked()
  })

  it('calls onChange with a Set containing the selected mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={onChange}
        multiple={false}
      />,
    )

    await user.click(getRadioByLabel('CAPI'))

    expect(onChange).toHaveBeenCalledOnce()
    const next = onChange.mock.calls[0][0] as Set<TargetModes>
    expect(next).toBeInstanceOf(Set)
    expect(next.has(TargetModes.CAPI)).toBeTruthy()
    expect(next.size).toBe(1)
  })

  it('calls onChange with an Array containing the selected mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithI18n(
      <SelectTargetMode value={[]} onChange={onChange} multiple={false} />,
    )

    await user.click(getRadioByLabel('CAWI'))

    expect(onChange).toHaveBeenCalledOnce()
    const next = onChange.mock.calls[0][0] as TargetModes[]
    expect(Array.isArray(next)).toBeTruthy()
    expect(next).toEqual([TargetModes.CAWI])
  })

  it('disables all radio buttons', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={() => {}}
        multiple={false}
        disabled
      />,
    )

    expect(getRadioByLabel('CAPI')).toHaveAttribute('aria-disabled', 'true')
    expect(getRadioByLabel('CAWI')).toHaveAttribute('aria-disabled', 'true')
    expect(getRadioByLabel('CATI')).toHaveAttribute('aria-disabled', 'true')
    expect(getRadioByLabel('PAPI')).toHaveAttribute('aria-disabled', 'true')
  })

  it('displays the error message', () => {
    renderWithI18n(
      <SelectTargetMode
        value={new Set()}
        onChange={() => {}}
        multiple={false}
        error="Selection required"
      />,
    )

    expect(screen.getByText('Selection required')).toBeVisible()
  })
})
