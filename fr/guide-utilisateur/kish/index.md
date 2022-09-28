# Sélection du Kish

Ce document décrit une méthode pour sélectionner le Kish dans Pogues.

## Principe

On considère que l'on procède à l'identification du Kish à travers les étapes suivantes :
- on demande le nombre d'habitants du ménages
- on boucle sur ce nombre pour collecter les prénoms de chacun des membres du ménage
- une deuxième boucle sert à récupérer la date de naissance de chacun des membres du ménage
- une dernière boucle va permettre de filtrer le questionnement sur le seul Kish

## Structure du questionnaire

### Séquence d'identification

> On construit une séquence contenant les questions permettant d'identifier le Kish contenant la question du nombre d'habitants et la sous-séquence d'identification.

On crée une séquence contenant une première question pour collecter le nombre d'habitants (variable numérique collectée `HABITANTS`).

On crée ensuite dans cette même séquence une sous-séquence `IDENTIFICATION` contenant :
- une question pour collecter le prénom de chaque habitant (variable texte collectée `PRENOM`).
- une question pour collecter la date de naissance (variable date `DATE_DE_NAISANCE`)

Il faut ensuite créer une boucle sur cette sous-séquence avec la formule `cast($HABITANTS$, integer)` pour le minimum et le maximum.

### Séquence de questions

> On crée la séquence de questionnement

Une séquence contenant une question `QUESTION_POUR_LE_KISH`, dont le libellé est personnalisé avec le prénom (via la formule VTL `"Question pour " || cast($PRENOM$, string)`)


## Calcul du Kish

> Les éléments permettant de procéder au calcul lui-même

Le coeur de la sélection est la formule permettant de former un score de sélection :

`cast(if $MOIS_NAISSANCE_INT$ < 6 then $MOIS_NAISSANCE_INT$ + 12 else $MOIS_NAISSANCE_INT$, string) || "." || $JOUR_NAISSANCE_STR$`

Elle donnera par exemple : 

- pour la date de naissance `01/06/2000` le score `6.01`
- pour `10/05/1990` le score `17.10`

On sélectionne ensuite l'individu dont le score est le plus bas.

Les variables calculées nécessaires sont :

- `MOIS_NAISSANCE_INT` → `cast(cast(cast($DATE_DE_NAISSANCE$, date, "YYYY-MM-DD"), string, "MM"), integer)`
- `JOUR_NAISSANCE_STR` → `cast(cast($DATE_DE_NAISSANCE$, date, "YYYY-MM-DD"),string, "DD")`
- `SCORE_KISH` → `cast(if $MOIS_NAISSANCE_INT$ < 6 then $MOIS_NAISSANCE_INT$ + 12 else $MOIS_NAISSANCE_INT$, string) || "." || $JOUR_NAISSANCE_STR$`
- `KISH_MIN` → `min($SCORE_KISH_INT$)`
- `KISH_INDICATOR` → `if $KISH_MIN$ = $SCORE_KISH_INT$ then 1 else 0`
- `SCORE_KISH_INT` → `cast($SCORE_KISH$, number)`
- `NB_POTENTIAL_KISH` → `sum($KISH_INDICATOR$)`

## Filtre 

Pour ne présenter qu'un seul jeu de questions à l'individu sélectionner, il est nécessaire d'ajouter un filtre sur ces questions à partir du score calculée en amont.

Le filtre a pour formule `$KISH_INDICATOR$ = 1`

## Questionnaire exemple

→ mettre sur pogues.dev.insee.io