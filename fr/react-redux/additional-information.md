# Informations diverses au sujet de React zr Redux

Cette section fournit de l'information complémentaire qui peut être utile pour les personnes qui débutent avec ces technologies.

## Proptypes

Les [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) sont utilisées pour documenter ce qu'attendent en props les composants `React`. Par exemple, pour le composant `CodeEditor`:

```javascript
import React, { PropTypes } from 'react'

fuction CodeEditor({ label, handleChange, remove, moveUp, moveDown }) {
  ...
}

CodeEditor.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  moveUp: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
}
```

Pour le composant `CodeListEditor`, on peut documenter:
- ce que le `CodeListEditorDumb` attend (les codes par exemple);
- ce que le composant finalement exporté attend (l'identifiant d'une liste de codes).

## Processus de conception

Ajouter de nouveaux composants à l'application peut suivre le schéma suivant:
1. créer des composants statiques élémentaires;
2. puis combiner ces composants pour créer un composant plus complexes
3. enfin, connecter ce composant au store s'il a besoin d'information qui ne peut pas lui être passée directement par son parent.

Il n'y a pas une façon unique de choisir les composants à connecter au store. Dans notre exemple, nous aurions pu choisir de ne pas connecter le `CodeListEditor`, mais à la place, lui passer en props ce dont il a besoin à partir de son parent, le composant `CodeListPiker`, qui lui même, pourrait être connecté ou pas au store. Choisir le composant à connecter est dans une certaine mesure une question de [préférences personnelles](https://github.com/reactjs/redux/issues/419), même si [éviter de connecter trop de composants directement au store](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) peut être considéré comme une bonne pratique. 


