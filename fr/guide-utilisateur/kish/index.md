# Sélection du Kish

Ce document décrit une méthode pour sélectionner le Kish dans Pogues.

## Principe

On considère que l'on procède à l'identification du Kish à travers les étapes suivantes :
- on demande le nombre d'habitants du ménages
- on boucle sur ce nombre pour collecter les prénoms de chacun des membres du ménage
- une deuxième boucle sert à récupérer la date de naissance de chacun des membres du ménage
- une dernière boucle va permettre de filtrer le questionnement sur le seul Kish

## Structure du questionnaire

On crée une première question pour collecter le nombre d'habitants (variable numérique collectée `HABITANTS`).

On crée ensuite une sous-séquence `IDENTIFICATION`, contenant une question pour collecter le prénom de chaque habitant (variable texte collectée `PRENOM`).

Il faut ensuite créé une boucle sur cette sous-séquence avec la formule `cast($HABITANTS$, integer)` pour le minimum et le maximum.


## Calcul du Kish

vars calc dont formule de sélection

## Filtre 



## Questionnaire exemple

→ mettre sur pogues.dev.insee.io