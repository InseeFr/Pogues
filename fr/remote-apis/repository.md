# Récuperer des descriptions de listes de codes

Pour l'instant, ce service fourni uniquement quelques fonctionnalités minimalistes pour récupérer des descriptions de listes de codes.

## Configuration

Elle s'appuie sur la fonction `makeRepoURLSpecs` du fichier [src/js/utils/data-JSON-utils.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/data-JSON-utils.js) pour constuire l'URL à utiliser pour les requêtes.

## Représentation en JSON

Les résultats de la requête `GET repo/specs` pour récupérer des descriptions de listes de codes sont des résultats `sparql` bruts qui prennent la forme suivante:

```json
{
  "results": {
    "bindings": [
      {
        "niveau": {
          "value": "cl_malefemale"
        },
        "retrievalQuery": {
          "value": "getMaleFemale"
        },
        "label": {
          "value": "Woman or man"
        }
      },
      {
        "niveau": {
          "value": "cl_yesno"
        },
        "retrievalQuery": {
          "value": "getYesNo"
        },
        "label": {
          "value": "yes or no"
        }
      }
      ...
    ]
  }
}
```

Les résultats pour les requêtes du type `GET repo/clist/getMaleFemale` pour récupérer les codes d'une liste de codes prennent la forme suivante:

```json
{
  "id": "cl_gender",
  "name": "cl_gender",
  "label": "Gender",
  "codes": [
    {
      "value": 0,
      "label": "Male"
    },
    {
      "value": 1,
      "label": "Female"
    }
  ]
}
```