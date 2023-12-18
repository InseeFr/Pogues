/* eslint-disable react-hooks/rules-of-hooks */
import { decodeJwt } from 'oidc-spa';
import { useOidc } from 'oidc-spa/react';
import { useContext, useMemo } from 'react';
import { AuthContext } from '../../auth/provider/none';
import { getEnvVar } from '../env';

export const useAuth = authType => {
  if (authType === 'OIDC') {
    return useOidc();
  } else {
    const dummyClient = useContext(AuthContext);
    return { oidc: dummyClient };
  }
};

export const useUser = authType => {
  const { oidc } = useAuth();

  if (!oidc.isUserLoggedIn) {
    throw new Error('This hook should be used only on authenticated routes');
  }

  const { idToken } = oidc.getTokens();

  const user = useMemo(() => {
    if (authType === 'OIDC') {
      const {
        preferred_username: id,
        name,
        timbre: stamp,
      } = decodeJwt(idToken);
      return { id, name, stamp };
    }
    return {
      id: getEnvVar('DEFAULT_USER_ID') || 'FAKEID',
      name: getEnvVar('DEFAULT_USER_NAME') || 'Fake user',
      stamp: getEnvVar('DEFAULT_USER_STAMP') || 'FAKEPERMISSION',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  return { user };
};
