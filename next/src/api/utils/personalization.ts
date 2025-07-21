import Papa, { ParseResult } from 'papaparse';

/**
 * This method will emulate the download of file, received from a POST request.
 * We will dynamically create a A element linked to the downloaded content, and
 * will click on it programmatically.
 */
export function openDocument(blob: Blob, filename?: string) {
  const downloadUrl = window.URL.createObjectURL(blob);

  if (!filename) {
    window.location.href = downloadUrl;
    return;
  }

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

export function openParsedCsv(
  parsedCsv: ParseResult<unknown>,
  filename?: string,
) {
  const csvContent = Papa.unparse(parsedCsv.data, {
    header: true,
    quotes: true,
    skipEmptyLines: true,
  });
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv' });
  openDocument(blob, filename);
}

export function getFileFromParseResult(
  parsedCsv: ParseResult<unknown>,
  filename: string = 'data.csv',
): File {
  const csvContent = Papa.unparse(parsedCsv.data, {
    header: true,
    quotes: true,
    skipEmptyLines: true,
  });
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv' });
  return new File([blob], filename, { type: 'text/csv' });
}

export function getFileName(header: string | null): string {
  if (header) {
    const res = /filename="(.*)"/.exec(header);
    return res && res.length > 0 ? res[1] : 'default.csv';
  }
  return 'default.csv';
}
