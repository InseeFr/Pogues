import type { Version, VersionWithData } from '@/models/versions';

import { computeAuthorizationHeader, getBaseURI } from './utils';

/** Fetch latest versions of the questionnaire. */
export const getVersions = async (
  id: string,
  token: string,
): Promise<Version[]> => {
  const url = `${getBaseURI()}/persistence/questionnaire/${id}/versions`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then(
    (res) => res.json() as Promise<Version[]>,
  );
};

/** Get details of the specified version to load it. */
export const getVersion = async (
  id: string,
  token: string,
): Promise<VersionWithData> => {
  const url = `${getBaseURI()}/persistence/version/${id}?withData=true`;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, { headers }).then(
    (res) => res.json() as Promise<VersionWithData>,
  );
};
