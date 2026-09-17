import { QueryClient } from '@tanstack/react-query'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CodesList } from '@/models/codesLists'
import { renderWithRouter } from '@/testing/render'

import EditCodesListForm from './EditCodesListForm'

const mockNavigate = vi.fn()

const { mockPutCodesList } = vi.hoisted(() => ({
  mockPutCodesList: vi.fn(),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/api/codesLists', () => ({
  codesListsKeys: {
    all: (questionnaireId: string) => ['codesLists', questionnaireId] as const,
    one: (questionnaireId: string, codesListId: string) =>
      ['codesList', questionnaireId, codesListId] as const,
  },
  putCodesList: mockPutCodesList,
}))

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), success: vi.fn(), promise: vi.fn() },
}))

vi.mock('@/components/ui/form/VTLEditor')

const baseCodesList: CodesList = {
  id: 'cl-1',
  label: 'My codes list',
  codes: [{ label: 'code label', value: 'code value' }],
}

const renderFormAndFillLabel = async (codesList: CodesList, label: string) => {
  const user = userEvent.setup()
  await renderWithRouter(
    <EditCodesListForm
      questionnaireId="q-id"
      codesList={codesList}
      variables={[]}
    />,
  )

  await user.clear(screen.getByRole('textbox', { name: /Code list name/i }))
  await user.type(
    screen.getByRole('textbox', { name: /Code list name/i }),
    label,
  )

  return user
}

describe('EditCodesListForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPutCodesList.mockResolvedValue({})
  })

  it('should save the codes list and navigate to codes lists page when there is no related question', async () => {
    const user = await renderFormAndFillLabel(baseCodesList, 'new label')

    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(mockPutCodesList).toHaveBeenCalledWith(
        'q-id',
        'cl-1',
        expect.objectContaining({
          id: 'cl-1',
          label: 'new label',
          codes: expect.arrayContaining([
            expect.objectContaining({
              label: 'code label',
              value: 'code value',
            }),
          ]),
        }),
      )
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/questionnaire/$questionnaireId/codes-lists',
        params: { questionnaireId: 'q-id' },
      })
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should list all question names in the confirmation dialog when the codes list is used by several questions', async () => {
    const user = await renderFormAndFillLabel(
      {
        ...baseCodesList,
        relatedQuestionNames: ['QUELSPERSO', 'WHAT_IS_YOUR_NAME'],
      },
      'new label',
    )

    await user.click(screen.getByRole('button', { name: /validate/i }))

    expect(
      screen.getByText(
        'You are about to regenerate the collected variables associated with the following questions',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('QUELSPERSO')).toBeInTheDocument()
    expect(screen.getByText('WHAT_IS_YOUR_NAME')).toBeInTheDocument()

    expect(mockPutCodesList).not.toHaveBeenCalled()
  })

  it('should close the dialog without calling the api when cancelling the confirmation', async () => {
    const user = await renderFormAndFillLabel(
      { ...baseCodesList, relatedQuestionNames: ['QUELSPERSO'] },
      'new label',
    )

    await user.click(screen.getByRole('button', { name: /validate/i }))
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    expect(mockPutCodesList).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should save the codes list and navigate to codes lists page when validating the confirmation dialog', async () => {
    const user = await renderFormAndFillLabel(
      { ...baseCodesList, relatedQuestionNames: ['QUELSPERSO'] },
      'new label',
    )

    await user.click(screen.getByRole('button', { name: /validate/i }))

    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(mockPutCodesList).toHaveBeenCalledWith(
        'q-id',
        'cl-1',
        expect.objectContaining({
          id: 'cl-1',
          label: 'new label',
          codes: expect.arrayContaining([
            expect.objectContaining({
              label: 'code label',
              value: 'code value',
            }),
          ]),
        }),
      )
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/questionnaire/$questionnaireId/codes-lists',
        params: { questionnaireId: 'q-id' },
      })
    })
  })

  it('should invalidate both the codes lists and the single codes list queries after a save', async () => {
    const invalidateSpy = vi.spyOn(QueryClient.prototype, 'invalidateQueries')
    const user = await renderFormAndFillLabel(baseCodesList, 'new label')

    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['codesLists', 'q-id'],
      })
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['codesList', 'q-id', 'cl-1'],
      })
    })

    invalidateSpy.mockRestore()
  })
})
