import Papa, { ParseResult } from 'papaparse'

const CSV_UNPARSE_OPTIONS = {
  header: true,
  quotes: true,
  skipEmptyLines: true,
}

const CSV_MIME = 'text/csv'
const JSON_MIME = 'application/json'
const BOM = '\uFEFF'

export function getFileFromParseResult(
  fileData: ParseResult<unknown> | string,
  filename: string = '',
): File {
  if (typeof fileData !== 'string' && 'data' in fileData) {
    const csvContent = Papa.unparse(fileData.data, CSV_UNPARSE_OPTIONS)
    const blob = new Blob([BOM + csvContent], { type: CSV_MIME })
    return new File([blob], filename, { type: CSV_MIME })
  }
  if (typeof fileData === 'string') {
    const blob = new Blob([fileData], { type: JSON_MIME })
    return new File([blob], filename, { type: JSON_MIME })
  }
  throw new Error('Invalid file data format')
}

export function getFileName(header: string | null): string {
  if (header) {
    const res = /filename="(.*)"/.exec(header)
    return res && res.length > 0 ? res[1] : 'default.json'
  }
  return 'default.json'
}

export function createInterrogationFile(
  fileData: ParseResult<unknown> | string,
  questionnaireId: string,
): File {
  if (typeof fileData !== 'string' && 'data' in fileData) {
    const csvContent = Papa.unparse(fileData.data, CSV_UNPARSE_OPTIONS)
    const blob = new Blob([BOM + csvContent], { type: CSV_MIME })
    return new File([blob], `interrogations-${questionnaireId}.csv`, {
      type: CSV_MIME,
    })
  }
  const blob = new Blob([fileData as string], { type: JSON_MIME })
  return new File([blob], `interrogations-${questionnaireId}.json`, {
    type: JSON_MIME,
  })
}
