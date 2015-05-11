var config = {
  dev :  true,
  remote : true,
  baseURL : 'http://s90datalift.ad.insee.intra:9150',
  poguesPath : '/exist/pogues',
  persistPath : '/exist/restxq',
  stromaePath : '/exist/stromae/generator',
  log : {
    level : 'DEBUG',
    activeNamespaces : ['Components']
  }
};

module.exports = config;
