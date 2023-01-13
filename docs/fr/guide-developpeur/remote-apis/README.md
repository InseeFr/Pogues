# APIs distantes

Pogues est un client Web pour concevoir des questionnaires et les représenter suivant le [modèle de données Pogues](./schema.md). Il s'appuie sur des Web services externes pour:

- [visualiser](./visualization.md) les questionnaires;
- [sauvegarder et récupérer](./persistence.md) les questionnaires;

Le schéma suivant représente l'environnement applicatif autour de l'application Pogues :

![Architecture Pogues](../../../img/pogues-archi-github.jpg 'Architecture Pogues')

Pour l'instant, Pogues dépend de l'implémentation de ces services utilisée en interne dans l'organisation où il a été développé (INSEE). Dans un avenir proche, une approche modulaire et documentée sera mise en place pour faciliter son intégration au sein d'autres organisations.

La [configuration](./configuration.md) de l'API dans l'application dépend de l'environnement.

Vous pouvez vous référer à la [documentation swagger](./swagger.md) pour savoir ce que ces services fournissent (la partie "référentiel externe" n'est pas documentée).

Un [serveur mocké](./fake-server.md) est fourni à titre d'exemple: il illustre le comportement attendu de ces services.

## Services requis pour lancer l'application

Pour pouvoir a minima saisir un questionnaire dans Pogues(sans visualisation), il faut une instance du back de Pogues (projet Pogues-Back-Office) et de DDI-Access-Services. Le serveur mocké permet de travailler en simulant cet environnement minimal.
