import { computeAuthorizationHeader, getBaseURI } from './utils';

export type Nomenclature = {
  id: string;
  /**
   * @deprecated (name always equals to id)
   */
  name?: string;
  label: string;
  /**
   * can be a integer (from registry) or a string (version = name actually)
   */
  version: number | string;
  urn?: string;
  suggesterParameters: unknown; // suggester configuration (abstract in pogues)
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
