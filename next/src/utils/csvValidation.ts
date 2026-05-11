import Papa, { type ParseResult } from 'papaparse'

import { type FormValues } from '@/components/codesLists/form/schema'

/**
 * CSV parsing options for code list imports
 */
export const CODE_LIST_CSV_OPTIONS = {
  header: false,
  skipEmptyLines: true,
  quotes: true,
}

const KNOWN_HEADER_KEYWORDS = new Set([
  'code',
  'label',
  'value',
  'libelle',
  'id',
  'name',
  'description',
])

/**
 * Detects whether the first row of a headerless CSV is a header row.
 * A row is considered a header if all its values are non-numeric and
 * at least one matches a known header keyword.
 */
export function detectCsvHeader(firstRow: string[]): boolean {
  const allNonNumeric = firstRow.every(
    (cell) => isNaN(Number(cell)) && cell.trim() !== '',
  )
  const hasKeyword = firstRow.some((cell) =>
    KNOWN_HEADER_KEYWORDS.has(cell.trim().toLowerCase()),
  )
  return allNonNumeric && hasKeyword
}
/**
 * Validates a CSV file for code list import
 * @param file - The CSV file to validate
 * @returns Promise with validation result containing parsed data or error
 */
export async function validateCodeListCsvFile(file: File): Promise<{
  success: boolean
  data?: ParseResult<unknown>
  hasHeader?: boolean
  error?: string
}> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      ...CODE_LIST_CSV_OPTIONS,
      complete: (result: ParseResult<unknown>) => {
        if (!result.data?.length) {
          resolve({
            success: false,
            error: 'codesList.import.noDataFound',
          })
          return
        }

        const firstRow = (result.data as string[][])[0]
        if (!firstRow || firstRow.length !== 2) {
          resolve({
            success: false,
            error: 'codesList.import.columnNumber',
          })
          return
        }

        const hasHeader = detectCsvHeader(firstRow)
        resolve({
          success: true,
          data: result,
          hasHeader,
        })
      },
      error: (error) => {
        resolve({
          success: false,
          error: error.message,
        })
      },
    })
  })
}

/**
 * Converts validated CSV data to FormValues format
 * @param parsedData - Parsed CSV data
 * @returns FormValues object ready for code list creation
 */
export function convertCsvToFormValues(
  parsedData: ParseResult<unknown>,
  hasHeader = false,
): FormValues {
  if (!parsedData.data || parsedData.data.length === 0) {
    throw new Error('No data to convert')
  }

  const rows = hasHeader
    ? (parsedData.data as string[][]).slice(1)
    : (parsedData.data as string[][])

  const codes = rows.map((row) => ({
    value: row[0]?.toString().trim() || '',
    label: row[1]?.toString().trim() || '',
  }))

  const validCodes = codes.filter((code) => code.value && code.label)

  if (validCodes.length === 0) {
    throw new Error('No valid codes lists found in the CSV file')
  }
  console.log('Converted form values:', {
    label: '',
    codes: validCodes,
  })
  return {
    label: '',
    codes: validCodes,
  }
}
