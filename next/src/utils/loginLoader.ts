import { redirect } from '@tanstack/react-router';

import { getOidc } from '@/lib/auth/oidc';

import { getCurrentUri } from './utils';

export async function loginLoader() {
  const { isUserLoggedIn } = await getOidc();
  if (!isUserLoggedIn) {
    throw redirect({
      to: '/login',
      search: { redirectUri: getCurrentUri() },
    });
  }
  return null;
}
