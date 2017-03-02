# Reducers et actions

Le reducer que nous avons utilisé dans le précédent chapitre était trivial: l'état ne changeait jamais. En conséquence, nous n'étions pas capables de réagir aux actions de l'utilisateur. Afin de construire un reducer plus adapté, il est nécessaire d'étudier plus précisément le second argument du reducer: l'action.

Une action est un objet `JavaScript` qui décrit ce qu'il s'est passé. Par exemple, l'action suivante peut être utilisée pour décrire l'édition du libellé d'un code:

```javascript
const anAction = {
  type: 'EDIT_CODE_LABEL', //quel type d'action a eu lieu ?
  payload: { //détails à propos de cette action
    id: 'code_2', //quel code est concerné ?
    label: 'regular happy' //quel est le nouveau libellé ?
  }
}
```

Si l'on passe cette action en tant que second argument à notre reducer (l'état défini à la section précédente servant de premier argument), on s'attend à ce qu'en retour, il renvoie un nouvel état, où le libellé pour le code avec l'identifiant `code_2` a été remplacé par "regular happy".

```javascript
const previousState = {
  codeListById: {...}
  codeById: {
    ...
    code_2: {
      label: 'happy'
    }
    ...
  }
}

const newState = simpleReducer(previousState, anAction)
```
L'object `newState` attendu est:

```javascript
{
  codeListById: {...}
  codeById: {
    ...
    code_2: {
      //Le seul changement concerne le libellé de `code_2`.
      label: 'regular happy'
    }
    ...
  }
}
```

Voici une implémentation possible de ce reducer:

```javascript
function simpleReducer(state, action) {
  if (action.type === 'EDIT_CODE_LABEL') {
    return {
      //`codeListById` n'est pas impacté par cette action, il référence des
      //identifiants mais ne connaît pas les libellés.
      codeListById: state.codeListById,
      codeById: {
        //cf. notes ci-dessous concernant la syntaxe
        //On conserve tous les codes inchangés...
        ...state.codeById,
        //...sauf pour le code qui a été édité: celui-ci doit être mis à jour
        //pour prendre en compte le nouveau libellé.
        [action.payload.id]: {
          label: action.payload.label
        }
      }
    }
  }
  //On renvoie l'état précédent: cette action n'a pas d'effet sur l'état.
  else return state
}
```

Un reducer doit être une [fonction pure](http://redux.js.org/docs/introduction/ThreePrinciples.html#changes-are-made-with-pure-functions), ce qui siginifie qu'elle ne peut pas modifier l'état initial. L'implémentation ci-dessous n'est donc pas acceptable:

```javascript
function simpleReducer(state, action){
  if (action.type === 'EDIT_CODE_LABEL') {
    state.codeById[action.payload.id].label = action.payload.label
  }
  return state
}
```

Elle renvoie bien l'état attendu (avec le libellé "regular happy" pour `code_2`), mais elle a modifié l'état initial (en fait, l'état initial et le nouvel état sont représentés par le même objet).

L'implémentation du reducer utilise [l'opérateur ...](/javascript/syntax.md#opérateur-spread-avec-les-objets) et les [propriétés dynamiques](/javascript/syntax.md#propriétés-dynamiques) pour faciliter l'écriture de mises à jour sans modification de l'objet initial.

## L'état initial

Un reducer prend l'état précédent et une action, et renvoie le nouvel état. À l'initialisation, il n'y a pas d'état précédent. Une approche fréquente consiste à utiliser les [paramètres par défaut d'ES2015](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Default_parameters) pour donner à l'état une valeur initiale. Dans notre exemple, on pourrait utiliser l'état codé en dur précédemment:

```javascript
const initialState = {
  codeListById: {
    code_list_1: { ... },
    ...
  },
  codeById: {
    code_1: { ... },
    ...
  }
}

function myReducer(state=initialState, action) {
  ...
}
```
