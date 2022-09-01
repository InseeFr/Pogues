# Github workflows

Il y a trois pipelines existants sur le projet Pogues. Ils reposent sur les [Github Actions](https://github.com/features/actions).
Ils nous permettent d'automatiser :

- les tests
- la génération de la [documentation du projet](https://inseefr.github.io/Pogues/)
- la création de la release et de l'image Docker

## Tests

Ce pipeline est défini dans le fichier [test.yaml](https://github.com/InseeFr/Pogues/blob/main/.github/workflows/test.yaml). Il se déclenche à chaque fois que l'on pousse un commit sur le dépôt quelle que soit la branche. Il pourrait être intéressant dans une approche green IT de diminuer la fréquence de déclenchement de ce pipeline.

A chaque lancement de ce work flow, les tests sont exécutés, puis le projet est buildé et enfin un rapport Sonar est envoyé sur la page du projet sur [Sonarcloud](https://sonarcloud.io/project/overview?id=InseeFr_Pogues). Il est fréquent que l'étape `Sonarcloud` soit en erreur à cause de la condition de 80% de couverture de test sur les nouveaux développements.

## Génération de la documentation

Elle est définie dans [docs.yaml](https://github.com/InseeFr/Pogues/blob/main/.github/workflows/docs.yaml). Ce workflow se déclenche lorsqu'un nouveau commit, qui est poussé sur la main, contient des modifications dans le dossier `docs`.

La mise à jour de la documentation consiste donc à faire des modifications dans les fichiers markdown présents dans le dossier `docs` et ensuite à pousser ces modifications sur la `main`. La mise à jour de la documentation en ligne sera faite automatiquement.

## Création d'une nouvelle release

Ce workflow est défini dans [tag-release.yaml](https://github.com/InseeFr/Pogues/blob/main/.github/workflows/tag-release.yaml). Il se lance lorsque l'on pousse un nouveau tag sur le dépôt. Une fois qu'une version de l'application est prête à être déployée, on pousse sur la `main` un nouveau tag correspondant au numéro de version de l'application.

Le workflow va alors générer la release sur le dépôt et créer une image docker qui est déposée sur [Dockerhub](https://hub.docker.com/r/inseefr/pogues/tags).
