# Webservices de persistance des données

Ces services sont utilisés pour sauvegarder et récupérer les données liés aux questionnaires.

### Sauvegarde et récupération de questionnaires

Les questionnaires sont stockés au format JSON Pogues dans une base de données PostgreSql. Pour la création d'un questionnaire on soumet une requête `POST` sur le endpoint `/api/persistence/questionnaires`, le body contient le questionnaire au format JSON. Si l'identifiant du questionnaire n'existe pas en base de données, le questionnaire est créé.

On peut ensuite récupérer, modifier ou supprimer les questionnaires via leur identifiant en effectuant respectivement un `GET`, `UPDATE` ou `DELETE` à l'url `/api/persistence/questionnaire/{id}`.

### Récupération des métadonnées des questionnaires

Pour l'affichage de la page d'accueil l'application se repose sur des web services permettant de récupérer :

- les timbres présents en base de données sur `/api/persistence/questionnaires/stamps`
- la liste des questionnaires d'un timbre en particulier sur `/api/persistence/questionnaires/search/meta`

### Récupération des variables d'un questionnaire

Dans Pogues il est possible de faire référence à un autre questionnaire pour l'intégrer au questionnaire courant. Le questionnaire courant ne contient alors pas les données des questionnaires référencés. Cependant on veut pouvoir utiliser les variables créées dans les questionnaires référencés pour écrire les questions du questionnaire courant. Pour cela on se repose sur le endpoint `/api/persistence/questionnaire/{id}/variables`, qui permet de récupérer les variables collectées, calculées et externes d'un questionnaire à partir de son id.
