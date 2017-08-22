module.exports = {
  dev: true,
  allowRemovalOfQuestionnaire: true,
  baseURL: 'http://localhost:5000',
  persistancePath: '',
  userPath: '/user',
  log: {
    level: 'DEBUG',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  },
  codeLists: {
    repoURLSpecs: 'http://localhost:4000/repo/specs',
    repoURLCList: 'http://localhost:4000/repo/clist'
  }
};
