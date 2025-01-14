import { computeAuthorizationHeader, getBaseURI } from './utils';

export async function getSeries(token: string): Promise<unknown> {
  const url = `${getBaseURI()}/search/series`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}

export async function getOperations(
  id: string,
  token: string,
): Promise<unknown> {
  const url = `${getBaseURI()}/search/series/${id}/operations`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}

export async function getCampaigns(
  id: string,
  token: string,
): Promise<unknown> {
  const url = `${getBaseURI()}/search/operations/${id}/collections`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}

export async function getUnitsList(token: string): Promise<unknown> {
  const url = `${getBaseURI()}/meta-data/units`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}
