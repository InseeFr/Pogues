import { DEFAULT_STAMP, useOidc } from '@/lib/auth/oidc';

export type User = {
  givenName?: string;
  familyName?: string;
  stamp?: string;
};

export function useAuth(): User | undefined {
  const oidc = useOidc();

  const decodedIdToken = oidc.oidcTokens?.decodedIdToken;
  const user = {
    givenName: decodedIdToken?.given_name as string,
    familyName: decodedIdToken?.family_name as string,
    stamp: decodedIdToken?.timbre ?? DEFAULT_STAMP,
  };

  return user;
}
