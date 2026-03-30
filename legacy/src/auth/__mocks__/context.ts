import { createContext } from 'react';

export const AuthContext = createContext({
  getAccessToken: () => Promise.resolve('test-token'),
  decodedIdToken: {
    timbre: 'my-stamp',
  },
});
