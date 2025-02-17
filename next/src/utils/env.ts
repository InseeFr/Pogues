declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

type EnvKeys =
  | 'API_URL'
  | 'AUTH_TYPE'
  | 'DEFAULT_USER_NAME'
  | 'DEFAULT_USER_STAMP'
  | 'OIDC_CLIENT_ID'
  | 'OIDC_ENABLED'
  | 'OIDC_ISSUER'
  | 'POGUES_LEGACY';

/** Retrieve env var from custom window variable or from VITE otherwise. */
export function getEnvVar(key: EnvKeys): string | undefined {
  const windowVar = window?._env_?.[key];
  if (windowVar) return windowVar;
  return import.meta.env[`VITE_${key}`];
}
