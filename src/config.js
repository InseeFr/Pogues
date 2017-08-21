function makeRepoURLSpecs() {
  const repoURL = 'http://dvrmessnclas01.ad.insee.intra:8080';
  const query = `
    PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
    PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#>

    SELECT ?niveau ?label ?retrievalQuery WHERE {
       ?niveau a xkos:ClassificationLevel ; skos:prefLabel ?label .
       BIND(CONCAT("PREFIX skos:<http://www.w3.org/2004/02/skos/core#> PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#> SELECT ?code ?intitule  WHERE {<", STR(?niveau), "> skos:member ?poste . ?poste skos:notation ?code ; skos:prefLabel ?intitule .} ORDER BY ?code") AS ?retrievalQuery)
     }`;
  return `${repoURL}/sparql?query=${encodeURIComponent(query)}`;
}

const config = {
  dev: true,
  allowRemovalOfQuestionnaire: false,
  baseURL: 'http://dvrmspogfolht01.ad.insee.intra/rmspogfo/pogues',
  persistancePath: '/persistence',
  userPath: '/user',
  log: {
    level: 'ERROR',
    activeNamespaces: ['Components', 'Actions', 'Stores', 'Utils', 'Models'],
  },
  codeLists: {
    repoURLSpecs: makeRepoURLSpecs(),
  },
};

export default config;
