<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">

# Guide VTL Pogues

Ce document guide l’utilisateur de Pogues dans son usage du langage VTL.

## VTL

[VTL](https://sdmx.org/?page_id=5096) (Validation and Transformation Language) est un langage de programmation né dans le giron du standard de description de données aggrégées SDMX. Ce langage est adopté ou en cours d’adoption par les mêmes utilisateurs que SDMX, essentiellement des banques centrales et des instituts nationaux de statistiques.

Bien que conçu initialement pour le traitement de données aggrégées (eg des tableaux ou cubes de données), le langage est suffisamment souple pour qu’on puisse l’utiliser pour exprimer des contrôles, comme dans le cas des contrôles mis en oeuvre dans le cadre d’un questionnement.

On a donc choisi ce langage comme expression des contrôles et du dynamisme dans les questionnaires conçus dans Pogues dont la cible est les nouveaux outils de collecte développés dans le cadre du programme Metallica.

Les éléments les plus importants à retenir de l’usage de VTL dans Pogues :

- l’écriture se fait via un éditeur de code VTL,
- le type des variables que l’on collecte est toujours “texte”, ce qui oblige à changer ce type pour des opérations numériques : `cast($VARIABLE$, integer)`,
- les références aux variables doivent être encadrées par des `$`
- il est dans la plupart des cas nécessaires de gérer le cas où la variable n’est pas encore ou plus renseignée - sa valeur est nulle : `nvl($MA_VARIABLE$, "valeur si nulle")`,
- VTL fournit un certain nombre de fonctions utilitaires - on vient de voir `` `cast`et`nvl` - on répertorie les plus utiles dans ce document.

## Utiliser VTL

VTL est utilisé dès que l’on souhaite :

- créer un libellé personnalisé
- définir un contrôle
- créer une variable calculée
- définir la condition d’un filtre

Les champs correspondants dans Pogues proposent dans la plupart des cas un **éditeur VTL** :

![Editeur VTL](../img/vtl/code-list-editor.png 'Editeur VTL')

## Fonctionnalités de l’éditeur

<span class="label label-rounded label-primary">À noter</span> L’éditeur disponible actuellement reste un work-in-progress.

L’éditeur fournit :

- un soulignement syntaxique
- une autocomplétion des fonctions et variables
- une gestion des erreurs de syntaxe

## Bases de la syntaxe

Une chaîne de caractères s’écrit en encadrant du texte par deux double quote ("), par exemple :

```
"Voici un texte."
```

Un entier s’écrira simplement :

```
42
```

Une chiffre avec décimales :

```
3.14159
```

## Libellés

Voici un exemple de syntaxe pour un libellé personnalisé :

![Libellé personnalisé](../img/vtl/vtl-in-pogues-custom-label.png 'Libellé personnalisé')

On utilise ici l’opérateur VTL `||` qui permet de concaténer des chaînes de caractères, ou une chaîne de caractères et une variable (ici `NOM`).

<span class="label label-rounded label-warning">Attention !</span> Pour des raisons d’implémentation historique, il est encore nécessaire d’encadrer les noms de variables par `$`. Ainsi, **on pourra rechercher la variable** `NOM` **en la tapant telle quelle dans l’éditeur**, puis on ajoutera `$` en préfixe et suffixe, pour obtenir `$NOM$`.

<span class="label label-rounded label-success">Astuce :)</span> Dans l’exemple précédent, on ne gère pas le cas où la variable n’a pas été remplie. Pour anticiper ce cas, on peut utiliser la fonction VTL `nvl`, le libellé personnalisé devient ainsi :

![Fonction nvl](../img/vtl/vtl-in-pogues-custom-label-nvl.png 'Fonction nvl')_Libellé personnalisé avec gestion de la nullité_

Plus d’infos sur l’usage de `nvl` plus bas.

On pourra mobiliser dans un libellé personnalisé des variables collectées, calculées ou externes.

### Infobulles

La syntaxe pour la création d’un infobulle est la suivante :

```
Mon libellé de question avec [une infobulle](. "dont voici le contenu").
```

<span class="label label-rounded label-warning">Attention !</span> Il faut bien respecter la syntaxe pour le contenu de l’infobulle : un `.` avant le texte entouré de guillemets `"`.

## Contrôles

Un exemple de contrôle sur une valeur numérique :

![Exemple de contrôle](../img/vtl/vtl-in-pogues-simple-control.png 'Exemple de contrôle')_Libellé personnalisé avec gestion de la nullité_

## Variables calculées

Pogues permet de créer des variables calculées à partir de variables collectées. Dans l’exemple ci-dessous, on somme les variables de revenus de l’enquêté et de son conjoint :

![Variable calculée](../img/vtl/vtl-in-pogues-computed-variable-earnings.png 'Variable calculée')_Une variable calculée_

L’expression VTL est :

```
cast(nvl($REVENUS$, "0"), integer) +
cast(nvl($REVENUS_CONJOINT$, "0"), integer)
```

<span class="label label-rounded label-warning">Attention !</span> Les variables collectées sont de type “chaîne de caractères” (`string` en VTL), pour les utiliser dans un calcul il faut les transformer, en entier par exemple. Pour cela, c’est la fonction `cast` qui est utilisé. Pour transformer la variable `REVENUS` en entier, j’écris donc `cast(nvl($REVENUS$, "0"), integer)`.

## Filtres

Voici un exemple de filtre simple exprimé en VTL :

![Filtre simple](../img/vtl/vtl-in-pogues-simple-filter.png 'Filtre simple')_Un filtre simple_

<span class="label label-rounded label-primary">À noter</span> À ce jour, le champ “Condition d’affichage” du filtre n’utilise pas l’éditeur VTL.

Toutes formes d’expression booléenne est valide :

```
# Possible
$MA_VARIABLE_CHAINE$ = "a value"

# Ou
$MA_VARIABLE_NUMERIQUE$ = 42

# Plus direct
$MA_VARIABLE_BOOLEENNE$
```

Un exemple plus complexe combinant plusieurs variables avec des “et” (`and`) et des “ou” (`or`) :

```
nvl($VARIABLE_EXCLUSIVE$, false) and
(nvl($AUTRE_VARIABLE_1$, false) or nvl($AUTRE_VARIABLE_2$, false) or nvl($AUTRE_VARIABLE_3$, false))
```

## Gestion de la nullité

Lorsque l’on manipule des variables en VTL, on veut dans la plupart des cas se prémunir de valeurs nulles. Par exemple, un champ qui n’est pas encore rempli par le répondant est de valeur nulle.

Il est donc nécessaire de gérer cette possible nullité, on utilise pour cela la fonction `nvl` dont la syntaxe est la suivante :

```
nvl($VAR$, "") // ← si la variable est nulle, on lui affecte une chaîne vide, sinon c'est sa valeur qui est renvoyée
```

## Types des variables

> TODO

### Transtypage

Il est parfois nécessaire de passer d’un type de variable à un autre, on parle dans ce cas de transtypage.

Par exemple, si l’on veut extraire l’année de la date du jour, on va dans un premier temps transformer cette date en chaîne :

```
cast(current_date(),string,"YYYY-MM-DD")
```

C’est la fonction cast qui opère ce transtypage, sa syntaxe est :

```
cast(<variable>, <type cible> [, <motif>])
```

Comme vu plus haut, on utilisera fréquemment `cast` pour correctement typer une variable numérique dans Pogues mais récupérée comme une chaîne dans les outils de collecte.

## Fonctions et opérateurs

L’usage de VTL dans Pogues et les outils de collecte s’appuie sur les bibliothèques Lunatic (pour les composants graphiques) et Trevas (qui fournit le moteur VTL).

C’est l’état d’avancement de cette dernière qui permet de connaître les opérateurs et fonctions disponibles : la référence est donc la [page de suivi de l’implémentation](https://inseefr.github.io/Trevas-JS/fr/coverage.html).

### Logique

| Nom | Symbole | Exemple        |
| --- | ------- | -------------- |
| Ou  | or      | true or false  |
| Et  | and     | true and false |

### Chaînes de caractères

#### Remplacer

| Nom          | Symbole | Exemple                            |
| ------------ | ------- | ---------------------------------- |
| Remplacement | replace | `replace("bag", "g", "c") # → bac` |

## Cookbook

### Dates

#### Récupérer l'année

On a créé une question dont la réponse est au format Date dans Pogues, la variable collectée `DATE_NAISSANCE`.

Voici comment obtenir l’année :

```
substr(cast($DATE_NAISSANCE$, string, "YYYY-MM-DD"), 1, 4)
```

On transforme la variable de type date en chaîne de caractères, puis on extrait les 4 premiers caractères. Le motif "YYYY-MM-DD" permet de la traduction

<span class="label label-rounded label-warning">Attention !</span> Si Pogues permet de choisir trois types de formats de date, seul le format JJMMAAAA (jour, mois, année) est aujourd’hui proposé à l’enquêté. Par ailleurs, si le format présenté lui-même est JJMMAAAA, la variable collectée est au format AAAAMMJJ, ce qui explique le code VTL précédent.

#### Comparaison

<span class="label label-rounded label-warning">Bientôt disponible !</span>

Pour comparer des dates :

```
$ARRIVEE$ > $DEPART$
```

Renvoie `true` si la date d'arrivée est postérieure à la date de départ.

#### Calcul de durée

<span class="label label-rounded label-warning">Bientôt disponible !</span>

Pour calculer une durée à partir de variables collectées de type Date :

```
$ARRIVEE$ - $DEPART$
```

Qui fournira le résultat en millisecondes. Pour avoir, par exemple en jour :

```
($ARRIVEE$ - $DEPART$) / 86400000
```

### Liste à choix multiples

#### Compter le nombre de choix

On souhaite calculer le nombre de cases cochées dans une liste à choix multiples. Les variables considérées sont nommmées dans notre cas `QCM1` à `QCM4`. Le code sera alors :

```
(if (nvl($QCM1$, false) = true) then 1 else 0) +
(if (nvl($QCM2$, false) = true) then 1 else 0) +
(if (nvl($QCM3$, false) = true) then 1 else 0) +
(if (nvl($QCM4$, false) = true) then 1 else 0)
```

<span class="label label-rounded label-primary">À noter</span> Cette solution est fastidieuse et difficile à mettre en place pour des longues listes. Des fonctionnalités non-encore disponibles dans VTL permettront à terme une expression plus directe de ce calcul.
