module.exports = [{
  id: 'fr.insee-POPO-QPO-DOC',
  name: 'DOC',
  label: ['Je suis le titre du questionnaire'],
  declarations: [],
  goTos: [],
  controls: [],
  genericName: 'QUESTIONNAIRE',
  children: [
    {
      id: 'ir6cju1z',
      name: 'SIMPLE',
      label: ['Module des questions ouvertes : je suis le libellé du module'],
      declarations: [{ declarationType: 'INSTRUCTION', text: 'Ceci est une déclaration de type consigne.\n' }],
      goTos: [],
      controls: [],
      genericName: 'MODULE',
      children: [
        {
          id: 'iwm8qg8x',
          name: 'INTRODUCTI',
          label: ['Introduction : je suis le libellé du paragraphe'],
          declarations: [
            {
              declarationType: 'INSTRUCTION',
              text:
                "Ce questionnaire est un exemple de ce qu'il est possible de faire en utilisant les outils Eno et Pogues. Il se découpe en plusieurs modules (un module par page), regroupant les différents types de questions. Dans chaque module, vous trouverez la description des questions de chaque type, ainsi que des exemples tirés de questionnaires Insee.\n\n​\n",
            },
          ],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iwm8r0ba',
              name: 'COCHEZ',
              label: [
                '##{"label":"Cochez la case pour afficher la suite du questionnaire\\n","conditions":[]}\nCochez la case pour afficher la suite du questionnaire\n',
              ],
              declarations: [],
              goTos: [
                {
                  id: 'iwnegyn6',
                  description: 'Si vous avez coché la case, poursuivez le questionnaire.',
                  expression: "${S1-S1-Q1-R1}='' or ${S1-S1-Q1-R1}='0' ",
                  ifTrue: 'isg13cuk',
                },
              ],
              controls: [],
              questionType: 'SIMPLE',
              responses: [{ mandatory: false, datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } }],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'ir6co0qf',
          name: 'MODULE_TEXTE',
          label: ['Sous-module : questions de type texte'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'ir6cqzev',
              name: 'TEXTE_LONG',
              label: [
                '##{"label":"Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères\\n","conditions":[]}\nJe suis le libellé de la question de type texte de longueur supérieure à 250 caractères\n',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: 'Je suis le texte de la consigne\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'TEXT', maxLength: 250, pattern: '', type: 'TextDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'ir6cm77g',
              name: 'TEXTE_COURT',
              label: [
                '##{"label":"Je suis le libellé de la question de type texte de longueur inférieure à 200 caractères","conditions":[]}\nJe suis le libellé de la question de type texte de longueur inférieure à 200 caractères',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'TEXT', maxLength: 150, pattern: '', type: 'TextDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'ir6cruy6',
          name: 'MODULE_NUM',
          label: ['Sous-module : questions de type numérique'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'ir6cifax',
              name: 'NUM_ENTIER',
              label: [
                '##{"label":"Je suis le libellé de la question de type numérique entier","conditions":[]}\nJe suis le libellé de la question de type numérique entier',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: 120,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'ir6cmuqa',
              name: 'NUM_DECIMAL',
              label: [
                '##{"label":"Je suis le libellé de la question de type numérique décimal","conditions":[]}\nJe suis le libellé de la question de type numérique décimal',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: 'Je suis le texte de la consigne\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'ir6ctbkt',
          name: 'SOUSMODULE',
          label: ['Sous-module : questions de type date et durée'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'ir6ct69u',
              name: 'SIMPLE_DATE',
              label: [
                '##{"label":"Je suis le libellé de la question de type date au format JJ/MM/AAAA","conditions":[]}\nJe suis le libellé de la question de type date au format JJ/MM/AAAA',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'DATE', minimum: '', maximum: '', format: '', type: 'DateDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'isg1kh8l',
          name: 'SOUSMODULE',
          label: ['Sous modules : question booléen'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'isg1hh9m',
              name: 'BOOL',
              label: [
                '##{"label":"Je suis le libellé de la question simple de type booléen","conditions":[]}\nJe suis le libellé de la question simple de type booléen',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [{ mandatory: false, datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } }],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'iwnfdy97',
          name: 'EXEMPLES',
          label: ['Exemples'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iwm6shxx',
              name: 'ACT_PRIN',
              label: [
                '##{"label":"Veuillez indiquer l\'activité principale de l\'entreprise sous son appellation usuelle","conditions":[]}\nVeuillez indiquer l\'activité principale de l\'entreprise sous son appellation usuelle',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    '(par exemple : commerce de fruits et légumes, boulangerie, charcuterie artisanale ou industrielle, commerce de détail de meubles...)\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
                {
                  declarationType: 'INSTRUCTION',
                  text: "Exemple tiré de l'enquête sectorielle annuelle\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'TEXT', maxLength: 200, pattern: '', type: 'TextDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm8woim',
              name: 'PROFESSION',
              label: [
                '##{"label":"Indiquez le plus précisément possible la profession exercée dans votre emploi actuel","conditions":[]}\nIndiquez le plus précisément possible la profession exercée dans votre emploi actuel',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    'Soyez très précis sur votre métier : « Caissière » (et non « employée »), « Fleuriste » (et non « Commerçant »), « Professeur des écoles»\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête EVA 2016\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'TEXT', maxLength: 200, pattern: '', type: 'TextDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iw7ux0w8',
              name: 'QUELESTLEM',
              label: [
                '##{"label":"Quel est le montant total des investissements réalisés dans votre entreprise ?","conditions":[]}\nQuel est le montant total des investissements réalisés dans votre entreprise ?',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: 999999999,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm8v2g4',
              name: 'SALAIRE',
              label: [
                '##{"label":"Quel était le montant net de votre salaire mensuel correspondant à cet emploi en mars 2016 ?","conditions":[]}\nQuel était le montant net de votre salaire mensuel correspondant à cet emploi en mars 2016 ?',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête EVA 2016\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: 99999,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm8t2p5',
              name: 'CLOT',
              label: [
                '##{"label":"Quelle est la date de clôture du dernier exercice comptable clos ?","conditions":[]}\nQuelle est la date de clôture du dernier exercice comptable clos ?',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    "Définition de l'exercice comptable sur lequel porte ce questionnaire :\n\nLes informations à fournir se rapportent à votre exercice comptable 2015.\n\n​\n\nVotre exercice comptable 2015 doit être clôturé entre le 1er juin 2015 et le 31 mai 2016.\n\n​\n\nSi vous avez clotûré deux exercices sur cette période, prendre celui qui a leplus de mois en 2015.\n\n​\n\nVous devez également répondre à l'énquête si votre entreprise a cessé son activité :\n\nen 2015 et a plus de 6 mois d'activité ;\n\nen 2016.\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm99upn',
              name: 'DEPUISQUEL',
              label: [
                '##{"label":"Depuis quelle date travailliez-vous dans cette entreprise / dans la fonction publique ?","conditions":[]}\nDepuis quelle date travailliez-vous dans cette entreprise / dans la fonction publique ?',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête EVA 2016\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [
                {
                  mandatory: false,
                  datatype: { typeName: 'DATE', minimum: '', maximum: '', format: '', type: 'DateDatatypeType' },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwnevs21',
              name: 'ACT_PROD',
              label: [
                '##{"label":"Si votre établissement n’a pas d’activité industrielle de production ou de transformation, cochez la case ci-contre :","conditions":[]}\nSi votre établissement n’a pas d’activité industrielle de production ou de transformation, cochez la case ci-contre :',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    "Question issue de l'enquête annuelle sur les consommations d'énergie dans l'industrie (EACEI)\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SIMPLE',
              responses: [{ mandatory: false, datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } }],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
      ],
      depth: 1,
      type: 'SequenceType',
    },
    {
      id: 'isg1ikbn',
      name: 'SINGLE',
      label: ['Module des questions à choix unique'],
      declarations: [],
      goTos: [],
      controls: [],
      genericName: 'MODULE',
      children: [
        {
          id: 'isg13cuk',
          name: 'SINGLE_RADIO',
          label: [
            '##{"label":"Je suis le libellé de la question à choix unique sous forme de bouton radio","conditions":[]}\nJe suis le libellé de la question à choix unique sous forme de bouton radio',
          ],
          declarations: [
            {
              declarationType: 'INSTRUCTION',
              text: 'La consigne est après la question\n',
              position: 'AFTER_QUESTION_TEXT',
            },
          ],
          goTos: [],
          controls: [],
          questionType: 'SINGLE_CHOICE',
          responses: [
            {
              codeListReference: 'isg1g6zo',
              mandatory: false,
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
            },
          ],
          type: 'QuestionType',
        },
        {
          id: 'isg1hq0f',
          name: 'SINGLE_DROPDOWN',
          label: [
            '##{"label":"Je suis le libellé de la question à choix unique sous forme de liste déroulante","conditions":[]}\nJe suis le libellé de la question à choix unique sous forme de liste déroulante',
          ],
          declarations: [],
          goTos: [],
          controls: [],
          questionType: 'SINGLE_CHOICE',
          responses: [
            {
              codeListReference: 'isg1g6zo',
              mandatory: false,
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
            },
          ],
          type: 'QuestionType',
        },
        {
          id: 'isg1bz8h',
          name: 'SINGLE_CHECKBOX',
          label: [
            '##{"label":"Je suis le libellé de la question à choix unique sous forme de cases à cocher","conditions":[]}\nJe suis le libellé de la question à choix unique sous forme de cases à cocher',
          ],
          declarations: [],
          goTos: [],
          controls: [],
          questionType: 'SINGLE_CHOICE',
          responses: [
            {
              codeListReference: 'isg1g6zo',
              mandatory: false,
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
            },
          ],
          type: 'QuestionType',
        },
        {
          id: 'iwnesc00',
          name: 'EXEMPLES',
          label: ['Exemples'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iw22nmhl',
              name: 'FILTRE_INV',
              label: [
                '##{"label":"Avez-vous, au cours du dernier exercice comptable, investi dans des équipements spécifiquement dédiés à l’environnement : bennes, filtres, bacs de rétention, instruments de mesure de la pollution","conditions":[]}\nAvez-vous, au cours du dernier exercice comptable, investi dans des équipements spécifiquement dédiés à l’environnement : bennes, filtres, bacs de rétention, instruments de mesure de la pollution',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Cette question est extraite de l'enquête Antipol\n",
                  position: 'AFTER_RESPONSE',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SINGLE_CHOICE',
              responses: [
                {
                  codeListReference: 'isg1uorv',
                  mandatory: false,
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm6zyaq',
              name: 'VENTES_MARCH',
              label: [
                '##{"label":"Vendez vous vos marchandises majoritairement\\n","conditions":[]}\nVendez vous vos marchandises majoritairement\n',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête sectorielle annuelle (commerce)\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SINGLE_CHOICE',
              responses: [
                {
                  codeListReference: 'iwm8rneb',
                  mandatory: false,
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                },
              ],
              type: 'QuestionType',
            },
            {
              id: 'iwm9e4pi',
              name: 'TEMPSPLEIN',
              label: [
                '##{"label":"Toujours au 1er mars 2016, vous travailliez","conditions":[]}\nToujours au 1er mars 2016, vous travailliez',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête EVA 2016\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'SINGLE_CHOICE',
              responses: [
                {
                  codeListReference: 'iwm8zloc',
                  mandatory: false,
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                },
              ],
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
      ],
      depth: 1,
      type: 'SequenceType',
    },
    {
      id: 'isg1gytw',
      name: 'MULTIPLE',
      label: ['Module des questions à choix multiple'],
      declarations: [],
      goTos: [],
      controls: [],
      genericName: 'MODULE',
      children: [
        {
          id: 'isg1j5rw',
          name: 'MULTIPLE_BOOL',
          label: [
            '##{"label":"Je suis le libellé de la question à choix multiple sous forme de booléen","conditions":[]}\nJe suis le libellé de la question à choix multiple sous forme de booléen',
          ],
          declarations: [],
          goTos: [],
          controls: [],
          questionType: 'MULTIPLE_CHOICE',
          responses: [
            { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
            { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
            { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
            { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
            { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
          ],
          responseStructure: {
            dimensions: [
              { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
              { dimensionType: 'MEASURE', dynamic: 0 },
            ],
          },
          type: 'QuestionType',
        },
        {
          id: 'isg1gjjt',
          name: 'MULTIPLE_RADIO',
          label: [
            '##{"label":"Je suis le libellé de la question à choix multiple sous forme de bouton radio","conditions":[]}\nJe suis le libellé de la question à choix multiple sous forme de bouton radio',
          ],
          declarations: [],
          goTos: [],
          controls: [],
          questionType: 'MULTIPLE_CHOICE',
          responses: [
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
              codeListReference: 'isg1uorv',
            },
          ],
          responseStructure: {
            dimensions: [
              { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
              { dimensionType: 'MEASURE', dynamic: 0 },
            ],
          },
          type: 'QuestionType',
        },
        {
          id: 'isg20r8n',
          name: 'MULTIPLE_DROPDOWN',
          label: [
            '##{"label":"Je suis le libellé de la question à choix multiple sous forme de liste déroulante","conditions":[]}\nJe suis le libellé de la question à choix multiple sous forme de liste déroulante',
          ],
          declarations: [
            {
              declarationType: 'INSTRUCTION',
              text: 'La consigne est avant la question\n',
              position: 'BEFORE_QUESTION_TEXT',
            },
          ],
          goTos: [],
          controls: [],
          questionType: 'MULTIPLE_CHOICE',
          responses: [
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'DROPDOWN' },
              codeListReference: 'isg1uorv',
            },
          ],
          responseStructure: {
            dimensions: [
              { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
              { dimensionType: 'MEASURE', dynamic: 0 },
            ],
          },
          type: 'QuestionType',
        },
        {
          id: 'isg1uc3w',
          name: 'MULTIPLE_CHECKBOX',
          label: [
            '##{"label":"Je suis le libellé de la question à choix multiple sous forme de cases à cocher","conditions":[]}\nJe suis le libellé de la question à choix multiple sous forme de cases à cocher',
          ],
          declarations: [],
          goTos: [],
          controls: [],
          questionType: 'MULTIPLE_CHOICE',
          responses: [
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
              codeListReference: 'isg1uorv',
            },
            {
              datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'CHECKBOX' },
              codeListReference: 'isg1uorv',
            },
          ],
          responseStructure: {
            dimensions: [
              { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
              { dimensionType: 'MEASURE', dynamic: 0 },
            ],
          },
          type: 'QuestionType',
        },
        {
          id: 'iwnevbej',
          name: 'EXEMPLES',
          label: ['Exemples'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iwm8wtis',
              name: 'SITE_ENTREPRISE',
              label: [
                '##{"label":"Le site ou la page d’accueil de votre entreprise propose-t-il actuellement les services suivants :type de contrat suivant :\\n","conditions":[]}\nLe site ou la page d’accueil de votre entreprise propose-t-il actuellement les services suivants :type de contrat suivant :\n',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Question issue de l'enquête Tic-TPE 2016\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'MULTIPLE_CHOICE',
              responses: [
                {
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                  codeListReference: 'isg1uorv',
                },
                {
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                  codeListReference: 'isg1uorv',
                },
                {
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                  codeListReference: 'isg1uorv',
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'iwm8rfv5' },
                  { dimensionType: 'MEASURE', dynamic: 0 },
                ],
              },
              type: 'QuestionType',
            },
            {
              id: 'iwm8xktl',
              name: 'FORMATION',
              label: [
                '##{"label":"Depuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?","conditions":[]}\nDepuis la fin de ces études, avez-vous suivi une ou plusieurs des formations suivantes ?',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'MULTIPLE_CHOICE',
              responses: [
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'iwm9fhue' },
                  { dimensionType: 'MEASURE', dynamic: 0 },
                ],
              },
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
      ],
      depth: 1,
      type: 'SequenceType',
    },
    {
      id: 'isg1qnrf',
      name: 'TABLE',
      label: ['Module des questions sous forme de tableau'],
      declarations: [],
      goTos: [],
      controls: [],
      genericName: 'MODULE',
      children: [
        {
          id: 'isg24et5',
          name: 'TABLE_1A',
          label: ["Sous module des tableaux à un seul axe d'information"],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'isg1s9ho',
              name: 'TABLE_1A_1M',
              label: [
                '##{"label":"Je suis le libellé de la question tableau un axe - une mesure","conditions":[]}\nJe suis le libellé de la question tableau un axe - une mesure',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                { datatype: { typeName: 'TEXT', maxLength: 20, pattern: '', type: 'TextDatatypeType' } },
                { datatype: { typeName: 'TEXT', maxLength: 20, pattern: '', type: 'TextDatatypeType' } },
                { datatype: { typeName: 'TEXT', maxLength: 20, pattern: '', type: 'TextDatatypeType' } },
                { datatype: { typeName: 'TEXT', maxLength: 20, pattern: '', type: 'TextDatatypeType' } },
                { datatype: { typeName: 'TEXT', maxLength: 20, pattern: '', type: 'TextDatatypeType' } },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure 1 texte' },
                ],
              },
              type: 'QuestionType',
            },
            {
              id: 'isg28ywr',
              name: 'TABLE_1A_nM',
              label: [
                '##{"label":"Je suis le libellé de la question tableau un axe - plusieurs mesures","conditions":[]}\nJe suis le libellé de la question tableau un axe - plusieurs mesures',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                { datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' } },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
                {
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
                {
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
                {
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
                {
                  datatype: { typeName: 'NUMERIC', minimum: 1, maximum: 10, decimals: 1, type: 'NumericDatatypeType' },
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure simple booléen' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure unique radio' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure simple entier' },
                ],
              },
              type: 'QuestionType',
            },
            {
              id: 'isg1rx4a',
              name: 'TABLE_LIST',
              label: [
                '##{"label":"Je suis le libellé de la question liste","conditions":[]}\nJe suis le libellé de la question liste',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                { datatype: { typeName: 'TEXT', maxLength: 50, pattern: '', type: 'TextDatatypeType' } },
                { datatype: { typeName: 'DATE', minimum: '', maximum: '', format: '', type: 'DateDatatypeType' } },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: '-' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure texte' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure date' },
                ],
              },
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'iwnexpuc',
          name: 'EXEMPLES',
          label: ['Exemples'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iw22jcng',
              name: 'EFFECTIFSS',
              label: [
                '##{"label":"Effectifs salariés au 31/12/2015","conditions":[]}\nEffectifs salariés au 31/12/2015',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    'Comptez la totalité des salariés rémunérés directement par l’entreprise et inscrits à la date du 31/12/2015, y compris les dirigeants de sociétés et gérants salariés, le personnel saisonnier ou occasionnel.\n\n​\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    'Ne comptez pas le personnel rémunéré par d’autres entreprises (travail temporaire, personnel prêté par d’autres entreprises) ni les stagiaires non rémunérés.\n',
                  position: 'AFTER_QUESTION_TEXT',
                },
                {
                  declarationType: 'INSTRUCTION',
                  text: "Cette question est extraite de l'enquête structurelle auprès des entreprises mahoraises\n",
                  position: 'AFTER_RESPONSE',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: null,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'iw22xe2u' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Effectifs salariés' },
                ],
              },
              type: 'QuestionType',
            },
            {
              id: 'iwncfpwn',
              name: 'LISTE_PERS',
              label: [
                '##{"label":"Liste des personnes qui habitent ce logement\\n","conditions":[]}\nListe des personnes qui habitent ce logement\n',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text:
                    "Veuillez inscrire un par un les prénoms des personnes qui habitent ce logement, même une partie de la semaine y compris celles qui sont temporairement absentes au moment de l’enquête (vacances, voyage d'affaires, hospitalisation, élèves ou étudiants vivant ailleurs pour leurs études mais encore rattachés au logement, conjoints éloignés pour raisons professionnelles, enfants en garde alternée, personnes âgées en institution …)\n",
                  position: 'AFTER_QUESTION_TEXT',
                },
              ],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                { datatype: { typeName: 'TEXT', maxLength: 50, pattern: '', type: 'TextDatatypeType' } },
                {
                  codeListReference: 'iw22fswu',
                  datatype: {
                    typeName: 'TEXT',
                    maxLength: 1,
                    pattern: '',
                    type: 'TextDatatypeType',
                    visHint: 'CHECKBOX',
                  },
                },
                { datatype: { typeName: 'DATE', minimum: '', maximum: '', format: '', type: 'DateDatatypeType' } },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: '-' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Prénom' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Sexe' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Date de naissance' },
                ],
              },
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'isg1x9p9',
          name: 'TABLE_2A',
          label: ["Sous module des tableaux à deux axes d'information"],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'isg1v5d2',
              name: 'TABLE_2A_1SIMPLE',
              label: [
                '##{"label":"Je suis le libellé d\'un tableau à deux axes 1 mesure simple","conditions":[]}\nJe suis le libellé d\'un tableau à deux axes 1 mesure simple',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 1,
                    maximum: 10,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
                  { dimensionType: 'SECONDARY', dynamic: 0, codeListReference: 'isg27fpv' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure nombre' },
                ],
              },
              type: 'QuestionType',
            },
            {
              id: 'isg3ixbk',
              name: 'JESUISLELI',
              label: [
                '##{"label":"Je suis le libellé d\'un tableau à deux axes 1 mesure unique","conditions":[]}\nJe suis le libellé d\'un tableau à deux axes 1 mesure unique',
              ],
              declarations: [],
              goTos: [],
              controls: [],
              questionType: 'TABLE',
              responses: [
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
                {
                  codeListReference: 'isg1uorv',
                  datatype: { typeName: 'TEXT', maxLength: 1, pattern: '', type: 'TextDatatypeType', visHint: 'RADIO' },
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'isg1g6zo' },
                  { dimensionType: 'SECONDARY', dynamic: 0, codeListReference: 'isg27fpv' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Mesure unique' },
                ],
              },
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
        {
          id: 'iwnet09y',
          name: 'EXEMPLES',
          label: ['Exemples'],
          declarations: [],
          goTos: [],
          controls: [],
          genericName: 'SUBMODULE',
          children: [
            {
              id: 'iw22jwft',
              name: 'RENSEIGNEZ',
              label: [
                '##{"label":"Renseignez dans le tableau ci-dessous le montant des investissements spécifiquement dédiés à l\'environnement, selon leur nature et le domaine","conditions":[]}\nRenseignez dans le tableau ci-dessous le montant des investissements spécifiquement dédiés à l\'environnement, selon leur nature et le domaine',
              ],
              declarations: [
                {
                  declarationType: 'INSTRUCTION',
                  text: "Cette question est extraite de l'enquête Antipol\n",
                  position: 'AFTER_RESPONSE',
                },
              ],
              goTos: [],
              controls: [
                {
                  id: 'iw7ukiat',
                  description: '',
                  expression:
                    "(NUM(${S1-S1-Q1-R1})-(NUM(${S1-S1-Q3-R1})+NUM(${S1-S1-Q3-R2})+NUM(${S1-S1-Q3-R3})+NUM(${S1-S1-Q3-R4})+NUM(${S1-S1-Q3-R5})+NUM(${S1-S1-Q3-R6})+NUM(${S1-S1-Q3-R7})+NUM(${S1-S1-Q3-R8})+NUM(${S1-S1-Q3-R9})+NUM(${S1-S1-Q3-R10})+NUM(${S1-S1-Q3-R11})+NUM(${S1-S1-Q3-R12})+NUM(${S1-S1-Q3-R13})+NUM(${S1-S1-Q3-R14})+NUM(${S1-S1-Q3-R15})+NUM(${S1-S1-Q3-R16})+NUM(${S1-S1-Q3-R17})+NUM(${S1-S1-Q3-R18})+NUM(${S1-S1-Q3-R19})+NUM(${S1-S1-Q3-R20})+NUM(${S1-S1-Q3-R21})+NUM(${S1-S1-Q3-R22})+NUM(${S1-S1-Q3-R23})+NUM(${S1-S1-Q3-R24}))<0 ) and ${S1-S1-Q1-R1}!=''",
                  failMessage:
                    "Le montant des investissements spécifiquement dédiés à l'environnement est supérieur au montant total des investissements.",
                },
              ],
              questionType: 'TABLE',
              responses: [
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
                {
                  datatype: {
                    typeName: 'NUMERIC',
                    minimum: 0,
                    maximum: null,
                    decimals: null,
                    type: 'NumericDatatypeType',
                  },
                },
              ],
              responseStructure: {
                dimensions: [
                  { dimensionType: 'PRIMARY', dynamic: 0, codeListReference: 'iw22r14q' },
                  { dimensionType: 'SECONDARY', dynamic: 0, codeListReference: 'iw22dla9' },
                  { dimensionType: 'MEASURE', dynamic: 0, label: 'Montant des investissements en Keuros' },
                ],
              },
              type: 'QuestionType',
            },
          ],
          depth: 2,
          type: 'SequenceType',
        },
      ],
      depth: 1,
      type: 'SequenceType',
    },
  ],
  depth: 0,
  type: 'SequenceType',
  agency: 'fr.insee',
  survey: { agency: 'fr.insee', name: 'POPO' },
  componentGroups: [
    {
      name: 'PAGE_1',
      label: 'Components for page 1',
      Member: [
        'ir6cju1z',
        'iwm8qg8x',
        'iwm8r0ba',
        'ir6co0qf',
        'ir6cqzev',
        'ir6cm77g',
        'ir6cruy6',
        'ir6cifax',
        'ir6cmuqa',
        'ir6ctbkt',
        'ir6ct69u',
        'isg1kh8l',
        'isg1hh9m',
        'iwnfdy97',
        'iwm6shxx',
        'iwm8woim',
        'iw7ux0w8',
        'iwm8v2g4',
        'iwm8t2p5',
        'iwm99upn',
        'iwnevs21',
        'isg1ikbn',
        'isg13cuk',
        'isg1hq0f',
        'isg1bz8h',
        'iwnesc00',
        'iw22nmhl',
        'iwm6zyaq',
        'iwm9e4pi',
        'isg1gytw',
        'isg1j5rw',
        'isg1gjjt',
        'isg20r8n',
        'isg1uc3w',
        'iwnevbej',
        'iwm8wtis',
        'iwm8xktl',
        'isg1qnrf',
        'isg24et5',
        'isg1s9ho',
        'isg28ywr',
        'isg1rx4a',
        'iwnexpuc',
        'iw22jcng',
        'iwncfpwn',
        'isg1x9p9',
        'isg1v5d2',
        'isg3ixbk',
        'iwnet09y',
        'iw22jwft',
      ],
      id: 'j3ft4xup',
    },
  ],
  codeLists: {
    codeList: [
      {
        id: 'isg1g6zo',
        name: '',
        label: 'LISTE_TEST',
        codes: [
          { label: 'choix 1', value: '' },
          { label: 'choix 2', value: '' },
          { label: 'choix 3', value: '' },
          { label: 'choix 4', value: '' },
          { label: 'choix 5', value: '' },
        ],
      },
      { id: 'isg1uorv', name: '', label: 'Oui_Non', codes: [{ label: 'Oui', value: '' }, { label: 'Non', value: '' }] },
      {
        id: 'isg27fpv',
        name: '',
        label: 'LISTE_TEST_2',
        codes: [
          { label: 'choix 6', value: '' },
          { label: 'choix 7', value: '' },
          { label: 'choix 8', value: '' },
          { label: 'choix 9', value: '' },
        ],
      },
      {
        id: 'iw22dla9',
        name: '',
        label: 'DOMAINE',
        codes: [
          { label: 'Eaux usées', value: '' },
          { label: 'Déchets hors radioactifs', value: '' },
          { label: 'Protection de l’air', value: '' },
          { label: 'Limitation des émissions de gaz à effet de serre', value: '' },
          { label: 'Bruits et vibrations', value: '' },
          { label: 'Sols, eaux souterraines et de surface', value: '' },
          { label: 'Sites, paysages et biodiversité', value: '' },
          { label: 'Autres (rayonnement, R&D sur l’environnement…)', value: '' },
        ],
      },
      {
        id: 'iw22fswu',
        name: '',
        label: 'L_SEXE',
        codes: [{ label: 'Masculin', value: '' }, { label: 'Féminin', value: '' }],
      },
      {
        id: 'iw22r14q',
        name: '',
        label: 'NATURE',
        codes: [
          { label: 'Pré-traitement, traitement et élimination', value: '' },
          { label: 'Mesure et contrôle', value: '' },
          { label: 'Recyclage, tri et valorisation', value: '' },
          { label: 'Prévention des pollutions', value: '' },
        ],
      },
      {
        id: 'iw22xe2u',
        name: '',
        label: 'L_effectifs',
        codes: [
          { label: 'Effectifs salariés à temps plein', value: '' },
          { label: 'Effectifs salariés à temps partiel moins de 6 mois', value: '' },
          { label: 'Effectifs salariés à temps partiel 6 mois et plus', value: '' },
          { label: 'Apprentis, stagiaires rémunérés', value: '' },
          { label: 'Total', value: '' },
        ],
      },
      {
        id: 'iw25euzq',
        name: '',
        label: 'L_GLACE',
        codes: [
          { label: 'vanille', value: '' },
          { label: 'chocolat', value: '' },
          { label: 'fraise', value: '' },
          { label: 'abricot', value: '' },
          { label: 'citron', value: '' },
          { label: 'rhum raisins', value: '' },
        ],
      },
      {
        id: 'iw25voxc',
        name: '',
        label: 'L_fréquence',
        codes: [
          { label: 'Toujours', value: '' },
          { label: 'Souvent', value: '' },
          { label: 'Parfois', value: '' },
          { label: 'Jamais', value: '' },
        ],
      },
      {
        id: 'iwg8titv',
        name: '',
        label: 'LIST_ONE',
        codes: [
          { label: 'Item 1', value: '' },
          { label: 'Item 2', value: '' },
          { label: 'Item 3', value: '' },
          { label: 'Item 4', value: '' },
          { label: 'Item 5', value: '' },
        ],
      },
      { id: 'iwgdyhwp', name: '', label: '', codes: [] },
      {
        id: 'iwgdzvye',
        name: '',
        label: 'weather_list',
        codes: [
          { label: 'sunny', value: '' },
          { label: 'cloudy', value: '' },
          { label: 'rainy', value: '' },
          { label: "a mix of all, I'm in Brittany", value: '' },
        ],
      },
      {
        id: 'iwge4s84',
        name: '',
        label: 'LIST_TWO',
        codes: [
          { label: 'item 6', value: '' },
          { label: 'item 7', value: '' },
          { label: 'item 8', value: '' },
          { label: 'item 9', value: '' },
          { label: 'item 10', value: '' },
        ],
      },
      {
        id: 'iwgebn3a',
        name: '',
        label: 'EVENING',
        codes: [
          { label: 'Drink some beers', value: '' },
          { label: 'Go to cinema', value: '' },
          { label: 'Watch a movie at home', value: '' },
          { label: 'Cook good meals for my friends', value: '' },
          { label: 'Read a novel', value: '' },
        ],
      },
      {
        id: 'iwgeg7ek',
        name: '',
        label: 'LIST_SEX_EN',
        codes: [{ label: 'Man', value: '' }, { label: 'Woman', value: '' }],
      },
      {
        id: 'iwgehiif',
        name: '',
        label: 'Yes_No_EN',
        codes: [{ label: 'Yes', value: '' }, { label: 'No', value: '' }],
      },
      {
        id: 'iwm8rfv5',
        name: '',
        label: 'L_TIC_TPE',
        codes: [
          { label: 'La commande ou la réservation en ligne (panier virtuel) ?', value: '' },
          { label: 'La description de biens ou services, ou des listes de prix ?', value: '' },
          {
            label:
              'Des liens permettant d’accéder aux pages de l’entreprise dans les médias sociaux (Facebook, Twitter, Google+, LinkedIn, Viadeo, etc.) ?',
            value: '',
          },
        ],
      },
      {
        id: 'iwm8rneb',
        name: '',
        label: 'L_ventes',
        codes: [{ label: 'A des particuliers', value: '' }, { label: 'A des professionnels ou revendeurs', value: '' }],
      },
      {
        id: 'iwm8zloc',
        name: '',
        label: 'L_activite',
        codes: [
          { label: 'à temps complet', value: '' },
          { label: 'à temps partiel 80 % ou plus', value: '' },
          { label: 'de mi-temps à moins de 80 %', value: '' },
          { label: 'moins d’un mi-temps', value: '' },
        ],
      },
      {
        id: 'iwm9fhue',
        name: '',
        label: 'L_formation',
        codes: [
          {
            label:
              'Formation financée ou organisée par l’employeur ou une agence d’intérim (hors apprentissage et contrats de professionnalisation)',
            value: '',
          },
          { label: 'Formation donnée par une école de la 2e chance, par l’EPIDE', value: '' },
          {
            label:
              'Formation conseillée ou organisée par Pôle emploi, par une mission locale, une chambre des métiers, une agence de placement (APEC, INGEUS, …), (y compris ateliers de techniques de recherche d’emploi, ateliers CV)',
            value: '',
          },
          {
            label:
              'Une formation professionnalisante ou à but professionnel (pour trouver un emploi, améliorer votre situation, …)',
            value: '',
          },
          { label: 'Aucune de ces formations depuis la fin des études, même pour quelques jours', value: '' },
        ],
      },
    ],
    codeListSpecification: [],
  },
}];
