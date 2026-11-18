export interface CspEnvironment {
  VITE_API_URL?: string;
  VITE_OIDC_ISSUER?: string;
  VITE_PERSONALIZATION_URL?: string;
}

export interface CspPolicy {
  "default-src": string[];
  "base-uri": string[];
  "object-src": string[];
  "script-src": string[];
  "script-src-elem": string[];
  "style-src": string[];
  "style-src-elem": string[];
  "style-src-attr": string[];
  "img-src": string[];
  "font-src": string[];
  "worker-src": string[];
  "connect-src": string[];
  "frame-src": string[];
}

export function createCspPolicy(
  env: CspEnvironment,
  hmrPort: number,
  isDevelopment: boolean,
): CspPolicy;
