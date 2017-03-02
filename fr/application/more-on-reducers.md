# Informations complémentaires sur les reducers et les actions

## Traiter des actions

Au départ, les reducers au sein de Pogues étaient écrits avec des instructions `switch`:

```javascript
function myReducer(state, action) {
  switch (action.type) {
    case SOMETHING:
      return {...}
    case ANOTHER:
      return {...}
    default:
      return state
  }
}
```

Cette implémentation ne s'est pas toujours révélée très lisible (dans certaines situations, chaque clause comporte des traitements de plusieurs lignes qui pourraient justifier d'être regroupés sous forme de fonction). Ainsi, une approche s'appuyant sur un dictionnaire de fonctions a été privilégiée. Chaque entrée représente un type d'actions, chaque valeur, une fonction à appeler lorsqu'une action du type correspodant est à traiter. Cette fonction:
- prend en premier argument l'état géré par le reducer (par exemple, les codes pour le reducer `codes-by-id`);
- prend le contenu de l'action en deuxième argument;
- renvoie un nouvel état.

Extrait du reducer [code-by-id](https://github.com/InseeFr/Pogues/blob/master/src/js/reducers/code-by-id.js):

```javascript
//un dictionnaire avec tous les types d'actions qui sont à traiter par ce
//reducer, avec pour chaque type, la fonction à utiliser
const actionsHndlrs = {
  CREATE_CODE: createCode,
  REMOVE_CODE: removeCode,
  EDIT_CODE: editCode,
  ...
}

//fonction générique qui remplace l'instruction `switch`
export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

//la fonction pour traiter les actions `CREATE_CODE`
function createCode(codes, { id, label, value }) {
  return {
    //crée une nouvelle copie de l'état
    ...codes,
    //ajoute une entrée
    [id]: {
      id, label, value
    }
  }
}

...
```

La fonction générique pourrait utilement être partagée par les différents reducers (au lieu d'être définie au sein de chaque reducer).

## Les reducers gèrent des collections

La plupart des reducers gèrent une partie de l'état qui consiste en une collection d'entités. Par exemple, le reducer `codes-by-id` gère une collection (un objet `JavaScript` litéral) où chaque clé représente l'identifiant d'un code, et chaque valeur l'information qui constitue le code en question.

Les différents schémas décrits ci-dessous sont assez généraux. La possiblité de développer des utilitaires pour reduire la quantité de code à écrire mériterait d'être étudiée.

Ajouter une entrée:
```javascript
function createCode(codes, { id, label, value }) {
  return {
    ...codes,
    [id]: {
      id, label, value
    }
  }
}
```

Supprimer une entrée existante:
```javascript
function removeCode(codes, { id }) {
  //L'opérateur ... permet de séparer facilement l'entrée à supprimer des
  //autres entrées
  const { [id]: toRemove, ...toKeep } = codes
  return toKeep
}
```

Mettre à jour une entrée:
```javascript
function editCode(codes, { id, update }) {
  return {
    //copie de l'état
    ...codes,
    //on écrase l'entrée considérée
    [id]: {
      //copie des valeurs initiales
      ...codes[id],
      //applique le "patch" (toutes les clés contenues par l'action et déjà
      //existantes seront écrasées)
      ...update
    }
  }
}
```

## Contrôles d'intégrité

Le reducer de plus haut niveau pour l'application est construit dynamiquement pour traiter les [contrôles d'intégrité](/implementation-details/integrity-checks.md) sur le questionnaire..