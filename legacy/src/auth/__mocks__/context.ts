import { createContext } from 'react';

export const AuthContext = createContext({
  getAccessToken: () => Promise.resolve(undefined),
  decodedIdToken: {
    timbre: 'my-stamp',
  },
});
