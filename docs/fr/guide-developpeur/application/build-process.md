# Compilation

Cette opération consiste à transformer et associer toutes les ressources nécessaires à l'application pour les rendre utilisables par les navigateurs Web. Ce processus peut être lancé avec la commande `yarn start` (ou `yarn dev:server` dans le cas où on a besoin du serveur mocké) pendant le développement, et la commande `yarn build` en production (pour la constitution de livrable pour les plate-formes Insee utiliser `yarn build-insee`).

[include:103-119](../../../../package.json)

Pour l'essentiel, ce processus rassemble l'ensemble des fichiers `JavaScript` au sein d'un fichier unique. Grâce au plugin Babel pour Webpack, il est possible d'utliser dans le code une [syntaxe](/javascript/syntax.md#ES2015) `JavaScript` qui n'est pas encore supportée à grande échelle par les navigateurs: `babel` transforme le code afin qu'il fonctionne avec la plupart des navigateurs actuels.

Webpack traite également les ressources `css`, afin de rendre leur chargement plus rapide et de les faire fonctionner de manière cohérente avec les différents navigateurs.

[include:7-7](../../../../src/layout/app/components/app.jsx)

Webpack transformera le `JavaScript`, mais afin de rendre le processus de débuggage plus simple, il fournira en parallèle les `source maps` qui permettent aux navigateurs d'afficher le code d'origine dans les outils de développement.

Pendant la phase de développement, `yarn start` fonctionne en tâche de fond:

- avec un serveur Web sur le port `3000` qui fournira l'ensemble des ressources de l'application;
- recompile l'application à chaque fois qu'une ressource est modifiée;
- recharge automatiquement la page dans le navigateur Web pour prendre en compte ces modifications.

La configuration webpack est gérée par la coquille [Create React App](https://create-react-app.dev/).

## Les scripts disponibles

Le projet fournit les scripts suivants afin de gérer au mieux le cycle du vie.

- **test** : Exécute les tests unitaires
- **testw** : Exécute les tests unitaires en mode watch
- **start** : Lance l'application localement qui pointe vers l'API mockée
- **start-insee** : Lance l'application localement en utilisant l'API définit dans [configuration.json](https://github.com/InseeFr/Pogues/blob/main/public/configuration.json)
- **dev:server** : Lance les scripts `npm run start` et `npm run server`
- **server** : Lance le fake serveur NodeJS
- **build** : Génére le livrable de l'application, il est utilisé notamment pour la génération de l'image docker
- **build-insee** : Génère le librable compatible avec la configuration des environnements Insee (prod et hors-prod)
- **lint** : Vérifie la qualité du projet
- **lint:fix** : Vérifie la qualité du projet et applique des correctifs automatiquement
- **generate-entrypoint** :
- **pre-commit** :
- **postinstall** :
