# Build process

Cette opération consiste à transformer et associer toutes les ressources nécessaires à l'application pour les rendre utilisables par les navigateurs Web. Ce processus est géré par  [webpack](https://webpack.github.io/), et peut être lancé avec la commande `npm run dev` pendant le développement, et la commande `npm run build` en production.

Pour l'essentiel, ce processus rassemble l'ensemble des fichiers `JavaScript` au sein d'un fichier unique. Grâce au plugin `babel` pour `webpack`, il est possible d'utliiser dans le code une [syntaxe](/javascript/syntax.md#ES2015) `JavaScript` qui n'est pas encore supportée à grande échelle par les navigateurs: `babel` transforme le code afin qu'il fonctionne avec la plupart des navigateurs actuels.

Webpack traite également les ressources `css`, afin de rendre leur chargement plus rapide et de les faire fonctionner de manière cohérente avec les différents navigateurs (voir [comment importer du css à partir de JavaScript](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/main.js#L6) avec `webpack`).

`webpack` est configurée dans le fichier [webpack.config.js](https://github.com/InseeFr/Pogues/blob/master/webpack.config.js). On peut se référer à ce fichier pour identifier toutes les opérations prises en charge par cette configuration.
`webpack` transformera le `JavaScript`, mais de rendre le processus de débuggage plus simple, il fournira en parallèle les `source maps` qui permettent aux navigateurs d'afficher le code d'origin dans les outils de développement.

Pendant la phase de développement, `npm run dev` fonctionnera en tâche de fond:
- avec un serveur Web sur le port `8080` qui fournira l'ensemble des ressources de l'application;
- recompilera l'application à chaque fois qu'une ressource est modifiée;
- rechargera automatiquement la page dans le navigateur Web pour prendre en compte ces modifications.

Le script `npm run dev` est configuré pour fonctionner avec une version "en mémoire" du fichier `JavaScript` (`--content-base` command line option for `webpack-dev-server`), le fichier qui est envoyé au navigateur n'est donc pas nécessairement visible dans le dossier `dist`.

[Gulp](http://gulpjs.com/) est utilisée en plus de `webpack` pour produire la version de production de l'application. `Gulp` est utilisé pour automatiser la recopie de certains fichiers du dossier `src` vers le dossier `dist` (pour l'instant, cette tâche doit être lancée avec la commande `npm run build` chaque fois que le fichier `index.html` est modifié, puisque [ce fichier n'est pas surveillé](https://github.com/InseeFr/Pogues/issues/144) par la commande `npm run dev`).

La [configuration de webpack pour la version de production](https://github.com/InseeFr/Pogues/blob/master/webpack.production.config.js) est légèrement différente de celle utilsiée en développenet: elle ne comprend pas en production le serveur Web de développement, et elle doit également comporter[quelques ajustements](https://github.com/InseeFr/Pogues/issues/145) afin de rendre le code utilisable en production. Lorsque la version de production est compilée, `webpack` va réduire automatiquement la taille du code grâce à l'option `-p` de la ligne de commande.