# Scinder et associer des reducers

Nous pouvons désormais implémenter la fonctionnalité pour ajouter un code. Pour cela, nous avons besoin:
- de définir un créateur d'actions;
- de traiter l'action correspondante au sein du reducer.

Le créateur d'actions doit connaître la liste du codes à laquelle le code doit être ajouté:

```javascript
let lastId = 0
function addCode(codeListId) {
  return {
    type: 'ADD_CODE',
    payload: {
      codeListId,
      id: `new_code_${lastId++}`
    }
  }
}
```

Nous avons donné un identifiant à notre code. Pour simplifier, cet identifiant est incrémenté automatiquement. En pratique, nous utiliserons un [identifiant généré aléatoirement](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/utils/data-utils.js#L12-L13).

La logique du reducer se complexifie:

```javascript
function simpleReducer(state, action) {
  if (action.type === 'EDIT_CODE_LABEL') {
    ...
  }
  else if (action.type === 'ADD_CODE') {
    //récupérer la liste de codes concernée
    const codeList = state.codeListById[payload.codeListId]
    //récupérer les identifiants des codes de cette liste de code
    const codes = codeList.codes
    //ajouter un nouveau code à la fin, sans modifier l'objet initial
    const newCodesIds = [...codeIds, payload.id]
    //mettre à jour `codeListById` avec les nouveaux codes
    const codeListById = {
      ...state.codeListById,
      [payload.codeListId]: {
        ...codeList,//on conserve toutes les entrées existantes (en 
                    //l'occurence, le `label` de la liste de codes)
        codes: newCodesIds //on met à jour les identifiants des codes
      }
    }
    //mettre à jour `codesById` avec le nouveau code
    const codeById = {
      ...state.codeById,
      [payload.id]: {
        label: ''
      }
    }
    //on retourne le nouvel état
    return {
      codeListById,
      codeById
    }
  }
  //on renvoie l'état tel quel, cette action n'a pas d'effet sur l'état
  else return state
}
```

Le code devient rapidement assez long: il est nécessaire de traiter les effets sur les différentes parties de l'état, sans modifier l'état initial (ce qui aurait permis d'avoir une syntaxe plus concise). Grâce à la façon dont nous avons modélisé l'état (une entrée par type d'entité avec des entres entre entités grâce aux identifiants, et non pas une structure arborescente où les listes de codes contiendraient la description des codes), on peut facilement scinder le reducer princiapl en deux plus petits reducers, qui travailleront indépendamment l'un de l'autre:
- un reducer pour gérer les listes de codes;
- un reducer pour gérer les codes.

On peut ensuite [associer](http://redux.js.org/docs/api/combineReducers.html#combinereducersreducers) ces reducers pour gérer la logique globale de l'application.

```javascript
import { combineReducers } from 'redux'

function codeListByIdReducer(state, action) {
  const { type, payload } = action
  if (type === 'ADD_CODE') {
    const codeList = state[payload.codeListId]
    return {
      ...state,
      [payload.codeListId]: {
        ...codeList,
        codes: [...codeList.codes, payload.id]
      }
    }
  }
  else return state
}

function codeByIdReducer(state, action) {
  const { type, payload } = action
  if (type === 'EDIT_CODE_LABEL') {
    const code = state[payload.id]
    return {
      ...state,
      [payload.id]: {
        ...code,
        label: payload.label
      }
    }
  }
  else if (action.type === 'ADD_CODE') {
    return {
      ...state,
      [payload.id]: {
        label: ''
      }
    }
  }
  else return state
}

const mainReducer = combineReducers({
  codeListById: codeListByIdReducer,
  codeById: codeByIdReducer
})
```

On peut maintenant mettre à jour le composant `CodeListEditor` afin qu'il reçoive en paramètre la fonction `addCode` (le créateur d'actions enveloppé dans une fonction qui permet d'envoyer l'action directement au storengrâce à la fonction `connect`):

```javascript
//Le créateur d'action `addCode` a besoin de l'identifiant de la liste de
//la listed de code à laquelle le code est ajouté. La fonction `addCode``
//qui est passée au composant `CodeListEditorDumb` a donc besoin de cet 
//identifiant également. Il est récupérable à partir du paramère `id`:
//lorsque de l'on appelle `<CodeListEditor id='code_list_1' />`, le
//paramètre `id` est passé au `CodeListEditor`, et la fonction `connect``
//le fait suivre au composant `CodeListEditorDumb`
function CodeListEditorDumb({ id, codes, editCodeLabel, addCode }) {
  return (
    <div>
      <button onClick={() => addCode(id) }>
        Add a code
      </button>
      <div>
      ...
    </div>
  )
}
```

Vous pouvez tester le code avec ce [pen](http://codepen.io/BoogalooJB/pen/bgLVEZ)
<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="bgLVEZ"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
