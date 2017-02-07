# Code organization

## Directory structure

Overlook at the folder structure for the [src/js](https://github.com/InseeFr/Pogues/tree/master/src/js) directory.

```
├── components
│   ├── code-editor.js
│   ├── code-list-editor.js
│   └── ...
├── reducers
│   ├── app-state
│   │   ├── generic-input-by-questionnaire-id.js
│   │   └── ...
│   ├── code-by-id.js
│   ├── code-list-by-id.js
│   ├── ...
├── actions
│   ├── code.js
│   ├── code-list.js
│   └── ...
├── config
│   ├── config.js
├── constants
│   ├── dictionary.js
├── utils
│   ├── tree-utils
│   │   ├── remove.js
│   │   ├── ...
│   ├── remote-api.js
│   ├── state-to-model-questionnaire.js
│   ├── model-to-state-questionnaire.js
│   ├── ...

```

## React components

All the React components stay in the [components](https://github.com/InseeFr/Pogues/tree/master/src/js/components) directory.

Most of the time, and it should be seen a rule of thumb, we only export one component per file and we use a [default](/javascript/syntax.md#export-and-import) export (example with the [CodeEditor](https://github.com/InseeFr/Pogues/blob/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/components/code-editor.js#L7) component).

If a component needs to be connected to the store, what is exported as default is the the result of the React Redux connect mechanism (example with the [CodeListEditor](https://github.com/InseeFr/Pogues/blob/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/components/code-list-editor.js#L103)).

## Reducers

All the reducers stay in the [reducers](https://github.com/InseeFr/Pogues/tree/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/reducers) directory.

Most of them handle a piece of state consisting of a collection of entities and follow the `somethings-by-id` naming convention.

Reducer files use a single `export default` statement.

The [app-state](https://github.com/InseeFr/Pogues/tree/master/src/js/reducers/app-state) sub folder contains reducers which are not supposed to have any effect on the questionnaire by itself, but hold information about the UI state (for instance, the state of the [generic input](https://github.com/InseeFr/Pogues/blob/master/src/js/reducers/app-state/generic-input-by-questionnaire-id.js)).

## Actions

Some actions have effects on only one reducer. For instance, only the `codes-by-id` reducer needs to know about the `EDIT_CODE` action. But others have effects on multiple reducers. For instance, when a `CREATE_CODE` action is dispatched:
- the `codes-by-id` reducer needs to add an entry for this new code;
- the `code-list-by-id` reducer (which should in fact be named `code-lists-by-id`) needs to add this code to the code list it belongs to.

This pattern is recurrent and the following convention was chosen: all the actions concerning a given kind of entity (for instance codes) will stay in a file named after this entity (ie [src/js/actions/codes.js](https://github.com/InseeFr/Pogues/blob/master/src/js/actions/code.js)). So actions like `CREATE_CODE`, `REMOVE_CODE` or `MOVE_UP_CODE` will stay in this file, and will be referred to by both the `code-list-by-id` reducer and the `codes-by-id` reducer.

String constants used to identify actions are defined inline in the file.

## Constants

Except for the aforementioned string constants used for actions, all other constants are defined in one of these 3 files in the [constants](https://github.com/InseeFr/Pogues/tree/master/src/js/constants) directory: 
- [pogues-constants.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/pogues-constants.js) for constants related to implementation details;
- [dictionnary.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/dictionary.js) for [internationalization](/application/internationalization.md);
- [schema.js](
https://github.com/InseeFr/Pogues/blob/master/src/js/constants/schema.js) for constants coming from the [XML Schema](/remote-apis/schema.md), like constants used for [question types](https://github.com/InseeFr/Pogues-Model/blob/53c6151a237ed74d4e655b137a8e55735f141d96/src/main/resources/xsd/Questionnaire.xsd#L321-L328).

## Utils

In this folder are defined utility functions. Some highlights:
- [tree-utils](https://github.com/InseeFr/Pogues/tree/master/src/js/utils/tree-utils): utility functions related to questionnaire [tree structure](/implementation-details//questionnaire-structure.md) manipulation;
- [model-to-state-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/model-to-state-questionnaire.js) and other files with the same naming convention: utility functions to be called when a questionnaire is loaded; they take some `json` as input and return a "patch" that will be applied to the reducers to update the application state accordingly;
- [state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/state-to-model-questionnaire.js) produces a `json` representation of a questionnaire from the application state (see [persistence](/remote-apis/persistence.md) and [visualization](/remote-apis/visualization.md));
- [remote-api.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/remote-api.js) for [remote calls](/remote-apis/implementation.md);
- files following the [goTosChecker.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/goTosChecker.js) naming convention: utility functions to process checks for the [integrity checks];(/implementation-details/integrity-checks.md) functionality.