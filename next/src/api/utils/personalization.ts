import Papa, { ParseResult } from 'papaparse';

const CSV_UNPARSE_OPTIONS = {
  header: true,
  quotes: true,
  skipEmptyLines: true,
};

const CSV_MIME = 'text/csv';
const JSON_MIME = 'application/json';
const BOM = '\uFEFF';

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
  const csvContent = Papa.unparse(parsedCsv.data, CSV_UNPARSE_OPTIONS);
  const blob = new Blob([BOM + csvContent], { type: CSV_MIME });
  openDocument(blob, filename);
}

export function openParsedJson(parsedJson: string, filename?: string) {
  const blob = new Blob([parsedJson], { type: JSON_MIME });
  openDocument(blob, filename || 'data.json');
}

export function getFileFromParseResult(
  fileData: ParseResult<unknown> | string,
  filename: string = '',
): File {
  if (typeof fileData !== 'string' && 'data' in fileData) {
    const csvContent = Papa.unparse(fileData.data, CSV_UNPARSE_OPTIONS);
    const blob = new Blob([BOM + csvContent], { type: CSV_MIME });
    return new File([blob], filename, { type: CSV_MIME });
  }
  if (typeof fileData === 'string') {
    const blob = new Blob([fileData], { type: JSON_MIME });
    return new File([blob], filename, { type: JSON_MIME });
  }
  throw new Error('Invalid file data format');
}

export function getFileName(header: string | null): string {
  if (header) {
    const res = /filename="(.*)"/.exec(header);
    return res && res.length > 0 ? res[1] : 'default.json';
  }
  return 'default.json';
}

export function createInterrogationFile(
  fileData: ParseResult<unknown> | string,
  questionnaireId: string,
): File {
  if (typeof fileData !== 'string' && 'data' in fileData) {
    const csvContent = Papa.unparse(fileData.data, CSV_UNPARSE_OPTIONS);
    const blob = new Blob([BOM + csvContent], { type: CSV_MIME });
    return new File([blob], `interrogations-${questionnaireId}.csv`, {
      type: CSV_MIME,
    });
  }
  const blob = new Blob([fileData as string], { type: JSON_MIME });
  return new File([blob], `interrogations-${questionnaireId}.json`, {
    type: JSON_MIME,
  });
}
