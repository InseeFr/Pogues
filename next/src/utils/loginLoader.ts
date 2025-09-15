import { redirect } from '@tanstack/react-router';

import { getOidc } from '@/lib/auth/oidc';

export async function loginLoader() {
  const oidc = await getOidc();
  if (!oidc.isUserLoggedIn) {
    throw redirect({ to: '/login' });
  }
  return null;
}
