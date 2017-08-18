# Organisation du code

## Arborescence

Aperçu du contenu du dossier [src/](https://github.com/InseeFr/Pogues/tree/master/src).

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

## Règles Générales

De manière générales, nous essayons d'écrire des tests unitaires pour chaque fichier JavaScript. Si le fichier à tests se nomme `component.js`, le fichier de tests sera dans le même répertoire et devra se nommer `component.spec.js`. 

Chaque page de votre application sera définie dans un répertoire spécifique, situé à la racine du répertoire `src`. Chaque composant nécessaire pour cette page sera situé dans un sous-repertoire `components` et tous les composants connectés au `store` `Redux` dans un sous-répertoire `containers`. 

Les composants utilisés dans différentes pages seront définis dans le répertoire `layout`. 

La plupart du temps, et cela peut être considéré comme une bonne pratique, il convient d'exporter uniquement un composant par fichier, et utiliser les exports par [défaut](/javascript/syntax.md#export-et-import).

Si un composant a besoin d'être connecté au store, ce qu'il convient d'exporter par défaut est le résultat du mécanisme de connection fourni par React Redux.

## Actions

Dans ce répertoire nous allons définir toutes les actions `Redux` utilisées dans l'application afin de mettre à jour les données dans le store. Ces différentes actions n'aura pour but que de définir la donnée que nous désirons mettre à jour, et d'émettre une action qui sera géré par un `reducer`. 

Certaines actions ont des effets uniquement sur un seul reducer. Par exemple, seul le reducer `codes-by-id` a besoin de savoir que l'action `EDIT_CODE`  a eu lieu. Mais d'autres actions ont des conséquences sur plusieurs reducers. Par exemple, lorsque l'action `CREATE_CODE` circule:
- le reducer `codes-by-id` ajoute une entrée pour ce nouveau code;
- le reducer `code-list-by-id` (qui devrait plutôt s'appeler  `code-lists-by-id`) ajoute ce code à la liste de codes à laquelle il appartient.

Ce schéma est récurrent  et la convention suivante a été établie: toutes les actions concernant un certain type d'entités (par exemple les codes) sont définies dans un fichier nommé en fonction du type d'entités (ie [src/actions/codes.js](https://github.com/InseeFr/Pogues/blob/master/src/actions/code.js)). Ainsi, les actions comme `CREATE_CODE`, `REMOVE_CODE` et `MOVE_UP_CODE` sont définies dans ce fichier, et seront valorisées à la fois par le reducer `code-list-by-id` et le reducer `codes-by-id`.

Les constantes du type chaines de caractères utilisées pour identifier les actions sont définies au sein du même fichier.

## Contants 

Toutes les constantes sont déclarées dans l'un des 4 fichiers suivants, au sein du dossier [constants](https://github.com/InseeFr/Pogues/tree/master/src/js/constants) : 
- [pogues-constants.js](https://github.com/InseeFr/Pogues/tree/master/src/constantspogues-constants.js) pour les constantes liées à des détails d'implémentation;
- [dictionnary.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsdictionary.js) pour l'[internationalisation](/application/internationalization.md);
- [constants-mapping.js](https://github.com/InseeFr/Pogues/tree/master/src/constantsconstants-mapping.js) le mapping entre une constante définie dans le fichier `pogues-contants.js` et le dictionnaire `dictionary.js`
- [schema.js](
https://github.com/InseeFr/Pogues/tree/master/src/constantsschema.js) pour les constantes issues du [schéma XML](/remote-apis/schema.md), comme par exemple les constantes utilisées pour distinguer les [types de questions]

## Fonts

Les différentes polices de caractères de l'application se situent dans ce répertoire. 

## Help

Répertoire dans lequel est définie la page `Help`. 

## Home

Répertoire dans lequel est définie la page d'accueil de l'application, affichant la liste des questionnaires.

## Layout

Dans ce répertoire est défini tous les composants qui ne sont pas liés à une page en particulier. La règle que nous avons mis en place est de créer un répertoire par composant. Dans ce répertoire, vous trouverez le fichier principal du composant, son fichier de tests, et éventuellement un autre répertoire `components`  dans lequel seront définis les sous-composants nécessaires. 

## Questionnaire

Répertoire dans lequel est définie la page affichant les informations d'un questionnaire.

## Reducers

Tous les reducers se trouvent dans le dossier [reducers](https://github.com/InseeFr/Pogues/tree/master/src/reducers).

La plupart d'entre eux gèrent une partie de l'état constituée d'une collection d'entités, et suivent la convention de nommage `somethings-by-id`.

Les fichiers où les reducers sont définis utilisent une seule déclaration `export default`.

Le dossier [app-state](https://github.com/InseeFr/Pogues/tree/master/src/reducers/app-state) contient des reducers qui ne sont pas censés avoir d'effet sur le questionnaire en lui même, mais gèrent de l'information sur l'état de l'interface.

## SCSS

Dans ce repétoire, nous allons définir la feuille de style de l'application. Nous utilisons pour cela le langage `SCSS`, qui est une surcouche de `CSS`. WebPack sera en charge de compiler les fichier `SCSS` en `CSS` lors de la phase de build. 

[include:153-172](../../../webpack.config.js)

La feuille de style est découpée en composant. Pour les composants nécessitant une feuille de style, un fichier sera définir dans le répertoire `inc`. 

A la racine, vous trouverez des fichiers de configuration générale. 

Le fichier principal `pogues.scss` sera en charger de tout importer. 

[include](../../../src/scss/pogues.scss)

## Store

Dans ce répertoire se situe le fichier `configure-store.js` utilisé dans le fichier principal de l'application, afin de configurer le `store` de l'application .

## Utils

Sont définis dans ce répertoire des modules utilitaires nécessaire pour l'ensemble de l'application. Nous essayons de découper ce répertoire en sous-répertoire afin de mieux structurer l'application. Le nom du répertoire correspondra à la partie de l'application utilisant ce module utilitaire. Nous avons par exemple : 

- component : utilisé par des composants `React`
- dictionary : utilisé pour l'Internationalisation
- reducer : utilisé par les reducers
- test : utilisé pour les tests unitaires
- transformation-entities : pour les différentes conversions du model. 


