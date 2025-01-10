import { getEnvVar } from '@/utils/env';

export function getBaseURI(): string {
  return getEnvVar('API_URL') ?? '';
}
