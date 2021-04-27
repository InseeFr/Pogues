const config = {
  dev: true,
  allowRemovalOfQuestionnaire: false,
  baseURL: 'https://dvrmspogbolht01.ad.insee.intra/rmspogfo/pogues',
  persistancePath: '/persistence',
  userPath: '/user',
  log: {
    level: 'ERROR',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models'],
  },
};

export default config;
