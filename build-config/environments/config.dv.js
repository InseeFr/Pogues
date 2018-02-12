const config = {
  dev: true,
  allowRemovalOfQuestionnaire: false,
  baseURL: './pogues',
  persistancePath: '/persistence',
  userPath: '/user',
  log: {
    level: 'ERROR',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  }
};

export default config;
