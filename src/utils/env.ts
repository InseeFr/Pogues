declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

type EnvKeys =
  | 'ACTIVE_NAMESPACES'
  | 'API_URL'
  | 'DEFAULT_USER_ID'
  | 'DEFAULT_USER_NAME'
  | 'DEFAULT_USER_STAMP'
  | 'LOG_LEVEL'
  | 'METADATA_DOWNLOAD_ENABLED'
  | 'OIDC_CLIENT_ID'
  | 'OIDC_ENABLED'
  | 'OIDC_ISSUER'
  | 'TROMBI_URL'
  | 'PUBLIC_ENEMY_URL';

/** Retrieve env var from custom window variable or from VITE otherwise. */
export function getEnvVar(key: EnvKeys): string | undefined {
  const windowVar = window?._env_?.[key];
  if (windowVar) return windowVar;
  return import.meta.env[`VITE_${key}`];
}
