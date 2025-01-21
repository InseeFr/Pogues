/** Compute search parameters based on provided object. */
export function getUrlFromCriteria(
  criteria: { [key: string]: string | undefined } = {},
): string {
  let url = '';

  for (const key in criteria) {
    const v = criteria[key];
    if (v) {
      if (url !== '') {
        url += '&';
      }
      url += `${key}=${encodeURIComponent(v)}`;
    }
  }

  return url;
}

export function uuid(): string {
  return self.crypto.randomUUID();
}

/**
 * Generate a uid of 8 characters from current date and random number
 * in base 36 (e.g. "m5noru0h").
 *
 * We cannot use a true uuid for now because of back-end limitations.
 */
export function uid() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

/** A label is made of 10 uppercased alphanumeric characters. */
export function nameFromLabel(label: string): string {
  return label
    .replace(/[^a-z0-9_]/gi, '')
    .toUpperCase()
    .slice(0, 10);
}
