module.exports = [
  {
    "owner": 'TMT-010',
    "id" : "fr.insee-POPO-QPO-DOC",
    "depth" : 0,
    "genericName" : "QUESTIONNAIRE",
    "agency" : "fr.insee",
    "Name" : "DOC",
    "Label" : [ "Je suis le titre du questionnaire" ],
    "Child" : [
      {
      "id" : "ir6cju1z",
      "depth" : 1,
      "genericName" : "MODULE",
      "type" : "SequenceType",
      "Name" : "SIMPLE",
      "Label" : [ "Module des questions ouvertes : je suis le libellé du module" ],
      "Declaration" : [ {
        "declarationType" : "INSTRUCTION",
        "Text" : "Ceci est une déclaration de type consigne. "
      } ],
      "Child" : [
        {
        "id" : "iwm8qg8x",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "INTRODUCTI",
        "Label" : [ "Introduction : je suis le libellé du paragraphe" ],
        "Declaration" : [ {
          "declarationType" : "INSTRUCTION",
          "Text" : "Ce questionnaire est un exemple de ce qu'il est possible de faire en utilisant\n                    les outils Eno et Pogues. Il se découpe en plusieurs modules (un module par\n                    page), regroupant les différents types de questions. Dans chaque module, vous\n                    trouverez la description des questions de chaque type, ainsi que des exemples\n                    tirés de questionnaires Insee. ​ "
        } ],
        "Child" : [ {
          "id" : "iwm8r0ba",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "COCHEZ",
          "Label" : [ "##{\"label\":\"Cochez la case pour afficher la suite du questionnaire\\n\",\"conditions\":[]} Cochez la case pour afficher la suite du questionnaire" ],
          "GoTo" : [ {
            "id" : "iwnegyn6",
            "Expression" : "${S1-S1-Q1-R1}='' or ${S1-S1-Q1-R1}='0' ",
            "IfTrue" : "isg13cuk"
          } ],
          "Response" : [ {
            "id" : "idResponse1",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable1"
          } ]
        } ]
      }, {
        "id" : "ir6co0qf",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "MODULE_TEXTE",
        "Label" : [ "Sous-module : questions de type texte" ],
        "Child" : [ {
          "id" : "ir6cqzev",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "TEXTE_LONG",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères\\n\",\"conditions\":[]} Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Je suis le texte de la consigne "
          } ],
          "Response" : [
            {
            "id" : "idResponse2",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 250,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable2"
          } ]
        }, {
          "id" : "ir6cm77g",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "TEXTE_COURT",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question de type texte de longueur inférieure à 200 caractères\",\"conditions\":[]} Je suis le libellé de la question de type texte de longueur inférieure à 200 caractères" ],
          "Response" : [ {
            "id" : "idResponse3",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 150,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable3"
          } ]
        } ]
      }, {
        "id" : "ir6cruy6",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "MODULE_NUM",
        "Label" : [ "Sous-module : questions de type numérique" ],
        "Child" : [ {
          "id" : "ir6cifax",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "NUM_ENTIER",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question de type numérique entier\",\"conditions\":[]} Je suis le libellé de la question de type numérique entier" ],
          "Response" : [ {
            "id" : "idResponse4",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0,
              "Maximum" : 120
            },
            "CollectedVariableReference" : "collectedVariable4"
          } ]
        }, {
          "id" : "ir6cmuqa",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "NUM_DECIMAL",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question de type numérique décimal\",\"conditions\":[]} Je suis le libellé de la question de type numérique décimal" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Je suis le texte de la consigne "
          } ],
          "Response" : [ {
            "id" : "idResponse5",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable5"
          } ]
        } ]
      }, {
        "id" : "ir6ctbkt",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "SOUSMODULE",
        "Label" : [ "Sous-module : questions de type date et durée" ],
        "Child" : [ {
          "id" : "ir6ct69u",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "SIMPLE_DATE",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question de type date au format JJ/MM/AAAA\",\"conditions\":[]} Je suis le libellé de la question de type date au format JJ/MM/AAAA" ],
          "Response" : [ {
            "id" : "idResponse6",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "DATE",
              "type" : "DateDatatypeType",
              "Format" : ""
            },
            "CollectedVariableReference" : "collectedVariable6"
          } ]
        } ]
      }, {
        "id" : "isg1kh8l",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "SOUSMODULE",
        "Label" : [ "Sous modules : question booléen" ],
        "Child" : [ {
          "id" : "isg1hh9m",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "BOOL",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question simple de type booléen\",\"conditions\":[]} Je suis le libellé de la question simple de type booléen" ],
          "Response" : [ {
            "id" : "idResponse7",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable7"
          } ]
        } ]
      }, {
        "id" : "iwnfdy97",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "EXEMPLES",
        "Label" : [ "Exemples" ],
        "Child" : [ {
          "id" : "iwm6shxx",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "ACT_PRIN",
          "Label" : [ "##{\"label\":\"Veuillez indiquer l'activité principale de l'entreprise sous son appellation usuelle\",\"conditions\":[]} Veuillez indiquer l'activité principale de l'entreprise sous son appellation usuelle" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "(par exemple : commerce de fruits et légumes, boulangerie, charcuterie\n                        artisanale ou industrielle, commerce de détail de meubles...) "
          }, {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Exemple tiré de l'enquête sectorielle annuelle "
          } ],
          "Response" : [ {
            "id" : "idResponse8",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 200,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable8"
          } ]
        }, {
          "id" : "iwm8woim",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "PROFESSION",
          "Label" : [ "##{\"label\":\"Indiquez le plus précisément possible la profession exercée dans votre emploi actuel\",\"conditions\":[]} Indiquez le plus précisément possible la profession exercée dans votre emploi actuel" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Soyez très précis sur votre métier : « Caissière » (et non « employée »),\n                        « Fleuriste » (et non « Commerçant »), « Professeur des écoles» "
          }, {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête EVA 2016 "
          } ],
          "Response" : [ {
            "id" : "idResponse9",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 200,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable9"
          } ]
        }, {
          "id" : "iw7ux0w8",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "QUELESTLEM",
          "Label" : [ "##{\"label\":\"Quel est le montant total des investissements réalisés dans votre entreprise ?\",\"conditions\":[]} Quel est le montant total des investissements réalisés dans votre entreprise ?" ],
          "Response" : [ {
            "id" : "idResponse10",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0,
              "Maximum" : 999999999
            },
            "CollectedVariableReference" : "collectedVariable10"
          } ]
        }, {
          "id" : "iwm8v2g4",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "SALAIRE",
          "Label" : [ "##{\"label\":\"Quel était le montant net de votre salaire mensuel correspondant à cet emploi en mars 2016 ?\",\"conditions\":[]} Quel était le montant net de votre salaire mensuel correspondant à cet emploi en mars 2016 ?" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête EVA 2016 "
          } ],
          "Response" : [ {
            "id" : "idResponse11",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Maximum" : 99999
            },
            "CollectedVariableReference" : "collectedVariable11"
          } ]
        }, {
          "id" : "iwm8t2p5",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "CLOT",
          "Label" : [ "##{\"label\":\"Quelle est la date de clôture du dernier exercice comptable clos ?\",\"conditions\":[]} Quelle est la date de clôture du dernier exercice comptable clos ?" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Définition de l'exercice comptable sur lequel porte ce questionnaire : Les\n                        informations à fournir se rapportent à votre exercice comptable 2015. ​\n                        Votre exercice comptable 2015 doit être clôturé entre le 1er juin 2015 et le\n                        31 mai 2016. ​ Si vous avez clotûré deux exercices sur cette période,\n                        prendre celui qui a leplus de mois en 2015. ​ Vous devez également répondre\n                        à l'énquête si votre entreprise a cessé son activité : en 2015 et a plus de\n                        6 mois d'activité ; en 2016. "
          } ],
          "Response" : [ {
            "id" : "idResponse12",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable12"
          } ]
        }, {
          "id" : "iwm99upn",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "DEPUISQUEL",
          "Label" : [ "##{\"label\":\"Depuis quelle date travailliez-vous dans cette entreprise / dans la fonction publique ?\",\"conditions\":[]} Depuis quelle date travailliez-vous dans cette entreprise / dans la fonction publique ?" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête EVA 2016 "
          } ],
          "Response" : [ {
            "id" : "idResponse13",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "DATE",
              "type" : "DateDatatypeType",
              "Format" : ""
            },
            "CollectedVariableReference" : "collectedVariable13"
          } ]
        }, {
          "id" : "iwnevs21",
          "questionType" : "SIMPLE",
          "type" : "QuestionType",
          "Name" : "ACT_PROD",
          "Label" : [ "##{\"label\":\"Si votre établissement n’a pas d’activité industrielle de production ou de transformation, cochez la case ci-contre :\",\"conditions\":[]} Si votre établissement n’a pas d’activité industrielle de production ou de transformation, cochez la case ci-contre :" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête annuelle sur les consommations d'énergie dans\n                        l'industrie (EACEI) "
          } ],
          "Response" : [ {
            "id" : "idResponse14",
            "mandatory" : false,
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable14"
          } ]
        } ]
      } ]
    }, {
      "id" : "isg1ikbn",
      "depth" : 1,
      "genericName" : "MODULE",
      "type" : "SequenceType",
      "Name" : "SINGLE",
      "Label" : [ "Module des questions à choix unique" ],
      "Child" : [ {
        "id" : "isg13cuk",
        "questionType" : "SINGLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "SINGLE_RADIO",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix unique sous forme de bouton radio\",\"conditions\":[]} Je suis le libellé de la question à choix unique sous forme de bouton radio" ],
        "Declaration" : [ {
          "declarationType" : "INSTRUCTION",
          "position" : "AFTER_QUESTION_TEXT",
          "Text" : "La consigne est après la question "
        } ],
        "Response" : [ {
          "id" : "idResponse15",
          "mandatory" : false,
          "CodeListReference" : "isg1g6zo",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable15"
        } ]
      }, {
        "id" : "isg1hq0f",
        "questionType" : "SINGLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "SINGLE_DROPDOWN",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix unique sous forme de liste déroulante\",\"conditions\":[]} Je suis le libellé de la question à choix unique sous forme de liste déroulante" ],
        "Response" : [ {
          "id" : "idResponse16",
          "mandatory" : false,
          "CodeListReference" : "isg1g6zo",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable16"
        } ]
      }, {
        "id" : "isg1bz8h",
        "questionType" : "SINGLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "SINGLE_CHECKBOX",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix unique sous forme de cases à cocher\",\"conditions\":[]} Je suis le libellé de la question à choix unique sous forme de cases à cocher" ],
        "Response" : [ {
          "id" : "idResponse17",
          "mandatory" : false,
          "CodeListReference" : "isg1g6zo",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable17"
        } ]
      }, {
        "id" : "iwnesc00",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "EXEMPLES",
        "Label" : [ "Exemples" ],
        "Child" : [ {
          "id" : "iw22nmhl",
          "questionType" : "SINGLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "FILTRE_INV",
          "Label" : [ "##{\"label\":\"Avez-vous, au cours du dernier exercice comptable, investi dans des équipements spécifiquement dédiés à l’environnement : bennes, filtres, bacs de rétention, instruments de mesure de la pollution\",\"conditions\":[]} Avez-vous, au cours du dernier exercice comptable, investi dans des équipements spécifiquement dédiés à l’environnement : bennes, filtres, bacs de rétention, instruments de mesure de la pollution" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_RESPONSE",
            "Text" : "Cette question est extraite de l'enquête Antipol "
          } ],
          "Response" : [ {
            "id" : "idResponse18",
            "mandatory" : false,
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable18"
          } ]
        }, {
          "id" : "iwm6zyaq",
          "questionType" : "SINGLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "VENTES_MARCH",
          "Label" : [ "##{\"label\":\"Vendez vous vos marchandises majoritairement\\n\",\"conditions\":[]} Vendez vous vos marchandises majoritairement" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête sectorielle annuelle (commerce) "
          } ],
          "Response" : [ {
            "id" : "idResponse19",
            "mandatory" : false,
            "CodeListReference" : "iwm8rneb",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable19"
          } ]
        }, {
          "id" : "iwm9e4pi",
          "questionType" : "SINGLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "TEMPSPLEIN",
          "Label" : [ "##{\"label\":\"Toujours au 1er mars 2016, vous travailliez\",\"conditions\":[]} Toujours au 1er mars 2016, vous travailliez" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête EVA 2016 "
          } ],
          "Response" : [ {
            "id" : "idResponse20",
            "mandatory" : false,
            "CodeListReference" : "iwm8zloc",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable20"
          } ]
        } ]
      } ]
    }, {
      "id" : "isg1gytw",
      "depth" : 1,
      "genericName" : "MODULE",
      "type" : "SequenceType",
      "Name" : "MULTIPLE",
      "Label" : [ "Module des questions à choix multiple" ],
      "Child" : [ {
        "id" : "isg1j5rw",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_BOOL",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de booléen\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de booléen" ],
        "Response" : [ {
          "id" : "idResponse21",
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable21"
        }, {
          "id" : "idResponse22",
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable22"
        }, {
          "id" : "idResponse23",
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable23"
        }, {
          "id" : "idResponse24",
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable24"
        }, {
          "id" : "idResponse25",
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable25"
        } ],
        "ResponseStructure" : {
          "Dimension" : [ {
            "dimensionType" : "PRIMARY",
            "dynamic" : "0",
            "CodeListReference" : "isg1g6zo"
          }, {
            "dimensionType" : "MEASURE",
            "dynamic" : "0"
          } ]
        },
        "Mapping" : [
          {
            "MappingSource" : "idResponse21",
            "MappingTarget" : "1 1"
          },
          {
            "MappingSource" : "idResponse22",
            "MappingTarget" : "1 2"
          },
          {
            "MappingSource" : "idResponse23",
            "MappingTarget" : "1 3"
          },
          {
            "MappingSource" : "idResponse24",
            "MappingTarget" : "1 4"
          },
          {
            "MappingSource" : "idResponse25",
            "MappingTarget" : "1 5"
          }
          ]
      }, {
        "id" : "isg1gjjt",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_RADIO",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de bouton radio\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de bouton radio" ],
        "Response" : [ {
          "id" : "idResponse26",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable26"
        }, {
          "id" : "idResponse27",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable27"
        }, {
          "id" : "idResponse28",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable28"
        }, {
          "id" : "idResponse29",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable29"
        }, {
          "id" : "idResponse30",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "RADIO",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable30"
        } ],
        "ResponseStructure" : {
          "Dimension" : [ {
            "dimensionType" : "PRIMARY",
            "dynamic" : "0",
            "CodeListReference" : "isg1g6zo"
          }, {
            "dimensionType" : "MEASURE",
            "dynamic" : "0"
          } ]
        },
        "Mapping" : [
          {
            "MappingSource" : "idResponse26",
            "MappingTarget" : "1 1"
          },
          {
            "MappingSource" : "idResponse27",
            "MappingTarget" : "1 2"
          },
          {
            "MappingSource" : "idResponse28",
            "MappingTarget" : "1 3"
          },
          {
            "MappingSource" : "idResponse29",
            "MappingTarget" : "1 4"
          },
          {
            "MappingSource" : "idResponse30",
            "MappingTarget" : "1 5"
          }
          ]
      }, {
        "id" : "isg20r8n",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_DROPDOWN",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de liste déroulante\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de liste déroulante" ],
        "Declaration" : [ {
          "declarationType" : "INSTRUCTION",
          "position" : "BEFORE_QUESTION_TEXT",
          "Text" : "La consigne est avant la question "
        } ],
        "Response" : [ {
          "id" : "idResponse31",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable31"
        }, {
          "id" : "idResponse32",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable32"
        }, {
          "id" : "idResponse33",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable33"
        }, {
          "id" : "idResponse34",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable34"
        }, {
          "id" : "idResponse35",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "DROPDOWN",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable35"
        } ],
        "ResponseStructure" : {
          "Dimension" : [ {
            "dimensionType" : "PRIMARY",
            "dynamic" : "0",
            "CodeListReference" : "isg1g6zo"
          }, {
            "dimensionType" : "MEASURE",
            "dynamic" : "0"
          } ]
        },
        "Mapping" : [
          {
            "MappingSource" : "idResponse31",
            "MappingTarget" : "1 1"
          },
          {
            "MappingSource" : "idResponse32",
            "MappingTarget" : "1 2"
          },
          {
            "MappingSource" : "idResponse33",
            "MappingTarget" : "1 3"
          },
          {
            "MappingSource" : "idResponse34",
            "MappingTarget" : "1 4"
          },
          {
            "MappingSource" : "idResponse35",
            "MappingTarget" : "1 5"
          }
          ]
      }, {
        "id" : "isg1uc3w",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_CHECKBOX",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de cases à cocher\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de cases à cocher" ],
        "Response" : [ {
          "id" : "idResponse36",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable36"
        }, {
          "id" : "idResponse37",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable37"
        }, {
          "id" : "idResponse38",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable38"
        }, {
          "id" : "idResponse39",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable39"
        }, {
          "id" : "idResponse40",
          "CodeListReference" : "isg1uorv",
          "Datatype" : {
            "typeName" : "TEXT",
            "visualizationHint" : "CHECKBOX",
            "type" : "TextDatatypeType",
            "MaxLength" : 1,
            "Pattern" : ""
          },
          "CollectedVariableReference" : "collectedVariable40"
        } ],
        "ResponseStructure" : {
          "Dimension" : [ {
            "dimensionType" : "PRIMARY",
            "dynamic" : "0",
            "CodeListReference" : "isg1g6zo"
          }, {
            "dimensionType" : "MEASURE",
            "dynamic" : "0"
          } ]
        },
        "Mapping" : [
          {
            "MappingSource" : "idResponse36",
            "MappingTarget" : "1 1"
          },
          {
            "MappingSource" : "idResponse37",
            "MappingTarget" : "1 2"
          },
          {
            "MappingSource" : "idResponse38",
            "MappingTarget" : "1 3"
          },
          {
            "MappingSource" : "idResponse39",
            "MappingTarget" : "1 4"
          },
          {
            "MappingSource" : "idResponse40",
            "MappingTarget" : "1 5"
          }
          ]
      }, {
        "id" : "iwnevbej",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "EXEMPLES",
        "Label" : [ "Exemples" ],
        "Child" : [ {
          "id" : "iwm8wtis",
          "questionType" : "MULTIPLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "SITE_ENTREPRISE",
          "Label" : [ "##{\"label\":\"Le site ou la page d’accueil de votre entreprise propose-t-il actuellement les services suivants :type de contrat suivant :\\n\",\"conditions\":[]} Le site ou la page d’accueil de votre entreprise propose-t-il actuellement les services suivants :type de contrat suivant :" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Question issue de l'enquête Tic-TPE 2016 "
          } ],
          "Response" : [ {
            "id" : "idResponse41",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable41"
          }, {
            "id" : "idResponse42",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable42"
          }, {
            "id" : "idResponse43",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable43"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "iwm8rfv5"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0"
            } ]
          }
          "Mapping" : [
            {
              "MappingSource" : "idResponse41",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse42",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse43",
              "MappingTarget" : "1 3"
            }
            ]
        }, {
          "id" : "iwm8xktl",
          "questionType" : "MULTIPLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "FORMATION",
          "Label" : [ "##{\"label\":\"Depuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?\",\"conditions\":[]} Depuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?" ],
          "Response" : [
            "id" : "idResponse44",
            {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable44"
          }, {
            "id" : "idResponse45",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable45"
          }, {
            "id" : "idResponse46",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable46"
          }, {
            "id" : "idResponse47",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable47"
          }, {
            "id" : "idResponse48",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable48"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "iwm9fhue"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse44",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse45",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse46",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse47",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse48",
              "MappingTarget" : "1 5"
            }
            ]
        } ]
      } ]
    }, {
      "id" : "isg1qnrf",
      "depth" : 1,
      "genericName" : "MODULE",
      "type" : "SequenceType",
      "Name" : "TABLE",
      "Label" : [ "Module des questions sous forme de tableau" ],
      "Child" : [ {
        "id" : "isg24et5",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "TABLE_1A",
        "Label" : [ "Sous module des tableaux à un seul axe d'information" ],
        "Child" : [ {
          "id" : "isg1s9ho",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_1A_1M",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question tableau un axe - une mesure\",\"conditions\":[]} Je suis le libellé de la question tableau un axe - une mesure" ],
          "Response" : [
            {
            "id" : "idResponse49",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable49"
          }, {
            "id" : "idResponse50",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable50"
          }, {
            "id" : "idResponse51",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable51"
          }, {
            "id" : "idResponse52",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable52"
          }, {
            "id" : "idResponse53",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable53"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "isg1g6zo"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure 1 texte"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse49",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse50",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse51",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse52",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse53",
              "MappingTarget" : "1 5"
            }
            ]
        }, {
          "id" : "isg28ywr",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_1A_nM",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question tableau un axe - plusieurs mesures\",\"conditions\":[]} Je suis le libellé de la question tableau un axe - plusieurs mesures" ],
          "Response" : [ {
            "id" : "idResponse54",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable54"
          }, {
            "id" : "idResponse55",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable55"
          }, {
            "id" : "idResponse56",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable56"
          }, {
            "id" : "idResponse57",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable57"
          }, {
            "id" : "idResponse58",
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable58"
          }, {
            "id" : "idResponse59",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable59"
          }, {
            "id" : "idResponse60",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable60"
          }, {
            "id" : "idResponse61",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable61"
          }, {
            "id" : "idResponse62",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable62"
          }, {
            "id" : "idResponse63",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable63"
          }, {
            "id" : "idResponse64",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable64"
          }, {
            "id" : "idResponse65",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable65"
          }, {
            "id" : "idResponse66",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable66"
          }, {
            "id" : "idResponse67",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable67"
          }, {
            "id" : "idResponse68",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable68"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "isg1g6zo"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure simple booléen"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure unique radio"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure simple entier"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse54",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse55",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse56",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse57",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse58",
              "MappingTarget" : "1 5"
            },
            {
              "MappingSource" : "idResponse59",
              "MappingTarget" : "2 1"
            },
            {
              "MappingSource" : "idResponse60",
              "MappingTarget" : "2 2"
            },
            {
              "MappingSource" : "idResponse61",
              "MappingTarget" : "2 3"
            },
            {
              "MappingSource" : "idResponse62",
              "MappingTarget" : "2 4"
            },
            {
              "MappingSource" : "idResponse63",
              "MappingTarget" : "2 5"
            },{
              "MappingSource" : "idResponse64",
              "MappingTarget" : "3 1"
            },
            {
              "MappingSource" : "idResponse65",
              "MappingTarget" : "3 2"
            },
            {
              "MappingSource" : "idResponse66",
              "MappingTarget" : "3 3"
            },
            {
              "MappingSource" : "idResponse67",
              "MappingTarget" : "3 4"
            },
            {
              "MappingSource" : "idResponse68",
              "MappingTarget" : "3 5"
            }
            ]
        }, {
          "id" : "isg1rx4a",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_LIST",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question liste\",\"conditions\":[]} Je suis le libellé de la question liste" ],
          "Response" : [ {
            "id" : "idResponse69",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 50,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable69"
          }, {
            "id" : "idResponse70",
            "Datatype" : {
              "typeName" : "DATE",
              "type" : "DateDatatypeType",
              "Format" : ""
            },
            "CollectedVariableReference" : "collectedVariable70"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "-"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure texte"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure date"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse69",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse70",
              "MappingTarget" : "1 2"
            }
            ]
        } ]
      }, {
        "id" : "iwnexpuc",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "EXEMPLES",
        "Label" : [ "Exemples" ],
        "Child" : [ {
          "id" : "iw22jcng",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "EFFECTIFSS",
          "Label" : [ "##{\"label\":\"Effectifs salariés au 31/12/2015\",\"conditions\":[]} Effectifs salariés au 31/12/2015" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Comptez la totalité des salariés rémunérés directement par l’entreprise et\n                        inscrits à la date du 31/12/2015, y compris les dirigeants de sociétés et\n                        gérants salariés, le personnel saisonnier ou occasionnel. ​ "
          }, {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Ne comptez pas le personnel rémunéré par d’autres entreprises (travail\n                        temporaire, personnel prêté par d’autres entreprises) ni les stagiaires non\n                        rémunérés. "
          }, {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_RESPONSE",
            "Text" : "Cette question est extraite de l'enquête structurelle auprès des\n                        entreprises mahoraises "
          } ],
          "Response" : [ {
            "id" : "idResponse71",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable71"
          }, {
            "id" : "idResponse72",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable72"
          }, {
            "id" : "idResponse73",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable73"
          }, {
            "id" : "idResponse74",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable74"
          }, {
            "id" : "idResponse75",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable75"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "iw22xe2u"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Effectifs salariés"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse71",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse72",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse73",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse74",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse75",
              "MappingTarget" : "1 5"
            }
            ]
        }, {
          "id" : "iwncfpwn",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "LISTE_PERS",
          "Label" : [ "##{\"label\":\"Liste des personnes qui habitent ce logement\\n\",\"conditions\":[]} Liste des personnes qui habitent ce logement" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_QUESTION_TEXT",
            "Text" : "Veuillez inscrire un par un les prénoms des personnes qui habitent ce\n                        logement, même une partie de la semaine y compris celles qui sont\n                        temporairement absentes au moment de l’enquête (vacances, voyage d'affaires,\n                        hospitalisation, élèves ou étudiants vivant ailleurs pour leurs études mais\n                        encore rattachés au logement, conjoints éloignés pour raisons\n                        professionnelles, enfants en garde alternée, personnes âgées en institution\n                        …) "
          } ],
          "Response" : [
            {
            "id" : "idResponse76",
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 50,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable76"
          }, {
            "id" : "idResponse77",
            "CodeListReference" : "iw22fswu",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "CHECKBOX",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable77"
          }, {
            "id" : "idResponse78",
            "Datatype" : {
              "typeName" : "DATE",
              "type" : "DateDatatypeType",
              "Format" : ""
            },
            "CollectedVariableReference" : "collectedVariable78"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "-"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Prénom"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Sexe"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Date de naissance"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse76",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse77",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse78",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse74",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse75",
              "MappingTarget" : "1 5"
            }
            ]
        } ]
      }, {
        "id" : "isg1x9p9",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "TABLE_2A",
        "Label" : [ "Sous module des tableaux à deux axes d'information" ],
        "Child" : [ {
          "id" : "isg1v5d2",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_2A_1SIMPLE",
          "Label" : [ "##{\"label\":\"Je suis le libellé d'un tableau à deux axes 1 mesure simple\",\"conditions\":[]} Je suis le libellé d'un tableau à deux axes 1 mesure simple" ],
          "Response" : [
            {
            "id" : "idResponse79",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable79"
          }, {
            "id" : "idResponse80",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable80"
          }, {
            "id" : "idResponse81",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable81"
          }, {
            "id" : "idResponse82",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable82"
          }, {
            "id" : "idResponse83",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable83"
          }, {
            "id" : "idResponse84",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable84"
          }, {
            "id" : "idResponse85",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable85"
          }, {
            "id" : "idResponse86",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable86"
          }, {
            "id" : "idResponse87",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable87"
          }, {
            "id" : "idResponse88",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable88"
          }, {
            "id" : "idResponse89",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable89"
          }, {
            "id" : "idResponse90",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable90"
          }, {
            "id" : "idResponse91",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable91"
          }, {
            "id" : "idResponse92",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable92"
          }, {
            "id" : "idResponse93",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable93"
          }, {
            "id" : "idResponse94",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable94"
          }, {
            "id" : "idResponse95",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable95"
          }, {
            "id" : "idResponse96",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable96"
          }, {
            "id" : "idResponse97",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable97"
          }, {
            "id" : "idResponse98",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable98"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "isg1g6zo"
            }, {
              "dimensionType" : "SECONDARY",
              "dynamic" : "0",
              "CodeListReference" : "isg27fpv"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure nombre"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse79",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse80",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse81",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse82",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse83",
              "MappingTarget" : "1 5"
            },
            {
              "MappingSource" : "idResponse84",
              "MappingTarget" : "2 1"
            },
            {
              "MappingSource" : "idResponse85",
              "MappingTarget" : "2 2"
            },
            {
              "MappingSource" : "idResponse86",
              "MappingTarget" : "2 3"
            },
            {
              "MappingSource" : "idResponse87",
              "MappingTarget" : "2 4"
            },
            {
              "MappingSource" : "idResponse88",
              "MappingTarget" : "2 5"
            },
            {
              "MappingSource" : "idResponse89",
              "MappingTarget" : "3 1"
            },
            {
              "MappingSource" : "idResponse90",
              "MappingTarget" : "3 2"
            },
            {
              "MappingSource" : "idResponse91",
              "MappingTarget" : "3 3"
            },
            {
              "MappingSource" : "idResponse92",
              "MappingTarget" : "3 4"
            },
            {
              "MappingSource" : "idResponse93",
              "MappingTarget" : "3 5"
            },
            {
              "MappingSource" : "idResponse94",
              "MappingTarget" : "4 1"
            },
            {
              "MappingSource" : "idResponse95",
              "MappingTarget" : "4 2"
            },
            {
              "MappingSource" : "idResponse96",
              "MappingTarget" : "4 3"
            },
            {
              "MappingSource" : "idResponse97",
              "MappingTarget" : "4 4"
            },
            {
              "MappingSource" : "idResponse98",
              "MappingTarget" : "4 5"
            }
            ]
        }, {
          "id" : "isg3ixbk",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "JESUISLELI",
          "Label" : [ "##{\"label\":\"Je suis le libellé d'un tableau à deux axes 1 mesure unique\",\"conditions\":[]} Je suis le libellé d'un tableau à deux axes 1 mesure unique" ],
          "Response" : [
            {
            "id" : "idResponse99",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable99"
          }, {
            "id" : "idResponse100",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable100"
          }, {
            "id" : "idResponse101",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable101"
          }, {
            "id" : "idResponse102",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable102"
          }, {
            "id" : "idResponse103",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable103"
          }, {
            "id" : "idResponse104",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable104"
          }, {
            "id" : "idResponse105",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable105"
          }, {
            "id" : "idResponse106",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable106"
          }, {
            "id" : "idResponse107",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable107"
          }, {
            "id" : "idResponse108",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable108"
          }, {
            "id" : "idResponse109",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable109"
          }, {
            "id" : "idResponse110",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable110"
          }, {
            "id" : "idResponse111",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable111"
          }, {
            "id" : "idResponse112",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable112"
          }, {
            "id" : "idResponse113",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable113"
          }, {
            "id" : "idResponse114",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable114"
          }, {
            "id" : "idResponse115",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable115"
          }, {
            "id" : "idResponse116",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable116"
          }, {
            "id" : "idResponse117",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable117"
          }, {
            "id" : "idResponse118",
            "CodeListReference" : "isg1uorv",
            "Datatype" : {
              "typeName" : "TEXT",
              "visualizationHint" : "RADIO",
              "type" : "TextDatatypeType",
              "MaxLength" : 1,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable118"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "isg1g6zo"
            }, {
              "dimensionType" : "SECONDARY",
              "dynamic" : "0",
              "CodeListReference" : "isg27fpv"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Mesure unique"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse99",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse100",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse101",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse102",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse103",
              "MappingTarget" : "1 5"
            },
            {
              "MappingSource" : "idResponse104",
              "MappingTarget" : "2 1"
            },
            {
              "MappingSource" : "idResponse105",
              "MappingTarget" : "2 2"
            },
            {
              "MappingSource" : "idResponse106",
              "MappingTarget" : "2 3"
            },
            {
              "MappingSource" : "idResponse107",
              "MappingTarget" : "2 4"
            },
            {
              "MappingSource" : "idResponse108",
              "MappingTarget" : "2 5"
            },
            {
              "MappingSource" : "idResponse109",
              "MappingTarget" : "3 1"
            },
            {
              "MappingSource" : "idResponse110",
              "MappingTarget" : "3 2"
            },
            {
              "MappingSource" : "idResponse111",
              "MappingTarget" : "3 3"
            },
            {
              "MappingSource" : "idResponse112",
              "MappingTarget" : "3 4"
            },
            {
              "MappingSource" : "idResponse113",
              "MappingTarget" : "3 5"
            },
            {
              "MappingSource" : "idResponse114",
              "MappingTarget" : "4 1"
            },
            {
              "MappingSource" : "idResponse115",
              "MappingTarget" : "4 2"
            },
            {
              "MappingSource" : "idResponse116",
              "MappingTarget" : "4 3"
            },
            {
              "MappingSource" : "idResponse117",
              "MappingTarget" : "4 4"
            },
            {
              "MappingSource" : "idResponse118",
              "MappingTarget" : "4 5"
            }
            ]
        } ]
      }, {
        "id" : "iwnet09y",
        "depth" : 2,
        "genericName" : "SUBMODULE",
        "type" : "SequenceType",
        "Name" : "EXEMPLES",
        "Label" : [ "Exemples" ],
        "Child" : [ {
          "id" : "iw22jwft",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "RENSEIGNEZ",
          "Label" : [ "##{\"label\":\"Renseignez dans le tableau ci-dessous le montant des investissements spécifiquement dédiés à l'environnement, selon leur nature et le domaine\",\"conditions\":[]} Renseignez dans le tableau ci-dessous le montant des investissements spécifiquement dédiés à l'environnement, selon leur nature et le domaine" ],
          "Declaration" : [ {
            "declarationType" : "INSTRUCTION",
            "position" : "AFTER_RESPONSE",
            "Text" : "Cette question est extraite de l'enquête Antipol "
          } ],
          "Control" : [ {
            "id" : "iw7ukiat",
            "Description" : "",
            "Expression" : "(NUM(${S1-S1-Q1-R1})-(NUM(${S1-S1-Q3-R1})+NUM(${S1-S1-Q3-R2})+NUM(${S1-S1-Q3-R3})+NUM(${S1-S1-Q3-R4})+NUM(${S1-S1-Q3-R5})+NUM(${S1-S1-Q3-R6})+NUM(${S1-S1-Q3-R7})+NUM(${S1-S1-Q3-R8})+NUM(${S1-S1-Q3-R9})+NUM(${S1-S1-Q3-R10})+NUM(${S1-S1-Q3-R11})+NUM(${S1-S1-Q3-R12})+NUM(${S1-S1-Q3-R13})+NUM(${S1-S1-Q3-R14})+NUM(${S1-S1-Q3-R15})+NUM(${S1-S1-Q3-R16})+NUM(${S1-S1-Q3-R17})+NUM(${S1-S1-Q3-R18})+NUM(${S1-S1-Q3-R19})+NUM(${S1-S1-Q3-R20})+NUM(${S1-S1-Q3-R21})+NUM(${S1-S1-Q3-R22})+NUM(${S1-S1-Q3-R23})+NUM(${S1-S1-Q3-R24}))<0\n                        ) and ${S1-S1-Q1-R1}!=''",
            "FailMessage" : "Le montant des investissements spécifiquement dédiés à\n                        l'environnement est supérieur au montant total des\n                        investissements."
          } ],
          "Response" : [
            "id" : "idResponse119",
            {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable119"
          }, {
            "id" : "idResponse120",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable120"
          }, {
            "id" : "idResponse121",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable121"
          }, {
            "id" : "idResponse122",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable122"
          }, {
            "id" : "idResponse123",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable123"
          }, {
            "id" : "idResponse124",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable124"
          }, {
            "id" : "idResponse125",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable125"
          }, {
            "id" : "idResponse126",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable126"
          }, {
            "id" : "idResponse127",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable127"
          }, {
            "id" : "idResponse128",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable128"
          }, {
            "id" : "idResponse129",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable129"
          }, {
            "id" : "idResponse130",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable130"
          }, {
            "id" : "idResponse131",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable131"
          }, {
            "id" : "idResponse132",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable132"
          }, {
            "id" : "idResponse133",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable133"
          }, {
            "id" : "idResponse134",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable134"
          }, {
            "id" : "idResponse135",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable135"
          }, {
            "id" : "idResponse136",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable136"
          }, {
            "id" : "idResponse137",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable137"
          }, {
            "id" : "idResponse138",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable138"
          }, {
            "id" : "idResponse139",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable139"
          }, {
            "id" : "idResponse140",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable140"
          }, {
            "id" : "idResponse141",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable141"
          }, {
            "id" : "idResponse142",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable142"
          }, {
            "id" : "idResponse143",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable143"
          }, {
            "id" : "idResponse144",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable144"
          }, {
            "id" : "idResponse145",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable145"
          }, {
            "id" : "idResponse146",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable146"
          }, {
            "id" : "idResponse147",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable147"
          }, {
            "id" : "idResponse148",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable148"
          }, {
            "id" : "idResponse149",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable149"
          }, {
            "id" : "idResponse150",
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable150"
          } ],
          "ResponseStructure" : {
            "Dimension" : [ {
              "dimensionType" : "PRIMARY",
              "dynamic" : "0",
              "CodeListReference" : "iw22r14q"
            }, {
              "dimensionType" : "SECONDARY",
              "dynamic" : "0",
              "CodeListReference" : "iw22dla9"
            }, {
              "dimensionType" : "MEASURE",
              "dynamic" : "0",
              "Label" : "Montant des investissements en Keuros"
            } ]
          },
          "Mapping" : [
            {
              "MappingSource" : "idResponse119",
              "MappingTarget" : "1 1"
            },
            {
              "MappingSource" : "idResponse120",
              "MappingTarget" : "1 2"
            },
            {
              "MappingSource" : "idResponse121",
              "MappingTarget" : "1 3"
            },
            {
              "MappingSource" : "idResponse122",
              "MappingTarget" : "1 4"
            },
            {
              "MappingSource" : "idResponse123",
              "MappingTarget" : "2 1"
            },
            {
              "MappingSource" : "idResponse124",
              "MappingTarget" : "2 2"
            },
            {
              "MappingSource" : "idResponse125",
              "MappingTarget" : "2 3"
            },
            {
              "MappingSource" : "idResponse126",
              "MappingTarget" : "2 4"
            },
            {
              "MappingSource" : "idResponse127",
              "MappingTarget" : "3 1"
            },
            {
              "MappingSource" : "idResponse128",
              "MappingTarget" : "3 2"
            },
            {
              "MappingSource" : "idResponse129",
              "MappingTarget" : "3 3"
            },
            {
              "MappingSource" : "idResponse130",
              "MappingTarget" : "3 4"
            },
            {
              "MappingSource" : "idResponse131",
              "MappingTarget" : "4 1"
            },
            {
              "MappingSource" : "idResponse132",
              "MappingTarget" : "4 2"
            },
            {
              "MappingSource" : "idResponse133",
              "MappingTarget" : "4 3"
            },
            {
              "MappingSource" : "idResponse134",
              "MappingTarget" : "4 4"
            },
            {
              "MappingSource" : "idResponse135",
              "MappingTarget" : "5 1"
            },
            {
              "MappingSource" : "idResponse136",
              "MappingTarget" : "5 2"
            },
            {
              "MappingSource" : "idResponse137",
              "MappingTarget" : "5 3"
            },
            {
              "MappingSource" : "idResponse138",
              "MappingTarget" : "5 4"
            },
            {
              "MappingSource" : "idResponse139",
              "MappingTarget" : "6 1"
            },
            {
              "MappingSource" : "idResponse140",
              "MappingTarget" : "6 2"
            },
            {
              "MappingSource" : "idResponse141",
              "MappingTarget" : "6 3"
            },
            {
              "MappingSource" : "idResponse142",
              "MappingTarget" : "6 4"
            },
            {
              "MappingSource" : "idResponse143",
              "MappingTarget" : "7 1"
            },
            {
              "MappingSource" : "idResponse144",
              "MappingTarget" : "7 2"
            },
            {
              "MappingSource" : "idResponse145",
              "MappingTarget" : "7 3"
            },
            {
              "MappingSource" : "idResponse146",
              "MappingTarget" : "7 4"
            },
            {
              "MappingSource" : "idResponse147",
              "MappingTarget" : "8 1"
            },
            {
              "MappingSource" : "idResponse148",
              "MappingTarget" : "8 2"
            },
            {
              "MappingSource" : "idResponse149",
              "MappingTarget" : "8 3"
            },
            {
              "MappingSource" : "idResponse150",
              "MappingTarget" : "8 4"
            }
            ]
        } ]
      } ]
    } ],
    "DataCollection" : [ {
      "id" : "campaign01",
      "uri" : "http://ddi:fr.insee:DataCollection.INSEE-POPO-DC-1.1",
      "Name" : "POPO-2017-A00"
    } ],
    "ComponentGroup" : [ {
      "id" : "j3tu30jo",
      "Name" : "PAGE_1",
      "Label" : [ "Components for page 1" ],
      "MemberReference" : [ "ir6cju1z", "iwm8qg8x", "iwm8r0ba", "ir6co0qf", "ir6cqzev", "ir6cm77g", "ir6cruy6", "ir6cifax", "ir6cmuqa", "ir6ctbkt", "ir6ct69u", "isg1kh8l", "isg1hh9m", "iwnfdy97", "iwm6shxx", "iwm8woim", "iw7ux0w8", "iwm8v2g4", "iwm8t2p5", "iwm99upn", "iwnevs21", "isg1ikbn", "isg13cuk", "isg1hq0f", "isg1bz8h", "iwnesc00", "iw22nmhl", "iwm6zyaq", "iwm9e4pi", "isg1gytw", "isg1j5rw", "isg1gjjt", "isg20r8n", "isg1uc3w", "iwnevbej", "iwm8wtis", "iwm8xktl", "isg1qnrf", "isg24et5", "isg1s9ho", "isg28ywr", "isg1rx4a", "iwnexpuc", "iw22jcng", "iwncfpwn", "isg1x9p9", "isg1v5d2", "isg3ixbk", "iwnet09y", "iw22jwft" ]
    } ],
    "CodeLists" : {
      "CodeList" : [
        {
        "id" : "isg1g6zo",
        "Name" : "",
        "Label" : "LISTE_TEST",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "choix 1"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "choix 2"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "choix 3"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "choix 4"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "choix 5"
        } ]
      }, {
        "id" : "isg1uorv",
        "Name" : "",
        "Label" : "Oui_Non",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Oui"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Non"
        } ]
      }, {
        "id" : "isg27fpv",
        "Name" : "",
        "Label" : "LISTE_TEST_2",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "choix 6"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "choix 7"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "choix 8"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "choix 9"
        } ]
      }, {
        "id" : "iw22dla9",
        "Name" : "",
        "Label" : "DOMAINE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Eaux usées"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Déchets hors radioactifs"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Protection de l’air"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Limitation des émissions de gaz à effet de serre"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "Bruits et vibrations"
        }, {
          "Value" : "code06", "Parent": "",
          "Label" : "Sols, eaux souterraines et de surface"
        }, {
          "Value" : "code07", "Parent": "",
          "Label" : "Sites, paysages et biodiversité"
        }, {
          "Value" : "code08", "Parent": "",
          "Label" : "Autres (rayonnement, R&D sur l’environnement…)"
        } ]
      }, {
        "id" : "iw22fswu",
        "Name" : "",
        "Label" : "L_SEXE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Masculin"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Féminin"
        } ]
      }, {
        "id" : "iw22r14q",
        "Name" : "",
        "Label" : "NATURE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Pré-traitement, traitement et élimination"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Mesure et contrôle"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Recyclage, tri et valorisation"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Prévention des pollutions"
        } ]
      }, {
        "id" : "iw22xe2u",
        "Name" : "",
        "Label" : "L_effectifs",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Effectifs salariés à temps plein"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Effectifs salariés à temps partiel moins de 6 mois"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Effectifs salariés à temps partiel 6 mois et plus"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Apprentis, stagiaires rémunérés"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "Total"
        } ]
      }, {
        "id" : "iw25euzq",
        "Name" : "",
        "Label" : "L_GLACE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "vanille"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "chocolat"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "fraise"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "abricot"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "citron"
        }, {
          "Value" : "code06", "Parent": "",
          "Label" : "rhum raisins"
        } ]
      }, {
        "id" : "iw25voxc",
        "Name" : "",
        "Label" : "L_fréquence",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Toujours"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Souvent"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Parfois"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Jamais"
        } ]
      }, {
        "id" : "iwg8titv",
        "Name" : "",
        "Label" : "LIST_ONE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Item 1"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Item 2"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Item 3"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Item 4"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "Item 5"
        } ]
      }, {
        "id" : "iwgdzvye",
        "Name" : "",
        "Label" : "weather_list",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "sunny"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "cloudy"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "rainy"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "a mix of all, I'm in Brittany"
        } ]
      }, {
        "id" : "iwge4s84",
        "Name" : "",
        "Label" : "LIST_TWO",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "item 6"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "item 7"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "item 8"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "item 9"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "item 10"
        } ]
      }, {
        "id" : "iwgebn3a",
        "Name" : "",
        "Label" : "EVENING",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Drink some beers"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Go to cinema"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Watch a movie at home"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Cook good meals for my friends"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "Read a novel"
        } ]
      }, {
        "id" : "iwgeg7ek",
        "Name" : "",
        "Label" : "LIST_SEX_EN",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Man"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Woman"
        } ]
      }, {
        "id" : "iwgehiif",
        "Name" : "",
        "Label" : "Yes_No_EN",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Yes"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "No"
        } ]
      }, {
        "id" : "iwm8rfv5",
        "Name" : "",
        "Label" : "L_TIC_TPE",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "La commande ou la réservation en ligne (panier virtuel) ?"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "La description de biens ou services, ou des listes de prix ?"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Des liens permettant d’accéder aux pages de l’entreprise dans les médias\n                    sociaux (Facebook, Twitter, Google+, LinkedIn, Viadeo, etc.) ?"
        } ]
      }, {
        "id" : "iwm8rneb",
        "Name" : "",
        "Label" : "L_ventes",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "A des particuliers"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "A des professionnels ou revendeurs"
        } ]
      }, {
        "id" : "iwm8zloc",
        "Name" : "",
        "Label" : "L_activite",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "à temps complet"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "à temps partiel 80 % ou plus"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "de mi-temps à moins de 80 %"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "moins d’un mi-temps"
        } ]
      }, {
        "id" : "iwm9fhue",
        "Name" : "",
        "Label" : "L_formation",
        "Code" : [ {
          "Value" : "code01", "Parent": "",
          "Label" : "Formation financée ou organisée par l’employeur ou une agence d’intérim (hors\n                    apprentissage et contrats de professionnalisation)"
        }, {
          "Value" : "code02", "Parent": "",
          "Label" : "Formation donnée par une école de la 2e chance, par l’EPIDE"
        }, {
          "Value" : "code03", "Parent": "",
          "Label" : "Formation conseillée ou organisée par Pôle emploi, par une mission locale,\n                    une chambre des métiers, une agence de placement (APEC, INGEUS, …), (y compris\n                    ateliers de techniques de recherche d’emploi, ateliers CV)"
        }, {
          "Value" : "code04", "Parent": "",
          "Label" : "Une formation professionnalisante ou à but professionnel (pour trouver un\n                    emploi, améliorer votre situation, …)"
        }, {
          "Value" : "code05", "Parent": "",
          "Label" : "Aucune de ces formations depuis la fin des études, même pour quelques\n                    jours"
        } ]
      } ]
    },
    "Variables" : {
      "Variable" : [ {
        "id" : "collectedVariable1",
        "type" : "CollectedVariableType",
        "Name" : "",
        "Label" : "collectedVariableLabel1"
      }, {
        "id" : "collectedVariable2",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName2",
        "Label" : "collectedVariableLabel2"
      }, {
        "id" : "collectedVariable3",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName3",
        "Label" : ""
      }, {
        "id" : "collectedVariable4",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName4",
        "Label" : "collectedVariableLabel4"
      }, {
        "id" : "collectedVariable5",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName5",
        "Label" : "collectedVariableLabel5"
      }, {
        "id" : "collectedVariable6",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName6",
        "Label" : "collectedVariableLabel6"
      }, {
        "id" : "collectedVariable7",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName7",
        "Label" : "collectedVariableLabel7"
      }, {
        "id" : "collectedVariable8",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName8",
        "Label" : "collectedVariableLabel8"
      }, {
        "id" : "collectedVariable9",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName9",
        "Label" : "collectedVariableLabel9"
      }, {
        "id" : "collectedVariable10",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName10",
        "Label" : "collectedVariableLabel10"
      }, {
        "id" : "collectedVariable11",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName11",
        "Label" : "collectedVariableLabel11"
      }, {
        "id" : "collectedVariable12",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName12",
        "Label" : "collectedVariableLabel12"
      }, {
        "id" : "collectedVariable13",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName13",
        "Label" : "collectedVariableLabel13"
      }, {
        "id" : "collectedVariable14",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName14",
        "Label" : "collectedVariableLabel14"
      }, {
        "id" : "collectedVariable15",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName15",
        "Label" : "collectedVariableLabel15"
      }, {
        "id" : "collectedVariable16",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName16",
        "Label" : "collectedVariableLabel16"
      }, {
        "id" : "collectedVariable17",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName17",
        "Label" : "collectedVariableLabel17"
      }, {
        "id" : "collectedVariable18",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName18",
        "Label" : "collectedVariableLabel18"
      }, {
        "id" : "collectedVariable19",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName19",
        "Label" : "collectedVariableLabel19"
      }, {
        "id" : "collectedVariable20",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName20",
        "Label" : "collectedVariableLabel20"
      }, {
        "id" : "collectedVariable21",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName21",
        "Label" : "collectedVariableLabel21"
      }, {
        "id" : "collectedVariable22",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName22",
        "Label" : "collectedVariableLabel22"
      }, {
        "id" : "collectedVariable23",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName23",
        "Label" : "collectedVariableLabel23"
      }, {
        "id" : "collectedVariable24",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName24",
        "Label" : "collectedVariableLabel24"
      }, {
        "id" : "collectedVariable25",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName25",
        "Label" : "collectedVariableLabel25"
      }, {
        "id" : "collectedVariable26",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName26",
        "Label" : "collectedVariableLabel26"
      }, {
        "id" : "collectedVariable27",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName27",
        "Label" : "collectedVariableLabel27"
      }, {
        "id" : "collectedVariable28",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName28",
        "Label" : "collectedVariableLabel28"
      }, {
        "id" : "collectedVariable29",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName29",
        "Label" : "collectedVariableLabel29"
      }, {
        "id" : "collectedVariable30",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName30",
        "Label" : "collectedVariableLabel30"
      }, {
        "id" : "collectedVariable31",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName31",
        "Label" : "collectedVariableLabel31"
      }, {
        "id" : "collectedVariable32",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName32",
        "Label" : "collectedVariableLabel32"
      }, {
        "id" : "collectedVariable33",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName33",
        "Label" : "collectedVariableLabel33"
      }, {
        "id" : "collectedVariable34",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName34",
        "Label" : "collectedVariableLabel34"
      }, {
        "id" : "collectedVariable35",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName35",
        "Label" : "collectedVariableLabel35"
      }, {
        "id" : "collectedVariable36",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName36",
        "Label" : "collectedVariableLabel36"
      }, {
        "id" : "collectedVariable37",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName37",
        "Label" : "collectedVariableLabel37"
      }, {
        "id" : "collectedVariable38",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName38",
        "Label" : "collectedVariableLabel38"
      }, {
        "id" : "collectedVariable39",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName39",
        "Label" : "collectedVariableLabel39"
      }, {
        "id" : "collectedVariable40",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName40",
        "Label" : "collectedVariableLabel40"
      }, {
        "id" : "collectedVariable41",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName41",
        "Label" : "collectedVariableLabel41"
      }, {
        "id" : "collectedVariable42",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName42",
        "Label" : "collectedVariableLabel42"
      }, {
        "id" : "collectedVariable43",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName43",
        "Label" : "collectedVariableLabel43"
      }, {
        "id" : "collectedVariable44",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName44",
        "Label" : "collectedVariableLabel44"
      }, {
        "id" : "collectedVariable45",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName45",
        "Label" : "collectedVariableLabel45"
      }, {
        "id" : "collectedVariable46",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName46",
        "Label" : "collectedVariableLabel46"
      }, {
        "id" : "collectedVariable47",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName47",
        "Label" : "collectedVariableLabel47"
      }, {
        "id" : "collectedVariable48",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName48",
        "Label" : "collectedVariableLabel48"
      }, {
        "id" : "collectedVariable49",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName49",
        "Label" : "collectedVariableLabel49"
      }, {
        "id" : "collectedVariable50",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName50",
        "Label" : "collectedVariableLabel50"
      }, {
        "id" : "collectedVariable51",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName51",
        "Label" : "collectedVariableLabel51"
      }, {
        "id" : "collectedVariable52",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName52",
        "Label" : "collectedVariableLabel52"
      }, {
        "id" : "collectedVariable53",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName53",
        "Label" : "collectedVariableLabel53"
      }, {
        "id" : "collectedVariable54",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName54",
        "Label" : "collectedVariableLabel54"
      }, {
        "id" : "collectedVariable55",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName55",
        "Label" : "collectedVariableLabel55"
      }, {
        "id" : "collectedVariable56",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName56",
        "Label" : "collectedVariableLabel56"
      }, {
        "id" : "collectedVariable57",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName57",
        "Label" : "collectedVariableLabel57"
      }, {
        "id" : "collectedVariable58",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName58",
        "Label" : "collectedVariableLabel58"
      }, {
        "id" : "collectedVariable59",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName59",
        "Label" : "collectedVariableLabel59"
      }, {
        "id" : "collectedVariable60",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName60",
        "Label" : "collectedVariableLabel60"
      }, {
        "id" : "collectedVariable61",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName61",
        "Label" : "collectedVariableLabel61"
      }, {
        "id" : "collectedVariable62",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName62",
        "Label" : "collectedVariableLabel62"
      }, {
        "id" : "collectedVariable63",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName63",
        "Label" : "collectedVariableLabel63"
      }, {
        "id" : "collectedVariable64",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName64",
        "Label" : "collectedVariableLabel64"
      }, {
        "id" : "collectedVariable65",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName65",
        "Label" : "collectedVariableLabel65"
      }, {
        "id" : "collectedVariable66",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName66",
        "Label" : "collectedVariableLabel66"
      }, {
        "id" : "collectedVariable67",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName67",
        "Label" : "collectedVariableLabel67"
      }, {
        "id" : "collectedVariable68",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName68",
        "Label" : "collectedVariableLabel68"
      }, {
        "id" : "collectedVariable69",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName69",
        "Label" : "collectedVariableLabel69"
      }, {
        "id" : "collectedVariable70",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName70",
        "Label" : "collectedVariableLabel70"
      }, {
        "id" : "collectedVariable71",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName71",
        "Label" : "collectedVariableLabel71"
      }, {
        "id" : "collectedVariable72",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName72",
        "Label" : "collectedVariableLabel72"
      }, {
        "id" : "collectedVariable73",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName73",
        "Label" : "collectedVariableLabel73"
      }, {
        "id" : "collectedVariable74",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName74",
        "Label" : "collectedVariableLabel74"
      }, {
        "id" : "collectedVariable75",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName75",
        "Label" : "collectedVariableLabel75"
      }, {
        "id" : "collectedVariable76",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName76",
        "Label" : "collectedVariableLabel76"
      }, {
        "id" : "collectedVariable77",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName77",
        "Label" : "collectedVariableLabel77"
      }, {
        "id" : "collectedVariable78",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName78",
        "Label" : "collectedVariableLabel78"
      }, {
        "id" : "collectedVariable79",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName79",
        "Label" : "collectedVariableLabel79"
      }, {
        "id" : "collectedVariable80",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName80",
        "Label" : "collectedVariableLabel80"
      }, {
        "id" : "collectedVariable81",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName81",
        "Label" : "collectedVariableLabel81"
      }, {
        "id" : "collectedVariable82",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName82",
        "Label" : "collectedVariableLabel82"
      }, {
        "id" : "collectedVariable83",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName83",
        "Label" : "collectedVariableLabel83"
      }, {
        "id" : "collectedVariable84",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName84",
        "Label" : "collectedVariableLabel84"
      }, {
        "id" : "collectedVariable85",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName85",
        "Label" : "collectedVariableLabel85"
      }, {
        "id" : "collectedVariable86",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName86",
        "Label" : "collectedVariableLabel86"
      }, {
        "id" : "collectedVariable87",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName87",
        "Label" : "collectedVariableLabel87"
      }, {
        "id" : "collectedVariable88",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName88",
        "Label" : "collectedVariableLabel88"
      }, {
        "id" : "collectedVariable89",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName89",
        "Label" : "collectedVariableLabel89"
      }, {
        "id" : "collectedVariable90",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName90",
        "Label" : "collectedVariableLabel90"
      }, {
        "id" : "collectedVariable91",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName91",
        "Label" : "collectedVariableLabel91"
      }, {
        "id" : "collectedVariable92",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName92",
        "Label" : "collectedVariableLabel92"
      }, {
        "id" : "collectedVariable93",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName93",
        "Label" : "collectedVariableLabel93"
      }, {
        "id" : "collectedVariable94",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName94",
        "Label" : "collectedVariableLabel94"
      }, {
        "id" : "collectedVariable95",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName95",
        "Label" : "collectedVariableLabel95"
      }, {
        "id" : "collectedVariable96",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName96",
        "Label" : "collectedVariableLabel96"
      }, {
        "id" : "collectedVariable97",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName97",
        "Label" : "collectedVariableLabel97"
      }, {
        "id" : "collectedVariable98",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName98",
        "Label" : "collectedVariableLabel98"
      }, {
        "id" : "collectedVariable99",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName99",
        "Label" : "collectedVariableLabel99"
      }, {
        "id" : "collectedVariable100",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName100",
        "Label" : "collectedVariableLabel100"
      }, {
        "id" : "collectedVariable101",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName101",
        "Label" : "collectedVariableLabel101"
      }, {
        "id" : "collectedVariable102",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName102",
        "Label" : "collectedVariableLabel102"
      }, {
        "id" : "collectedVariable103",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName103",
        "Label" : "collectedVariableLabel103"
      }, {
        "id" : "collectedVariable104",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName104",
        "Label" : "collectedVariableLabel104"
      }, {
        "id" : "collectedVariable105",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName105",
        "Label" : "collectedVariableLabel105"
      }, {
        "id" : "collectedVariable106",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName106",
        "Label" : "collectedVariableLabel106"
      }, {
        "id" : "collectedVariable107",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName107",
        "Label" : "collectedVariableLabel107"
      }, {
        "id" : "collectedVariable108",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName108",
        "Label" : "collectedVariableLabel108"
      }, {
        "id" : "collectedVariable109",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName109",
        "Label" : "collectedVariableLabel109"
      }, {
        "id" : "collectedVariable110",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName110",
        "Label" : "collectedVariableLabel110"
      }, {
        "id" : "collectedVariable111",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName111",
        "Label" : "collectedVariableLabel111"
      }, {
        "id" : "collectedVariable112",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName112",
        "Label" : "collectedVariableLabel112"
      }, {
        "id" : "collectedVariable113",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName113",
        "Label" : "collectedVariableLabel113"
      }, {
        "id" : "collectedVariable114",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName114",
        "Label" : "collectedVariableLabel114"
      }, {
        "id" : "collectedVariable115",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName115",
        "Label" : "collectedVariableLabel115"
      }, {
        "id" : "collectedVariable116",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName116",
        "Label" : "collectedVariableLabel116"
      }, {
        "id" : "collectedVariable117",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName117",
        "Label" : "collectedVariableLabel117"
      }, {
        "id" : "collectedVariable118",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName118",
        "Label" : "collectedVariableLabel118"
      }, {
        "id" : "collectedVariable119",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName119",
        "Label" : "collectedVariableLabel119"
      }, {
        "id" : "collectedVariable120",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName120",
        "Label" : "collectedVariableLabel120"
      }, {
        "id" : "collectedVariable121",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName121",
        "Label" : "collectedVariableLabel121"
      }, {
        "id" : "collectedVariable122",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName122",
        "Label" : "collectedVariableLabel122"
      }, {
        "id" : "collectedVariable123",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName123",
        "Label" : "collectedVariableLabel123"
      }, {
        "id" : "collectedVariable124",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName124",
        "Label" : "collectedVariableLabel124"
      }, {
        "id" : "collectedVariable125",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName125",
        "Label" : "collectedVariableLabel125"
      }, {
        "id" : "collectedVariable126",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName126",
        "Label" : "collectedVariableLabel126"
      }, {
        "id" : "collectedVariable127",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName127",
        "Label" : "collectedVariableLabel127"
      }, {
        "id" : "collectedVariable128",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName128",
        "Label" : "collectedVariableLabel128"
      }, {
        "id" : "collectedVariable129",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName129",
        "Label" : "collectedVariableLabel129"
      }, {
        "id" : "collectedVariable130",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName130",
        "Label" : "collectedVariableLabel130"
      }, {
        "id" : "collectedVariable131",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName131",
        "Label" : "collectedVariableLabel131"
      }, {
        "id" : "collectedVariable132",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName132",
        "Label" : "collectedVariableLabel132"
      }, {
        "id" : "collectedVariable133",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName133",
        "Label" : "collectedVariableLabel133"
      }, {
        "id" : "collectedVariable134",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName134",
        "Label" : "collectedVariableLabel134"
      }, {
        "id" : "collectedVariable135",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName135",
        "Label" : "collectedVariableLabel135"
      }, {
        "id" : "collectedVariable136",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName136",
        "Label" : "collectedVariableLabel136"
      }, {
        "id" : "collectedVariable137",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName137",
        "Label" : "collectedVariableLabel137"
      }, {
        "id" : "collectedVariable138",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName138",
        "Label" : "collectedVariableLabel138"
      }, {
        "id" : "collectedVariable139",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName139",
        "Label" : "collectedVariableLabel139"
      }, {
        "id" : "collectedVariable140",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName140",
        "Label" : "collectedVariableLabel140"
      }, {
        "id" : "collectedVariable141",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName141",
        "Label" : "collectedVariableLabel141"
      }, {
        "id" : "collectedVariable142",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName142",
        "Label" : "collectedVariableLabel142"
      }, {
        "id" : "collectedVariable143",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName143",
        "Label" : "collectedVariableLabel143"
      }, {
        "id" : "collectedVariable144",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName144",
        "Label" : "collectedVariableLabel144"
      }, {
        "id" : "collectedVariable145",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName145",
        "Label" : "collectedVariableLabel145"
      }, {
        "id" : "collectedVariable146",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName146",
        "Label" : "collectedVariableLabel146"
      }, {
        "id" : "collectedVariable147",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName147",
        "Label" : "collectedVariableLabel147"
      }, {
        "id" : "collectedVariable148",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName148",
        "Label" : "collectedVariableLabel148"
      }, {
        "id" : "collectedVariable149",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName149",
        "Label" : "collectedVariableLabel149"
      }, {
        "id" : "collectedVariable150",
        "type" : "CollectedVariableType",
        "Name" : "collectedVariableName150",
        "Label" : "collectedVariableLabel150"
      }, {
        "id" : "calculatedVariable1",
        "type" : "CalculatedVariableType",
        "Name" : "CalculatedVariableName1",
        "Label" : "CalculatedVariableLabelLabel1",
        "Formula" : "\"CalculatedVariableFormula1\""
      }, {
        "id" : "calculatedVariable2",
        "type" : "CalculatedVariableType",
        "Name" : "CalculatedVariableName2",
        "Label" : "CalculatedVariableLabelLabel2",
        "Formula" : "\"CalculatedVariableFormula2\""
      }, {
        "id" : "externalVariable1",
        "type" : "ExternalVariableType",
        "Name" : "ExternalVariableName1",
        "Label" : "ExternalVariableName1"
      }, {
        "id" : "externalVariable2",
        "type" : "ExternalVariableType",
        "Name" : "ExternalVariableName2",
        "Label" : "ExternalVariableName2"
      } ]
    }
  }
]
