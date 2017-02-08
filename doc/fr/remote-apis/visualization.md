# Visualiser des questionnaires

Ce service prend en entrée la description d'un questionnaire et retourne une URL qui permet de visualiser le questionnaire.

## Configuration

L'URL et le chemin pour ce service sont configurés dans le fichier [src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js), grâce aux entrées `baseURL` et `stromaePath`. 

## Représentation en JSON

Les questionnaires sont représentés en `JSON` conformément au [modèle de données Pogues](/remote-apis/schema.md). Pour en savoir plus à propos de la [représentation en JSON des questionnaires](/remote-apis/questionnaire-json.md).