import axios from 'axios';

import { getOidc } from '@/lib/auth/oidc';

/**
 * Axios instance used to call Pogues API.
 * Automatically set access token and base url.
 */
export const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// get access token and add authorization header
instance.interceptors.request.use(async (config) => {
  const oidc = await getOidc();
  config.headers.Authorization = `Bearer ${oidc.getTokens().accessToken}`;
  return config;
});
