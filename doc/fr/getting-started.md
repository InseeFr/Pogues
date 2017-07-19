# Démarrage

Pogues est une application Web monopage construite avec [React](https://facebook.github.io/react/) et [Redux](https://github.com/reactjs/reduxreact). Pour lancer l'application en développement, vous pouvez exécuter les commandes suivantes à partir d'un terminal dans le dossier Pogues, et visualiser ensuite la page [http://localhost:8080](http://localhost:8080):

```
# Téléchargement des dépendances
npm install
# Nécessaire pour copier certaines ressources dans le dossier `dist` (cette
# étape devrait disparaître à terme, cf. #144)
npm run build
# Compilation du code et démarrage d'un serveur de développement (cf. infra)
npm run dev 
```

Vous serez uniquement en mesure de créer et d'éditer un questionnaire localement. Vous ne pourez pas le sauvegarder, le visualiser ou utiliser des ressources externes (comme des listes de codes): Pogues est une application front-end pour concervoir des questionnaires et s'appuie sur des Web services externes pour réaliser ces opérations. Plus d'information à ce sujet au chapitre [appels distants](./remote-apis/README.md). 

## Build

Pour produire la version de production, lancez la commande `npm run build`. Vous pouvez désormais servir le contenu du dossier `dist` avec le serveur web de votre choix.

Remarquez que vous aurez vraisemblablement besoin dans un premier temps de mettre à jour le [fichier de configuration](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js) pour pointer vers les bonnes URLs et les bons chemins pour les services Web qui seront utilisés par Pogues.

## Débuter avec JavaScript et Node.js

Si vous débutez avec ces technologies, vous aurez vraisemblablement besoin d'installer dans un premier temps sur votre ordinateur [node et npm](https://nodejs.org/en/download/). Vous devez télécharger NodeJS < 8


`npm` est un gestionnaire de modules pour `Node.js`. `npm install` téléchargera toutes les dépendances du projet, décrites dans la section `dependencies` et `devDepedencies` du fichier [package.json](https://github.com/InseeFr/Pogues/blob/master/package.json).

`npm run dev` lancera la commande `dev` décrite dans la section `scripts` du même fichier `package.json`. Cette commande démarre un serveur de développement qui sert la page d'accueil de l'application ([src/js/index.html](https://github.com/InseeFr/Pogues/blob/master/src/index.html)) et toutes les ressources nécessaires. En savoir plus: [utilisation de Webpack](./application/build-process.md).

`npm run build` lance la compilation du code avec des optimisations pour la mise en production. Elle copie toutes les ressources statiques et le fichier `JavaScript` compilé dans le dossier `dist`.