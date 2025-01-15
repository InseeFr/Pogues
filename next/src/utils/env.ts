declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

type EnvKeys = 'POGUES_LEGACY' | 'API_URL' | 'OIDC_ISSUER' | 'OIDC_CLIENT_ID';

/** Retrieve env var from custom window variable or from VITE otherwise. */
export function getEnvVar(key: EnvKeys): string | undefined {
  const windowVar = window?._env_?.[key];
  if (windowVar) return windowVar;
  return import.meta.env[`VITE_${key}`];
}
