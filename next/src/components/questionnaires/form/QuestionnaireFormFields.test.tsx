import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import { TargetModes } from '@/models/questionnaires'
import type { SerieItem } from '@/models/series'
import type { Stamp } from '@/models/stamps'
import { renderWithI18n } from '@/testing/render'

import QuestionnaireFormFields from './QuestionnaireFormFields'
import type { FormValues } from './schema'

vi.mock('@/api/series', () => ({
  getSerieById: vi.fn(),
}))

const series: SerieItem[] = [
  { id: 'serie-1', label: 'Serie 1', uri: 'uri-1' },
  { id: 'serie-2', label: 'Serie 2', uri: 'uri-2' },
]

const stamps: Stamp[] = [
  { id: 'stamp-2', label: 'Stamp 2' },
  { id: 'stamp-1', label: 'Stamp 1' },
]

const serieDetails: SerieDetailDTO = {
  id: 'serie-1',
  uri: 'http://example.com/serie-1',
  label: 'Serie 1',
  altLabel: 'Short series label',
}

const defaultValues: FormValues = {
  title: 'Questionnaire title',
  name: 'QUESTIONNAIRE',
  targetModes: new Set([TargetModes.CAPI]),
  agency: 'fr.insee',
  owner: 'stamp-1',
  serie: '',
}

type HarnessProps = {
  onTitleBlur?: (title: string) => void
  readOnly?: boolean
  values?: Partial<FormValues>
}

function QuestionnaireFormFieldsHarness({
  onTitleBlur,
  readOnly,
  values,
}: Readonly<HarnessProps>) {
  const { control } = useForm<FormValues>({
    defaultValues: { ...defaultValues, ...values },
  })

  return (
    <QuestionnaireFormFields
      control={control}
      series={series}
      stamps={stamps}
      onTitleBlur={onTitleBlur}
      readOnly={readOnly}
    />
  )
}

describe('QuestionnaireFormFields', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getSerieById).mockResolvedValue(serieDetails)
  })

  it('renders the shared fields and target mode options', () => {
    renderWithI18n(<QuestionnaireFormFieldsHarness />)

    expect(
      screen.getByRole('textbox', { name: /questionnaire title/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /short name/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /serie/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /stamp/i })).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(4)
  })

  it('calls onTitleBlur with the current title', async () => {
    const user = userEvent.setup()
    const onTitleBlur = vi.fn()
    renderWithI18n(<QuestionnaireFormFieldsHarness onTitleBlur={onTitleBlur} />)

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated title')
    await user.tab()

    expect(onTitleBlur).toHaveBeenCalledWith('Updated title')
  })

  it('loads the selected serie details and clears the selection', async () => {
    const user = userEvent.setup()
    renderWithI18n(<QuestionnaireFormFieldsHarness />)

    const serieInput = screen.getByRole('combobox', { name: /serie/i })
    await user.click(serieInput)
    await user.type(serieInput, 'Serie 1')
    await user.click(await screen.findByRole('option', { name: 'Serie 1' }))

    expect(await screen.findByText(/Short series label/)).toBeInTheDocument()
    expect(getSerieById).toHaveBeenCalledWith('serie-1')

    await user.click(screen.getByRole('button', { name: /delete|supprimer/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Short series label/)).not.toBeInTheDocument()
    })
  })

  it('disables editable controls in read-only mode', () => {
    renderWithI18n(<QuestionnaireFormFieldsHarness readOnly />)

    expect(
      screen.getByRole('textbox', { name: /questionnaire title/i }),
    ).toBeDisabled()
    expect(screen.getByRole('textbox', { name: /short name/i })).toBeDisabled()
    expect(screen.getByRole('combobox', { name: /serie/i })).toBeDisabled()
    expect(screen.getByRole('combobox', { name: /stamp/i })).toBeDisabled()
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
