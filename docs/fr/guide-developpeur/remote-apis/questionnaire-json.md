# Représentation en JSON des questionnaires

Pour être visualisé, un questionnaire doit satisfaire le [schéma XML](./schema.md). En `JSON`, les éléments où `maxMaxOccurs` à la valeur `unbounded` sont représentés par des tableaux.

Par exemple, cet élément défini dans le schéma:

```xml
<xs:element name="Child" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
```

sera représenté en `JSON` de la façon suivante:

```json
{
  "Child": [...]
}
```

Ainsi, en `JSON`, le questionnaire est représenté ressemble à:

```json
{
  "owner": "FAKEPERMISSION",
  "FlowControl": [],
  "ComponentGroup": [
    {
      "MemberReference": ["idendquest", "l765pvcf", "l7661jp0"],
      "Label": ["Components for page 1"],
      "id": "l76671o2",
      "Name": "PAGE_1"
    }
  ],
  "agency": "fr.insee",
  "genericName": "QUESTIONNAIRE",
  "Label": ["Questionnaire simple : une question"],
  "childQuestionnaireRef": [],
  "Name": "QSIMPL1Q",
  "Variables": {
    "Variable": [
      {
        "Label": "QUESTION1 label",
        "id": "l7661j19",
        "type": "CollectedVariableType",
        "Name": "QUESTION1",
        "Datatype": {
          "Pattern": "",
          "typeName": "TEXT",
          "type": "TextDatatypeType",
          "MaxLength": 249
        }
      }
    ]
  },
  "lastUpdatedDate": "Tue Aug 23 2022 14:21:49 GMT+0200 (heure d’été d’Europe centrale)",
  "DataCollection": [
    {
      "id": "fpe-dc-2019",
      "uri": "http://ddi:fr.insee:DataCollection.fpe-dc-2019",
      "Name": "Enquête auprès des salariés de l’État 2019"
    }
  ],
  "final": false,
  "flowLogic": "FILTER",
  "id": "l7663c97",
  "TargetMode": ["CAWI"],
  "CodeLists": {
    "CodeList": []
  },
  "formulasLanguage": "VTL",
  "Child": [
    {
      "Control": [],
      "depth": 1,
      "FlowControl": [],
      "genericName": "MODULE",
      "Label": ["Séquence 1"],
      "id": "l765pvcf",
      "TargetMode": ["CAWI"],
      "Declaration": [],
      "type": "SequenceType",
      "Child": [
        {
          "Response": [
            {
              "CollectedVariableReference": "l7661j19",
              "id": "l7666vom",
              "mandatory": false,
              "Datatype": {
                "Pattern": "",
                "typeName": "TEXT",
                "type": "TextDatatypeType",
                "MaxLength": 249
              }
            }
          ],
          "Control": [],
          "depth": 2,
          "FlowControl": [],
          "Label": ["Question 1"],
          "id": "l7661jp0",
          "TargetMode": ["CAWI"],
          "Declaration": [],
          "type": "QuestionType",
          "questionType": "SIMPLE",
          "Name": "QUESTION1"
        }
      ],
      "Name": "SQUENCE1"
    },
    {
      "Control": [],
      "depth": 1,
      "FlowControl": [],
      "genericName": "MODULE",
      "Label": ["QUESTIONNAIRE_END"],
      "id": "idendquest",
      "TargetMode": ["CAWI"],
      "Declaration": [],
      "type": "SequenceType",
      "Child": [],
      "Name": "QUESTIONNAIRE_END"
    }
  ]
}
```
