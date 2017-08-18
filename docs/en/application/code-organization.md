# Code organization

## Directory structure

Overlook at the folder structure for the [src/](https://github.com/InseeFr/Pogues/tree/master/src) folder.

```
├── actions
│   ├── code.js
│   ├── code-list.js
│   └── ...
├── constants
│   ├── dictionary.js
├── fonts
│   ├──
├── help
│   ├── page-help.jsx
├── home
│   ├── components
│   ├── containers
│   ├── page-home.jsx
│   ├── page-home.spec.js
├── layout
│   ├── 
├── questionnaire
│   ├── components
│   ├── containers
│   ├── page-questionnaire.jsx
│   ├── page-questionnaire.spec.js
├── reducers
│   ├── app-state
│   │   ├── generic-input-by-questionnaire-id.js
│   │   └── ...
│   ├── code-by-id.js
│   ├── code-list-by-id.js
│   ├── ...
├── scss
│   ├── images
│   ├── inc
│   │   ├── _code-list-edditor.scss
│   ├── _global.scss
│   ├── _mixin.scss
│   ├── ...
│   ├── pogues.scss
├── store
│   ├──
├── utils
│   ├── tree-utils
│   │   ├── remove.js
│   │   ├── ...
│   ├── remote-api.js
│   ├── state-to-model-questionnaire.js
│   ├── model-to-state-questionnaire.js
│   ├── ...

```

## General Rules

We try to write unit tests for every JavaScript file. If a scripts is named `component.js`, the file for the corresponding unit tests will be located in the same folder and named `component.spec.js`. 

All page of the application is defined in a dedicated folder, located in the `src` folder. Every component needed for this page is défined in a `components` subdirectory, and all components connected to the `Redux``store` in a `containers` subdirectory. 

All composants used in any pages will be defined in the `layout` folder. 

Most of the time, and it should be seen a rule of thumb, we only export one component per file and we use a [default](/javascript/syntax.md#export-and-import) export.

If a component needs to be connected to the store, what is exported as default is the the result of the React Redux connect mechanism.

## Actions

In this folder, we will define all `Redux` actions used by the application, in order to update the data managed by the `store`. These different actions will only define the data we want to update, and trigger an action, managed by a `reducer`. 

Some actions have effects on only one reducer. For instance, only the `codes-by-id` reducer needs to know about the `EDIT_CODE` action. But others have effects on multiple reducers. For instance, when a `CREATE_CODE` action is dispatched:
- the `codes-by-id` reducer needs to add an entry for this new code;
- the `code-list-by-id` reducer (which should in fact be named `code-lists-by-id`) needs to add this code to the code list it belongs to.

This pattern is recurrent and the following convention was chosen: all the actions concerning a given kind of entity (for instance codes) will stay in a file named after this entity (ie [src/js/actions/codes.js](https://github.com/InseeFr/Pogues/blob/master/src/js/actions/code.js)). So actions like `CREATE_CODE`, `REMOVE_CODE` or `MOVE_UP_CODE` will stay in this file, and will be referred to by both the `code-list-by-id` reducer and the `codes-by-id` reducer.

String constants used to identify actions are defined inline in the file.

## Contants 

All constants are defined in one of these 4 files in the [constants](https://github.com/InseeFr/Pogues/tree/master/src/js/constants) directory: 
- [pogues-constants.js](https://github.com/InseeFr/Pogues/tree/master/src/constantspogues-constants.js) for constants related to implementation details;
- [dictionnary.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsdictionary.js) for [internationalization](/application/internationalization.md);
- [constants-mapping.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsconstants-mapping.js) the mapping between a constat defined in the `pogues-contants.js` file and the `dictionary.js` dictionary.
- [schema.js](
https://github.com/InseeFr/Pogues/tree/master/src/constantsschema.js) for constants coming from the [XML Schema](/remote-apis/schema.md);

## Fonts

The different fonts used by the application are located in this folder. 

## Help

Folder where is define the `Help` page. 

## Home

Folder where is define the Home page of the application, displaying the list of questionnaires.

## Layout

In this folder, we will define all components used in any pages of the application. The rule we try to follow, is to create a dedicated folder by component. In this folder, you will find the main JavaScript file, the corresponding unit test, and maybe a `components` subdirectory with subcomponent used by this one. 

## Questionnaire

Folder where is defined the page displaying the information of a questionnaire.

## Reducers

All the reducers stay in the [reducers](https://github.com/InseeFr/Pogues/tree/master/src/reducers) directory.

Most of them handle a piece of state consisting of a collection of entities and follow the `somethings-by-id` naming convention.

Reducer files use a single `export default` statement.

The [app-state](https://github.com/InseeFr/Pogues/tree/master/src/js/reducers/app-state) sub folder contains reducers which are not supposed to have any effect on the questionnaire by itself, but hold information about the UI state.

## SCSS

In this folder, we will define the stylesheet of the application. We use the `SCSS` language, a superset of `CSS`. WebPack  will be in charge of compiling all our `SCSS` files into= `CSS` during the build phase

[include:153-172](../../../webpack.config.js)

The stylesheet is splitted by component. For component needed a stylesheet, you will find a dedicated file in the `inc` folder.

At the root of the `scc` folder, you will find other file with general configuration.

The main file `pogues.scss` will be in charge of importing everything. 

[include](../../../src/scss/pogues.scss)

## Store

in this folder is defined the `configure-store.js` file, used my the main JavaScript file of the application, in order to configure the `Redux` `store`.

## Utils

Are defined in thie directory all utility modules needed in the application. We try to split this folder into subfolder, in order to improve the structure of the application. The name of the subfolder will correspond to the part of the application using this utility module. For example, we have : 

- component : used by `React` components
- dictionary : used by the internationalization behavior
- reducer : used by reducers
- test : used by unit tests
- transformation-entities : for the differents transformations of the model. 
