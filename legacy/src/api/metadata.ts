import { computeAuthorizationHeader, getBaseURI } from './utils';

export async function getUnitsList(token: string): Promise<unknown> {
  const url = `${getBaseURI()}/meta-data/units`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}
