// TODO create a reducer with config if we want to allow hot updates of remote
// urls
const config = {
  dev: true,
  allowRemovalOfQuestionnaire: true,
  baseURL: 'http://pogues.eu-central-1.elasticbeanstalk.com',
  poguesPath: '',
  persistPath: '',
  stromaePath: '/stromae/publisher',
  log: {
    level: 'DEBUG',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models'],
  },
  codeLists: {
    repoURLSpecs: 'http://pogues.eu-central-1.elasticbeanstalk.com/repo/specs',
    repoURLCList: 'http://pogues.eu-central-1.elasticbeanstalk.com/repo/clist',
  },
};

export default config;
