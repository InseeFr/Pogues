export const getEnvVar = key =>
  window?._env_?.[key] || import.meta.env[`VITE_${key}`];
