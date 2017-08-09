# Build process

Cette opération consiste à transformer et associer toutes les ressources nécessaires à l'application pour les rendre utilisables par les navigateurs Web. Ce processus est géré par [Webpack](https://webpack.github.io/), et peut être lancé avec la commande `npm run dev` pendant le développement, et la commande `npm run build` en production.

[include:95-113](../../../package.json)

Pour l'essentiel, ce processus rassemble l'ensemble des fichiers `JavaScript` au sein d'un fichier unique. Grâce au plugin Babel pour Webpack, il est possible d'utliser dans le code une [syntaxe](/javascript/syntax.md#ES2015) `JavaScript` qui n'est pas encore supportée à grande échelle par les navigateurs: `babel` transforme le code afin qu'il fonctionne avec la plupart des navigateurs actuels.

Webpack traite également les ressources `css`, afin de rendre leur chargement plus rapide et de les faire fonctionner de manière cohérente avec les différents navigateurs.

[include:11-11](../../../src/layout/app.jsx)

Webpack est configuré dans le fichier [webpack.config.js](https://github.com/InseeFr/Pogues/blob/master/webpack.config.js). On peut se référer à ce fichier pour identifier toutes les opérations prises en charge par cette configuration.
Webpack transformera le `JavaScript`, mais afin de rendre le processus de débuggage plus simple, il fournira en parallèle les `source maps` qui permettent aux navigateurs d'afficher le code d'origine dans les outils de développement.

Pendant la phase de développement, `npm run dev` fonctionne en tâche de fond:
- avec un serveur Web sur le port `3000` qui fournira l'ensemble des ressources de l'application;
- recompile l'application à chaque fois qu'une ressource est modifiée;
- recharge automatiquement la page dans le navigateur Web pour prendre en compte ces modifications.

Le script `npm run dev` est configuré pour fonctionner avec une version "en mémoire" du fichier `JavaScript` (l'option `--content-base` en ligne de commande pour `webpack-dev-server`), le fichier qui est envoyé au navigateur n'est donc pas nécessairement visible dans le dossier `dist`.

La [configuration de webpack pour la version de production](https://github.com/InseeFr/Pogues/blob/master/webpack.production.config.js) est légèrement différente de celle utilisée en développement: elle ne comprend pas en production le serveur Web de développement, et elle doit également comporter [quelques ajustements](https://github.com/InseeFr/Pogues/issues/145) afin de rendre le code utilisable en production. Lorsque la version de production est compilée, Webpack va réduire automatiquement la taille du code grâce à l'option `-p` de la ligne de commande.