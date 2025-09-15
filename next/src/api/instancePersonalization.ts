import axios from 'axios';

import { getOidc } from '@/lib/auth/oidc';

/**
 * Axios instance used to call Pogues API.
 * Automatically set access token and base url.
 */
export const instancePersonalization = axios.create({
  baseURL: import.meta.env.VITE_PERSONALIZATION_URL,
});

// get access token and add authorization header
instancePersonalization.interceptors.request.use(async (config) => {
  const oidc = await getOidc();
  config.headers.Authorization = `Bearer ${oidc.getTokens().accessToken}`;
  return config;
});
