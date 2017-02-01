# Javascript

This file does not intend to provide an extensive presentation of all the javascript background needed to start coding the application, but it rather tries to give the minimal information and some external references to avoid confusing the developer who would not be familiar with some features of the language.

## ES2015

TODO
ES2015 and more thanks to babel

## Destructuring

Destructuring assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) allow to extract some information from an object or an array. They look like this:

```javascript
const person = { firstname: 'john', lastname: 'doe' }
const { firstname, lastname } = person
console.log(firstname) // 'john'
console.log(lastname) // 'doe'
```

This approach can be used for destructuring function arguments. We use them a lot when defining `React` components:

Hence:

```javascript
function CodeEditor(props) {
  let label = props.label
  (...)
}
```

can be rewritten as:

```javascript
function CodeEditor({ label }) {
  return (...)
}
```

Destructuring assignments are also frequently used in combination with array functions:

```javascript
var codes = [{ id: '...', label: '...'}, { id: '...', label: '...' }]
codes.map(function (code) {
  const id = code.id
  const label = code.label
  return ... //do something with id and label
  }
)
}
```

can be rewritten as:

```javascript
var codes = [{ id: '...', label: '...'}, { id: '...', label: '...' }]
codes.map(({id, label}) => ) {
  return ... //do something with id and label
  }
)
}

```

## Spread operator with arrays

TODO


## Spread operator with objects

This syntax is not part of ES2015, but might be part of future javascript versions. Like ES2015 syntax, it is supported thanks to babel, with the [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/) plugin.

It allows to make a copy of some object before updating some properties:
```javascript
const initialObject = {
  id1: 'one',
  id2: 'two',
  id3: 'three'
}

//`initialObject` won't be modified
const newObject = {
  ...initialObject,
  id2: 'deux'
}
//another way to do this can be
// const newObject = Object.assign(initialObject, { id2: 'deux' })
```


## Computed property names

Usually, to create an object when a key comes from a variable, we write that kind of code:

```javascript
const firstname = 'john'
const names = {}
names[firstname] = 'doe'
```

In ES2015, with [computed property names](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names), we can write:
```javascript
const firstname = 'john'
const names = {
  [firstname]: 'doe'
}
```

It is particularly useful in combination with the spread operator to enforce immutability when working with objects (like in a reducer). This way, we can make a copy of an object and only update one key:

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

## Shorthand property names

ES2015 provides a [shorthand](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Creating_objects) to create an object from variables when the object keys match the variables names shorter.

```javascript
var firstname = 'john'
var lastname = 'doe'
//Before ES2015
var person = {
  firstname: firstname,
  lastname: lastname
}
//With ES2015
var person = {
  firstname,
  lastname
}
```

## Arrow functions

[Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a short and convenient way to write small anonymous functions. They look like this:

```javascript
const increment = a => a + 1
```

They are used extensively in this application, but the regular function expression `function () {}` is still preferred when the logic is not trivial.

## Template literals

[Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) are convenient to describe strings that would be otherwise built by concatenating (`+`) multiple strings. For instance in [src/js/utils/state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/utils/state-to-model-questionnaire.js#L58-L63):

```javascript
const makePageBreakGroup = index => ({
  name: `PAGE_${index}`,
  label: `Components for page ${index}`,
  ...
})  
```

Another advantage of template literals is that they allow to write multiline strings easily.

## Export and import

This application uses `export` and `import` ES6 statements. Some useful information about them can be found here [import](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import) and there [export](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/export).

Briefly, we can keep in mind that there are two kind of `export`(s): named exports and default exports. Both are used in this application.

Named exports follow one of these patterns:
```javascript
export const firstNameExport = ...
//or
export {
  secondNamedExport,
  thirdNamedExport
}
```

While default exports look like this:
```javascript
const mainPurposeOfThisFile = ...
export default mainPurposeOfThisFile
```

Imports of named exports use curly brackets to identify which exported variables should be imported.

```javascript
import { firstNameExport, secondNamedExport } from '...'
```

while default exports are imported with:
```javascript
import mainPurposeOfThisFile from '...'
```

When we import a default export, the name we give to the local variable does not need to match the name defined in the module. The code above could be re-written like this:

```javascript
import aRelevantName from '...'
```

### Components

Components live in their own file, so we use `export default` to expose them. There might be in the same file a generic definition of the component, what is sometimes called a [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.sdajayptd), and a 'connected' component. Most of the time, only the 'connected' component will have a purpose for the outside world, so the export looks like this (see [src/js/components/component-editor.js](https://github.com/InseeFr/Pogues/blob/master/src/js/components/component-editor.js)):
```javascript
function ComponentEditor(...) {
}
...
export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditor)
```
## Import css

This application uses [style-loader](https://github.com/webpack-contrib/style-loader) in combination with webpack. It allows to import `css` files from javascript. Hence, in [src/js/main.js](https://github.com/InseeFr/Pogues/blob/master/src/js/main.js), we import the main css files the application will need:

```javascript
require('../css/pogues.css')
```

It is convenient:
- to mark some particular `css` file as a dependency for some `javascript` code to run properly;
- to process the file to make performance optimizations (inline css rules in the `html head` section) and compatibility adjustments (for instance by adding prefixes when needed);
- to make webpack taking care of copying this asset to the `dist` folder.

