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
  "_id": "iytt95l9",
  "_name": "FIRSTQUESTIONNAIRE",
  "_label": [""],
  "_declarations": [],
  "_goTos": [],
  "_controls": [],
  "_genericName": "QUESTIONNAIRE",
  "_children": [
    {
      "_id": "iytt3i83",
      "_name": "SEQ1",
      "_label": [
        "About you"
      ],
      "_declarations": [],
      "_goTos": [],
      "_controls": [],
      "_genericName": "MODULE",
      "_children": [
        {
          "_id": "iytssbr3",
          "_name": "QUESTION11",
          "_label": ["##{\"label\":\"How old are you ?\",\"conditions\":[]}\nHow old are you ?"],
          "_declarations": [],
          "_goTos": [],
          "_controls": [],
          "_questionType": "SIMPLE",
          "_responses": [
            {
              "_mandatory": false,
              "_datatype": {
                "_typeName": "TEXT",
                "_maxLength": 1,
                "_pattern": "",
                "_type": "TextDatatypeType"
              }
            }
          ],
          "_type": "QuestionType"
        },
        {
          "_id": "iytt2wlp",
          "_name": "QUESTION12",
          "_label": ["##{\"label\":\"Are you happy ?\",\"conditions\":[]}\nAre you happy ?"],
          "_declarations": [],
          "_goTos": [],
          "_controls": [],
          "_questionType": "SINGLE_CHOICE",
          "_responses": [
            {
              "_codeListReference": "iyttj4zk",
              "_mandatory": false,
              "_datatype": {
                "_typeName": "TEXT",
                "_maxLength": 1,
                "_pattern": "",
                "_type": "TextDatatypeType",
                "_visHint": "CHECKBOX"
              }
            }
          ],
          "_type": "QuestionType"
        }
      ],
      "_depth": 1,
      "_type": "SequenceType"
    },
    {
      "_id": "iyttf4qh",
      "_name": "SEQ2",
      "_label": ["About your job"],
      "_declarations": [],
      "_goTos": [],
      "_controls": [],
      "_genericName": "MODULE",
      "_children": [
        {
          "_id": "iytth8g0",
          "_name": "QUESTION21",
          "_label": [
            "##{\"label\":\"Do you have a job ?\",\"conditions\":[]}\nDo you have a job ?"
          ],
          "_declarations": [],
          "_goTos": [],
          "_controls": [],
          "_questionType": "SIMPLE",
          "_responses": [
            {
              "_mandatory": false,
              "_datatype": {
                "_typeName": "BOOLEAN",
                "_type": "BooleanDatatypeType"
              }
            }
          ],
          "_type": "QuestionType"
        }
      ],
      "_depth": 1,
      "_type": "SequenceType"
    }
  ],
  "_depth": 0,
  "_type": "SequenceType",
  "_agency": "fr.insee",
  "_survey": {
    "_agency": "fr.insee",
    "_name": "POPO",
    "_id": "iytszu62"
  },
  "_componentGroups": [
    {
      "_name": "PAGE_1",
      "_label": "Components for page 1",
      "_Member": [
        "iytt3i83",
        "iytssbr3",
        "iytt2wlp",
        "iyttf4qh",
        "iytth8g0"
      ],
      "_id": "iytt88sv"
    }
  ],
  "_codeLists": {
    "_codeList": [
      {
        "_id": "iyttj4zk",
        "_name": "",
        "_label": "mood",
        "_codes": [
          {
            "_label": "unhappy",
            "_value": ""
          },
          {
            "_label": "happy",
            "_value": ""
          },
          {
            "_label": "very happy",
            "_value": ""
          }
        ]
      }
    ],
    "_codeListSpecification": []
  }
}
```