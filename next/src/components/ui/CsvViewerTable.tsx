import { ParseResult } from 'papaparse'

interface CsvViewerTableProps {
  parsedCsv: ParseResult<unknown>
  hasHeader?: boolean
}

/** Display uploaded csv file as a table. */
export default function CsvViewerTable({
  parsedCsv,
  hasHeader = false,
}: Readonly<CsvViewerTableProps>) {
  const metaFields = parsedCsv.meta?.fields
  const isObjectRows = metaFields && metaFields.length > 0

  const getHeaders = (): string[] => {
    if (isObjectRows) {
      return metaFields
    }
    if (hasHeader) {
      return (parsedCsv.data as string[][])[0]
    }
    return ['Code', 'Label']
  }

  const getRows = (): string[][] => {
    if (isObjectRows) {
      return (parsedCsv.data as Record<string, string>[]).map((row) =>
        metaFields.map((field) => String(row[field] ?? '')),
      )
    }
    if (hasHeader) {
      return (parsedCsv.data as string[][]).slice(1)
    }
    return parsedCsv.data as string[][]
  }

  const headers: string[] = getHeaders()
  const rows: string[][] = getRows()

  const shouldScroll = rows.length > 6

  return (
    <div className="overflow-x-auto w-full my-4">
      <div
        className={`${
          shouldScroll
            ? 'max-h-80 overflow-y-auto'
            : 'max-h-none overflow-y-visible'
        }`}
      >
        <table className="border border-default w-full min-w-max shadow-sm">
          <thead className="bg-accent sticky top-0">
            <tr className="*:font-semibold *:p-4 text-left">
              {headers.map((header, i) => (
                <th key={i} className="text-default">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-default">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-default odd:bg-main *:p-4">
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
