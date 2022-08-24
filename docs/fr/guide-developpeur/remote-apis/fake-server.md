# Serveur mocké

Un [serveur mocké](https://github.com/InseeFr/Pogues/tree/main/fake-server) est fourni et repose sur [restify](http://restify.com/docs/home/)

Ce serveur peut être lancé avec la commande `yarn dev:server`. Il permet de travailler sur le front sans avoir un back qui tourne par ailleurs.

Le serveur contient des fichiers de données et un fichier server.js.

## Fichier de données

Un exemple de fichier de données :

```javascript
module.exports = [
  {
    id: 'DR59-SNDI',
    label: 'DR59-SNDI',
  },
  {
    id: 'DG75-L201',
    label: 'DG75-L201',
  },
];
```

Ces fichiers de données sont utilisés pour construire les endpoints dans le fichier [server.js](https://github.com/InseeFr/Pogues/blob/main/fake-server/server.js)

## Fichier server.js

Dans le fichier server.js, on crée un nouveau server à l'aide de la commande :

```javascript
const server = restify.createServer();
```

On configure ensuite ce server et on peut créer des endpoints de la manière suivante :

```javascript
server.get('/persistence/questionnaire/:id', function (req, res, next) {
  var position = getQuestionnairePosition(questionnaires, req.params.id);
  var questionnaire = position !== -1 ? questionnaires[position] : {};
  res.send(questionnaire);
  next();
});
```

Exemple de création d'une méthode `GET` renvoyant un questionnaire à l'aide d'un id.

Ce serveur est à mettre à jour lors de la modification des endpoints côté Back-Office pour assurer son bon fonctionnement et sa compatibilité avec la dernière version du Front.
