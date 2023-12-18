import { getEnvVar } from '../../utils/env';

export const getUser = state => {
  const { authType } = state;
  if (authType === 'OIDC') {
    const {
      oidc: { user },
    } = state;
    if (!user) return { id: '', name: '', stamp: '' };
    const {
      profile: { preferred_username: id, name, timbre: stamp },
    } = user;
    return {
      id,
      name,
      stamp,
    };
  }
  return {
    id: getEnvVar('DEFAULT_USER_ID') || 'FAKEID',
    name: getEnvVar('DEFAULT_USER_NAME') || 'Fake user',
    stamp: getEnvVar('DEFAULT_USER_STAMP') || 'FAKEPERMISSION',
  };
};
