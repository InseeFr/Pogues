import { beforeEach, describe, expect, it, vi } from 'vitest'

import i18next from '../../../../lib/i18n'
import { validateCodeListCsvFile } from './csvValidation'

vi.mock('../lib/i18n', () => ({
  default: {
    t: vi.fn((key) => {
      const translations: Record<string, string> = {
        'codesList.import.noDataFound': 'No data found in the CSV file',
        'codesList.import.columnNumber':
          'The file must contain exactly two columns',
      }
      return translations[key] || key
    }),
  },
}))

describe('csvValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return translated error message for no data found', async () => {
    const emptyFile = new File([''], 'empty.csv', { type: 'text/csv' })

    const result = await validateCodeListCsvFile(emptyFile)

    expect(result.success).toBe(false)
    expect(result.error).toBe('No data found in the CSV file')
    expect(i18next.t).toHaveBeenCalledWith('codesList.import.noDataFound')
  })

  it('should return translated error message for invalid column count', async () => {
    const invalidFile = new File(['code1', 'code2', 'code3'], 'invalid.csv', {
      type: 'text/csv',
    })

    const result = await validateCodeListCsvFile(invalidFile)

    expect(result.success).toBe(false)
    expect(result.error).toBe('The file must contain exactly two columns')
    expect(i18next.t).toHaveBeenCalledWith('codesList.import.columnNumber')
  })

  it('should return success for valid CSV', async () => {
    const validFile = new File(['code1,label1\ncode2,label2'], 'valid.csv', {
      type: 'text/csv',
    })

    const result = await validateCodeListCsvFile(validFile)

    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
    expect(result.hasHeader).toBe(false)
    expect(result.error).toBeUndefined()
  })
})
