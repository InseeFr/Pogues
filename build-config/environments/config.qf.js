const config = {
  dev: true,
  allowRemovalOfQuestionnaire: false,
  baseURL: './pogues',
  persistancePath: '/persistence',
  userPath: '/user',
  log: {
    level: 'DEBUG',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  }
};

export default config;
