import { getEnvVar } from '../utils/env';

const auth = getEnvVar('AUTH_TYPE');

export const authType = () => auth;
