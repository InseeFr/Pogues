# Introduction au store

## Un reducer simple

Comme cela a déjà été dit, l'état de l'application sera géré par le store. Pour créer un store avec Redux, il est dans un premier temps nécessaire de définir un [reducer](http://redux.js.org/docs/basics/Reducers.html). Un reducer est une fonction qui prend en arguments l'état de l'application et une action, et retourne une nouvelle version de l'état de l'application qui prend en compte cette action.

Pour simplifier, nous créerons un reducer qui retourne systématiquement l'état de l'application tel que nous l'avons défini dans la précédente section (autrement dit, pour l'instant, nous ne valoriserons pas l'action qui est passée au reducer):

```javascript
function simpleReducer(state, action) {
  return {
    codeListById: {
      code_list_1: { //en pratique, on utilisera des identifiants aléatoires
        label: 'mood',
        codes: ['code_1', 'code_2', 'code_3']
      },
      ...
    },
    codeById: {
      code_1: {
        label: 'unhappy',
      },
      ...
    }
  }
}
```

## Mise en place

On peut désormais amorcer notre application:
- on construit le Redux store grâce à la fonction `createStore` qui prend le reducer en tant que premier argument;
- on intègre le composant `CodeListEditor` au sein d'un composant [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) fourni par [React Redux](https://github.com/reactjs/react-redux); le Provider rendra le store accessible à chaque composant par l'intermédiaire de la fonction [connect](#connect) de React Redux.

Cf. [amorcer l'application](/application/bootstrap.md) pour une présentation plus détaillée de ces étapes.

```javascript
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(simpleReducer)

ReactDOM.render(
  <Provider store={store}>
    <CodeListEditor id="code_list_1" />
  </Provider>,
  document.getElementById('base')
)
```

Nous remarquons qu'un paramètre est fourni au composant `CodeListEditor`: l'identifiant de la liste de codes que l'on souhaite éditer.

## Connect

Avec cette configuration, nous pouvons désormais [connecter](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) le composant `CodeListEditor` au store.

```javascript
import { connect } from 'react-redux'

//Les codes vont être passés au composant `CodeListEditor` grâce à la fonction
//`connect`. Nous avons renommé le `CodeListEditor` en `CodeListEditorDumb``
//pour le différencier du composant qui sera au final exporté (cf. dernière
//instruction).
function CodeListEditorDumb({ codes }) {
  return (
    <div>
      <button onClick={() => console.log('trying to add a code')}>
        Add a code
      </button>
      <div>
      {
        codes.map(({ id, label }, i) => 
          <CodeEditor 
            key={id} label={label}
            handleChange={val => console.log('a code has changed', val)} />)    
      }
      </div>
    </div>
  )
}

//`mapStateToProps` extrait les codes à partir de l'état de l'application. Son
//second argument (`ownProps`) est constitué des paramètres passés au composant
//connecté (cf. `<CodeListEditor id="code_list_1" />` dans la configuration).
// Ansi, il s'agit d'un objet avec une entrée nommée `id`.
const mapStateToProps = (state, ownProps) => {
  //On extrait l'identifiant de la liste de codes.
  const codeListId = ownProps.id
  //Pour une liste de codes avec un identifiant donné, on extrait dans un
  //premier temps un tableau avec les identifiants des codes qui constituent
  //cette liste de codes.
  const codeIds = state.codeListById[codeListId].codes
  //Ensuite, pour chaque code, on extrait l'information détaillée à partir de
  //l'état, grâce à l'entrée `codesById`. Comme le composant `CodeEditor`
  //attend qu'un code soit représenté de la manière suivante:
  //`{id: 'code_1', label: 'unhappy' }`, on construit les codes afin de
  //satisafaire cette attente.
  return codeIds.map(id => ({
    id: id,
    label: state.codeById[id].label
  }))
}

export default connect(mapStateToProps)(CodeListEditorDumb)
```

Nous remarquons que le composant `CodeListEditorDumb` attend en paramètre un tableau de `codes`, mais lorsque l'on instancie le composant `CodeListEditor` (cf. `<CodeListEditor id="code_list_1" />` au sein du Provider), on ne lui passe des codes mais l'identifiant d'une liste de codes. Valoriser cet identifient et retourner les codes correspondants est pris en chage par la fonction `mapStateToProps`. Ensuite, `connect` utilisera `mapStateToProps` pour envelopper le composant initial dans un composant de plus haut niveau, qui, à partir d'un identifiant, va récupérer les codes grâce à l'état de l'application, et appeler le composant initial en lui passant ces codes en paramètre.

En pratique, il n'est pas nécessaire de renommer le composant initial en `CodeListEditorDumb`, puisque ce nom est uniquement utiliés localement (dans l'appel à `connect`). Cf. [export default](/javascript/syntax.md#export-et-import) pour en savoir plus sur le fonctionnement des exports.

Le composant `CodeListEditor` est désormais capable d'aller chercher l'information directement dans le store. Mais lorsque nous essayons d'ajouter ou d'éditer un code, rien ne se passe, à part le message dans la console. Dans les prochains chapitres, nous verrons comment utiliser des actions pour produire des changements.

Vous pouvez tester le code avec ce [pen](http://codepen.io/BoogalooJB/pen/egyeJz)

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="egyeJz"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
