import { getEnvVar } from '../env';

export const buildOidcConfiguration = baseConfig => {
  if (getEnvVar('INSEE')) return baseConfig;
  const authority = getEnvVar('OIDC_AUTHORITY');
  const client_id = getEnvVar('OIDC_CLIENT_ID');
  const { origin } = window.location;
  const updatedBaseConfigConfig = Object.entries(baseConfig.config).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: typeof v === 'string' ? v.replace('my_origin', origin) : v,
    }),
    {},
  );
  const configuration = {
    ...baseConfig,
    origin: window.location.origin,
    config: {
      ...updatedBaseConfigConfig,
      authority: authority || updatedBaseConfigConfig.authority,
      client_id: client_id || updatedBaseConfigConfig.client_id,
    },
  };
  return configuration;
};
