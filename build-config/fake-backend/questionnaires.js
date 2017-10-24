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
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable21"
        }, {
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable22"
        }, {
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable23"
        }, {
          "Datatype" : {
            "typeName" : "BOOLEAN",
            "type" : "BooleanDatatypeType"
          },
          "CollectedVariableReference" : "collectedVariable24"
        }, {
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
        }
      }, {
        "id" : "isg1gjjt",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_RADIO",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de bouton radio\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de bouton radio" ],
        "Response" : [ {
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
        }
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
        }
      }, {
        "id" : "isg1uc3w",
        "questionType" : "MULTIPLE_CHOICE",
        "type" : "QuestionType",
        "Name" : "MULTIPLE_CHECKBOX",
        "Label" : [ "##{\"label\":\"Je suis le libellé de la question à choix multiple sous forme de cases à cocher\",\"conditions\":[]} Je suis le libellé de la question à choix multiple sous forme de cases à cocher" ],
        "Response" : [ {
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
        }
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
        }, {
          "id" : "iwm8xktl",
          "questionType" : "MULTIPLE_CHOICE",
          "type" : "QuestionType",
          "Name" : "FORMATION",
          "Label" : [ "##{\"label\":\"Depuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?\",\"conditions\":[]} Depuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?" ],
          "Response" : [ {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable44"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable45"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable46"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable47"
          }, {
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
          }
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
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable49"
          }, {
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable50"
          }, {
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable51"
          }, {
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 20,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable52"
          }, {
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
          }
        }, {
          "id" : "isg28ywr",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_1A_nM",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question tableau un axe - plusieurs mesures\",\"conditions\":[]} Je suis le libellé de la question tableau un axe - plusieurs mesures" ],
          "Response" : [ {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable54"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable55"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable56"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable57"
          }, {
            "Datatype" : {
              "typeName" : "BOOLEAN",
              "type" : "BooleanDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable58"
          }, {
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
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable64"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable65"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable66"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10,
              "Decimals" : 1
            },
            "CollectedVariableReference" : "collectedVariable67"
          }, {
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
          }
        }, {
          "id" : "isg1rx4a",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "TABLE_LIST",
          "Label" : [ "##{\"label\":\"Je suis le libellé de la question liste\",\"conditions\":[]} Je suis le libellé de la question liste" ],
          "Response" : [ {
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 50,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable69"
          }, {
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
          }
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
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable71"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable72"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable73"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType"
            },
            "CollectedVariableReference" : "collectedVariable74"
          }, {
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
          }
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
            "Datatype" : {
              "typeName" : "TEXT",
              "type" : "TextDatatypeType",
              "MaxLength" : 50,
              "Pattern" : ""
            },
            "CollectedVariableReference" : "collectedVariable76"
          }, {
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
          }
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
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable79"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable80"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable81"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable82"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable83"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable84"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable85"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable86"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable87"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable88"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable89"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable90"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable91"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable92"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable93"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable94"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable95"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable96"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 1,
              "Maximum" : 10
            },
            "CollectedVariableReference" : "collectedVariable97"
          }, {
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
          }
        }, {
          "id" : "isg3ixbk",
          "questionType" : "TABLE",
          "type" : "QuestionType",
          "Name" : "JESUISLELI",
          "Label" : [ "##{\"label\":\"Je suis le libellé d'un tableau à deux axes 1 mesure unique\",\"conditions\":[]} Je suis le libellé d'un tableau à deux axes 1 mesure unique" ],
          "Response" : [
            {
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
          }
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
            {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable119"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable120"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable121"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable122"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable123"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable124"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable125"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable126"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable127"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable128"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable129"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable130"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable131"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable132"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable133"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable134"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable135"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable136"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable137"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable138"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable139"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable140"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable141"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable142"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable143"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable144"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable145"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable146"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable147"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable148"
          }, {
            "Datatype" : {
              "typeName" : "NUMERIC",
              "type" : "NumericDatatypeType",
              "Minimum" : 0
            },
            "CollectedVariableReference" : "collectedVariable149"
          }, {
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
          }
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
          "Value" : "",
          "Label" : "choix 1"
        }, {
          "Value" : "",
          "Label" : "choix 2"
        }, {
          "Value" : "",
          "Label" : "choix 3"
        }, {
          "Value" : "",
          "Label" : "choix 4"
        }, {
          "Value" : "",
          "Label" : "choix 5"
        } ]
      }, {
        "id" : "isg1uorv",
        "Name" : "",
        "Label" : "Oui_Non",
        "Code" : [ {
          "Value" : "",
          "Label" : "Oui"
        }, {
          "Value" : "",
          "Label" : "Non"
        } ]
      }, {
        "id" : "isg27fpv",
        "Name" : "",
        "Label" : "LISTE_TEST_2",
        "Code" : [ {
          "Value" : "",
          "Label" : "choix 6"
        }, {
          "Value" : "",
          "Label" : "choix 7"
        }, {
          "Value" : "",
          "Label" : "choix 8"
        }, {
          "Value" : "",
          "Label" : "choix 9"
        } ]
      }, {
        "id" : "iw22dla9",
        "Name" : "",
        "Label" : "DOMAINE",
        "Code" : [ {
          "Value" : "",
          "Label" : "Eaux usées"
        }, {
          "Value" : "",
          "Label" : "Déchets hors radioactifs"
        }, {
          "Value" : "",
          "Label" : "Protection de l’air"
        }, {
          "Value" : "",
          "Label" : "Limitation des émissions de gaz à effet de serre"
        }, {
          "Value" : "",
          "Label" : "Bruits et vibrations"
        }, {
          "Value" : "",
          "Label" : "Sols, eaux souterraines et de surface"
        }, {
          "Value" : "",
          "Label" : "Sites, paysages et biodiversité"
        }, {
          "Value" : "",
          "Label" : "Autres (rayonnement, R&D sur l’environnement…)"
        } ]
      }, {
        "id" : "iw22fswu",
        "Name" : "",
        "Label" : "L_SEXE",
        "Code" : [ {
          "Value" : "",
          "Label" : "Masculin"
        }, {
          "Value" : "",
          "Label" : "Féminin"
        } ]
      }, {
        "id" : "iw22r14q",
        "Name" : "",
        "Label" : "NATURE",
        "Code" : [ {
          "Value" : "",
          "Label" : "Pré-traitement, traitement et élimination"
        }, {
          "Value" : "",
          "Label" : "Mesure et contrôle"
        }, {
          "Value" : "",
          "Label" : "Recyclage, tri et valorisation"
        }, {
          "Value" : "",
          "Label" : "Prévention des pollutions"
        } ]
      }, {
        "id" : "iw22xe2u",
        "Name" : "",
        "Label" : "L_effectifs",
        "Code" : [ {
          "Value" : "",
          "Label" : "Effectifs salariés à temps plein"
        }, {
          "Value" : "",
          "Label" : "Effectifs salariés à temps partiel moins de 6 mois"
        }, {
          "Value" : "",
          "Label" : "Effectifs salariés à temps partiel 6 mois et plus"
        }, {
          "Value" : "",
          "Label" : "Apprentis, stagiaires rémunérés"
        }, {
          "Value" : "",
          "Label" : "Total"
        } ]
      }, {
        "id" : "iw25euzq",
        "Name" : "",
        "Label" : "L_GLACE",
        "Code" : [ {
          "Value" : "",
          "Label" : "vanille"
        }, {
          "Value" : "",
          "Label" : "chocolat"
        }, {
          "Value" : "",
          "Label" : "fraise"
        }, {
          "Value" : "",
          "Label" : "abricot"
        }, {
          "Value" : "",
          "Label" : "citron"
        }, {
          "Value" : "",
          "Label" : "rhum raisins"
        } ]
      }, {
        "id" : "iw25voxc",
        "Name" : "",
        "Label" : "L_fréquence",
        "Code" : [ {
          "Value" : "",
          "Label" : "Toujours"
        }, {
          "Value" : "",
          "Label" : "Souvent"
        }, {
          "Value" : "",
          "Label" : "Parfois"
        }, {
          "Value" : "",
          "Label" : "Jamais"
        } ]
      }, {
        "id" : "iwg8titv",
        "Name" : "",
        "Label" : "LIST_ONE",
        "Code" : [ {
          "Value" : "",
          "Label" : "Item 1"
        }, {
          "Value" : "",
          "Label" : "Item 2"
        }, {
          "Value" : "",
          "Label" : "Item 3"
        }, {
          "Value" : "",
          "Label" : "Item 4"
        }, {
          "Value" : "",
          "Label" : "Item 5"
        } ]
      }, {
        "id" : "iwgdzvye",
        "Name" : "",
        "Label" : "weather_list",
        "Code" : [ {
          "Value" : "",
          "Label" : "sunny"
        }, {
          "Value" : "",
          "Label" : "cloudy"
        }, {
          "Value" : "",
          "Label" : "rainy"
        }, {
          "Value" : "",
          "Label" : "a mix of all, I'm in Brittany"
        } ]
      }, {
        "id" : "iwge4s84",
        "Name" : "",
        "Label" : "LIST_TWO",
        "Code" : [ {
          "Value" : "",
          "Label" : "item 6"
        }, {
          "Value" : "",
          "Label" : "item 7"
        }, {
          "Value" : "",
          "Label" : "item 8"
        }, {
          "Value" : "",
          "Label" : "item 9"
        }, {
          "Value" : "",
          "Label" : "item 10"
        } ]
      }, {
        "id" : "iwgebn3a",
        "Name" : "",
        "Label" : "EVENING",
        "Code" : [ {
          "Value" : "",
          "Label" : "Drink some beers"
        }, {
          "Value" : "",
          "Label" : "Go to cinema"
        }, {
          "Value" : "",
          "Label" : "Watch a movie at home"
        }, {
          "Value" : "",
          "Label" : "Cook good meals for my friends"
        }, {
          "Value" : "",
          "Label" : "Read a novel"
        } ]
      }, {
        "id" : "iwgeg7ek",
        "Name" : "",
        "Label" : "LIST_SEX_EN",
        "Code" : [ {
          "Value" : "",
          "Label" : "Man"
        }, {
          "Value" : "",
          "Label" : "Woman"
        } ]
      }, {
        "id" : "iwgehiif",
        "Name" : "",
        "Label" : "Yes_No_EN",
        "Code" : [ {
          "Value" : "",
          "Label" : "Yes"
        }, {
          "Value" : "",
          "Label" : "No"
        } ]
      }, {
        "id" : "iwm8rfv5",
        "Name" : "",
        "Label" : "L_TIC_TPE",
        "Code" : [ {
          "Value" : "",
          "Label" : "La commande ou la réservation en ligne (panier virtuel) ?"
        }, {
          "Value" : "",
          "Label" : "La description de biens ou services, ou des listes de prix ?"
        }, {
          "Value" : "",
          "Label" : "Des liens permettant d’accéder aux pages de l’entreprise dans les médias\n                    sociaux (Facebook, Twitter, Google+, LinkedIn, Viadeo, etc.) ?"
        } ]
      }, {
        "id" : "iwm8rneb",
        "Name" : "",
        "Label" : "L_ventes",
        "Code" : [ {
          "Value" : "",
          "Label" : "A des particuliers"
        }, {
          "Value" : "",
          "Label" : "A des professionnels ou revendeurs"
        } ]
      }, {
        "id" : "iwm8zloc",
        "Name" : "",
        "Label" : "L_activite",
        "Code" : [ {
          "Value" : "",
          "Label" : "à temps complet"
        }, {
          "Value" : "",
          "Label" : "à temps partiel 80 % ou plus"
        }, {
          "Value" : "",
          "Label" : "de mi-temps à moins de 80 %"
        }, {
          "Value" : "",
          "Label" : "moins d’un mi-temps"
        } ]
      }, {
        "id" : "iwm9fhue",
        "Name" : "",
        "Label" : "L_formation",
        "Code" : [ {
          "Value" : "",
          "Label" : "Formation financée ou organisée par l’employeur ou une agence d’intérim (hors\n                    apprentissage et contrats de professionnalisation)"
        }, {
          "Value" : "",
          "Label" : "Formation donnée par une école de la 2e chance, par l’EPIDE"
        }, {
          "Value" : "",
          "Label" : "Formation conseillée ou organisée par Pôle emploi, par une mission locale,\n                    une chambre des métiers, une agence de placement (APEC, INGEUS, …), (y compris\n                    ateliers de techniques de recherche d’emploi, ateliers CV)"
        }, {
          "Value" : "",
          "Label" : "Une formation professionnalisante ou à but professionnel (pour trouver un\n                    emploi, améliorer votre situation, …)"
        }, {
          "Value" : "",
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
