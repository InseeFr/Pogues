# Visualiser des questionnaires

Ces services prennent toujours en entrée la description d'un questionnaire au format JSON Pogues.

## Représentation en JSON

Les questionnaires sont représentés en `JSON` conformément au [modèle de données Pogues](/remote-apis/schema.md). Pour en savoir plus à propos de la [représentation en JSON des questionnaires](/remote-apis/questionnaire-json.md).

## Les différents services de visualisation

L'application Pogues prend en charge 6 formats de visualisation. Parmi ceux-ci 3 renvoient vers des urls pour viualiser sur d'autres outils et 3 renvoient le questionnaire dans d'autres formats.

### Visualisation dans d'autres formats

Dans ce cas les webservices renvoient un fichier.

L'application supporte la visualisation dans les formats suivants :

- spécifications en .odt (`/api/transform/visualize-spec`)
- ddi (`/api/transform/visualize-ddi`)
- papier en pdf (`/api/transform/visualize-pdf`)

### Visualisation aux formats web et poste de collecte

Dans ce cas on s'appuie sur d'autres plateformes et les endpoints renvoient l'url à consulter pour visualiser le questionnaire. Pogues a besoin d'une plate-forme pour chaque type de visualisation :

- web V1 (application stromae V1)
- web V2 (application stromae V2)
- poste enquêteur (application queen)

Le JSON Pogues est converti dans le format JSON Lunatic puis stocké en base données dans la table visu-lunatic. Les endpoints de visualisation renvoient une url qui contient :

- l'url de la plate-forme
- en paramètres le endpoint permettant de récupérer le JSON Lunatic du questionnaire (`/api/persistence/questionnaire/json-lunatic/{id}`)

L'application ouvre cette url dans un nouvel onglet.
