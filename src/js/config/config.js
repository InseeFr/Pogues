var config = {
  dev :  true,
  remote : true,
  baseURL : 'http://s90datalift.ad.insee.intra:9050',
  poguesPath : '/exist/pogues',
  persistPath : '/exist/restxq',
  stromaePath : '/exist/stromae/publisher',
  log : {
    level : 'DEBUG',
    activeNamespaces : ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  }
};

export default config;
