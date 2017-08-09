# JavaScript

Ce fichier ne fournit pas une présentation exhaustive du langage `Javascript`. Il cherche à fournir une information minimale et des références externes pour aiguiller le développeur qui ne serait pas familier des fonctionnalités les plus récéntes du langage.

## ES2015

Nous utilisons la syntaxe ES2015 grâce au [plugin Babel](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/webpack.config.js#L23-L36) pour Webpack.

## Décomposition

[L'assignation par décomposition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) permet d'extraire de l'information d'un tableau ou d'un objet. Elle prend la forme suivante:

```javascript
const person = { firstname: 'john', lastname: 'doe' }
const { firstname, lastname } = person
console.log(firstname) // 'john'
console.log(lastname) // 'doe'
```

Cette syntaxe peut être utilisée pour décomposer les arguements d'une fonction. Elle est utilisée fréquemment lors de la définition de composants `React`:

```javascript
function CodeEditor(props) {
  let label = props.label
  (...)
}
```

peut être ré-écrit:

```javascript
function CodeEditor({ label }) {
  return (...)
}
```

L'assignation par décomposition est également souvent utilisée en association avec les fonctions de manipulation de tableaux:

```javascript
var codes = [{ id: '...', label: '...'}, { id: '...', label: '...' }]
codes.map(function (code) {
  const id = code.id
  const label = code.label
  return ... //faire quelque chose avec id et label
  }
)
}
```

peut être ré-écrit:

```javascript
var codes = [{ id: '...', label: '...'}, { id: '...', label: '...' }]
codes.map(({id, label}) => ) {
  return ... //faire quelque chose avec id et label
  }
)
}

```

## Opérateur spread avec les tableaux

Il est utile pour mettre à jour un tableau sans modifier l'objet initial

```javascript
const initialArray = ['john', 'jack', 'bob']

//conserver tous les éléments sauf le premier
const [dontCare, ...withoutFirst] = initialArray

//ajouter une entrée
const withOneMore = [...initialArray, 'kate']
```

## Opérateur spread avec les objets

Cette syntaxe ne fait pas partie d'ES2015, pourrait être intégrée à de futures versions de `JavaScript`. Comme ES2015, cette syntaxe est supportée grâche à Babel, avec le plugin [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/).

Elle permet de faire facilement une copie d'un objet avec de mettre à jour une entrée:

```javascript
const initialObject = {
  id1: 'one',
  id2: 'two',
  id3: 'three'
}

//`initialObject` ne sera pas modifié
const newObject = {
  ...initialObject,
  id2: 'deux'
}
//une autre approche possible
// const newObject = Object.assign(initialObject, { id2: 'deux' })
```

On peut également utilsier cet opérateur pour conserver toutes les entrées sauf une (pratique pour supprimer une entrée d'un objet):

```javascript
const initialObject = {
  john: 25,
  jack: 65,
  bob: 35
}

//on souhaite supprimer l'entrée "jack"
const {
  jack: dontCare,
  ...withoutJack
} = initialObject

//`withoutJack` est le nouvel objet
```

## Propriétés dynamiques

Habituellement, pour créer un objet dont l'une des clés est définie grâce à une variable, on écrit ce type de code:

```javascript
const firstname = 'john'
const names = {}
names[firstname] = 'doe'
```

Avec ES2015, les [propriétés dynamiques](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) permettent d'écrire:

```javascript
const firstname = 'john'
const names = {
  [firstname]: 'doe'
}
```

Cela est en particulier utile en association avec l'opérateur spread pour travailler avec des objets sans modifier leur version initiale (par exemple dasn un reducer). De cette manière, on peut effectuer une copie de l'objet et ne mettre à jour qu'un seul champ:

```javascript
const initialObject = {
  id1: 'one',
  id2: 'two',
  id3: 'three'
}
const idToProcess = 'id2'
const newValue = 'deux'
const newObject = {
  ...initialObject,
  [idToProcess]: newValue
}
```

## Raccourci pour l'affectation de propriétés

ES2015 propose un [raccourci](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Creating_objects) pour créer un objet à partir de variables lorque les clés de l'objet correspondent aux noms des variables:

```javascript
var firstname = 'john'
var lastname = 'doe'
//Avant ES2015
var person = {
  firstname: firstname,
  lastname: lastname
}
//Avec ES2015
var person = {
  firstname,
  lastname
}
```

## Fonctions flêchées

Les [fonctions flêchées](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) sont un moyen concis et pratique pour écrire de petites fonctions anonymes. Elles prennent la forme suivante:

```javascript
const increment = a => a + 1
```

Elles sont utilisées fréquemment dans cette application, mais les déclarations de fonctions classiques sous la forme `function () {}` doivent être privilégies lorsque la logique n'est pas triviale.

## Litéraux de gabarits

Les [litéraux de gabarit](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) permettent de décrire facilement des chaînes de caractères qui nécessiteraient sinon la concaténation (`+`) de plusieurs chaînes. Par exemple, dans le fichier [src/js/utils/state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/utils/state-to-model-questionnaire.js#L58-L63):

```javascript
const makePageBreakGroup = index => ({
  name: `PAGE_${index}`,
  label: `Components for page ${index}`,
  ...
})  
```

Un autre avantage des litéraux de gabarit est qu'ils permettent d'écrire facilement des chaînes de caractères sur plusieurs lignes.

## Export et import

L'application utilise des déclarations `export` and `import` d'ES2015. En savoir plus au sujet de l'[import](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import) ou de l'[export](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/export).

De façon simplifiée, on peut retenir qu'il y a deux types d'exports: les exports nommés et les exports par défaut. Les deux sont utilisés dans l'application.

Les exports nommés prennent l'une des formes suivantes:
```javascript
export const firstNameExport = ...
//ou
export {
  secondNamedExport,
  thirdNamedExport
}
```

Alors que les exports par défaut sont décrits de la façon suivante:
```javascript
const mainPurposeOfThisFile = ...
export default mainPurposeOfThisFile
```

Pour importer un élément qui a été exporté avec un export nommé, on utilise des accolades pour identifier quelle variable exportée doit être importée.

```javascript
import { firstNameExport, secondNamedExport } from '...'
```

Pour importer un export par défaut:
```javascript
import mainPurposeOfThisFile from '...'
```

Lorsqu'on importe une variable qui a été exportée par défaut, le nom donné à cette variable importée ne doit pas nécessairement correspondre au nom qui a été défini dans le module. Le code précédent peut être ré-récrit sans conséquence de la façon suivante:

```javascript
//on utilise `aRelevantName` au lieu de `mainPurposeOfThisFile`
import aRelevantName from '...'
```

### Composants

Chaque composant est défni dans son propre fichier. Nous utilisons donc les exports par défaut (pas d'ambiguité sur ce qui est exporté). Il peut y avoir dans un même fichier le composant "visuel" (cf. [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.sdajayptd)), et un composant "connecté". La plupart du temps, seul le composant connecté est utilisé en dehors du module, et l'export prend la forme suivante (cf. [src/js/components/component-editor.js](https://github.com/InseeFr/Pogues/blob/master/src/js/components/component-editor.js)):
```javascript
function ComponentEditor(...) {
}
...
export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditor)
```

## Importer du css

Cette application utilise [style-loader](https://github.com/webpack-contrib/style-loader) avec Webpack. Cela permet d'importer des fichiers `css` à partir de `JavaScript`. Ainsi, dans le fichier [src/js/main.js](https://github.com/InseeFr/Pogues/blob/master/src/js/main.js), on importe la feuille de style principale de l'applcation de la façon suivante:

```javascript
require('../css/pogues.css')
```

Cette approche est pratique:
- pour indiquer qu'une feuille de style est nécessaire afin que du code `JavaScript` produise le résultat attendu;
- pour optimiser le chargement du fichier (inclure le `css` en ligne dans une balise `<style>`) et garantir la compatibilité entre navigateurs (par exemple en ajoutant les préfixes nécessaires);
- pour permettre à Webpack de prendre en charge la copie de ce fichier dans le dossier `dist`.

