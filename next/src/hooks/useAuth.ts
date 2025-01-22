import { useEffect } from 'react';

import { useOidc } from '@/contexts/oidc';

export type User = {
  givenName?: string;
  familyName?: string;
  stamp?: string;
  /** Token used for API calls */
  token: string;
};

export function useAuth(): User | undefined {
  //const [user, setUser] = useState<User | undefined>(undefined);
  const oidc = useOidc();
  console.log(oidc);

  useEffect(() => {
    /*const unsubscribe = auth.onAuthStateChanged((user) => {
      //setUser(user);
      router.invalidate();
    });

    return unsubscribe;*/
  }, []);

  if (!oidc.isUserLoggedIn) return undefined;

  const decodedIdToken = oidc.oidcTokens?.decodedIdToken;
  const user = {
    givenName: decodedIdToken?.given_name as string,
    familyName: decodedIdToken?.family_name as string,
    stamp: decodedIdToken?.timbre as string,
    token: decodedIdToken?.accessToken as string,
  };

  //const router = useRouter();

  console.log('user ->', user);

  return user;
}
