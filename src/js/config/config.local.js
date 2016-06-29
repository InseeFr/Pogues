//TODO create a reducer with config if we want to allow hot updates of remote
//urls
var config = {
  dev :  true,
  allowRemovalOfQuestionnaire: true,
  baseURL : 'http://localhost:4000',
  poguesPath : '',
  persistPath : '',
  stromaePath : '/stromae/publisher', 
  log : {
    level : 'DEBUG',
    activeNamespaces : ['Components', 'Actions', 'Stores', 'Utils', 'Models']
  },
  codeLists: {
    repoURLSpecs: 'http://localhost:4000/repo/specs',
    repoURLCList: 'http://localhost:4000/repo/clist'
  }
}

//TODO see if this all the parameters should be exposed and modifiable
//from the config editor
function makeRepoURLSpecs() {
  const repoURL = 'http://dvrmessnclas01.ad.insee.intra:80s80'
  const query = `
    // PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
    // PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#>

    // SELECT ?niveau ?label ?retrievalQuery WHERE {
    //   ?niveau a xkos:ClassificationLevel ; skos:prefLabel ?label .
    //   BIND(CONCAT("PREFIX skos:<http://www.w3.org/2004/02/skos/core#> PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#> SELECT ?code ?intitule  WHERE {<", STR(?niveau), "> skos:member ?poste . ?poste skos:notation ?code ; skos:prefLabel ?intitule .} ORDER BY ?code") AS ?retrievalQuery)
    // }`
  return `${repoURL}/sparql?query=${encodeURIComponent(query)}`
}

export default config
