# Sauvegarder et récupérer des questionnaires

Ce service est utilisé pour sauvegarder et récupérer les questionnaires.

## Configuration

Ce service partage l'URL `baseURL` avec le service de visualisation et utilise le chemin `basePath` défini dans le même [fichier de configuration]([src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js). À l'avenir, la configuration de ces deux services devra être séparée.

## Représentation en JSON

Pour l'instant, la représentation du questionnaire pour ce service Web est légèrement différente de la description formelle fournie par le [modèle de données Pogues](./schema.md). Ces deux représentations devront fusionner dans le futur (pour ne conserver que la représentation qui satisfait le modèle de données).

Cette représentation (avec des blancs soulignées au début de chaque entrée) était à une époque requise pour le service de persistence. Les conventions de nommages sont plus proches de celles utilisées dans le code de Pogues (par exemple, on utilise des pluriels pour nommer des tableaux). Pour en savoir plus sur les différences entre ces deux représentations, vous pouvez comparer le `JSON` ci-dessous avec celui fourni dans la section [questionnaire en JSON](/remote-apis/questionnaire-json.md).

Le code utilisé par Pogues pour passer de cette représentation à la représentation formelle (utilisée pour la visualisation) se trouve dans le fichier  [src/js/utils/data-JSON-utils.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/data-JSON-utils.js).


```json
{
  "id": "iytt95l9",
  "name": "FIRSTQUESTIONNAIRE",
  "label": [""],
  "declarations": [],
  "goTos": [],
  "controls": [],
  "genericName": "QUESTIONNAIRE",
  "collectMode": "TELEPHONE",
  "lastUpdatedDate": "01/01/2016",
  "children": [
    {
      "id": "iytt3i83",
      "name": "SEQ1",
      "label": [
        "About you"
      ],
      "declarations": [],
      "goTos": [],
      "controls": [],
      "genericName": "MODULE",
      "children": [
        {
          "id": "iytssbr3",
          "name": "QUESTION11",
          "label": ["##{\"label\":\"How old are you ?\",\"conditions\":[]}\nHow old are you ?"],
          "declarations": [],
          "goTos": [],
          "controls": [],
          "questionType": "SIMPLE",
          "calculatedVariables": [
            {
              "label": "label",
              "name": "name",
              "formula": "formula"
            }
          ],
          "collectedVariables": [
            {
              "label": "label",
              "name": "name"
            }
          ],
          "responses": [
            {
              "mandatory": false,
              "datatype": {
                "typeName": "TEXT",
                "maxLength": 1,
                "pattern": "",
                "type": "TextDatatypeType"
              }
            }
          ],
          "type": "QuestionType"
        },
        {
          "id": "iytt2wlp",
          "name": "QUESTION12",
          "label": ["##{\"label\":\"Are you happy ?\",\"conditions\":[]}\nAre you happy ?"],
          "declarations": [],
          "goTos": [],
          "controls": [],
          "questionType": "SINGLE_CHOICE",
          "responses": [
            {
              "codeListReference": "iyttj4zk",
              "mandatory": false,
              "datatype": {
                "typeName": "TEXT",
                "maxLength": 1,
                "pattern": "",
                "type": "TextDatatypeType",
                "visHint": "CHECKBOX"
              },
              "nonResponseModality":{
                "value":"blabla2",
                "label":"blabla",
                "firstIntentionDisplay":false,
                "invite":"blabla3"
              }
            }
          ],
          "type": "QuestionType"
        }
      ],
      "depth": 1,
      "type": "SequenceType"
    },
    {
      "id": "iyttf4qh",
      "name": "SEQ2",
      "label": ["About your job"],
      "declarations": [],
      "goTos": [],
      "controls": [],
      "genericName": "MODULE",
      "children": [
        {
          "id": "iytth8g0",
          "name": "QUESTION21",
          "label": [
            "##{\"label\":\"Do you have a job ?\",\"conditions\":[]}\nDo you have a job ?"
          ],
          "declarations": [],
          "goTos": [],
          "controls": [],
          "questionType": "SIMPLE",
          "responses": [
            {
              "mandatory": false,
              "datatype": {
                "typeName": "BOOLEAN",
                "type": "BooleanDatatypeType"
              }
            }
          ],
          "type": "QuestionType"
        }
      ],
      "depth": 1,
      "type": "SequenceType"
    }
  ],
  "depth": 0,
  "type": "SequenceType",
  "agency": "fr.insee",
  "survey": {
    "agency": "fr.insee",
    "name": "POPO",
    "id": "iytszu62"
  },
  "componentGroups": [
    {
      "name": "PAGE_1",
      "label": "Components for page 1",
      "Member": [
        "iytt3i83",
        "iytssbr3",
        "iytt2wlp",
        "iyttf4qh",
        "iytth8g0"
      ],
      "id": "iytt88sv"
    }
  ],
  "codeLists": {
    "codeList": [
      {
        "id": "iyttj4zk",
        "name": "",
        "label": "mood",
        "codes": [
          {
            "label": "unhappy",
            "value": ""
          },
          {
            "label": "happy",
            "value": ""
          },
          {
            "label": "very happy",
            "value": ""
          }
        ]
      }
    ],
    "codeListSpecification": []
  }
}
```