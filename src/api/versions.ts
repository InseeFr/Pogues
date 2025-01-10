import type { Version, VersionWithData } from '@/models/versions';

import { getBaseURI } from './utils';

/** Fetch latest versions of the questionnaire. */
export const getVersions = async (
  id: string,
  token: string,
): Promise<Version[]> => {
  const b = getBaseURI();
  return fetch(`${b}/persistence/questionnaire/${id}/versions`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((res) => res.json() as Promise<Version[]>);
};

/** Get details of the specified version to load it. */
export const getVersion = async (
  id: string,
  token: string,
): Promise<VersionWithData> => {
  const b = getBaseURI();
  return fetch(`${b}/persistence/version/${id}?withData=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((res) => res.json() as Promise<VersionWithData>);
};
