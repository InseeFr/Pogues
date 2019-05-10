# Store and retrieve questionnaires

This service service is used to store and retrieve questionnaires.

## Configuration

This service shares the same `baseURL` URL as the visualization service and relies on the `basePath` from the same [configuration file]([src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js). In the long run, the configuration of these two services should be decoupled.

## JSON representation

For now, representation of questionnaires for this web service is slightly different from the formal description provided by [pogues model](./schema.md). These two representations should be merged in the future (to keep only the one which complies with the formal description).

This representation (with underscores at the beginning of each key) was at some time a requirement for the persistence service. The naming conventions are closer from the one used in the implementation of Pogues (for instance, we use plural when we deal with an array of elements). To know more about the differences between these two representations, you can compare the following `JSON` to the one provided in the [questionnaire in JSON](/remote-apis/questionnaire-json.md) section.

The code used by Pogues to go from this representation to the formal description (used for visualization) stays in [src/js/utils/data-JSON-utils.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/data-JSON-utils.js).


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