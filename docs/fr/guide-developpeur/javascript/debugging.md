# Débugger

## Redux DevTools

Redux fournit des outils pour assister le développeur. Pogues est [configurée](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/store/configure-store.js#L17) pour fonctionner avec l'extension Redux DevTools. Cela signifie que si vous utilisez Chrome ou Firefox, vous pouvez installer cette [extension](https://github.com/zalmoxisus/redux-devtools-extension) pour visualiser l'état de l'application et les actions qui sont envoyées au store.

![Redux DevTools](../../../img/redux-devtools.gif "Redux DevTools")

## React DevTools

Avec [React DevTools](https://github.com/facebook/react-devtools), vous pouvez inspecter la page, découvrir l'arborescence des composants, trouver quel composant React correspond à tel ou tel élément visuel et voir quels paramètres ont été passés au composant.

![React DevTools](../../../img/react-devtools.png "React DevTools")

## Trucs et astuces

Si vous utilisez Chrome pour travailler sur l'application, les deux options suivantes peuvent être utiles.

Puisque le code est compilé, une ligne du fichier original peut parfois être transformée en plusieurs lignes dans le fichier final. Dans ces conditions, il peut être difficile de trouver exactement d'où vient le problème quand une erreur survient. Vous pouvez désactiver temporairement les `source maps` dans les options des outils de développement de Chrome et recharger la page pour voir exactement quelle ligne dans le code compilé a généré l'erreur.

Vous pouvez utiliser l'option "Pause on exceptions" pour interrompre l'exécution du code quand une erreur survient. L'option "Pause on caught exceptions" est également utile, par exemple pour interrompre le code lorsqu'une erreur survient dans un gestionnaire associé à une Promesse.

![Interrompre l'exécution en cas d'erreur](../../../img/pause-exceptions.png "Interrompre l'exécution en cas d'erreur")