import { renderHook } from '@testing-library/react'

import { useDocumentTitle } from './useDocumentTitle'

interface CrumbMatch {
  id: string
  loaderData?: { crumb?: string }
}

const { useMatchesMock } = vi.hoisted(() => ({
  useMatchesMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    useMatches: useMatchesMock,
  }
})

const createMatch = (id: string, crumb?: string): CrumbMatch => ({
  id,
  loaderData: crumb ? { crumb } : undefined,
})

describe('useDocumentTitle', () => {
  beforeEach(() => {
    useMatchesMock.mockReset()
    document.title = ''
  })

  it('uses the deepest crumb as the document title', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', 'Home'),
      createMatch('questionnaires', 'Questionnaires'),
    ])

    renderHook(() => useDocumentTitle())

    expect(document.title).toBe('Questionnaires - Pogues')
  })

  it('falls back to the closest previous crumb when the deepest match has no mathc', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', 'Home'),
      createMatch('questionnaire'),
    ])

    renderHook(() => useDocumentTitle())

    expect(document.title).toBe('Home - Pogues')
  })

  it('falls back to the application name when there is no crumbs', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root'),
      createMatch('questionnaire'),
    ])

    renderHook(() => useDocumentTitle())

    expect(document.title).toBe('Pogues')
  })

  it('falls back to the application name when there is no match and no crumbs', () => {
    useMatchesMock.mockReturnValue([])

    renderHook(() => useDocumentTitle())

    expect(document.title).toBe('Pogues')
  })

  it('updates the document title when the crumb changes', () => {
    useMatchesMock.mockReturnValue([createMatch('root', 'Home')])

    const { rerender } = renderHook(() => useDocumentTitle())

    expect(document.title).toBe('Home - Pogues')

    useMatchesMock.mockReturnValue([createMatch('root', 'Variables')])

    rerender()

    expect(document.title).toBe('Variables - Pogues')
  })
})
