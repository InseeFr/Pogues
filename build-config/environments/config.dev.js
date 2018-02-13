module.exports = {
  dev: true,
  allowRemovalOfQuestionnaire: true,
  baseURL: 'http://localhost:5000',
  persistancePath: '',
  userPath: '/user',
  log: {
    level: 'DEBUG',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  }
};

// module.exports = {
//   dev: true,
//   allowRemovalOfQuestionnaire: true,
//   baseURL: 'http://dvrmspogfolht01.ad.insee.intra/rmspogfo/pogues',
//   persistancePath: '/persistence',
//   userPath: '/user',
//   log: {
//     level: 'DEBUG',
//     activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models']
//   },
// };
