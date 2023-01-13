# Démarrage

Pogues est une application Web monopage construite avec [React](https://facebook.github.io/react/) et [Redux](https://github.com/reactjs/reduxreact). Pour lancer l'application en développement, vous pouvez exécuter les commandes suivantes à partir d'un terminal dans le dossier Pogues, et visualiser ensuite la page [http://localhost:3000](http://localhost:3000):

```
# Téléchargement des dépendances
yarn
# Compilation du code et démarrage d'un serveur de développement avec un mock de l'API (cf. infra)
yarn dev:server
```

Vous serez uniquement en mesure de créer et d'éditer un questionnaire localement. Vous ne pourez pas le sauvegarder, le visualiser ou utiliser des ressources externes (comme des listes de codes): Pogues est une application front-end pour convevoir des questionnaires et s'appuie sur des Web services externes pour réaliser ces opérations. Plus d'information à ce sujet au chapitre [appels distants](./remote-apis/README.md).

## Build

Pour produire la version de production, lancez la commande `yarn build`. Vous pouvez désormais servir le contenu du dossier `dist` avec le serveur web de votre choix.

Remarquez que vous aurez vraisemblablement besoin dans un premier temps de mettre à jour le [fichier de configuration](https://github.com/InseeFr/Pogues/blob/main/public/configuration.json) pour pointer vers la bonne URL de l'API qui sera utilisée par Pogues.

## Débuter avec JavaScript et Node.js

Si vous débutez avec ces technologies, vous aurez vraisemblablement besoin d'installer dans un premier temps sur votre ordinateur [node](https://nodejs.org/en/download/).

Dans le projet Pogues nous utilisons `yarn` comme gestionnaire de modules. Pour l'installer il faut utiliser `npm` qui est le gestionnaire de modules installé par défaut avec `Node.js` .

```
npm install --global yarn
```

La commande `yarn` téléchargera toutes les dépendances du projet, décrites dans la section `dependencies` et `devDepedencies` du fichier [package.json](https://github.com/InseeFr/Pogues/blob/master/package.json).

`yarn dev:server` lancera la commande `dev:server` décrite dans la section `scripts` du même fichier [package.json](https://github.com/InseeFr/Pogues/blob/master/package.json). Cette commande démarre un serveur de développement qui sert la page d'accueil de l'application en mode sans authentification avec les deux questionnaires présents sur le serveur mocké.

`yarn build` lance la compilation du code avec des optimisations pour la mise en production. Elle produit un code compilé dans le dossier `dist`.
