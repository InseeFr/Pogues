# Internationalisation

L'application est disponible en français et en englais. La détection de la langue est effectuée [automatiquement](https://github.com/InseeFr/Pogues/blob/38cb8ea2221cc6d1a6561112d9cf32288993f7d5/src/js/reducers/dictionary.js#L9-L10) à partir de la langue du navigateur (elle ne peut pas être effectuée manuellement pour l'instant).

## Dictionnaire

La plupart des chaînes de caractères présentes dans l'application sont issues du fichier
[src/js/constants/dictionary.js](https://github.com/InseeFr/Pogues/blob/master/src/js/constants/dictionary.js). Il fournit la version française et anglaise pour chacune des constantes. Un extrait:
```javascript
{
  ...
  addDeclaration: {'en': 'Add a statement', 'fr': 'Ajouter une déclaration'},
  addControl: {'en': 'Add a control', 'fr': 'Ajouter un contrôle'},
  declarations: {'en': 'Statements', 'fr': 'Déclarations'}
  ...
}
```

Il reste quelques chaînes de caractères présentes en dur dans le code, elles devront être remplacées par l'utilisation de constantes.

## Implémentation

On utilise ce dictionnaire pour construire un objet auquel on fera référence sous le nom `locale`. Les propriétés de cet objet sont les constantes du dictionnaires, les valeurs sont la version pour la langue sélectionnée. Cet objet `locale` est [stocké](https://github.com/InseeFr/Pogues/blob/38cb8ea2221cc6d1a6561112d9cf32288993f7d5/src/js/reducers/dictionary.js) dans l'état de l'application, et il est passé au composant principal de l'application ([PoguesApp](https://github.com/InseeFr/Pogues/blob/master/src/js/components/pogues-app.js)). Il est ensuite passé de composant parent à enfant.

Cette approche présente l'avantage de ne pas avoir à importer dans chaque fichier le dictionnaire, mais elle alourdit le code (on peut facilement oublier de passer cet objet d'un composant parent à un composant enfant). Une approche préférable pourrait être l'utilisation du [context React](https://facebook.github.io/react/docs/context.html).