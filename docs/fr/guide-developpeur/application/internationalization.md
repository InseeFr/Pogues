# Internationalisation

L'application est disponible en français et en anglais. La détection de la langue est effectuée [automatiquement](https://github.com/InseeFr/Pogues/blob/main/src/utils/dictionary/dictionary.js) à partir de la langue du navigateur (elle ne peut pas être effectuée manuellement pour l'instant).

## Dictionnaire

La plupart des chaînes de caractères présentes dans l'application sont issues du fichier
[src/constants/dictionary.js](https://github.com/InseeFr/Pogues/blob/main/src/constants/dictionary.js). Il fournit la version française et anglaise pour chacune des constantes. Un extrait:

```javascript
{
  ...
  addDeclaration: {'en': 'Add a statement', 'fr': 'Ajouter une déclaration'},
  addControl: {'en': 'Add a control', 'fr': 'Ajouter un contrôle'},
  declarations: {'en': 'Statements', 'fr': 'Déclarations'}
  ...
}
```

## Implémentation

Quand nous importons le module `utils/dictionary/dictionary` dans notre application, un objet sera retourné, dépendant de la langue de l'utilisateur. A partir de cet objet, nous utiliserons la syntaxe JavaScript pour manipuler les propriétés d'un objet, afin d'accéder à l'un des messages de notre dictionnaire.

```javascript
import Dictionary from 'utils/dictionary/dictionary';

console.log(Dictionary.addControl);
```

Si la langue du navigateur est le français la valeur retournée dans la console sera :

```
Ajouter un contrôle
```
