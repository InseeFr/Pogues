import { getEnvVar } from '@/utils/env';

const configurationURL = `${window.location.origin}/configuration.json`;

let saveApiURL = '';

type Config = {
  POGUES_API_BASE_HOST: string;
};

export async function getBaseURI(): Promise<string> {
  if (saveApiURL) return Promise.resolve(saveApiURL);

  if (getEnvVar('INSEE')) {
    const response = await fetch(configurationURL);
    const config = (await response.json()) as Config;
    saveApiURL = config.POGUES_API_BASE_HOST;
    return Promise.resolve(saveApiURL);
  }

  return Promise.resolve(getEnvVar('API_URL')).then((u) => {
    saveApiURL = u ?? '';
    return saveApiURL;
  });
}
