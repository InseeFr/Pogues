# Mocked server

A [mocked server](https://github.com/InseeFr/Pogues/tree/main/fake-server) is provided and is based on [restify](http://restify.com/docs/home/)

This server can be started with the command `yarn dev:server`. It allows you to work on the front end without having a back end running.

The server contains data files and a server.js file.

## Data file

An example of a data file:

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

These data files are used to build the endpoints in the [server.js] file (https://github.com/InseeFr/Pogues/blob/main/fake-server/server.js)

## File server.js

In the server.js file, we create a new server with the command :

```javascript
const server = restify.createServer();
```

Then we configure this server and we can create endpoints in the following way:

```javascript
server.get('/persistence/questionnaire/:id', function (req, res, next) {
  var position = getQuestionnairePosition(questionnaires, req.params.id);
  var questionnaire = position !== -1 ? questionnaires[position] : {};
  res.send(questionnaire);
  next();
});
```

Example of the creation of a `GET` method returning a questionnaire using an id.

This server must be updated when the endpoints on the Back-Office side are modified to ensure that it works properly and is compatible with the latest version of the Front.
