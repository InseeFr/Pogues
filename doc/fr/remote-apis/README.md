# APIs distantes

Pogues est un client Web pour concevoir des questionnaires et les représenter suivant le [modèle de données Pogues](./schema.md). Il s'appuie sur des Web services externes pour:
- [visualiser](./visualization.md) les questionnaires;
- [sauvegarder et récupérer](./persistence.md) les questionnaires;
- utiliser des objets issus d'un [référentiel externe](./repository.md).

Pour l'instant, Pogues dépend de l'implémentation de ces services utilisée en interne dans l'organisation où il a été développé (INSEE). Dans un avenir proche, une approche modulaire et documentée sera mise en place pour faciliter son intégration au sein d'autres organisations.

Vous pouvez vous référer à la [documentation swagger](./swagger.md) pour savoir ce que ces services fournissent (la partie "référentiel externe" n'est pas documentée).

Un [serveur minimaliste](https://github.com/InseeFr/Pogues/tree/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/utils/backend) est fourni à titre d'exemple: il illsutre le comportement attendu de ces services. Ce serveur peut être lancé avec la commande `npm run start:backend`.

