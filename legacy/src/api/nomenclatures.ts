import { computeAuthorizationHeader, getBaseURI } from './utils';

export type Nomenclature = {
  id: string;
  label: string;
  /**
   * can be a integer (from registry, auto-incremented) or a string (version = name actually)
   */
  version: number | string;
  urn?: string;
  suggesterParameters: unknown; // suggester configuration (abstract in pogues)
  /**
   * Generic theme for the code list (stable between versions).
   */
  theme: string;
  /**
   * Reference year (4 digits). Should be match pattern "\d{4}"
   */
  referenceYear: string;
};

export async function getNomenclatures(token: string): Promise<Nomenclature[]> {
  const url = `${getBaseURI()}/nomenclatures`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));
  const nomenclatures = await fetch(url, { headers }).then(
    (res) => res.json() as Promise<Nomenclature[]>,
  );
  return nomenclatures;
}
