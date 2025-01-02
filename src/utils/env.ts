declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

type EnvKeys =
  | 'INSEE'
  | 'ACTIVE_NAMESPACES'
  | 'API_URL'
  | 'AUTH_TYPE'
  | 'DEFAULT_USER_ID'
  | 'DEFAULT_USER_NAME'
  | 'DEFAULT_USER_STAMP'
  | 'LOG_LEVEL'
  | 'OIDC_AUTHORITY'
  | 'OIDC_CLIENT_ID'
  | 'PUBLIC_ENEMY_URL';

export function getEnvVar(key: EnvKeys): string | undefined {
  const windowVar = window?._env_?.[key];
  if (windowVar) return windowVar;
  return import.meta.env[`VITE_${key}`] as string;
}
