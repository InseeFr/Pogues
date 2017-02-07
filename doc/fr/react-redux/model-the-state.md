# Modéliser l'état de l'application

Avant d'aller plus loin, il est nécessaire de réfléchir à la façon de modéliser l'état de l'applcation. Les choix présentés ici ne seront pas discutés, mais pour en savoir plus, cette [ressource (normalizing state shape)](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) peut être intéressante. Hypothèses:
- chaque code a un identifiant unique `id` et un libellé `label`;
- chaque liste de codes a un identifiant unique `id` et un libellé `label`;
- chaque liste de code contient un tableau `codes` avec les identifiants des codes utilisés.

Ainsi, l'état de l'application peut être représenté de la façon suivante:

```javascript
{
  codeListById: {
    code_list_1: { //en pratique, on utilise des identifants aléatoires
      label: 'mood',
      codes: ['code_1', 'code_2', 'code_3']
    },
    code_list_2: {
      label: 'appetite',
      codes: ['code_4', 'code_5', 'code_6]
    }
  },
  codeById: {
    code_1: {
      label: 'unhappy',
    },
    code_2: {
      label: 'happy'
    },
    code_3: {
      label: 'very happy'
    },
    code_4: {
      label: 'not hungry'
    },
    code_5: {
      label: 'hungry'
    },
    code_6: {
      label: 'starving'
    }
  }
}
```

Remarquons qu'au lieu d'un arbre à plusieurs niveaux où un liste de codes contiendrait des codes, on a choisi une représentation à plat (type base de données), où chaque liste de codes contient des identifiants de codes, et les codes en eux-mêmes sont décrits au sein de l'objet `codesById`. Nous veronns dans la section [scinder et associer des reducers](./reducers-split-combine.md) en quoi ce choix simplifie l'application.