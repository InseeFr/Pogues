import { useOidc } from '@/contexts/oidc';

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
    stamp: decodedIdToken?.timbre as string,
  };

  return user;
}
