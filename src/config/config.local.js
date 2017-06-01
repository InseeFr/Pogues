// TODO create a reducer with config if we want to allow hot updates of remote
// urls
const config = {
  dev: true,
  allowRemovalOfQuestionnaire: true,
  baseURL: 'http://localhost:4000',
  poguesPath: '',
  persistPath: '',
  stromaePath: '/stromae/publisher',
  log: {
    level: 'DEBUG',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models'],
  },
  codeLists: {
    repoURLSpecs: 'http://localhost:4000/repo/specs',
    repoURLCList: 'http://localhost:4000/repo/clist',
  },
};

export default config;
