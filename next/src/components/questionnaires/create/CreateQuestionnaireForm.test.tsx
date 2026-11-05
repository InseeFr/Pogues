import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { postQuestionnaireDetail } from '@/api/questionnaireDetails'
import { getSerieById } from '@/api/series'
import type { SerieItem } from '@/models/series'
import { renderWithRouter } from '@/testing/render'

import CreateQuestionnaireForm from './CreateQuestionnaireForm'

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}))

vi.mock('@/api/questionnaireDetails', () => ({
  postQuestionnaireDetail: vi.fn(),
}))

vi.mock('@/api/series', () => ({
  getSerieById: vi.fn(),
}))

vi.mock('@/hooks/form/useFormCancel', () => ({
  useFormCancel: () => mockNavigate,
}))

const series: SerieItem[] = [{ id: 'serie-1', label: 'Serie 1', uri: 'uri-1' }]

const serieDetails: SerieDetailDTO = {
  id: 'serie-1',
  uri: 'http://example.com/serie-1',
  label: 'Serie 1',
  altLabel: 'Short series label',
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  const titleInput = screen.getByRole('textbox', {
    name: /questionnaire title/i,
  })

  await user.type(titleInput, 'My form')
  await user.tab()
  await user.click(screen.getByRole('checkbox', { name: 'CAPI' }))
}

describe('CreateQuestionnaireForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(postQuestionnaireDetail).mockResolvedValue(new Response())
    vi.mocked(getSerieById).mockResolvedValue(serieDetails)
    mockNavigate.mockResolvedValue(undefined)
  })

  it('submits the questionnaire with its default stamp and no serie', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <CreateQuestionnaireForm
        defaultStamp="my-stamp"
        series={[]}
        stamps={[]}
      />,
    )

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(postQuestionnaireDetail).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          name: 'MY_FORM',
          label: 'My form',
          targetMode: ['CAPI'],
          agency: 'fr.insee',
          owner: 'my-stamp',
        }),
      )
    })
    expect(getSerieById).not.toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId',
      params: {
        questionnaireId: expect.any(String),
      },
    })
  })

  it('includes selected serie details in the submitted questionnaire', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <CreateQuestionnaireForm
        defaultStamp="my-stamp"
        series={series}
        stamps={[]}
      />,
    )

    await fillRequiredFields(user)

    const serieInput = screen.getByRole('combobox', { name: /serie/i })
    await user.click(serieInput)
    await user.type(serieInput, 'Serie 1')
    await user.click(await screen.findByRole('option', { name: 'Serie 1' }))
    await user.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(postQuestionnaireDetail).toHaveBeenCalledWith(
        expect.objectContaining({
          dataCollection: { serie: serieDetails },
        }),
      )
    })
    expect(getSerieById).toHaveBeenCalledWith('serie-1')
  })
})
