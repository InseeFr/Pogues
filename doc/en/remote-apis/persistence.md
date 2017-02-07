# Store and retrieve questionnaires

This service service is used to store and retrieve questionnaires.

## Configuration

This service shares the same `baseURL` URL as the visualization service and relies on the `basePath` from the same [configuration file]([src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js). In the long run, the configuration of these two services should be decoupled.

## Json representation

For now, representation of questionnaires for this web service is slightly different from the formal description provided by [pogues model](./schema.md). These two representations should be merged in the future (to keep only the one which complies with the formal description).

This representation (with underscores at the beginning of each key) was at some time a requirement for the persistence service. The naming conventions are closer from the one used in the implementation of Pogues (for instance, we use plural when we deal with an array of elements). To know more about the differences between these two representations, you can compare the following `json` to the one provided in the [questionnaire in json](/remote-apis/questionnaire-json.md) section.

The code used by Pogues to go from this representation to the formal description (used for visualization) stays in [src/js/utils/data-json-utils.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/data-json-utils.js).


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