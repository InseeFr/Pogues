export const getEnvVar = key =>
  window?._env_?.[key] || process.env[`REACT_APP_${key}`];
