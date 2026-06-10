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