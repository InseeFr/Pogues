import { useMemo } from 'react';

import { useOidc } from '.';

export const useUser = () => {
  const { isUserLoggedIn, decodedIdToken } = useOidc();

  if (!isUserLoggedIn) {
    throw new Error('This hook should be used only on authenticated routes');
  }

  const user = useMemo(() => {
    const { preferred_username: id, name, timbre: stamp } = decodedIdToken;
    return { id, name, stamp };
  }, [decodedIdToken]);

  return { user };
};
