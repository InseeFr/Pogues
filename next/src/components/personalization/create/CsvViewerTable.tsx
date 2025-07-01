import { ParseResult } from 'papaparse';

interface CsvViewerTableProps {
  parsedCsv: ParseResult;
}

/** Display versions as a table. */
export default function CsvViewerTable({
  parsedCsv,
}: Readonly<CsvViewerTableProps>) {
  const shouldScroll = parsedCsv.data.length > 4;

  return (
    <div className="overflow-x-auto w-full mb-3">
      <div
        style={{
          maxHeight: shouldScroll ? '320px' : 'none',
          overflowY: shouldScroll ? 'auto' : 'visible',
        }}
      >
        <table className="border border-default w-full min-w-max shadow-sm">
          <thead className="bg-accent sticky top-0 ">
            <tr className="*:font-semibold *:p-4 text-left">
              {parsedCsv.meta.fields.map((field: string) => (
                <th key={field} className="text-default">
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-default">
            {parsedCsv.data.map((row: Record<string, string>, i: number) => (
              <tr key={i} className="bg-default odd:bg-main *:p-4">
                {parsedCsv.meta.fields.map((field: string) => (
                  <td key={field}>{row[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
