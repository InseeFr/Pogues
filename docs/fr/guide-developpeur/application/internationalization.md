# Internationalisation

L'application est disponible en français et en englais. La détection de la langue est effectuée [automatiquement](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/reducers/dictionary.js) à partir de la langue du navigateur (elle ne peut pas être effectuée manuellement pour l'instant).

## Dictionnaire

La plupart des chaînes de caractères présentes dans l'application sont issues du fichier
[src/js/constants/dictionary.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/constants/dictionary.js). Il fournit la version française et anglaise pour chacune des constantes. Un extrait:
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

Quand nous importons le module `reducers/dictionnary` dans notre application, un objet sera retourné, dépendant de la langue de l'utilisateur. A partir de cet objet, nous utiliserons la syntaxe JavaScript pour manipuler les propriétés d'un objet, afin d'accéder à l'un des messages de notre dictionnaire. 

```
import Dictionary from 'reducers/dictionary'

console.log(Dictionary.phLabel)
```