module.exports = [
  {
    "owner": "DG75-L201",
    "ComponentGroup": [
      {
        "MemberReference": [
          "jftgwrjn",
          "jftmxjzg",
          "jftnputy",
          "jfto76f4",
          "jftogzlr",
          "jg29j6th",
          "jftoljr3",
          "jftowzt5",
          "jftp84pw",
          "jfw6mm9a",
          "jfw6sqml",
          "jfw760ge",
          "jfw7bocl",
          "jfw7ua1k",
          "jfw9i6tc",
          "jfw9775n",
          "jfwaplux",
          "jfwaf0eh",
          "jftopgp8",
          "jfwbjrun",
          "jfwbnipg",
          "jfwck7i2",
          "jfwcpmkc",
          "jfwcqoio",
          "jfwd6v6a",
          "jfwcxp13",
          "jfwd1un6",
          "k2n9tgf1",
          "jfwcyx1y",
          "jfwgxry6",
          "jfwgrbz3",
          "jg274yis",
          "jsahlp9k",
          "jh7s1v0h",
          "jg2906j3",
          "jg29j30j",
          "k2kn0bvf",
          "k2kndyyt",
          "k2kncpqe",
          "k2lu0wl1",
          "k3hczdgd",
          "k2knd6ts",
          "k3he9m86",
          "k5qufihp",
          "k2knd7t0",
          "k2lm5r2s",
          "k2lmmbp0",
          "k2lmsvj8",
          "k2lmyq9t",
          "k2lmyzh9",
          "k2lmzym5",
          "k2ln8wbk",
          "k2lnflvv",
          "k2lnw7lk",
          "k2lq5eh8",
          "k2lq3sor",
          "k2lq8qu9",
          "k2lqeczf",
          "k2lqgia1",
          "k2lr03n1",
          "k2lqjokx",
          "jqwfajkx"
        ],
        "Label": [
          "Components for page 1"
        ],
        "id": "k9e4piqw",
        "Name": "PAGE_1"
      }
    ],
    "agency": "fr.insee",
    "genericName": "QUESTIONNAIRE",
    "Label": [
      "Investissements pour protéger l'environnement (ANTIPOL) 2019"
    ],
    "Name": "M1",
    "Variables": {
      "Variable": [
        {
          "Formula": "$IE$ +$ID$+ $IA$ + $IG$ + $IB$ + $IS$ + $IP$ + $IR$",
          "Label": "total en %",
          "id": "jg6h5kd4",
          "type": "CalculatedVariableType",
          "Name": "TOT_PCT",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Formula": "$E3 + $E1 + $E2 + $ER ",
          "Label": "Somme investissements eaux usées",
          "id": "jk3xkwox",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_E",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$D3 + $D1 + $D2 + $DR ",
          "Label": "Somme investissements déchets",
          "id": "jk3y1ws2",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_D",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$A3 + $A1 + $A2 + $AR ",
          "Label": "Somme investissements air",
          "id": "jk3y7oum",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_A",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$G3 + $G1 + $G2 + $GR ",
          "Label": "Somme investissements gaz",
          "id": "jk3y1o6f",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_G",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$B3 + $B1 + $BR ",
          "Label": "Somme investissements bruits",
          "id": "jk3xxps6",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_B",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$S3 + $S1 + $SR ",
          "Label": "Somme investissements sols",
          "id": "jk3y5tjm",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_S",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$P3 + $P1 + $PR ",
          "Label": "Somme investissements paysages",
          "id": "jk3y1d4m",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_P",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$R3 + $R1 + $R2 + $RR ",
          "Label": "Somme investissements autres",
          "id": "jk3y1x3z",
          "type": "CalculatedVariableType",
          "Name": "tot_calc_R",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Formula": "$TGAPE$ + $TGAPD$ + $TGAPLU$ + $TGAPM$ + $TGAPLE$",
          "Label": "Somme TGAP",
          "id": "k9bgkviv",
          "type": "CalculatedVariableType",
          "Name": "Somme_TGAP",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "activite au lancement",
          "id": "jftnkw2w",
          "type": "ExternalVariableType",
          "Name": "ACTIVITE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "5"
          }
        },
        {
          "Label": "borne inférieure effectif",
          "id": "jftoi8wl",
          "type": "ExternalVariableType",
          "Name": "EFFL1",
          "Datatype": {
            "Maximum": "999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "borne supérieure effectif",
          "id": "jftozq0h",
          "type": "ExternalVariableType",
          "Name": "EFFL2",
          "Datatype": {
            "Maximum": "999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "libellé de l'activité au lancement",
          "id": "jfw5zkqt",
          "type": "ExternalVariableType",
          "Name": "ACTIVITE_LIB",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "50"
          }
        },
        {
          "Label": "SIRET",
          "id": "jsafsy2j",
          "type": "ExternalVariableType",
          "Name": "SIRET",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "14"
          }
        },
        {
          "Label": "Année (N-1)",
          "id": "k2m3fw4n",
          "type": "ExternalVariableType",
          "Name": "AN",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "4"
          }
        },
        {
          "Label": "verif_APET label",
          "id": "jg3ouxc3",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "VERIF_APET",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "modif_ape label",
          "id": "js37qp85",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnhdh1",
          "Name": "MODIF_APE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "hors_site label",
          "id": "jfto7tsg",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "HORS_SITE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "verif_eff label",
          "id": "jg29y066",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "VERIF_EFF",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "modif_eff label",
          "id": "jftorer1",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "MODIF_EFF",
          "Datatype": {
            "Maximum": "999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "PROD label",
          "id": "jftoq2n6",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "PROD",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "nature_et label",
          "id": "jftoxyxr",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "NATURE_ET",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "250"
          }
        },
        {
          "Label": "rep_groupe label",
          "id": "jfw65wa5",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "REP_GROUPE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "Line1-siret",
          "id": "jfw6ark7",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "REGROUP01",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "14"
          }
        },
        {
          "Label": "Line1-raison sociale",
          "id": "jfw69e3o",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RS01",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "38"
          }
        },
        {
          "Label": "DATE_CLO label",
          "id": "jfw6sfwi",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DATE_CLO",
          "Datatype": {
            "typeName": "DATE",
            "type": "DateDatatypeType"
          }
        },
        {
          "Label": "duree label",
          "id": "jfw71me8",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DUREE",
          "Datatype": {
            "Maximum": "24",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "instclas label",
          "id": "jfw7htpw",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "INSTCLAS",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "autoris label",
          "id": "jqp8skl7",
          "type": "CollectedVariableType",
          "CodeListReference": "jfw7ciyo",
          "Name": "AUTORIS",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "iso label",
          "id": "jfw9a4jv",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "ISO",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "envoie - établissement en voie de certification ?",
          "id": "jfw9bf92",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "ENVOIE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "aut_certif - avez-vous une autre certification ou labellisation (Imprim'vert,...) ?",
          "id": "jfw9b8rm",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "AUT_CERTIF",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "eff_env label",
          "id": "jfwan2x4",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "EFF_ENV",
          "Datatype": {
            "Maximum": "999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "SERV1 label",
          "id": "k3ha3xca",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "SERV1",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "Q_etudes label",
          "id": "jfwblg0c",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "Q_ETUDES",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "Eaux usées-Montants",
          "id": "k3hbbn8m",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TEE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Déchets hors radioactifs-Montants",
          "id": "k3hbm88p",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TDE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Protection de l'air-Montants",
          "id": "k3hbcy42",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TAI",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Limitation des émissions de gaz à effet de serre-Montants",
          "id": "k3hbggo2",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGA",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Bruits et vibrations -Montants",
          "id": "k3hbly6z",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TBE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Sols, eaux souterraines et de surface-Montants",
          "id": "k3hbh4px",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TSE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Sites, paysages et biodiversité-Montants",
          "id": "k3hbbafi",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TPE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Autres : rayonnement R&D sur l'environnement-Montants",
          "id": "k3hb5x32",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TRE",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "TA label",
          "id": "jfwcsoch",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TA",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "PART_ACHAT label",
          "id": "jfwcvafs",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PART_ACHAT",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "precision_etudes label",
          "id": "k9e4njl0",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PRECISION_ETUDES",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "512"
          }
        },
        {
          "Label": "Q_inv_spe label",
          "id": "jfwd51nl",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "Q_INV_SPE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "[Eaux usées](. \"sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9qa7g",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "E3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9j4fv",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "D3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9qas3",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "A3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"équipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9iori",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "G3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"équipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9j5sq",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "B3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9nzj8",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "S3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, réhabilitation des carrières, création de barrières vertes et paysagères, passage d’animaux…\")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9m64r",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "P3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"protection contre les rayonnements, les coûts de R&D en rapport avec l’environnement… \")-[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")-montants",
          "id": "k2n9llms",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "R3",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9hopp",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "E1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9lmrv",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "D1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9z0n8",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "A1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"équipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9w9c5",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "G1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"équipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9rqh7",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "B1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9sglo",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "S1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, réhabilitation des carrières, création de barrières vertes et paysagères, passage d’animaux…\")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2n9i3xx",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "P1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"protection contre les rayonnements, les coûts de R&D en rapport avec l’environnement… \")-[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")-montants",
          "id": "k2na2gzp",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "R1",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2na1939",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "E2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9zaq7",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "D2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9rspc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "A2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"équipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9tdfc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "G2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"équipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9qqei",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "B2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9set1",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "S2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, réhabilitation des carrières, création de barrières vertes et paysagères, passage d’animaux…\")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2na2oac",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "P2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"protection contre les rayonnements, les coûts de R&D en rapport avec l’environnement… \")-[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")-montants",
          "id": "k2n9qj8u",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "R2",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9q0yz",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "ER",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9tyym",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9m2vz",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "AR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"équipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9lmwe",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "GR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"équipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9xu0v",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "BR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9oi6v",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "SR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, réhabilitation des carrières, création de barrières vertes et paysagères, passage d’animaux…\")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9l3vn",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"protection contre les rayonnements, les coûts de R&D en rapport avec l’environnement… \")-[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")-montants",
          "id": "k2n9kmbm",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RR",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-Total-montants",
          "id": "k2na246c",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "E4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-Total-montants",
          "id": "k2na2aym",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "D4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-Total-montants",
          "id": "k2n9rpkg",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "A4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"équipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-Total-montants",
          "id": "k2n9ztdt",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "G4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"équipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-Total-montants",
          "id": "k2n9x28k",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "B4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-Total-montants",
          "id": "k2n9ovwc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "S4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, réhabilitation des carrières, création de barrières vertes et paysagères, passage d’animaux…\")-Total-montants",
          "id": "k2na0ym3",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "P4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"protection contre les rayonnements, les coûts de R&D en rapport avec l’environnement… \")-Total-montants",
          "id": "k2n9tpgw",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "R4",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "precision_inv_spe label",
          "id": "k9e4tvwc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PRECISION_INV_SPE",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "512"
          }
        },
        {
          "Label": "Q_inv_int label",
          "id": "jfwgs69t",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "Q_INV_INT",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "I1 label",
          "id": "jsahjlve",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "I1",
          "Datatype": {
            "Maximum": "99999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "I2 label",
          "id": "jsahhqrh",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "I2",
          "Datatype": {
            "Maximum": "99999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "I3",
          "id": "jh7rrkmw",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "I3",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-Ventilation en %",
          "id": "k3k5qlxy",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IE",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-Ventilation en %",
          "id": "k3k5ivk7",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "ID",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-Ventilation en %",
          "id": "k3k5j6l9",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IA",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-Ventilation en %",
          "id": "k3k5ltgn",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IG",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-Ventilation en %",
          "id": "k3k5cvob",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IB",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-Ventilation en %",
          "id": "k3k5lbw6",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IS",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")-Ventilation en %",
          "id": "k3k5l76l",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IP",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "[Autres : rayonnement R&D sur l'environnement](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement… \")-Ventilation en %",
          "id": "k3k5jeoy",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IR",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "Total-Ventilation en %",
          "id": "k3k5kalq",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "IT",
          "Datatype": {
            "Maximum": "100",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/percent",
            "type": "NumericDatatypeType",
            "Decimals": ""
          }
        },
        {
          "Label": "description label",
          "id": "k9e4pkwu",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DESCRIPTION",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "512"
          }
        },
        {
          "Label": "Q_DEP_COUR",
          "id": "k2kn7cwh",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "Q_DEP_COUR",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3il4d5d",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CES",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3il5f82",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CDS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3il3dj4",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CAS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3ikrrph",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CGS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3il81cn",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CBS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3ikxcfc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CSS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3ikx5yy",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CPS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement R&D sur l'environnement](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement… \")-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3ikn3hd",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CRS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Total\n\n​-[Achats de services](. \"Externalisation de la maintenance, analyse par un laboratoire extérieur, loyers des locations longues durée...\")-Montant",
          "id": "k3il1b0e",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CTS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3il5b1x",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CEI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3il75pk",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CDI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3ikw48h",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CAI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3il6cj9",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CGI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3ikolvi",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CBI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3ikr30x",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CSI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3il6nxa",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CPI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement R&D sur l'environnement](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement… \")-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3ikzjg5",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CRI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Total\n\n​-[Coûts internes ](. \"Frais de personnel au prorata du temps passé sur l'équipement , frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")-Montant",
          "id": "k3il3w6a",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "CTI",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")-Dépenses de compensation-Montant",
          "id": "k3ipnx0v",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPE",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")-Dépenses de compensation-Montant",
          "id": "k3iptolo",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPD",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")-Dépenses de compensation-Montant",
          "id": "k3ipsamt",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPA",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")-Dépenses de compensation-Montant",
          "id": "k3ipmfdd",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPG",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")-Dépenses de compensation-Montant",
          "id": "k3ipwz2k",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPB",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")-Dépenses de compensation-Montant",
          "id": "k3ipe1by",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")-Dépenses de compensation-Montant",
          "id": "k3ipntc2",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPP",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "[Autres : rayonnement R&D sur l'environnement](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement… \")-Dépenses de compensation-Montant",
          "id": "k3ipw7n1",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPR",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Total\n\n​-Dépenses de compensation-Montant",
          "id": "k3ipstqr",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DEPCOMPT",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "RAC_EGOUT",
          "id": "k3hei6bl",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "RAC_EGOUT",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "Frais pour la distribution de l'eau, hors redevance pour prélèvement sur la ressource en eau-Usages domestiques de l'eau-Montant des frais et redevances pour la distribution de l'eau",
          "id": "k5quf8n9",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DISTRIB_DOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour prélèvement sur la ressource en eau-Usages domestiques de l'eau-Montant des frais et redevances pour la distribution de l'eau",
          "id": "k5quvr89",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_PREL_DOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Frais pour la distribution de l'eau, hors redevance pour prélèvement sur la ressource en eau-Usages non domestiques de l'eau-Montant des frais et redevances pour la distribution de l'eau",
          "id": "k5qunhfc",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DISTRIB_NODOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour prélèvement sur la ressource en eau-Usages non domestiques de l'eau-Montant des frais et redevances pour la distribution de l'eau",
          "id": "k5qujw5s",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_PREL_NODOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Frais pour collecte et assainissement des eaux usées, hors redevance pour pollution de l'eau et hors redevance pour modernisation des réseaux de collecte-Rejet des eaux usées domestiques-Montant en milliers d'euros",
          "id": "k5qvcfok",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_ASS_DOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour pollution de l'eau-Rejet des eaux usées domestiques-Montant en milliers d'euros",
          "id": "k5qv4tnr",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_POL_DOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour modernisation des réseaux de collecte-Rejet des eaux usées domestiques-Montant en milliers d'euros",
          "id": "k5qv13o0",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_MODERN_DOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Frais pour collecte et assainissement des eaux usées, hors redevance pour pollution de l'eau et hors redevance pour modernisation des réseaux de collecte- Rejet des eaux usées non domestiques -Montant en milliers d'euros",
          "id": "k5quyb5q",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_ASS_NODOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour pollution de l'eau- Rejet des eaux usées non domestiques -Montant en milliers d'euros",
          "id": "k5qv090n",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_POL_NODOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Redevance pour modernisation des réseaux de collecte- Rejet des eaux usées non domestiques -Montant en milliers d'euros",
          "id": "k5qv8lqs",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "RED_MODERN_NODOM",
          "Datatype": {
            "Maximum": "999999999",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "PRES_OUI_NON",
          "id": "k2lm5afn",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "PRES_OUI_NON",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "Déchets non dangereux -montant",
          "id": "k2lwnmmn",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PRES_DND",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Déchets dangereux -montant",
          "id": "k2lwqh2u",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "PRES_DD",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "SERV_ORDM",
          "id": "k2lmuxy9",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "SERV_ORDM",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "NC_SERV_ORDM",
          "id": "k2lnapdr",
          "type": "CollectedVariableType",
          "CodeListReference": "jftnpqno",
          "Name": "NC_SERV_ORDM",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": 1
          }
        },
        {
          "Label": "COTIS",
          "id": "k2lnf18b",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "COTIS",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "AU_TA",
          "id": "k2lnq427",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "AU_TA",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Émissions polluantes -Montants",
          "id": "k3hgo8wb",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPE",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Déchets-Montants",
          "id": "k3hgm0s2",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPD",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Lubrifiants-Montants",
          "id": "k3hgintu",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPLU",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Lessives-Montants",
          "id": "k3hgoxba",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPLE",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Matériaux d'extraction-Montants",
          "id": "k3hgolzh",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPM",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "Total-Montants",
          "id": "k3hgj6ns",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "TGAPT",
          "Datatype": {
            "Maximum": "999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "ACH_CON",
          "id": "k2lpyai2",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "ACH_CON",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "F_INT",
          "id": "k2lqspr9",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "F_INT",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "AUT_ACH",
          "id": "k2lqwqha",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "AUT_ACH",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "AUT_F",
          "id": "k2lr05u6",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "AUT_F",
          "Datatype": {
            "Maximum": "9999999.9",
            "Minimum": "0",
            "typeName": "NUMERIC",
            "Unit": "http://id.insee.fr/unit/keuro",
            "type": "NumericDatatypeType",
            "Decimals": "1"
          }
        },
        {
          "Label": "DES_AUT_F label",
          "id": "k9bg0no3",
          "type": "CollectedVariableType",
          "CodeListReference": "",
          "Name": "DES_AUT_F",
          "Datatype": {
            "Pattern": "",
            "typeName": "TEXT",
            "type": "TextDatatypeType",
            "MaxLength": "512"
          }
        }
      ]
    },
    "lastUpdatedDate": "Fri Apr 24 2020 13:41:45 GMT+0200",
    "DataCollection": [
      {
        "id": "d5225468-f2c0-4a1b-a662-7b892d9bd734",
        "uri": "http://ddi:fr.insee:DataCollection.d5225468-f2c0-4a1b-a662-7b892d9bd734",
        "Name": "Investissements et depenses courantes pour proteger l'environnement 2016"
      }
    ],
    "final": false,
    "id": "jftg1pu822019",
    "TargetMode": [
      "CAPI",
      "CAWI",
      "PAPI"
    ],
    "CodeLists": {
      "CodeList": [
        {
          "Label": "L_ouinon",
          "id": "jftnpqno",
          "Code": [
            {
              "Parent": "",
              "Label": "oui",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "non",
              "Value": "2"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_activite",
          "id": "jftnhdh1",
          "Code": [
            {
              "Parent": "",
              "Label": "0111Z - Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses",
              "Value": "0111Z"
            },
            {
              "Parent": "",
              "Label": "0112Z - Culture du riz",
              "Value": "0112Z"
            },
            {
              "Parent": "",
              "Label": "0113Z - Culture de légumes, de melons, de racines et de tubercules",
              "Value": "0113Z"
            },
            {
              "Parent": "",
              "Label": "0114Z - Culture de la canne à sucre",
              "Value": "0114Z"
            },
            {
              "Parent": "",
              "Label": "0115Z - Culture du tabac",
              "Value": "0115Z"
            },
            {
              "Parent": "",
              "Label": "0116Z - Culture de plantes à fibres",
              "Value": "0116Z"
            },
            {
              "Parent": "",
              "Label": "0119Z - Autres cultures non permanentes",
              "Value": "0119Z"
            },
            {
              "Parent": "",
              "Label": "0121Z - Culture de la vigne",
              "Value": "0121Z"
            },
            {
              "Parent": "",
              "Label": "0122Z - Culture de fruits tropicaux et subtropicaux",
              "Value": "0122Z "
            },
            {
              "Parent": "",
              "Label": "0123Z - Culture d'agrumes",
              "Value": "0123Z"
            },
            {
              "Parent": "",
              "Label": "0124Z - Culture de fruits à pépins et à noyau",
              "Value": "0124Z"
            },
            {
              "Parent": "",
              "Label": "0125Z - Culture d'autres fruits d'arbres ou d'arbustes et de fruits à coque",
              "Value": "0125Z"
            },
            {
              "Parent": "",
              "Label": "3311Z - Réparation d'ouvrages en métaux",
              "Value": "3311Z"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_autoris",
          "id": "jfw7ciyo",
          "Code": [
            {
              "Parent": "",
              "Label": "autorisation préfectorale ?",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "enregistrement (autorisation simplifiée) ?",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "déclaration ?",
              "Value": "3"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_certif",
          "id": "jfw96zn8",
          "Code": [
            {
              "Parent": "",
              "Label": "en voie de certification ?",
              "Value": "envoie"
            },
            {
              "Parent": "",
              "Label": "détenteur d'une autre certification ou labellisation (Imprim'vert,...) ?",
              "Value": "aut_certif"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_domaine_sansTOT",
          "id": "k3ix3ghm",
          "Code": [
            {
              "Parent": "",
              "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote)\")",
              "Value": "3"
            },
            {
              "Parent": "",
              "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …)\")",
              "Value": "4"
            },
            {
              "Parent": "",
              "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel\")",
              "Value": "5"
            },
            {
              "Parent": "",
              "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…)\")",
              "Value": "6"
            },
            {
              "Parent": "",
              "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")",
              "Value": "7"
            },
            {
              "Parent": "",
              "Label": "[Autres : rayonnement, R&D sur l'environnement...](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement…\")",
              "Value": "8"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_nature",
          "id": "jfwd07ev",
          "Code": [
            {
              "Parent": "",
              "Label": "[Pré-traitement, traitement et élimination](. \"Les systèmes et matériels de pré-traitement, de traitement et d'élimination des polluants ou de remise en état des sols et des sites : filtres, matériels de collecte, stockage et transport des déchets, stations d’épuration ou coût de raccordement au réseau, matériels d’insonorisation, enfouissement des lignes électriques, réhabilitation des carrières… \")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Mesure et contrôle](. \"Les installations de mesure et de contrôle des rejets, des émissions et des bruits (y compris les systèmes d'alerte associés), et en aval de la production : débitmètres, piézomètres, détecteurs de fuites, analyseurs de concentration, de fréquence, sonomètres…\")",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "[Recyclage, tri et valorisation](. \"Les systèmes de recyclage, de tri ou de valorisation : matériels de séparation, nettoyage et séchage des substances pour une utilisation ultérieure par l’établissement ou un tiers…\")",
              "Value": "3"
            },
            {
              "Parent": "",
              "Label": "[Préventions des pollutions](. \"Les installations et équipements de prévention (y compris contre les risques de pollution accidentelle, ou autres conséquences sur l’environnement des risques technologiques et moyens d’alarme associés) : partie identifiable d’un équipement de production destinée à réduire la pollution générée par ce procédé, bacs de rétention, systèmes de drainages, protection des conduits, aménagement de zones vertes, de passages d’animaux…\")",
              "Value": "4"
            },
            {
              "Parent": "",
              "Label": "Total",
              "Value": "5"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_domaine",
          "id": "k2n9r7ku",
          "Code": [
            {
              "Parent": "",
              "Label": "[Eaux usées](. \"Sont notamment à prendre en compte : les installations et équipements de lutte contre les eaux usées, les substances polluantes qui y sont déversées ou les eaux de rejet du process, y compris la pollution thermique (système de refroidissement…) ; les unités de pré-traitement avant rejet à l’extérieur (bassin d’aération, de décantation, matériel de filtration…) ; la participation à la construction d’une station d’épuration collective qui traitera vos eaux usées.\")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Déchets hors radioactifs](. \"Installations de gestion des déchets (solides ou liquides : chutes, boues, bains concentrés usés…) générés par l'activité de l'établissement, hors déchets radioactifs. Exemples : ouvrages d’entreposage, bennes, cuves, presses à balles, broyeurs… \")",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "[Protection de l'air](. \"Installations et équipements de lutte contre les substances polluantes rejetées dans l'air (particules, gaz et solvants ; ex : oxyde d’azote) \")",
              "Value": "3"
            },
            {
              "Parent": "",
              "Label": "[Limitation des émissions de gaz à effet de serre](. \"Equipements de réduction des émissions de gaz à effet de serre (pompes et compresseurs, filtres, procédés de lavage …) \")",
              "Value": "4"
            },
            {
              "Parent": "",
              "Label": "[Bruits et vibrations](. \"Equipements visant à réduire le bruit et les vibrations pour le voisinage (mur antibruit, matériel d’insonorisation…) ; sont exclues toutes les mesures visant uniquement à protéger le personnel \")",
              "Value": "5"
            },
            {
              "Parent": "",
              "Label": "[Sols, eaux souterraines et de surface](. \"Installations et équipements visant à protéger les sols et eaux souterraines (bacs, bassins de rétention, systèmes de drainage, procédés de décontamination, piézomètres…) \")",
              "Value": "6"
            },
            {
              "Parent": "",
              "Label": "[Sites, paysages et biodiversité](. \"Sont à prendre en compte les investissements conduisant à l’enfouissement des lignes électriques, à la réhabilitation des carrières, à la création de barrières vertes et paysagères, au passage d’animaux…\")",
              "Value": "7"
            },
            {
              "Parent": "",
              "Label": "[Autres : rayonnement R&D sur l'environnement](. \"Protection contre les rayonnements, coûts de R&D en rapport avec l’environnement… \")",
              "Value": "8"
            },
            {
              "Parent": "",
              "Label": "Total",
              "Value": "9"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_nat_inv",
          "id": "k2ltzkcr",
          "Code": [
            {
              "Parent": "",
              "Label": "[Achats de services](. \"Externalisation de la maintenance, analyses par un laboratoire extérieur, loyers des locations longues durées...\")",
              "Value": "ach_serv"
            },
            {
              "Parent": "",
              "Label": "[Coûts internes](. \"Frais de personnel au prorata du temps passé sur l'équipement, frais d'entretien, coût des énergies consommées par les équipements, coûts de consommables...\")",
              "Value": "Cou_int"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_DEP_COMP",
          "id": "k3hd2gge",
          "Code": [
            {
              "Parent": "",
              "Label": "[Dépenses de compensation](. \"Compensation au titre de la loi sur l'eau, suivi environnemental et scientifique de la colonisation de mares, compensation écologique au titre de la réglementation 'espèces protégées', suivi et gestion des espèces invasives.\")",
              "Value": "1"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_FraisRedevances",
          "id": "k5qtxcno",
          "Code": [
            {
              "Parent": "",
              "Label": "Frais pour la distribution de l'eau, hors redevance pour prélèvement sur la ressource en eau",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Redevance pour prélèvement sur la ressource en eau](. \"Cette redevance peut également être désignée par 'Préservation des ressources en eau' ou par 'Redevance prélèvement'. Cette redevance est perçue par l'agence de l'eau.\")",
              "Value": "2"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_usagesEau",
          "id": "k5qubesb",
          "Code": [
            {
              "Parent": "",
              "Label": "[Usages domestiques de l'eau](. \"Les informations de cette colonne sont présentes sur la facture d'eau.\")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Usages non domestiques de l'eau](. \"Les informations de cette colonne relatives aux redevances sont présentes dans les appels à redevances de l'agence de l'eau.\")",
              "Value": "2"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_redevances",
          "id": "k49zboy9",
          "Code": [
            {
              "Parent": "",
              "Label": "[Frais pour collecte et assainissement des eaux usées, hors redevance pour pollution de l'eau et hors redevance pour modernisation des réseaux de collecte](. \"Ces frais peuvent notamment être désignés par 'Redevance d'assainissement' ou par 'Collecte et traitement'.\")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Redevance pour pollution de l'eau](. \"Cette redevance est perçue par l'agence de l'eau.\")",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "[Redevance pour modernisation des réseaux de collecte](. \"Cette redevance est perçue par l'agence de l'eau.\")",
              "Value": "3"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_DomNodom",
          "id": "k49z39rg",
          "Code": [
            {
              "Parent": "",
              "Label": "[Rejet des eaux usées domestiques](. \"Les informations de cette colonne sont présentes sur la facture d'eau.\")",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "[Rejet des eaux usées non domestiques](. \"Les informations de cette colonne relatives aux redevances sont présentes dans les appels à redevances de l'agence de l'eau.\")",
              "Value": "2"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_danger_ou_pas",
          "id": "k2lwbd1a",
          "Code": [
            {
              "Parent": "",
              "Label": "Déchets non dangereux ",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "Déchets dangereux ",
              "Value": "2"
            }
          ],
          "Name": ""
        },
        {
          "Label": "L_domaine_TGAP",
          "id": "k2lx0l4b",
          "Code": [
            {
              "Parent": "",
              "Label": "Émissions polluantes dans l'air",
              "Value": "1"
            },
            {
              "Parent": "",
              "Label": "Déchets",
              "Value": "3"
            },
            {
              "Parent": "",
              "Label": "Lubrifiants",
              "Value": "2"
            },
            {
              "Parent": "",
              "Label": "Lessives",
              "Value": "4"
            },
            {
              "Parent": "",
              "Label": "Matériaux d'extraction",
              "Value": "5"
            },
            {
              "Parent": "",
              "Label": "Total",
              "Value": "6"
            }
          ],
          "Name": ""
        }
      ]
    },
    "Child": [
      {
        "Control": [],
        "depth": 1,
        "FlowControl": [],
        "genericName": "MODULE",
        "Label": [
          "Informations générales"
        ],
        "id": "jftgwrjn",
        "TargetMode": [
          "CAWI",
          "PAPI"
        ],
        "Declaration": [
          {
            "declarationType": "HELP",
            "Text": "**Quelles dépenses prendre en compte dans le questionnaire ?**&#xd;De par son activité de production, votre établissement génère de la pollution (émissions de gaz à effet de serre, émissions polluantes, déchets…). Vous êtes donc amené à lutter contre cette pollution. Dans ce questionnaire, nous vous demandons de préciser certaines dépenses afférentes à cette lutte. Il s’agit de vos dépenses d’investissement, d’étude ou de gestion destinées à minimiser l’impact de votre activité sur l’environnement, celles que vous engagez avec l’idée de protéger l’environnement et non pas celles nécessaires à la production qui s’avéreraient, finalement, avoir un impact favorable sur l’environnement. Sont donc exclues les dépenses relatives à la sécurité et à l’hygiène des personnes travaillant sur le site (par exemple : « désamiantage », casques anti-bruit…), ainsi que celles ayant pour seul objectif la réduction des consommations de matière première ou d’énergie.&#xd;**Une dépense donnée ne peut apparaître qu’à un seul endroit du questionnaire (aucun double compte entre les différentes rubriques et sous-rubriques décrites ci-dessous ne doit apparaître).**",
            "id": "jqwful9t",
            "position": "AFTER_QUESTION_TEXT"
          }
        ],
        "type": "SequenceType",
        "Child": [
          {
            "Response": [
              {
                "CollectedVariableReference": "jg3ouxc3",
                "id": "jfw6707t",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"OUI\" à cette question et que votre code APE commence par '33', veuillez passer à la question 3 du module I. Sinon, veuillez poursuivre.",
                "Expression": "($VERIF_APET$ = '1') and (substring ($ACTIVITE$,1, 2) = '33'  )",
                "id": "js37g89e",
                "IfTrue": "jfto76f4"
              },
              {
                "Description": "Si vous avez répondu \"OUI\" à cette question et que votre code APE ne commence pas par '33', veuillez passer à la question 4 du module I. Sinon, veuillez poursuivre.",
                "Expression": "($VERIF_APET$ = '1') and (substring ($ACTIVITE$,1, 2) != '33'  )",
                "id": "js37ra95",
                "IfTrue": "jftogzlr"
              }
            ],
            "Label": [
              "Le code APE de votre établissement est-il bien le : $ACTIVITE$, $ACTIVITE_LIB$ ?"
            ],
            "id": "jftmxjzg",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "VERIF_APET"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "js37qp85",
                "id": "jftno5gu",
                "mandatory": false,
                "CodeListReference": "jftnhdh1",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "DROPDOWN",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si votre code APE ne commence pas par \"33\", veuillez passer à la question 4 du module I. Sinon, veuillez poursuivre.",
                "Expression": "($VERIF_APET$ = '2' or $VERIF_APET$ = '') and (substring($MODIF_APE$,1,2) != '33') and $MODIF_APE$ != ''\n",
                "id": "jrt7n7nw",
                "IfTrue": "jftogzlr"
              }
            ],
            "Label": [
              "Si ce n'est pas le cas, merci de préciser votre code APE :"
            ],
            "id": "jftnputy",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "MODIF_APE"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfto7tsg",
                "id": "jftnxcdx",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Si votre code APE commence par **33** : votre activité est-elle réalisée uniquement chez le client ?"
            ],
            "id": "jfto76f4",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "hors_site"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jg29y066",
                "id": "jg2a3vai",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"OUI\" à cette question, veuillez passer à la question 6 du module I. Sinon, veuillez poursuivre.",
                "Expression": "$VERIF_EFF$ = '1'",
                "id": "jqqiahjj",
                "IfTrue": "jftoljr3"
              }
            ],
            "Label": [
              "L'effectif de votre établissement en $AN$ était-il toujours compris entre ces bornes : $EFFL1$ et $EFFL2$ ?"
            ],
            "id": "jftogzlr",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "verif_eff"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jftorer1",
                "id": "jftorer1",
                "mandatory": false,
                "Datatype": {
                  "Maximum": "999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "",
                  "type": "NumericDatatypeType",
                  "Decimals": "0"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Si ce n'est pas le cas, merci d'indiquer votre effectif salarié au 31/12/$AN$ :"
            ],
            "id": "jg29j6th",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "modif_eff"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jftoq2n6",
                "id": "jftou0jz",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"OUI\" à cette question, veuillez passer à la question 8 du module I",
                "Expression": "$PROD$ = '1'",
                "id": "jqqidhvc",
                "IfTrue": "jftp84pw"
              }
            ],
            "Label": [
              "Votre établissement a-t-il une activité de production ou fabrication (industrielle, artisanale ou énergétique) ?"
            ],
            "id": "jftoljr3",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "PROD"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jftoxyxr",
                "id": "jftpbj5b",
                "mandatory": false,
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "type": "TextDatatypeType",
                  "MaxLength": "250"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Si ce n'est pas le cas, précisez clairement la nature de l'établissement (gestion administrative, comptable ou informatique, R&D, centre d'essais, entrepôt...)"
            ],
            "id": "jftowzt5",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "nature_et"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw65wa5",
                "id": "jfw6sbkl",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 10 du module I. Sinon, veuillez poursuivre.",
                "Expression": "$REP_GROUPE$ = '2'",
                "id": "jqqisli6",
                "IfTrue": "jfw6sqml"
              }
            ],
            "Label": [
              "Votre réponse à ce questionnaire regroupe-t-elle les réponses de plusieurs établissements ?"
            ],
            "id": "jftp84pw",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "rep_groupe"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw6ark7",
                "id": "k9e4nrff",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "type": "TextDatatypeType",
                  "MaxLength": "14"
                }
              },
              {
                "CollectedVariableReference": "jfw69e3o",
                "id": "k9e4x6vq",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "type": "TextDatatypeType",
                  "MaxLength": "38"
                }
              }
            ],
            "Control": [
              {
                "post_collect": false,
                "Description": "A la sortie de chaque cellule de la colonne siret, on vérifiera si le siret renseigné est égal à l'identifiant du questionnaire.\n",
                "Expression": "$SIRET$ = $REGROUP01$",
                "during_collect": false,
                "criticity": "INFO",
                "FailMessage": "Il est inutile de saisir le siret identifiant du questionnaire que vous remplissez.",
                "id": "jsag1ceg"
              },
              {
                "post_collect": false,
                "Description": "Contrôle du numéro Siren",
                "Expression": "$REGROUP01$ != ''\n                     and $REGROUP01$ castable as xs:integer\n                     and string-length($REGROUP01$) = 14\n                     and (((\n                     number(substring($REGROUP01$,1,1))\n                     + number(substring($REGROUP01$,2,1))*2 -(if (number(substring($REGROUP01$,2,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,3,1))\n                     + number(substring($REGROUP01$,4,1))*2 -(if (number(substring($REGROUP01$,4,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,5,1))\n                     + number(substring($REGROUP01$,6,1))*2 -(if (number(substring($REGROUP01$,6,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,7,1))\n                     + number(substring($REGROUP01$,8,1))*2 -(if (number(substring($REGROUP01$,8,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,9,1))\n                     ) mod 10) != 0)",
                "during_collect": false,
                "criticity": "INFO",
                "FailMessage": "Les 9 premiers chiffres du numéro que vous avez renseigné ne correspondent pas à un numéro Siren",
                "id": "jsvlp9fj"
              },
              {
                "post_collect": false,
                "Description": "Contrôle du NIC",
                "Expression": "$REGROUP01$ !=''\n                     and $REGROUP01$  castable as xs:integer\n                     and string-length($REGROUP01$) = 14\n                     and (((\n                     number(substring($REGROUP01$,1,1))\n                     + number(substring($REGROUP01$,2,1))*2 -(if (number(substring($REGROUP01$,2,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,3,1))\n                     + number(substring($REGROUP01$,4,1))*2 -(if (number(substring($REGROUP01$,4,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,5,1))\n                     + number(substring($REGROUP01$,6,1))*2 -(if (number(substring($REGROUP01$,6,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,7,1))\n                     + number(substring($REGROUP01$,8,1))*2 -(if (number(substring($REGROUP01$,8,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,9,1))\n                     ) mod 10) = 0)\n                     and (((\n                     number(substring($REGROUP01$,1,1))*2 -(if (number(substring($REGROUP01$,1,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,2,1))\n                     + number(substring($REGROUP01$,3,1))*2 -(if (number(substring($REGROUP01$,3,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,4,1))\n                     + number(substring($REGROUP01$,5,1))*2 -(if (number(substring($REGROUP01$,5,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,6,1))\n                     + number(substring($REGROUP01$,7,1))*2 -(if (number(substring($REGROUP01$,7,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,8,1))\n                     + number(substring($REGROUP01$,9,1))*2 -(if (number(substring($REGROUP01$,9,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,10,1))\n                     + number(substring($REGROUP01$,11,1))*2 -(if (number(substring($REGROUP01$,11,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,12,1))\n                     + number(substring($REGROUP01$,13,1))*2 -(if (number(substring($REGROUP01$,13,1)) > 4) then 9 else 0)\n                     + number(substring($REGROUP01$,14,1))\n                     ) mod 10) != 0)",
                "during_collect": false,
                "criticity": "INFO",
                "FailMessage": "Les 9 premiers chiffres du numéro que vous avez renseigné correspondent à un numéro Siren, mais les 5 derniers font que l'ensemble n'est pas un numéro Siret",
                "id": "jsvm000b"
              }
            ],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Merci de préciser l’identité de ceux-ci (numéro Siret a minima), sans répéter celle de votre propre établissement :"
            ],
            "ResponseStructure": {
              "Mapping": [
                {
                  "MappingSource": "k9e4nrff",
                  "MappingTarget": "1 1"
                },
                {
                  "MappingSource": "k9e4x6vq",
                  "MappingTarget": "1 2"
                }
              ],
              "Dimension": [
                {
                  "dimensionType": "PRIMARY",
                  "dynamic": "1-50"
                },
                {
                  "dimensionType": "MEASURE",
                  "Label": "siret",
                  "dynamic": "0"
                },
                {
                  "dimensionType": "MEASURE",
                  "Label": "raison sociale",
                  "dynamic": "0"
                }
              ]
            },
            "id": "jfw6mm9a",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "TABLE",
            "Name": "tableau"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw6sfwi",
                "id": "jfw6tlap",
                "mandatory": false,
                "Datatype": {
                  "typeName": "DATE",
                  "type": "DateDatatypeType"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "L'enquête porte sur les dépenses effectuées au cours de l'exercice comptable $AN$. Veuillez indiquer sa date de clôture :"
            ],
            "id": "jfw6sqml",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "DATE_CLO"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw71me8",
                "id": "jfw71z0p",
                "mandatory": false,
                "Datatype": {
                  "Maximum": "24",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "",
                  "type": "NumericDatatypeType",
                  "Decimals": ""
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Veuillez indiquer la durée de cet exercice, en mois :"
            ],
            "id": "jfw760ge",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "duree"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw7htpw",
                "id": "jfw7g71y",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 14 du module I. Sinon, veuillez poursuivre.",
                "Expression": "$INSTCLAS$ = '2'",
                "id": "jqqip2zz",
                "IfTrue": "jfw9i6tc"
              }
            ],
            "Label": [
              "En $AN$, votre établissement comportait-il une **installation classée pour la protection de l'environnement** (articles L.511-1 et L.511-2 du code de l'environnement) ?"
            ],
            "id": "jfw7bocl",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "instclas"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jqp8skl7",
                "id": "jqp8r3vq",
                "mandatory": false,
                "CodeListReference": "jfw7ciyo",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Était-elle soumise à :"
            ],
            "id": "jfw7ua1k",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "autoris"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw9a4jv",
                "id": "jfw9imxd",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"OUI\" à cette question, veuillez passer à la question 16 du module I. Sinon, veuillez poursuivre.",
                "Expression": "$ISO$ = '1'",
                "id": "jqqp8xja",
                "IfTrue": "jfwaplux"
              }
            ],
            "Label": [
              "En $AN$, votre établissement avait-il une certification environnementale (ISO 14001, EMAS, 1.2.3 Environnement) ?"
            ],
            "id": "jfw9i6tc",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "iso"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfw9bf92",
                "id": "k9e4zsv8",
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              },
              {
                "CollectedVariableReference": "jfw9b8rm",
                "id": "k9e50glc",
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Si votre établissement n'avait pas de certification environnementale, était-il :"
            ],
            "ResponseStructure": {
              "Mapping": [
                {
                  "MappingSource": "k9e4zsv8",
                  "MappingTarget": "1"
                },
                {
                  "MappingSource": "k9e50glc",
                  "MappingTarget": "2"
                }
              ],
              "Dimension": [
                {
                  "dimensionType": "PRIMARY",
                  "dynamic": "0",
                  "CodeListReference": "jfw96zn8"
                },
                {
                  "dimensionType": "MEASURE",
                  "dynamic": "0"
                }
              ]
            },
            "id": "jfw9775n",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "MULTIPLE_CHOICE",
            "Name": "envoie"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfwan2x4",
                "id": "jfwaf5hd",
                "mandatory": false,
                "Datatype": {
                  "Maximum": "999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si personne n'est affecté aux activités de protection de l'environnement dans votre établissement, veuillez passer à la question 1 du module II. Sinon, veuillez poursuivre.",
                "Expression": "$EFF_ENV$ = 0 ",
                "id": "jqqpz05c",
                "IfTrue": "jftopgp8"
              }
            ],
            "Label": [
              "Combien de [personnes dans votre établissement sont affectées aux activités de protection de l'environnement (en équivalent temps plein - ETP) ?](. \"Il s’agit du personnel affecté entièrement ou en partie aux activités de protection de l’environnement : fonctionnement, maintenance et réparation des équipements spécifiques, études, management environnemental, formation, information et communication sur l’environnement. A défaut de pouvoir répondre précisément, merci de fournir une estimation. Exemple : une personne ayant passé six mois sur une étude compte pour 6/12=0,5 équivalent temps plein.\")"
            ],
            "id": "jfwaplux",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Si votre entreprise a plusieurs établissements, merci de comptabiliser les ETP affectés à ces  activités dans votre établissement, et non dans l'ensemble de l'entreprise.",
                "id": "jrm6xn84",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "eff_env"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "k3ha3xca",
                "id": "jfwajg1x",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Parmi ces personnes, y a-t-il un spécialiste entièrement dédié à l'environnement ?"
            ],
            "id": "jfwaf0eh",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "SERV1"
          }
        ],
        "Name": "I-Infos_generales"
      },
      {
        "Control": [],
        "depth": 1,
        "FlowControl": [],
        "genericName": "MODULE",
        "Label": [
          "Etudes pour protéger l'environnement"
        ],
        "id": "jftopgp8",
        "TargetMode": [
          "CAPI"
        ],
        "Declaration": [
          {
            "declarationType": "INSTRUCTION",
            "Text": "Au cours de l’année $AN$ vous avez pu mener des études visant à protéger l’environnement de votre activité. Leurs coûts sont à préciser dans cette partie, en distinguant ce qui relève, d’une part, des études en prévision d’un investissement (question 2) ; d’autre part, des études réglementaires ou d’impact, des audits pour obtenir une certification, etc. (question 3). La part des achats de services dans la totalité des études est à préciser dans la question 4. Elle s'applique à la somme des montants déclarés aux questions 2 et 3.&#xd;Les études pour protéger l'environnement sont des achats de services ou des coûts internes d'ingénierie destinés à améliorer la connaissance ou à établir une synthèse de l'effet de vos activités sur l'environnement (sont exclues les dépenses destinées au développement d'écoproduits). Les coûts internes incluent les frais de personnel (salaires + charges sociales) au prorata du temps passé sur le projet.",
            "id": "jfwb599e",
            "position": "AFTER_QUESTION_TEXT"
          }
        ],
        "type": "SequenceType",
        "Child": [
          {
            "Response": [
              {
                "CollectedVariableReference": "jfwblg0c",
                "id": "jfwbboc9",
                "mandatory": false,
                "CodeListReference": "jftnpqno",
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "visualizationHint": "CHECKBOX",
                  "type": "TextDatatypeType",
                  "MaxLength": 1
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [
              {
                "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 1 du module III. Sinon, veuillez poursuivre.",
                "Expression": "$Q_ETUDES$ = '2'",
                "id": "jqqq95b9",
                "IfTrue": "jfwd6v6a"
              }
            ],
            "Label": [
              "Avez-vous, au cours du dernier exercice comptable, réalisé des études visant à protéger l'environnement de votre activité ?"
            ],
            "id": "jfwbjrun",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SINGLE_CHOICE",
            "Name": "Q_etudes"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "k3hbbn8m",
                "id": "k9e4vb2c",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbm88p",
                "id": "k9e4osmx",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbcy42",
                "id": "k9e4s173",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbggo2",
                "id": "k9e53wfi",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbly6z",
                "id": "k9e532i2",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbh4px",
                "id": "k9e4mxdx",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hbbafi",
                "id": "k9e4ks4v",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              },
              {
                "CollectedVariableReference": "k3hb5x32",
                "id": "k9e4ll9c",
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Veuillez indiquer ci-dessous, pour chaque domaine environnemental, le montant dépensé pour les études en prévision d'un investissement pour la protection de l'environnement (en milliers d'euros (k€), hors TVA)"
            ],
            "ResponseStructure": {
              "Mapping": [
                {
                  "MappingSource": "k9e4vb2c",
                  "MappingTarget": "1 1"
                },
                {
                  "MappingSource": "k9e4osmx",
                  "MappingTarget": "2 1"
                },
                {
                  "MappingSource": "k9e4s173",
                  "MappingTarget": "3 1"
                },
                {
                  "MappingSource": "k9e53wfi",
                  "MappingTarget": "4 1"
                },
                {
                  "MappingSource": "k9e532i2",
                  "MappingTarget": "5 1"
                },
                {
                  "MappingSource": "k9e4mxdx",
                  "MappingTarget": "6 1"
                },
                {
                  "MappingSource": "k9e4ks4v",
                  "MappingTarget": "7 1"
                },
                {
                  "MappingSource": "k9e4ll9c",
                  "MappingTarget": "8 1"
                }
              ],
              "Dimension": [
                {
                  "dimensionType": "PRIMARY",
                  "dynamic": "0",
                  "CodeListReference": "k3ix3ghm"
                },
                {
                  "dimensionType": "MEASURE",
                  "Label": "Montants",
                  "dynamic": "0"
                }
              ]
            },
            "id": "jfwbnipg",
            "TargetMode": [
              "CAPI",
              "CAWI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "TABLE",
            "Name": "etudes_tableau"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfwcsoch",
                "id": "jfwcnrft",
                "mandatory": false,
                "Datatype": {
                  "Maximum": "999999999",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/keuro",
                  "type": "NumericDatatypeType",
                  "Decimals": "1"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Veuillez indiquer ci-dessous le montant dépensé pour les [autres études (dossiers ICPE, préparation dossier certification, études d'impact, études réglementaires, audits...) (en milliers d'euros (k€), hors TVA)](. \"La ligne « autres études » comprend notamment l’ensemble des études réglementaires (études de danger, risques naturels…) ou d’impact de l’activité de l’établissement sur l’environnement, ainsi que les audits (dossiers de préparation à la certification iso 14001 ou EMAS…) et les dossiers ICPE (Installations Classées pour la Protection de l’Environnement). Les achats de services de certification et de réglementation ne sont pas à prendre en compte ici.\")"
            ],
            "id": "jfwck7i2",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "TA"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "jfwcvafs",
                "id": "jfwcud1e",
                "mandatory": false,
                "Datatype": {
                  "Maximum": "100",
                  "Minimum": "0",
                  "typeName": "NUMERIC",
                  "Unit": "http://id.insee.fr/unit/percent",
                  "type": "NumericDatatypeType",
                  "Decimals": ""
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "[Indiquez la part des achats de services dans la totalité des études (si pas de sous-traitance, mettre 0)](. \"La part des achats de services correspond aux études réalisées par des sociétés externes. Si votre établissement réalise l’intégralité de ses études en interne, mettre 0.\")"
            ],
            "id": "jfwcpmkc",
            "TargetMode": [
              "CAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "PART_ACHAT"
          },
          {
            "Response": [
              {
                "CollectedVariableReference": "k9e4njl0",
                "id": "jfwclx75",
                "mandatory": false,
                "Datatype": {
                  "Pattern": "",
                  "typeName": "TEXT",
                  "type": "TextDatatypeType",
                  "MaxLength": "512"
                }
              }
            ],
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "Label": [
              "Merci de préciser les études menées :"
            ],
            "id": "jfwcqoio",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [],
            "type": "QuestionType",
            "questionType": "SIMPLE",
            "Name": "precision_etudes"
          }
        ],
        "Name": "II-ETUDESPOUR"
      },
      {
        "Control": [],
        "depth": 1,
        "FlowControl": [],
        "genericName": "MODULE",
        "Label": [
          "Investissements pour protéger l'environnement"
        ],
        "id": "jfwd6v6a",
        "TargetMode": [
          "CAPI",
          "CAWI",
          "PAPI"
        ],
        "Declaration": [
          {
            "declarationType": "INSTRUCTION",
            "Text": "Ils concernent les achats de **bâtiments, terrains, machines ou équipements** destinés à **traiter, mesurer, contrôler ou limiter la pollution** générée par l’activité de votre établissement.&#xd;​&#xd;**Attention : un investissement donné ne doit être comptabilisé qu’une seule fois :**&#xd;​&#xd;**- soit en III.2 pour les investissements entièrement dédiés à la protection de l’environnement ;**&#xd;​&#xd;**- soit en III.5 pour les achats d’équipements de production plus performants en matière environnementale.**&#xd;​",
            "id": "jfwd87zs",
            "position": "AFTER_QUESTION_TEXT"
          }
        ],
        "type": "SequenceType",
        "Child": [
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Investissements matériels entièrement dédiés à la protection de l'environnement (dits spécifiques)"
            ],
            "id": "jfwcxp13",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Au cours de l’année $AN$ vous avez pu notamment investir pour protéger l’environnement dans des matériels, bâtiments et terrains dédiés entièrement à l’environnement. Il s’agit alors d’investissements spécifiquement dédiés à l’environnement, comme par exemple : matériel de mesure des polluants, filtres, décanteurs, bennes, bacs de rétention…",
                "id": "jqxrhvl1",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "jfwd51nl",
                    "id": "jfwcwf6x",
                    "mandatory": false,
                    "CodeListReference": "jftnpqno",
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "visualizationHint": "CHECKBOX",
                      "type": "TextDatatypeType",
                      "MaxLength": 1
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [
                  {
                    "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 4 du module III. Sinon, veuillez poursuivre.",
                    "Expression": "$Q_INV_SPE$ = '2'",
                    "id": "jqqqhufy",
                    "IfTrue": "jfwgrbz3"
                  }
                ],
                "Label": [
                  "Avez-vous, au cours du dernier exercice comptable, investi dans des équipements spécifiquement dédiés à l'environnement (voir exemples ci-dessus) ?"
                ],
                "id": "jfwd1un6",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SINGLE_CHOICE",
                "Name": "Q_inv_spe"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2n9qa7g",
                    "id": "k9e4kjft",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9j4fv",
                    "id": "k9e4pqzg",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9qas3",
                    "id": "k9e4xe9b",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9iori",
                    "id": "k9e4yqxe",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9j5sq",
                    "id": "k9e4kb48",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9nzj8",
                    "id": "k9e4yggj",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9m64r",
                    "id": "k9e4nv8o",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9llms",
                    "id": "k9e55cj4",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9hopp",
                    "id": "k9e4qkt9",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9lmrv",
                    "id": "k9e4obge",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9z0n8",
                    "id": "k9e523b7",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9w9c5",
                    "id": "k9e558q6",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9rqh7",
                    "id": "k9e4l3im",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9sglo",
                    "id": "k9e4q7l2",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9i3xx",
                    "id": "k9e4mxgh",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na2gzp",
                    "id": "k9e4l5fm",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na1939",
                    "id": "k9e4px89",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9zaq7",
                    "id": "k9e52npy",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9rspc",
                    "id": "k9e5514x",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9tdfc",
                    "id": "k9e4nkoc",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9qqei",
                    "id": "k9e4nq14",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9set1",
                    "id": "k9e4lcjz",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na2oac",
                    "id": "k9e4pvdd",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9qj8u",
                    "id": "k9e4q3vd",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9q0yz",
                    "id": "k9e4rzb0",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9tyym",
                    "id": "k9e4t7vn",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9m2vz",
                    "id": "k9e50rvp",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9lmwe",
                    "id": "k9e4zvm0",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9xu0v",
                    "id": "k9e54xfq",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9oi6v",
                    "id": "k9e51olg",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9l3vn",
                    "id": "k9e506pn",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9kmbm",
                    "id": "k9e4nwyp",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na246c",
                    "id": "k9e538xh",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na2aym",
                    "id": "k9e4o6kt",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9rpkg",
                    "id": "k9e50jfu",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9ztdt",
                    "id": "k9e4os0a",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9x28k",
                    "id": "k9e4wwei",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9ovwc",
                    "id": "k9e4vvng",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2na0ym3",
                    "id": "k9e50aus",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2n9tpgw",
                    "id": "k9e539ry",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "vérifier l'écart entre le total (E4) et sa ventilation (E1+E2+E3+ER) ",
                    "Expression": "($E3$ + $E1$ + $E2$ + $ER$) != $E4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine des eaux usées ($tot_calc_E$) est différente du total indiqué ($E4$).",
                    "id": "k3k6ibcb"
                  },
                  {
                    "post_collect": false,
                    "Description": "vérifier l'écart entre le total D4 et sa ventilation (D3+D1+D2+DR)",
                    "Expression": "($D3$ + $D1$ + $D2$ + $DR$) != $D4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine des déchets hors radioactifs ($tot_calc_D$) est différente du total indiqué ($D4$)",
                    "id": "k3k6n5cl"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (A4) et sa ventilation",
                    "Expression": "($A3$ + $A1$ + $A2$ + $AR$) != $A4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": " La somme des montants des investissements dans le domaine de la protection de l'air ($tot_calc_A$) est différente du total indiqué ($A4$).",
                    "id": "k3k6hx0x"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (G4) et sa ventilation",
                    "Expression": "($G3$ + $G1$ + $G2$ + $GR$) != $G4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine de la limitation des émissions de gaz à effet de serre ($tot_calc_G$) est différente du total indiqué ($G4$).",
                    "id": "k3k6o9oe"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (B4) et sa ventilation",
                    "Expression": "($B3$ + $B1$ + $BR$) != $B4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine des bruits et vibrations ($tot_calc_B$) est différente du total indiqué ($B4$).",
                    "id": "k3k6f1fu"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (S4) et sa ventilation",
                    "Expression": "($S3$ + $S1$ + $SR$) != $S4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine des sols, eaux souterraines et de surface ($tot_calc_S$) est différente du total indiqué ($S4$).",
                    "id": "k3k6qlfp"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (P4) et sa ventilation",
                    "Expression": "($P3$ + $P1$ + $PR$) != $P4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans le domaine des sites, paysages et biodiversité ($tot_calc_P$) est différente du total indiqué ($P4$)  ",
                    "id": "k3k6cxur"
                  },
                  {
                    "post_collect": false,
                    "Description": "Vérifier l'écart entre le total (R4) et sa ventilation",
                    "Expression": "($R3$ + $R1$ + $R2$ + $RR$) != $R4$ ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des investissements dans les autres domaines (rayonnement, R&D sur l'environnement...) ($tot_calc_R$) est différente du total indiqué ($R4$).",
                    "id": "k3k6i2yl"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci de répartir les montants investis selon les domaines environnementaux et la nature de ces investissements (en milliers d'euros (k€), hors TVA)"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e4kjft",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4pqzg",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e4xe9b",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e4yqxe",
                      "MappingTarget": "4 1"
                    },
                    {
                      "MappingSource": "k9e4kb48",
                      "MappingTarget": "5 1"
                    },
                    {
                      "MappingSource": "k9e4yggj",
                      "MappingTarget": "6 1"
                    },
                    {
                      "MappingSource": "k9e4nv8o",
                      "MappingTarget": "7 1"
                    },
                    {
                      "MappingSource": "k9e55cj4",
                      "MappingTarget": "8 1"
                    },
                    {
                      "MappingSource": "k9e4qkt9",
                      "MappingTarget": "1 2"
                    },
                    {
                      "MappingSource": "k9e4obge",
                      "MappingTarget": "2 2"
                    },
                    {
                      "MappingSource": "k9e523b7",
                      "MappingTarget": "3 2"
                    },
                    {
                      "MappingSource": "k9e558q6",
                      "MappingTarget": "4 2"
                    },
                    {
                      "MappingSource": "k9e4l3im",
                      "MappingTarget": "5 2"
                    },
                    {
                      "MappingSource": "k9e4q7l2",
                      "MappingTarget": "6 2"
                    },
                    {
                      "MappingSource": "k9e4mxgh",
                      "MappingTarget": "7 2"
                    },
                    {
                      "MappingSource": "k9e4l5fm",
                      "MappingTarget": "8 2"
                    },
                    {
                      "MappingSource": "k9e4px89",
                      "MappingTarget": "1 3"
                    },
                    {
                      "MappingSource": "k9e52npy",
                      "MappingTarget": "2 3"
                    },
                    {
                      "MappingSource": "k9e5514x",
                      "MappingTarget": "3 3"
                    },
                    {
                      "MappingSource": "k9e4nkoc",
                      "MappingTarget": "4 3"
                    },
                    {
                      "MappingSource": "k9e4nq14",
                      "MappingTarget": "5 3"
                    },
                    {
                      "MappingSource": "k9e4lcjz",
                      "MappingTarget": "6 3"
                    },
                    {
                      "MappingSource": "k9e4pvdd",
                      "MappingTarget": "7 3"
                    },
                    {
                      "MappingSource": "k9e4q3vd",
                      "MappingTarget": "8 3"
                    },
                    {
                      "MappingSource": "k9e4rzb0",
                      "MappingTarget": "1 4"
                    },
                    {
                      "MappingSource": "k9e4t7vn",
                      "MappingTarget": "2 4"
                    },
                    {
                      "MappingSource": "k9e50rvp",
                      "MappingTarget": "3 4"
                    },
                    {
                      "MappingSource": "k9e4zvm0",
                      "MappingTarget": "4 4"
                    },
                    {
                      "MappingSource": "k9e54xfq",
                      "MappingTarget": "5 4"
                    },
                    {
                      "MappingSource": "k9e51olg",
                      "MappingTarget": "6 4"
                    },
                    {
                      "MappingSource": "k9e506pn",
                      "MappingTarget": "7 4"
                    },
                    {
                      "MappingSource": "k9e4nwyp",
                      "MappingTarget": "8 4"
                    },
                    {
                      "MappingSource": "k9e538xh",
                      "MappingTarget": "1 5"
                    },
                    {
                      "MappingSource": "k9e4o6kt",
                      "MappingTarget": "2 5"
                    },
                    {
                      "MappingSource": "k9e50jfu",
                      "MappingTarget": "3 5"
                    },
                    {
                      "MappingSource": "k9e4os0a",
                      "MappingTarget": "4 5"
                    },
                    {
                      "MappingSource": "k9e4wwei",
                      "MappingTarget": "5 5"
                    },
                    {
                      "MappingSource": "k9e4vvng",
                      "MappingTarget": "6 5"
                    },
                    {
                      "MappingSource": "k9e50aus",
                      "MappingTarget": "7 5"
                    },
                    {
                      "MappingSource": "k9e539ry",
                      "MappingTarget": "8 5"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k3ix3ghm"
                    },
                    {
                      "dimensionType": "SECONDARY",
                      "dynamic": "0",
                      "CodeListReference": "jfwd07ev"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "montants",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k2n9tgf1",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "invmattab"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k9e4tvwc",
                    "id": "jfwd1eiz",
                    "mandatory": false,
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "type": "TextDatatypeType",
                      "MaxLength": "512"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci de préciser vos principaux investissements spécifiques :"
                ],
                "id": "jfwcyx1y",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "precision_inv_spe"
              }
            ],
            "Name": "INVmat"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Investissements matériels pour changement de procédé : achats d'équipements de production plus performants en matière environnementale (dits intégrés)"
            ],
            "id": "jfwgxry6",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Au cours de l’année $AN$, vous avez pu investir dans des outils de production en faisant le choix qu’ils soient plus performants en matière environnementale que d’autres équipements possédant des fonctions et caractéristiques similaires. Cette rubrique concerne ces achats de matériels qui permettent de générer moins de pollution par rapport à d’autres outils disponibles sur le marché (exemples : acquisition de véhicules électriques moins polluants, de machines moins bruyantes, émettant moins de fumées, moins de gaz à effet de serre, générant moins de déchets…). Seules les dépenses décidées dans le but de lutter contre la pollution sont ici prises en compte.&#xd;Attention : un investissement déclaré ici ne doit pas déjà figurer dans le tableau III.2. Cette rubrique ne comprend pas les équipements en amont ou en aval de la production tels que les stations d'épuration, les décharges ou les installations de pré-traitement ou traitement des déchets ou eaux usées (à inclure dans la partie III, question 2).",
                "id": "jfwgtkks",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "jfwgs69t",
                    "id": "jfwgzv0w",
                    "mandatory": false,
                    "CodeListReference": "jftnpqno",
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "visualizationHint": "CHECKBOX",
                      "type": "TextDatatypeType",
                      "MaxLength": 1
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [
                  {
                    "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 1 du module IV. Sinon, veuillez poursuivre.",
                    "Expression": "$Q_INV_INT$ = '2'",
                    "id": "jqwfc2oy",
                    "IfTrue": "k2kn0bvf"
                  }
                ],
                "Label": [
                  "Avez-vous, au cours du dernier exercice comptable, investi dans des équipements de production plus performants en matière environnementale ?"
                ],
                "id": "jfwgrbz3",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Si l'équipement dans lequel vous avez investi n'est pas plus cher que les autres, il n'est pas à prendre en compte.",
                    "id": "jsbhee77",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SINGLE_CHOICE",
                "Name": "Q_inv_int"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "jsahjlve",
                    "id": "jsahv7r6",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "99999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant global de l'investissement pour changement de procédé, c'est-à-dire les achats d'équipements de production plus performants en matière environnementale (en milliers d'euros (k€), hors TVA)."
                ],
                "id": "jg274yis",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Pour vos investissements pour changement de procédé, on demande d'abord le montant global de l'investissement (question 5) puis la part relevant de la protection de l'environnement (exprimée au choix en montant - question 6 - ou en pourcentage - question 7).",
                    "id": "jqxs0uch",
                    "position": "BEFORE_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "I1"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "jsahhqrh",
                    "id": "jsahshku",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "99999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "si part estimée relevant de la protection de l'environnement > montant de l'investissement (si I2 > I1)",
                    "Expression": "$I2$ > $I1$ and $I1$!=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Attention ! La part estimée relevant de la protection de l'environnement doit être inférieure au montant global de l'investissement",
                    "id": "jsai4xpv"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez, au sein de ce montant global, la part relevant de la protection de l'environnement. Elle correspond au surcoût lié à l'achat d'un équipement moins polluant qu'un produit remplissant les mêmes fonctions disponible sur le marché (en milliers d'euros (k€), hors TVA)."
                ],
                "id": "jsahlp9k",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Cette part « environnement » peut être estimée en comparant le prix de votre équipement à celui des autres équipements disponibles sur le marché. Il s’agit du surcoût de votre investissement par rapport au moins onéreux des autres équipements possédant des fonctions et caractéristiques similaires, à l’exception des considérations de protection de l’environnement (via la comparaison de devis, par exemple).",
                    "id": "jsahnjif",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "I2"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "jh7rrkmw",
                    "id": "jh7rxns4",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "99",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "si part estimée en % relevant de la protection de l'environnement différente de 0 ou nulle et montant global de l'investissement (I1) nul ou vide",
                    "Expression": "$I3$ >= 0 and $I3$ != '' and ($I1$ = 0 or $I1$ = '')",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Attention ! Vous n'avez pas rempli le montant global de l'investissement. \n",
                    "id": "jrt91b6y"
                  },
                  {
                    "post_collect": false,
                    "Description": "Contrôle de cohérence entre la part en valeur et en %",
                    "Expression": "$I1$ != '' and $I1$ >0 and $I2$ !='' and $I3$ !='' and ((($I2$ *100 div $I1$) - $I3$) > 2 or (($I2$ *100 div $I1$) - $I3$) < -2)",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Attention les parts relevant de la protection de l'environnement, indiquées en valeur et en pourcentage, ne sont pas cohérentes entre elles.",
                    "id": "js3c7ax1"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Ou, si vous préférez, indiquez en pourcentage la part estimée relevant de la protection de l'environnement"
                ],
                "id": "jh7s1v0h",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "HELP",
                    "Text": "Cette part ne peut pas être égale à 100%.",
                    "id": "jh7rxk90",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "I3"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k3k5qlxy",
                    "id": "k9e53ysm",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5ivk7",
                    "id": "k9e4t7vm",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5j6l9",
                    "id": "k9e4qszz",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5ltgn",
                    "id": "k9e4pbc0",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5cvob",
                    "id": "k9e4mkap",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5lbw6",
                    "id": "k9e53y7v",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5l76l",
                    "id": "k9e55hpf",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5jeoy",
                    "id": "k9e501zy",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  },
                  {
                    "CollectedVariableReference": "k3k5kalq",
                    "id": "k9e4ptpg",
                    "Datatype": {
                      "Maximum": "100",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/percent",
                      "type": "NumericDatatypeType",
                      "Decimals": ""
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "vérifier que la somme de la part environnement des investissements par domaine est différente de 100",
                    "Expression": "($IE$ + $ID$ + $IA$ + $IG$ + $IB$ + $IS$ + $IP$ + $IR$) != 100",
                    "during_collect": false,
                    "criticity": "WARN",
                    "FailMessage": "Attention, le total doit être égal à 100%",
                    "id": "jk3yqjny"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci de répartir la part environnement de ces investissements entre les domaines suivants :"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e53ysm",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4t7vm",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e4qszz",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e4pbc0",
                      "MappingTarget": "4 1"
                    },
                    {
                      "MappingSource": "k9e4mkap",
                      "MappingTarget": "5 1"
                    },
                    {
                      "MappingSource": "k9e53y7v",
                      "MappingTarget": "6 1"
                    },
                    {
                      "MappingSource": "k9e55hpf",
                      "MappingTarget": "7 1"
                    },
                    {
                      "MappingSource": "k9e501zy",
                      "MappingTarget": "8 1"
                    },
                    {
                      "MappingSource": "k9e4ptpg",
                      "MappingTarget": "9 1"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k2n9r7ku"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Ventilation en %",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "jg2906j3",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "(donner si possible une estimation par domaine, ou à défaut, indiquer 100 % dans le domaine jugé principal)",
                    "id": "jrt93avv",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "tab_part_protection_env"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k9e4pkwu",
                    "id": "jg29nbic",
                    "mandatory": false,
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "type": "TextDatatypeType",
                      "MaxLength": "512"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "**Merci de décrire vos nouveaux outils de production améliorant la protection de l’environnement :**"
                ],
                "id": "jg29j30j",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "description"
              }
            ],
            "Name": "INVprocede"
          }
        ],
        "Name": "III-INVESTISSE"
      },
      {
        "Control": [],
        "depth": 1,
        "FlowControl": [],
        "genericName": "MODULE",
        "Label": [
          "Dépenses courantes pour protéger l'environnement"
        ],
        "id": "k2kn0bvf",
        "TargetMode": [
          "CAPI",
          "CAWI",
          "PAPI"
        ],
        "Declaration": [
          {
            "declarationType": "INSTRUCTION",
            "Text": "Elles correspondent aux frais d'exploitation et de gestion courante engagés pour protéger l'environnement, par opposition aux dépenses d'investissement ou d'études.&#xd;​&#xd;Les dépenses courantes correspondent aux coûts annuels d’exploitation et d’entretien d’une activité, d’une technique, d’un processus ou d’un équipement ayant pour objectif de prévenir, de réduire, de traiter ou d’éliminer les pressions environnementales générées par l’activité de votre établissement.&#xd;Ces coûts peuvent être : &#xd;- externes : facturés par des tiers (y compris les loyers de location longue durée)&#xd;- ou internes : frais de personnel (salaires + charges sociales).&#xd;Il peut s’agir aussi bien de dépenses réalisées régulièrement que de dépenses exceptionnelles. Les amortissements sont exclus.",
            "id": "k3hc4aej",
            "position": "AFTER_QUESTION_TEXT"
          }
        ],
        "type": "SequenceType",
        "Child": [
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Dépenses de fonctionnement et d'entretien des équipements entièrement dédiés à l'environnement"
            ],
            "id": "k2kndyyt",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "[Les dépenses courantes prises en compte ici correspondent aux dépenses de fonctionnement des équipements entièrement dédiés à la protection de l’environnement](. \"Exemple pour aider au remplissage du questionnaire : vous possédez déjà un filtre à particules, qui a besoin d’être entretenu (partie IV) : si vous faites appel à une société extérieure pour cet entretien, le montant de la facture sera à prendre en compte en tant que « achats de services liés aux équipements spécifiques » (1ère colonne du tableau partie IV question 2). si une personne de votre établissement réalise elle-même cet entretien, il faudra estimer son salaire et ses charges au prorata du temps passé à cet entretien, ainsi que le coût des produits d’entretien nécessaires, en tant que « coûts internes liés aux équipements spécifiques » (2ème colonne du tableau partie IV question 2). \")",
                "id": "k2nf0dvk",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2kn7cwh",
                    "id": "k2kn2gsi",
                    "mandatory": false,
                    "CodeListReference": "jftnpqno",
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "visualizationHint": "CHECKBOX",
                      "type": "TextDatatypeType",
                      "MaxLength": 1
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [
                  {
                    "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 4.",
                    "Expression": "$Q_DEP_COUR$ = '2'",
                    "id": "k2lwb5dy",
                    "IfTrue": "k2knd6ts"
                  }
                ],
                "Label": [
                  "Avez-vous, au cours du dernier exercice comptable, engagé des dépenses nécessaires au fonctionnement des équipements entièrement dédiés à la protection de l'environnement ?"
                ],
                "id": "k2kncpqe",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SINGLE_CHOICE",
                "Name": "Q_DEP_COUR"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k3il4d5d",
                    "id": "k9e51v38",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il5f82",
                    "id": "k9e4yivl",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il3dj4",
                    "id": "k9e4phdd",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikrrph",
                    "id": "k9e4zrqv",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il81cn",
                    "id": "k9e4zytl",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikxcfc",
                    "id": "k9e51n23",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikx5yy",
                    "id": "k9e4mzsa",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikn3hd",
                    "id": "k9e4vufi",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il1b0e",
                    "id": "k9e4qm6y",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il5b1x",
                    "id": "k9e528yh",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il75pk",
                    "id": "k9e53fn1",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikw48h",
                    "id": "k9e54q0p",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il6cj9",
                    "id": "k9e4vkm3",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikolvi",
                    "id": "k9e52xw3",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikr30x",
                    "id": "k9e51qam",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il6nxa",
                    "id": "k9e4vyso",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ikzjg5",
                    "id": "k9e4y2xn",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3il3w6a",
                    "id": "k9e4xpgr",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "La somme des montants des dépenses en achats de services est différente du total indiqué.",
                    "Expression": "$CTS$ != ($CES$ + $CDS$ + $CAS$ + $CGS$ + $CBS$ + $CSS$ + $CPS$ + $CRS$) ",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des dépenses en achats de services est différente du total indiqué.",
                    "id": "k2nd0wo7"
                  },
                  {
                    "post_collect": false,
                    "Description": "La somme des montants des dépenses en coûts internes est différente du total indiqué.",
                    "Expression": "$CTI$ != ($CEI$ + $CDI$ + $CAI$ + $CGI$ + $CBI$ + $CSI$ + $CPI$ + $CRI$)",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des dépenses en coûts internes est différente du total indiqué.",
                    "id": "k2ndjkhl"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci de répartir les dépenses nécessaires au fonctionnement des équipements entièrement dédiés à la protection de l'environnement, selon les domaines environnementaux et la prise en charge en interne ou non de ces dépenses (en milliers d'euros (k€), hors TVA)"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e51v38",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4yivl",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e4phdd",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e4zrqv",
                      "MappingTarget": "4 1"
                    },
                    {
                      "MappingSource": "k9e4zytl",
                      "MappingTarget": "5 1"
                    },
                    {
                      "MappingSource": "k9e51n23",
                      "MappingTarget": "6 1"
                    },
                    {
                      "MappingSource": "k9e4mzsa",
                      "MappingTarget": "7 1"
                    },
                    {
                      "MappingSource": "k9e4vufi",
                      "MappingTarget": "8 1"
                    },
                    {
                      "MappingSource": "k9e4qm6y",
                      "MappingTarget": "9 1"
                    },
                    {
                      "MappingSource": "k9e528yh",
                      "MappingTarget": "1 2"
                    },
                    {
                      "MappingSource": "k9e53fn1",
                      "MappingTarget": "2 2"
                    },
                    {
                      "MappingSource": "k9e54q0p",
                      "MappingTarget": "3 2"
                    },
                    {
                      "MappingSource": "k9e4vkm3",
                      "MappingTarget": "4 2"
                    },
                    {
                      "MappingSource": "k9e52xw3",
                      "MappingTarget": "5 2"
                    },
                    {
                      "MappingSource": "k9e51qam",
                      "MappingTarget": "6 2"
                    },
                    {
                      "MappingSource": "k9e4vyso",
                      "MappingTarget": "7 2"
                    },
                    {
                      "MappingSource": "k9e4y2xn",
                      "MappingTarget": "8 2"
                    },
                    {
                      "MappingSource": "k9e4xpgr",
                      "MappingTarget": "9 2"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k2n9r7ku"
                    },
                    {
                      "dimensionType": "SECONDARY",
                      "dynamic": "0",
                      "CodeListReference": "k2ltzkcr"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montant",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k2lu0wl1",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Les amortissements et les redevances de crédit-bail sont exclus. ",
                    "id": "k3iqw00w",
                    "position": "AFTER_QUESTION_TEXT"
                  },
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Si certaines de ces dépenses ne peuvent être déterminées précisément, merci de fournir une estimation. ",
                    "id": "k3irf2la",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "tableau1"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k3ipnx0v",
                    "id": "k9e4v4da",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3iptolo",
                    "id": "k9e53ty1",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipsamt",
                    "id": "k9e53lnu",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipmfdd",
                    "id": "k9e5044u",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipwz2k",
                    "id": "k9e522ut",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipe1by",
                    "id": "k9e4pil5",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipntc2",
                    "id": "k9e4v9nu",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipw7n1",
                    "id": "k9e50443",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3ipstqr",
                    "id": "k9e52uzp",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "La somme des montants des dépenses de compensation est différente du total indiqué.\n",
                    "Expression": "$DEPCOMPT$ != ($DEPCOMPE$ + $DEPCOMPD$ + $DEPCOMPA$ + $DEPCOMPG$ + $DEPCOMPB$ + $DEPCOMPS$ + $DEPCOMPP$ + $DEPCOMPR$)",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des dépenses de compensation est différente du total indiqué.\n",
                    "id": "k3ipwyl1"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci, le cas échéant, de répartir vos dépenses de compensation selon leurs domaines environnementaux (en milliers d'euros (k€), hors TVA)&#xd;​"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e4v4da",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e53ty1",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e53lnu",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e5044u",
                      "MappingTarget": "4 1"
                    },
                    {
                      "MappingSource": "k9e522ut",
                      "MappingTarget": "5 1"
                    },
                    {
                      "MappingSource": "k9e4pil5",
                      "MappingTarget": "6 1"
                    },
                    {
                      "MappingSource": "k9e4v9nu",
                      "MappingTarget": "7 1"
                    },
                    {
                      "MappingSource": "k9e50443",
                      "MappingTarget": "8 1"
                    },
                    {
                      "MappingSource": "k9e52uzp",
                      "MappingTarget": "9 1"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k2n9r7ku"
                    },
                    {
                      "dimensionType": "SECONDARY",
                      "dynamic": "0",
                      "CodeListReference": "k3hd2gge"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montant",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k3hczdgd",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Les dépenses de compensation sont liées au dispositif réglementaire dit « Séquence ERC : éviter, réduire, compenser ». Si les mesures déjà prises par votre entreprise pour réduire ou éviter les impacts d’un projet sont insuffisantes, vous avez peut-être mis en œuvre des mesures compensatoires qui peuvent être des restaurations/réhabilitations de milieu (exemple : restauration de berges), des créations (exemple : d’abris pour la faune) ou des évolutions des pratiques de gestion du milieu (exemple : abandon ou forte réduction du traitement phytosanitaire).",
                    "id": "k3hdtymr",
                    "position": "AFTER_QUESTION_TEXT"
                  },
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Si certaines de ces dépenses ne peuvent être déterminées précisément, merci de fournir une estimation.",
                    "id": "k3ir8b9e",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "tableau2"
              }
            ],
            "Name": "DEP_FON"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Paiement de diverses redevances, taxes et frais courants : Eau"
            ],
            "id": "k2knd6ts",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "COMMENT",
                "Text": "Plusieurs dépenses peuvent être nulles : dans ce cas, merci de bien indiquer \"0\" (si aucune dépense n'a été effectuée au cours du dernier exercice comptable).&#xd;Vous êtes susceptible d’avoir des factures et/ou notes de débit : &#xd;- de l’agence de l’eau (appel à redevances)&#xd;- du gestionnaire du réseau d’eau potable (entreprise en Délégation de Service Public ou collectivité)&#xd;- du gestionnaire de la station d’épuration collective.",
                "id": "k2knckuu",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k3hei6bl",
                    "id": "k3henjh5",
                    "mandatory": false,
                    "Datatype": {
                      "typeName": "BOOLEAN",
                      "type": "BooleanDatatypeType"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Cochez cette case si vous n'êtes pas raccordé au tout à l'égout"
                ],
                "id": "k3he9m86",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "RAC_EGOUT"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k5quf8n9",
                    "id": "k9e51xw9",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5quvr89",
                    "id": "k9e4kr9r",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qunhfc",
                    "id": "k9e4wpup",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qujw5s",
                    "id": "k9e4lzmj",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant des frais et redevances pour la distribution de l'eau, y compris redevances pour prélèvements sur la ressource en eau (en milliers d'euros (k€), hors TVA) :"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e51xw9",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4kr9r",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e4wpup",
                      "MappingTarget": "1 2"
                    },
                    {
                      "MappingSource": "k9e4lzmj",
                      "MappingTarget": "2 2"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k5qtxcno"
                    },
                    {
                      "dimensionType": "SECONDARY",
                      "dynamic": "0",
                      "CodeListReference": "k5qubesb"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montant des frais et redevances pour la distribution de l'eau",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k5qufihp",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "DISTRIB_RED"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k5qvcfok",
                    "id": "k9e4wi7i",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qv4tnr",
                    "id": "k9e4mvx6",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qv13o0",
                    "id": "k9e4kwgg",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5quyb5q",
                    "id": "k9e4ta13",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qv090n",
                    "id": "k9e4qqcc",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k5qv8lqs",
                    "id": "k9e4yivc",
                    "Datatype": {
                      "Maximum": "999999999",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant des frais et redevances pour la collecte et l'assainissement des eaux usées, y compris redevances pour pollution de l'eau et redevance pour modernisation des réseaux de collecte (en milliers d'euros (k€), hors TVA) :"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e4wi7i",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4mvx6",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e4kwgg",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e4ta13",
                      "MappingTarget": "1 2"
                    },
                    {
                      "MappingSource": "k9e4qqcc",
                      "MappingTarget": "2 2"
                    },
                    {
                      "MappingSource": "k9e4yivc",
                      "MappingTarget": "3 2"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k49zboy9"
                    },
                    {
                      "dimensionType": "SECONDARY",
                      "dynamic": "0",
                      "CodeListReference": "k49z39rg"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montant en milliers d'euros",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k2knd7t0",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "RED_"
              }
            ],
            "Name": "EAUPAIEMENT"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Paiement de diverses redevances, taxes et frais courants : Déchets"
            ],
            "id": "k2lm5r2s",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Dépenses liées à la récupération et au traitement de vos déchets en distinguant le fait que vous fassiez appel à un prestataire de services ou aux services collectifs.&#xd;Ces dépenses ne peuvent pas être nulles.",
                "id": "k2lmgvv3",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lm5afn",
                    "id": "k2lmnr3h",
                    "mandatory": false,
                    "CodeListReference": "jftnpqno",
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "visualizationHint": "CHECKBOX",
                      "type": "TextDatatypeType",
                      "MaxLength": 1
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [
                  {
                    "Description": "Si vous avez répondu \"NON\" à cette question, veuillez passer à la question 9.",
                    "Expression": "$PRES_OUI_NON$='2'",
                    "id": "k5cfcw8n",
                    "IfTrue": "k2lmyq9t"
                  }
                ],
                "Label": [
                  "Avez-vous, au cours du dernier exercice comptable, engagé des dépenses liées à la récupération et au traitement de vos déchets auprès d'un prestataire de service ?"
                ],
                "id": "k2lmmbp0",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SINGLE_CHOICE",
                "Name": "PRES_OUI_NON"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lwnmmn",
                    "id": "k9e4ws2k",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k2lwqh2u",
                    "id": "k9e4ny3d",
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant de vos dépenses liées à la récupération et au traitement de vos déchets auprès de prestataires de services (en milliers d'euros (k€), hors TVA) :"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e4ws2k",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4ny3d",
                      "MappingTarget": "2 1"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k2lwbd1a"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montants",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k2lmsvj8",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Prendre en compte, ici, la collecte, l'enlèvement des déchets industriels, le transport, le traitement et l'élimination des déchets.",
                    "id": "k2lmzhu9",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "PRES"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lmuxy9",
                    "id": "k2lnbxba",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant de vos dépenses liées à la récupération et au traitement de vos déchets auprès des services collectifs (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lmyq9t",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Prendre en compte, ici, la taxe d'enlèvement des ordures ménagères, la taxe incitative d'enlèvement des ordures ménagères (indiquée sur l'avis de taxe foncière), la redevance générale d'enlèvement des ordures ménagères, la redevance incitative d'enlèvement des ordures ménagères, la redevance spéciale pour l'enlèvement des déchets assimilés ne provenant pas des ménages.",
                    "id": "k2ln4fp3",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "SERV_ORDM"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lnapdr",
                    "id": "k2lniu8y",
                    "mandatory": false,
                    "CodeListReference": "jftnpqno",
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "visualizationHint": "CHECKBOX",
                      "type": "TextDatatypeType",
                      "MaxLength": 1
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Êtes-vous totalement exonéré de la taxe d'enlèvement des ordures ménagères ?"
                ],
                "id": "k2lmyzh9",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SINGLE_CHOICE",
                "Name": "NC_SERV_ORDM"
              }
            ],
            "Name": "DECHETSPAIEMENT"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Paiement de diverses redevances, taxes et frais courants : Divers (y compris TGAP)"
            ],
            "id": "k2lmzym5",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Dépenses liées à des achats de services de protection de l'environnement : cotisations à des organismes spécialisés agréés (Citeo (Eco-emballages, Ecofolio), Aliapur, réseaux de surveillance de la qualité de l'air...), permis et redevances d'exploitation, taxes sur les émissions polluantes. Les paiements d'amendes sont exclus.&#xd;Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                "id": "k2lnnqx2",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lnf18b",
                    "id": "k2lozxaf",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$COTIS$ = ''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5cjgvmz"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant des éco-contributions payées aux filières REP (Responsabilité Élargie du Producteur) (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2ln8wbk",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Par exemple : Citeo (Eco-emballages, Ecofolio), Aliapur, Eco-mobilier...",
                    "id": "k2lnthzv",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "COTIS"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lnq427",
                    "id": "k2lp9br5",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$AU_TA$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5ckjqij"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant des autres taxes et cotisations sur les émissions et la dégradation de l'environnement (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lnflvv",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Par exemple : réseaux de surveillance de la qualité de l'air, certificat de garantie d'origine pour l'énergie... ",
                    "id": "k2lno2on",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "AU_TA"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k3hgo8wb",
                    "id": "k9e54p6e",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3hgm0s2",
                    "id": "k9e4pl41",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3hgintu",
                    "id": "k9e55fjg",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3hgoxba",
                    "id": "k9e51i1o",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3hgolzh",
                    "id": "k9e4x3nu",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  },
                  {
                    "CollectedVariableReference": "k3hgj6ns",
                    "id": "k9e4qehp",
                    "Datatype": {
                      "Maximum": "999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$TGAPT$='' and  $TGAPE$ = '' and $TGAPD$ = '' and $TGAPLU$ = '' and $TGAPLE$='' and $TGAPM$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5ckxm0c"
                  },
                  {
                    "post_collect": false,
                    "Description": "contrôle « somme=total déclaré » si somme montants détaillés > 0 et montant total > 0",
                    "Expression": "($TGAPE$ + $TGAPD$ + $TGAPLU$ + $TGAPM$ + $TGAPLE$ ) >0 and $TGAPT$ >= 0 and ($TGAPE$ + $TGAPD$ + $TGAPLU$ + $TGAPM$ + $TGAPLE$) != $TGAPT$",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "La somme des montants des TGAP par domaine ($Somme_TGAP$ k€) est différente du total indiqué  ($TGAPT$ k€).",
                    "id": "k5wca2za"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez, pour chaque domaine, le montant dépensé au titre de la Taxe Générale sur les Activités Polluantes (TGAP) (en milliers d'euros (k€), hors TVA) :"
                ],
                "ResponseStructure": {
                  "Mapping": [
                    {
                      "MappingSource": "k9e54p6e",
                      "MappingTarget": "1 1"
                    },
                    {
                      "MappingSource": "k9e4pl41",
                      "MappingTarget": "2 1"
                    },
                    {
                      "MappingSource": "k9e55fjg",
                      "MappingTarget": "3 1"
                    },
                    {
                      "MappingSource": "k9e51i1o",
                      "MappingTarget": "4 1"
                    },
                    {
                      "MappingSource": "k9e4x3nu",
                      "MappingTarget": "5 1"
                    },
                    {
                      "MappingSource": "k9e4qehp",
                      "MappingTarget": "6 1"
                    }
                  ],
                  "Dimension": [
                    {
                      "dimensionType": "PRIMARY",
                      "dynamic": "0",
                      "CodeListReference": "k2lx0l4b"
                    },
                    {
                      "dimensionType": "MEASURE",
                      "Label": "Montants",
                      "dynamic": "0"
                    }
                  ]
                },
                "id": "k2lnw7lk",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "En cas de difficulté pour détailler les montants par domaine, merci de renseigner a minima le total.",
                    "id": "k3hgid0u",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "TABLE",
                "Name": "tab_taxes"
              }
            ],
            "Name": "DIVERSPAIEMENT"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Management environnemental et/ou de l'énergie"
            ],
            "id": "k2lq5eh8",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Le management environnemental désigne les méthodes de gestion d'une entité (entreprise, service...) visant à prendre en compte l'impact environnemental de ses activités, à évaluer cet impact et à le réduire. ",
                "id": "k2lq0h42",
                "position": "AFTER_QUESTION_TEXT"
              },
              {
                "declarationType": "INSTRUCTION",
                "Text": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                "id": "k3hhdcg0",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lpyai2",
                    "id": "k2lq0thd",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$ACH_CON$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5ckt5mm"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant de vos achats de services liés au management environnemental (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lq3sor",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Par exemple : certification ISO 14001, ISO 50001, certification réglementation \"éco-audit\" (EMAS), bilan environnemental, formation...",
                    "id": "k3hhzydj",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "ACH_CON"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lqspr9",
                    "id": "k2lqfp4s",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$F_INT$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5cl8a24"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant de vos frais internes liés au management environnemental (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lq8qu9",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Prendre en compte, ici, la cellule environnement, les informations internes ou externes et les formations.",
                    "id": "k2lqua4h",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "F_INT"
              }
            ],
            "Name": "MANAGEMENT"
          },
          {
            "Control": [],
            "depth": 2,
            "FlowControl": [],
            "genericName": "SUBMODULE",
            "Label": [
              "Autres dépenses courantes (non prises en compte dans les rubriques précédentes)"
            ],
            "id": "k2lqeczf",
            "TargetMode": [
              "CAPI",
              "CAWI",
              "PAPI"
            ],
            "Declaration": [
              {
                "declarationType": "INSTRUCTION",
                "Text": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                "id": "k2lqf5fw",
                "position": "AFTER_QUESTION_TEXT"
              }
            ],
            "type": "SequenceType",
            "Child": [
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lqwqha",
                    "id": "k2lqglk7",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$AUT_ACH$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5cl3t0p"
                  }
                ],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Indiquez le montant de vos autres achats de services liés à la protection de l'environnement (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lqgia1",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [
                  {
                    "declarationType": "INSTRUCTION",
                    "Text": "Par exemple : primes d'assurances contre les risques de pollution, achats d'absorbants, de dispersants, emballages pour les déchets...",
                    "id": "k2lqvrvp",
                    "position": "AFTER_QUESTION_TEXT"
                  }
                ],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "AUT_ACH"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k2lr05u6",
                    "id": "k2lqs7ax",
                    "mandatory": false,
                    "Datatype": {
                      "Maximum": "9999999.9",
                      "Minimum": "0",
                      "typeName": "NUMERIC",
                      "Unit": "http://id.insee.fr/unit/keuro",
                      "type": "NumericDatatypeType",
                      "Decimals": "1"
                    }
                  }
                ],
                "Control": [
                  {
                    "post_collect": false,
                    "Description": "Vérification : est-ce que le vide est un vrai vide ou un 0 ? (Redressement) ",
                    "Expression": "$AUT_F$=''",
                    "during_collect": false,
                    "criticity": "INFO",
                    "FailMessage": "Merci de bien indiquer \"0\" si aucune dépense n'a été effectuée au cours du dernier exercice comptable.",
                    "id": "k5clahma"
                  }
                ],
                "depth": 3,
                "FlowControl": [
                  {
                    "Description": "Si vous avez répondu \"0\" à cette question, veuillez passer au module sur les temps de réponse et commentaires.",
                    "Expression": "$AUT_F$ = 0\n",
                    "id": "k2ly2www",
                    "IfTrue": "jqwfajkx"
                  }
                ],
                "Label": [
                  "Indiquez le montant de vos autres frais internes liés à la protection de l'environnement (en milliers d'euros (k€), hors TVA) :"
                ],
                "id": "k2lr03n1",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "AUT_F"
              },
              {
                "Response": [
                  {
                    "CollectedVariableReference": "k9bg0no3",
                    "id": "k2lr7427",
                    "mandatory": false,
                    "Datatype": {
                      "Pattern": "",
                      "typeName": "TEXT",
                      "type": "TextDatatypeType",
                      "MaxLength": "512"
                    }
                  }
                ],
                "Control": [],
                "depth": 3,
                "FlowControl": [],
                "Label": [
                  "Merci de préciser quels sont ces autres frais internes liés à la protection de l'environnement :"
                ],
                "id": "k2lqjokx",
                "TargetMode": [
                  "CAPI",
                  "CAWI",
                  "PAPI"
                ],
                "Declaration": [],
                "type": "QuestionType",
                "questionType": "SIMPLE",
                "Name": "DES_AUT_F"
              }
            ],
            "Name": "AUTRESDEPENSES"
          }
        ],
        "Name": "IV-DEPENSES"
      },
      {
        "Control": [],
        "depth": 1,
        "FlowControl": [],
        "genericName": "MODULE",
        "Label": [
          "Fin questionnaire"
        ],
        "id": "jqwfajkx",
        "TargetMode": [
          "CAPI",
          "CAWI",
          "PAPI"
        ],
        "Declaration": [],
        "type": "SequenceType",
        "Child": [],
        "Name": "FINQUESTIO"
      }
    ]
  }
];