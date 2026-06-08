import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  convertCsvToFormValues,
  validateCodeListCsvFile,
} from './csvValidation'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
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
  })

  it('should return translated error message for invalid column count', async () => {
    const invalidFile = new File(['code1', 'code2', 'code3'], 'invalid.csv', {
      type: 'text/csv',
    })

    const result = await validateCodeListCsvFile(invalidFile)

    expect(result.success).toBe(false)
    expect(result.error).toBe('The file must contain exactly two columns')
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

  it('should normalize duplicate codes during validation and keep the last label', async () => {
    const duplicateFile = new File(
      ['code3,label3\ncode3,label3 alt'],
      'duplicate.csv',
      { type: 'text/csv' },
    )

    const result = await validateCodeListCsvFile(duplicateFile)

    expect(result.success).toBe(true)
    expect(result.hasHeader).toBe(false)
    expect(result.data?.data).toEqual([['code3', 'label3 alt']])
  })

  it('should convert parsed CSV data to FormValues format', () => {
    const parsedData = {
      data: [
        ['code1', 'label1'],
        ['code2', 'label2'],
      ],
      errors: [],
      meta: {
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
        cursor: 0,
      },
    }

    const result = convertCsvToFormValues(parsedData, false)

    expect(result).toEqual({
      label: '',
      codes: [
        { value: 'code1', label: 'label1', codes: [] },
        { value: 'code2', label: 'label2', codes: [] },
      ],
    })
  })
})
