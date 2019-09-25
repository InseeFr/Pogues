# Build process

Cette opération consiste à transformer et associer toutes les ressources nécessaires à l'application pour les rendre utilisables par les navigateurs Web. Ce processus est géré par [Webpack](https://webpack.github.io/), et peut être lancé avec la commande `npm run dev` pendant le développement, et la commande `npm run build` en production.

[include:110-128](../../../../package.json)

Pour l'essentiel, ce processus rassemble l'ensemble des fichiers `JavaScript` au sein d'un fichier unique. Grâce au plugin Babel pour Webpack, il est possible d'utliser dans le code une [syntaxe](/javascript/syntax.md#ES2015) `JavaScript` qui n'est pas encore supportée à grande échelle par les navigateurs: `babel` transforme le code afin qu'il fonctionne avec la plupart des navigateurs actuels.

Webpack traite également les ressources `css`, afin de rendre leur chargement plus rapide et de les faire fonctionner de manière cohérente avec les différents navigateurs.

[include:7-7](../../../../src/layout/app/components/app.jsx)

Webpack est configuré dans le fichier [webpack.config.js](https://github.com/InseeFr/Pogues/blob/master/webpack.config.js). On peut se référer à ce fichier pour identifier toutes les opérations prises en charge par cette configuration.
Webpack transformera le `JavaScript`, mais afin de rendre le processus de débuggage plus simple, il fournira en parallèle les `source maps` qui permettent aux navigateurs d'afficher le code d'origine dans les outils de développement.

Pendant la phase de développement, `npm run dev` fonctionne en tâche de fond:

- avec un serveur Web sur le port `3000` qui fournira l'ensemble des ressources de l'application;
- recompile l'application à chaque fois qu'une ressource est modifiée;
- recharge automatiquement la page dans le navigateur Web pour prendre en compte ces modifications.

Le script `npm run dev` est configuré pour fonctionner avec une version "en mémoire" du fichier `JavaScript` (l'option `--content-base` en ligne de commande pour `webpack-dev-server`), le fichier qui est envoyé au navigateur n'est donc pas nécessairement visible dans le dossier `dist`.

La configuration de webpack pour la version de production est légèrement différente de celle utilisée en développement: elle ne comprend pas en production le serveur Web de développement, et elle doit également comporter [quelques ajustements](https://github.com/InseeFr/Pogues/issues/145) afin de rendre le code utilisable en production. Lorsque la version de production est compilée, Webpack va réduire automatiquement la taille du code grâce à l'option `-p` de la ligne de commande.

Vous trouverez les statistiques de WebPack sur la page [stats](../../stats.html) (Attention: vous devez l'ouvrir dans un autre onglet, afin que la redirection soit fonctionnelle)

## Autres Scripts NPM

Le projet fournit également d'autres scripts NPM afin de gérer au mieux le cycle du vie.

- test : Exécute les tests unitaires
- test:watch : Exécute les tests unitaires en mode watch
- dev : Lance l'application utilisant l'API de qualif
- dev:local : Lance l'application utilisant l'API locale
- dev:server : Lance les scripts `npm run dev:local` et `npm run server`
- server : Lance le fake serveur NodeJS
- build : Génére le livrable de l'application avec la configuration de prod
- build:dev : Génère le librable avec la configuration de l'environnement de dev
- build:dv : Génère le librable avec la configuration de l'environnement de dv
- build:preprod : Génère le librable avec la configuration de l'environnement de preprod
- build:qa : Génère le librable avec la configuration de l'environnement de qa
- build:qf : Génère le librable avec la configuration de l'environnement de qf
- lint : Vérifie la qualité du projet
- lint:fix : Vérifie la qualité du projet et applique des correctifs automatiquement
- start : Lance la commande `npm run dev`
- e2e : Exécute les tests d'intégrations
- e2e:travis : Exécute les tests d'intégrations avec la configuration de Travis

## Ajour d'un nouvel environnement

Si vous voulez ajouter un nouvel environnement (par exemple qlf2), il suffit de :

- Créer un fichier de configuration `config.qlf2.js` dans le répertoire `build-config/environments`.
- Récupérer la configuration d'un autre environnement, et faire les ajustements
- Ajouter un script NPM `build:qlf2`
