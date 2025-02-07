import { getOidc } from '@/contexts/oidc';
import { getEnvVar } from '@/utils/env';

export function getBaseURI(): string {
  return getEnvVar('API_URL') ?? '';
}

export function computeAuthorizationHeader(token: string): string {
  return token ? `Bearer ${token}` : '';
}

export async function getAPIToken(): Promise<string> {
  const oidc = await getOidc();

  if (!oidc.isUserLoggedIn) return '';

  return oidc.getTokens().accessToken;
}
