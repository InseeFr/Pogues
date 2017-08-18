# Internationalization

The application is available in french and english. Language [detection](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/reducers/dictionary.js) is based on the browser settings (it cannot be chosen by hand for now).

## Dictionary

Most of strings that appear in the application use constants from the
[src/js/constants/dictionary.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/constants/dictionary.js) file. This file provides english and french versions for each of these constants. It looks like this:
```javascript
{
  ...
  addDeclaration: {'en': 'Add a statement', 'fr': 'Ajouter une déclaration'},
  addControl: {'en': 'Add a control', 'fr': 'Ajouter un contrôle'},
  declarations: {'en': 'Statements', 'fr': 'Déclarations'}
  ...
}
```

There are still some hard coded strings here and there that should be replaced with constants in the future.

## Implementation

When we import the `reducers/dictionnary` module in our application, an object will be returned, depending of the locale of the user. Based of this object, we will used the default JavaScript object syntax in order to get an internationalized message. 

```
import Dictionary from 'reducers/dictionary'

console.log(Dictionary.phLabel)
```