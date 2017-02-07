# Internationalization

The application is available in french and english. Language [detection](https://github.com/InseeFr/Pogues/blob/38cb8ea2221cc6d1a6561112d9cf32288993f7d5/src/js/reducers/dictionary.js#L9-L10) is based on the browser settings (it cannot be chosen by hand for now).

## Dictionary

Most of strings that appear in the application use constants from the
[src/js/constants/dictionary.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/dictionary.js) file. This file provides english and french versions for each of these constants. It looks like this:
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

We use this dictionary to build an object referred to as `locale` with all the constants as keys, and the translation for the current language as values. `locale` is [stored](https://github.com/InseeFr/Pogues/blob/38cb8ea2221cc6d1a6561112d9cf32288993f7d5/src/js/reducers/dictionary.js) in the application state, and passed to the main component of the application ([PoguesApp](https://github.com/InseeFr/Pogues/blob/master/src/js/components/pogues-app.js)). It is then passed from parent to child through props.

This approach is nice because components do not need to import a dictionary file, but it generates a lot of boilerplate (we can easily forget to pass `locale` from a parent to its children). A better option could be to pass `locale`through the [context](https://facebook.github.io/react/docs/context.html).