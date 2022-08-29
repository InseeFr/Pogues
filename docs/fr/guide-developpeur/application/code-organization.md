# Organisation du code

## Arborescence

Aperçu du contenu du dossier [src/](https://github.com/InseeFr/Pogues/tree/main/src).

```
├── actions
│   ├── app-state.js
│   ├── component-insert.js
│   └── ...
├── auth
│   ├── hoc
│   ├── provider
├── bootstrap-custom
├── constants
│   ├── dictionary.js
│   └── ...
├── fonts
│   ├──
├── forms
│   ├── controls
│   └── ...
├── hoc
│   ├── with-current-form-variables.js
│   └── ...
├── layout
│   ├──
├── model
│   ├── formToState
│   ├── transformations
│   ├── remote-to-store.jsx
│   ├── remote-to-store.spec.js
├── reducers
│   ├── app-state
│   │   ├── generic-input-by-questionnaire-id.js
│   │   └── ...
│   ├── errors
│   ├── selectors
│   ├── calculated-variable-by-questionnaire.js
│   ├── calculated-variable-by-questionnaire.spec.js
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
│   ├── codes-lists
│   │   ├── codes-lists-utils.js
│   │   ├── ...
│   ├── remote-api.js
│   ├── ...
├── widgets

```

## Règles Générales

De manière générale, nous essayons d'écrire des tests unitaires pour chaque fichier JavaScript. Si le fichier à tests se nomme `component.js`, le fichier de tests sera dans le même répertoire et devra se nommer `component.spec.js`.

Les composants de type header, footer, navigation et corps des différentes pages vont être définis dans le dossier `layout`. Les différents composants de layout peuvent faire appel à d'autres sous-composants plus unitaires qui seront définis dans `widgets`. Dans chaque cas, les composant seront situés dans un sous-repertoire `components` et tous les composants connectés au `store` `Redux` dans un sous-répertoire `containers`.

La plupart du temps, et cela peut être considéré comme une bonne pratique, il convient d'exporter uniquement un composant par fichier, et utiliser les exports par [défaut](../javascript/syntax.md#export-et-import).

Si un composant a besoin d'être connecté au `store`, ce qu'il convient d'exporter par défaut est le résultat du mécanisme de connection fourni par React Redux.

## Actions

Dans ce répertoire nous allons définir toutes les actions `Redux` utilisées dans l'application afin de mettre à jour les données dans le store. Ces différentes actions n'aura pour but que de définir la donnée que nous désirons mettre à jour, et d'émettre une action qui sera géré par un `reducer`.

Certaines actions ont des effets uniquement sur un seul reducer. Par exemple, seul le reducer `general` a besoin de savoir que l'action `SET_SELECTED_STAMP` a eu lieu. Mais d'autres actions ont des conséquences sur plusieurs reducers. Par exemple, lorsque l'action `LOAD_QUESTIONNAIRE_SUCESS` circule :

- le reducer `calculated-variable-by-questionnaire` ajoute les variables calculées;
- le reducer `code-list-by-questionnaire` ajoute les listes de codes;
- le reducer `collected-variable-by-questionnaire` ajoute les variables collectées;
- le reducer `component-by-questionnaire` ajoute les séquences, sous-séquences, références et questions;
- le reducer `external-variable-by-questionnaire` ajoute les variables externes;

Ce schéma est récurrent et la convention suivante a été établie: toutes les actions concernant un certain type d'entités (par exemple les questionnaires) sont définies dans un fichier nommé en fonction du type d'entités (ie [src/actions/questionnaire.js](https://github.com/InseeFr/Pogues/blob/main/src/actions/questionnaire.js)). Ainsi, les actions comme par exemple `LOAD_QUESTIONNAIRE`, `CREATE_QUESTIONNAIRE` et `MERGE_QUESTIONNAIRE` sont définies dans ce fichier.

Les constantes du type chaines de caractères utilisées pour identifier les actions sont définies au sein du même fichier.

## Auth

Dans ce dossier sont présents les fichiers permettant de gérer les deux modes d'authentification sur l'application à savoir :

- pas d'authentification : tous les utilisateurs sont autorisés à se connecter et le timbre 'FAKEPERMISSION' leur est attribué,
- authentification OIDC : l'application récupère l'identité de l'utilisateur en interrogenat le serveur Keycloack.

## Bootstrap-custom

TODO

## Constants

Toutes les constantes sont déclarées dans l'un des 4 fichiers suivants, au sein du dossier [constants](https://github.com/InseeFr/Pogues/tree/master/src/js/constants) :

- [pogues-constants.js](https://github.com/InseeFr/Pogues/tree/master/src/constantspogues-constants.js) pour les constantes liées à des détails d'implémentation;
- [dictionnary.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsdictionary.js) pour l'[internationalisation](/application/internationalization.md);
- [dom-constants.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsschema.js) pour les constantes utilisées pour définir les className des composants.

## Fonts

Les différentes polices de caractères de l'application se situent dans ce répertoire.

## Forms

## Hoc

Dans ce dossier sont définis des [composants d'ordre supérieur](https://fr.reactjs.org/docs/higher-order-components.html). Par exemple le hoc with-current-form-variables par permettre en enrobant le composant `InputWithSuggestions` d'y injecter les variables du questionnaire pour pouvoir les suggérer à l'utilisateur lors de la saisie.

## Layout

On met dans ce dossier les composants graphiques de plus haut-niveau. Chaque composant est décrit dans un dossier qui porte son nom par exemple `header`. Dans ce dossier on va retrouver :

- un dossier `components` qui va contenir le composant et éventuellement des sous-composants ainsi que que leurs fichiers de tests respectifs si ils existent.
- un dossier `containers` qui va contenir le container qui fait le lien entre le composant et le store Redux.

## Model

C'est dans ce répertoire que vont être définis les différentes transformations du modèle de données du questionnaire.

### formtoState

Ce répertoire contient les transformations réalisées sur les données du questionnaire pour passer du store Redux au formulaire Redux Forms et inversement. Les transformations sont réparties dans plusieurs fichiers ayant la chacun une responsabilité sur une partie de l'information. Par exemple le fichier `declaration.js` aura la responsabilité des données correspondant aux déclarations. Chaque fichier ensuite contient les méthodes de transformation :

- `storeToForm`, `stateToForm`, `componentStateToForm` : transformation du store Redux vers le formulaire Redux Forms
- `formToStore`, `formToState`, `formToComponentState` : transformation du formulaire vers le store Redux

### transformations

Ce répertoire contient les transformations nécessaire pour passer du store Redux au JSON conforme au modèle de données Pogues qui sera sauvegardé en base de données ou qui permettra d'alimenter l'API pour la visualisation du questionnaire.

De la même façon que pour le répertoire formToState, les transformations sont découpées en plusieurs fichiers. Dans chaque fichier on va définir les méthodes :

- `remoteToStore` : pour transformer le JSON reçu via l'API dans le format stocké dans le store Redux
- `storeToRemote` : pour mettre les données du store dans un [format](../remote-apis/questionnaire-json.md) conforme au modèle de données Pogues

## Reducers

Tous les reducers se trouvent dans le dossier [reducers](https://github.com/InseeFr/Pogues/tree/master/src/reducers).

La plupart d'entre eux gèrent une partie de l'état constituée d'une collection d'entités, et suivent la convention de nommage `somethings-by-id`ou `something-by-questionnaire`.

Les fichiers où les reducers sont définis utilisent une seule déclaration `export default`.

Le dossier [app-state](https://github.com/InseeFr/Pogues/tree/master/src/reducers/app-state) contient des reducers qui gèrent de l'information sur l'état de l'interface et l'état courant du questionnaire.

## Scss

Dans ce repétoire, nous allons définir la feuille de style de l'application. Nous utilisons pour cela le langage `SCSS`, qui est une surcouche de `CSS`.

La feuille de style est découpée en composant. Pour les composants nécessitant une feuille de style, un fichier sera à définir dans le répertoire `inc`.

A la racine, vous trouverez des fichiers de configuration générale.

Le fichier principal `pogues.scss` sera en charger de tout importer.

[include](../../../../src/scss/pogues.scss)

## Store

Dans ce répertoire se situe le fichier `configure-store.js` utilisé dans le fichier principal de l'application, afin de configurer le `store` de l'application .

## Utils

Sont définis dans ce répertoire des modules utilitaires nécessaire pour l'ensemble de l'application. Nous essayons de découper ce répertoire en sous-répertoire afin de mieux structurer l'application. Le nom du répertoire correspondra à la partie de l'application utilisant ce module utilitaire. Nous avons par exemple :

- component : utilisé par des composants `React`
- dictionary : utilisé pour l'Internationalisation
- reducer : utilisé par les reducers
- test : utilisé pour les tests unitaires
- validation : utilisé pour la validation d'un formulaire avant soumission

## Widgets

Dans ce dossier, on va définir les composants réutilisables à différents endroits de l'application. La structure à l'intérieur du dossier est la même que dans le répertoire `layout`.
