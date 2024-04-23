import { useOidc } from '.';
import { useMemo } from 'react';

export const useUser = () => {
  const oidc = useOidc();

  if (!oidc.isUserLoggedIn) {
    throw new Error('This hook should be used only on authenticated routes');
  }

  const { decodedIdToken } = oidc.oidcTokens;

  const user = useMemo(() => {
    const { preferred_username: id, name, timbre: stamp } = decodedIdToken;
    return { id, name, stamp };
  }, [decodedIdToken]);

  return { user };
};
