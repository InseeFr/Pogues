import {
  computeAuthorizationHeader,
  getBaseURI,
  getUrlFromCriteria,
} from './utils';

const pathSearch = 'search';

export async function getContextFromCampaign(
  id: string,
  token: string,
): Promise<unknown> {
  const url = `${getBaseURI()}/${pathSearch}/context/collection/${id}`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then((res) => res.json());
}

export const getSearchResults = async (
  token: string,
  typeItem: unknown,
  criteria: { [key: string]: string | undefined },
  filter: string = '',
): Promise<unknown> => {
  const url = `${getBaseURI()}/${pathSearch}?${getUrlFromCriteria(criteria)}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      types: [typeItem],
      filter,
    }),
  }).then((res) => res.json());
};
