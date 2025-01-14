import { getEnvVar } from '@/utils/env';

export function getBaseURI(): string {
  return getEnvVar('API_URL') ?? '';
}

export function computeAuthorizationHeader(token: string): string {
  return token ? `Bearer ${token}` : '';
}
