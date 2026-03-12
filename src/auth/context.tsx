import { createContext } from 'react';

import { DecodedIdTokenType } from '@/utils/oidc';

type AuthContextType = {
  getAccessToken: () => Promise<string | undefined>;
  decodedIdToken: DecodedIdTokenType;
};

export const AuthContext = createContext<AuthContextType>({
  getAccessToken: () => Promise.resolve(undefined),
  decodedIdToken: undefined,
});
