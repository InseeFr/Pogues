# Organisation du code

## Arborescence

Aperçu du contenu du dossier [src/js](https://github.com/InseeFr/Pogues/tree/master/src/js).

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

Tous les composants React se trouvent dans le dossier [components](https://github.com/InseeFr/Pogues/tree/master/src/js/components).

La plupart du temps, et cela peut être considéré comme une bonne pratique, il convient d'exporter uniquement un composant par fichier, et utiliser les exports par [défaut](/javascript/syntax.md#export-et-import) (exemple avec le composant [CodeEditor](https://github.com/InseeFr/Pogues/blob/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/components/code-editor.js#L7)).

Si un composant a besoin d'être connecté au store, ce qu'il convient d'exporter par défaut est le résultat du mécanisme de connection fourni par React Redux (exemple avec le [CodeListEditor](https://github.com/InseeFr/Pogues/blob/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/components/code-list-editor.js#L103)).

## Reducers

Tous les reducers se trouvent dans le dossier [reducers](https://github.com/InseeFr/Pogues/tree/ab5a24ad74886d126b3c2e7be849d4357b0efa85/src/js/reducers).

La plupart d'entre eux gèrent une partie de l'état constituée d'une collection d'entités, et suivent la convention de nommage `somethings-by-id`.

Les fichiers où les reducers sont définis utilisent une seule déclaration `export default`.

Le dossier [app-state](https://github.com/InseeFr/Pogues/tree/master/src/js/reducers/app-state) contient des reducers qui ne sont pas censés avoir d'effet sur le questionnaire en lui même, mais gèrent de l'information sur l'état de l'interface (par, l'état du [generic input](https://github.com/InseeFr/Pogues/blob/master/src/js/reducers/app-state/generic-input-by-questionnaire-id.js)).

## Actions

Certaines actions ont des effets uniquement sur un seul reducer. Par exemple, seul le reducer `codes-by-id` a besoin de savoir que l'action `EDIT_CODE`  a eu lieu. Mais d'autres actions ont des conséquences sur plusieurs reducers. Par exemple, lorsque l'action `CREATE_CODE` circule:
- le reducer `codes-by-id` ajoute une entrée pour ce nouveau code;
- le reducer `code-list-by-id` (qui devrait plutôt s'appeler  `code-lists-by-id`) ajoute ce code à la liste de codes à laquelle il appartient.

Ce schéma est récurrent  et la convention suivante a été établie: toutes les actions concernant un certain type d'entités (par exemple les codes) sont définies dans un fichier nommé en fonction du type d'entités (ie [src/js/actions/codes.js](https://github.com/InseeFr/Pogues/blob/master/src/js/actions/code.js)). Ainsi, les actions comme `CREATE_CODE`, `REMOVE_CODE` et `MOVE_UP_CODE` sont définies dans ce fichier, et seront valorisées à la fois par le reducer `code-list-by-id` et le reducer `codes-by-id`.

Les constantes du type chaines de caractères utilisées pour identifier les actions sont définies au sein du même fichier.

## Constants

Mises à part celles qui viennent d'être mentionnées pour les actions, toutes les constantes sont déclarées dans l'un des 3 fichiers suivants, au sein du dossier [constants](https://github.com/InseeFr/Pogues/tree/master/src/js/constants) : 
- [pogues-constants.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/pogues-constants.js) pour les constantes liées à des détails d'implémentation;
- [dictionnary.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/dictionary.js) pour l'[internationalisation](/application/internationalization.md);
- [schema.js](
https://github.com/InseeFr/Pogues/blob/master/src/js/constants/schema.js) pour les constantes issues du [schéma XML](/remote-apis/schema.md), comme par exemple les constantes utilisées pour distinguer les [types de questions](https://github.com/InseeFr/Pogues-Model/blob/53c6151a237ed74d4e655b137a8e55735f141d96/src/main/resources/xsd/Questionnaire.xsd#L321-L328).

## Utils

Sont défnis dans ce dossier des utilitaires. Par exemple:
- [tree-utils](https://github.com/InseeFr/Pogues/tree/master/src/js/utils/tree-utils): pour manipuler la [structure arborescente du questionnaire](/implementation-details//questionnaire-structure.md);
- [model-to-state-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/model-to-state-questionnaire.js) et les autres fichiers suivant la même convention de nommage: ces utilitaires sont appelés au chargement d'un questionnaire; ils prennent en entrée du `JSON` et renvoient un "patch" qui sera appliqué aux reducers afin d'intégrer la questionnaire à l'état de l'application;
- [state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/state-to-model-questionnaire.js) produit une représentation en `JSON` du questionnaire à partir de l'état de l'application (voir [persistence](/remote-apis/persistence.md) et [visualization](/remote-apis/visualization.md));
- [remote-api.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/remote-api.js) pour [les appels distants](/remote-apis/implementation.md);
- les fichiers nommés sous la forme [goTosChecker.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/goTosChecker.js) : ces fonctions réalisent des [contrôles d'intégrité]((/implementation-details/integrity-checks.md) sur le questionnaire.