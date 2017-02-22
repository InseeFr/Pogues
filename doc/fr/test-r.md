*Document créé le 21/02/2017 - dernière modification : 22/02/2017*

**Il s'agit de rappels de la formation R-prise en main très utiles pour le suivi du module 1 de la formation R-perfectionnement.**

Ce document n'est donc pas un rappel exhaustif de la formation R-prise en main.

Préambule
---------

### Installer R et RStudio

R et ses packages sont disponibles sur le site du CRAN : [*Comprehensive R Archive Network*](https://cran.r-project.org/).

-   La dernière version de R pour windows est disponible [ici](https://cran.r-project.org/bin/windows/base)
-   La liste des packages est disponible [ici](https://cran.r-project.org/web/packages/available_packages_by_name.html)

RStudio est disponible sur [*le site officiel de RStudio*](https://www.rstudio.com/). Pour Windows, la dernière version disponible est à télécharger [sur cette page](https://www.rstudio.com/products/rstudio/download/)

### L'opérateur d'affectation :

Pour affecter une valeur à un objet, il faut utiliser l'opérateur `<-`. Il est possible d'utiliser le `=`, ou le symbole `->`, mais il est conseillé de se limiter au symbole `<-`

``` r
x <- 2 #affectation de la valeur 2 à x
x # on renvoie/affiche x
```

    ## [1] 2

### Les opérations de calcul courantes :

``` r
12 + 7 # addition
```

    ## [1] 19

``` r
12 - 7 #soustraction
```

    ## [1] 5

``` r
12 * 7 #multiplication
```

    ## [1] 84

``` r
12 / 7 #division
```

    ## [1] 1.714286

``` r
12 %/% 7 #division entière (euclidienne)
```

    ## [1] 1

``` r
12 %% 7 #reste de la division entière (euclidienne)
```

    ## [1] 5

``` r
12**7 #puissance
```

    ## [1] 35831808

``` r
12^7 #puissance (variante)
```

    ## [1] 35831808

``` r
abs(-12) #valeur absolue
```

    ## [1] 12

``` r
sqrt(12) #racine carrée
```

    ## [1] 3.464102

### Quelques fonctions utiles

``` r
getwd() #permet d'obtenir le répertoire de travail sur lequel R pointe actuellement
```

    ## [1] "G:/Formations/FormationR/notebooks"

``` r
setwd("D:/") #permet de modifier le chemin de travail
getwd()
```

    ## [1] "D:/"

``` r
setwd("G:/Formations/FormationR/notebooks")
ls() #pour lister les objets présents en mémoire
```

    ## [1] "x"

``` r
rm(x) #efface l'objet x de la mémoire
ls()
```

    ## character(0)

``` r
rm(list = ls()) #permet d'effacer tous les objets en mémoire
```

### Les opérateurs logiques

-   l'opérateur **ET** se note **&**
-   l'opérateur **OU** se note **|** (altgr+6)
-   l'opérateur de négation **NON** se note **!**
-   l'opérateur testant l'égalité se note **==**
-   l'opérateur testant la différence se note **!=**
-   l'opérateur d'appartenance d'un élément dans un ensemble se note **%in%**

Les objets
----------

Ici sont rappelés les principaux objets manipulés lors de la formation R-Initiation

### Les vecteurs

-   Les vecteurs sont des objets composés d'un seul type de données : NULL (objet vide), numeric, logical ou character
-   La fonction **c()** permet de créer des vecteurs

</br> Un vecteur vide ou **objet NULL**:

``` r
x <- c() #initialise un vecteur vide - type NULL
x
```

    ## NULL

</br> Un vecteur de type **character**:

``` r
x <- c("spam", "eggs")
x
```

    ## [1] "spam" "eggs"

``` r
class(x) #pour connaître le type d'objet qu'est x, ici un vecteur de character
```

    ## [1] "character"

``` r
length(x) #la longueur du vecteur, cad son nombre d'éléments, ici 2
```

    ## [1] 2

``` r
is.character(x) #teste si x est bien de type character (TRUE ou FALSE, ici TRUE)
```

    ## [1] TRUE

</br> Un vecteur de type **numeric**:

``` r
x <- c(14,7,1789)
x
```

    ## [1]   14    7 1789

``` r
class(x)
```

    ## [1] "numeric"

``` r
is.numeric(x) #teste si x est bien de type numeric (TRUE ou FALSE, ici TRUE)
```

    ## [1] TRUE

``` r
as.character(x) #transforme le vecteur de type numeric en un vecteur de type character
```

    ## [1] "14"   "7"    "1789"

``` r
is.numeric(as.character(x)) #teste si x est bien de type numeric (TRUE ou FALSE, ici FALSE)
```

    ## [1] FALSE

</br> Un vecteur de type **boolean**:

``` r
x <- c(TRUE, FALSE, TRUE, TRUE)
x
```

    ## [1]  TRUE FALSE  TRUE  TRUE

``` r
class(x)
```

    ## [1] "logical"

``` r
is.numeric(x) #teste si x est bien de type logical (TRUE ou FALSE, ici TRUE)
```

    ## [1] FALSE

### Les dataframes

Les dataframes sont les objets les plus proches des données manipulées dans une table.
Un dataframe est un ensemble de colonnes de même longueur. Ces colonnes sont des vecteurs qui peuvent être de types différents.

Créer un dataframe avec **data.frame**

``` r
df <- data.frame(
  COMMUNE = c("Paris", "Marseille", "Lyon")
  ,POPULATION = c(2220445, 858120, 506615)
  ,stringsAsFactors = FALSE
)
df
```

    ##     COMMUNE POPULATION
    ## 1     Paris    2220445
    ## 2 Marseille     858120
    ## 3      Lyon     506615

Note : L'argument supplémentaire **stringsAsFactors = FALSE** permet d'éviter la transfomation des vecteurs de type **character** en vecteurs de type **factor**. Ce type de données sera vu ultérieurement.

Manipuler un dataframe

``` r
class(df) #le type est "data.frame"
```

    ## [1] "data.frame"

``` r
str(df) #renseigne sur la structure du dataframe
```

    ## 'data.frame':    3 obs. of  2 variables:
    ##  $ COMMUNE   : chr  "Paris" "Marseille" "Lyon"
    ##  $ POPULATION: num  2220445 858120 506615

``` r
length(df) #retourne le nombre de colonnes
```

    ## [1] 2

``` r
dim(df) #retourne les dimensions (nb de lignes, nb de colonnes) du df
```

    ## [1] 3 2

``` r
df[1,] #récupère la première ligne
```

    ##   COMMUNE POPULATION
    ## 1   Paris    2220445

``` r
class(df[1,]) #on récupère un objet de type data.frame
```

    ## [1] "data.frame"

``` r
df[,1] #récupère la première colonne
```

    ## [1] "Paris"     "Marseille" "Lyon"

``` r
class(df[,1]) #on récupère un objet de type character (vecteur)
```

    ## [1] "character"

Manipuler les vecteurs
----------------------

### Travailler avec des vecteurs numériques

#### Opérations sur les vecteurs

``` r
x <- 1:11
x
```

    ##  [1]  1  2  3  4  5  6  7  8  9 10 11

``` r
#premier aperçu de la notion de vectorisation
y <- x + 1
z <- x + rep(1,length(x))
y
```

    ##  [1]  2  3  4  5  6  7  8  9 10 11 12

``` r
z 
```

    ##  [1]  2  3  4  5  6  7  8  9 10 11 12

``` r
#l'addition de deux vecteurs conduit à l'addition des termes un à un
x + y
```

    ##  [1]  3  5  7  9 11 13 15 17 19 21 23

``` r
y - z
```

    ##  [1] 0 0 0 0 0 0 0 0 0 0 0

y et z sont strictement identiques. Ainsi pour ajouter 1 à chaque élément d'un vecteur, il suffit d'écrire **x + 1**

#### Sélectionner des éléments

``` r
x <- 2:8
x
```

    ## [1] 2 3 4 5 6 7 8

``` r
y <- x^2
y
```

    ## [1]  4  9 16 25 36 49 64

``` r
#filtre sur les éléments supérieurs à 10
x[x>20] #renvoie un vecteur sans aucun élément
```

    ## integer(0)

``` r
y[y>20]
```

    ## [1] 25 36 49 64

``` r
#sélection des éléments par leur position
x[c(1,5)] #retourne le 1er et 5e élément de x
```

    ## [1] 2 6

``` r
x[-c(1,5)] #retourne tous les éléments de x hormis les 1er et 5e éléments
```

    ## [1] 3 4 5 7 8

``` r
x[2:4] #retourne 
```

    ## [1] 3 4 5

``` r
x[-(2:4)] #retourne tous les éléments de x hormis les 2e, 3e et 4e éléments
```

    ## [1] 2 6 7 8

``` r
#sélection des éléments appartenant à un ensemble
x[x %in% y] #les éléments de x qui appartiennent à y
```

    ## [1] 4

#### Les fonctions basiques sur les numériques

``` r
x <- runif(n = 100, min = 0, max = 500000) #tirage aléatoire de 100 éléments entre 0 et 500000 suivant une loi uniforme
sum(x) #somme des éléments du vecteur
```

    ## [1] 26298058

``` r
min(x) #minimum
```

    ## [1] 9996.145

``` r
max(x) #maximum
```

    ## [1] 475316.6

``` r
mean(x) #moyenne
```

    ## [1] 262980.6

``` r
median(x) #médiane
```

    ## [1] 268748.3

``` r
quantile(x) #par défaut renvoie les quartiles
```

    ##         0%        25%        50%        75%       100% 
    ##   9996.145 163989.125 268748.276 376536.475 475316.603

``` r
quantile(x, probs = seq(0,1,0.1))
```

    ##         0%        10%        20%        30%        40%        50% 
    ##   9996.145  74584.337 136951.367 174674.258 216454.756 268748.276 
    ##        60%        70%        80%        90%       100% 
    ## 320237.731 365607.055 397817.995 427577.594 475316.603

``` r
y <- 2 + c(0.0000081, 0.75455421)
round(y, digits = 2) #arrondi
```

    ## [1] 2.00 2.75

``` r
floor(y) #partie entière
```

    ## [1] 2 2

``` r
ceiling(y) #partie entière + 1
```

    ## [1] 3 3

### Travailler avec des vecteurs de chaînes de caractères

``` r
chaine <- c("spam", "eggs")
CHAINE <- c("SPAM", "EGGS")
toupper(chaine) #passer en majuscules
```

    ## [1] "SPAM" "EGGS"

``` r
tolower(CHAINE) #passer en minuscules
```

    ## [1] "spam" "eggs"

``` r
substr(chaine, 2,3) #extrait les caractères 2 à 3 de chacun des éléments
```

    ## [1] "pa" "gg"

``` r
substring(chaine, 2) #extrait les caractères à partir du deuxième (inclus)
```

    ## [1] "pam" "ggs"

``` r
paste(chaine, CHAINE, sep = ", ") #concatène les deux vecteurs (sep = choix du séparateur)
```

    ## [1] "spam, SPAM" "eggs, EGGS"

``` r
paste0(chaine, CHAINE) #pas de séparateur
```

    ## [1] "spamSPAM" "eggsEGGS"

``` r
paste0("Oh, ", chaine, "!")
```

    ## [1] "Oh, spam!" "Oh, eggs!"

``` r
nchar(chaine) #nombre de caracères de chaque élément du vecteur
```

    ## [1] 4 4

Manipuler les dataframes
------------------------

### charger un environnement de travail au format .RData

``` r
load("G:/Formations/FormationR/donnees/ra2010lib.RData")
ls()
```

    ## [1] "chaine"    "CHAINE"    "df"        "ra2010lib" "x"         "y"        
    ## [7] "z"

### Visualiser un dataframe

``` r
df #affiche le dataframe directement dans la console. À n'utiliser que lorsque la table est petite.
```

    ##     COMMUNE POPULATION
    ## 1     Paris    2220445
    ## 2 Marseille     858120
    ## 3      Lyon     506615

``` r
str(ra2010lib) #la structure de la table : nom des colonnes (variables), type des variables, dimensions et premiers éléments
```

    ## 'data.frame':    2879 obs. of  22 variables:
    ##  $ depcom       : chr  "01001" "01002" "01004" "01005" ...
    ##  $ ze10         : chr  "8213" "8201" "8201" "8213" ...
    ##  $ canton_ville : chr  "0110" "0101" "0101" "0130" ...
    ##  $ dep          : chr  "01" "01" "01" "01" ...
    ##  $ categorie_com: chr  "120" "112" "112" "112" ...
    ##  $ pop          : int  784 221 13835 1616 116 2362 729 340 994 363 ...
    ##  $ pophom       : int  398 117 6741 816 60 1169 376 166 497 184 ...
    ##  $ popfem       : int  386 104 7094 800 56 1193 353 174 497 179 ...
    ##  $ actemp_hom   : int  172 52 3243 435 31 575 207 76 226 92 ...
    ##  $ actemp_fem   : int  157 50 2619 361 25 490 169 68 178 75 ...
    ##  $ chom_hom     : int  18 6 347 18 1 50 8 4 20 8 ...
    ##  $ chom_fem     : int  12 3 416 33 1 43 16 8 35 11 ...
    ##  $ ret          : int  185 53 2717 287 32 477 112 100 207 73 ...
    ##  $ ele          : int  47 8 905 110 7 142 44 20 53 19 ...
    ##  $ foy_hom      : int  NA 1 7 3 NA 2 NA NA NA NA ...
    ##  $ foy_fem      : int  12 7 461 36 2 76 26 3 20 NA ...
    ##  $ ina          : int  181 43 3120 333 17 507 148 62 254 84 ...
    ##  $ autre        : logi  NA NA NA NA NA NA ...
    ##  $ part_ele     : num  5.99 3.62 6.54 6.81 6.03 ...
    ##  $ part_ret     : num  23.6 24 19.6 17.8 27.6 ...
    ##  $ academie     : chr  "L" "L" "L" "L" ...
    ##  $ libgeo       : chr  "Abergement-Clémenciat (L') (01001)" "Abergement-de-Varey (L') (01002)" "Ambérieu-en-Bugey (01004)" "Ambérieux-en-Dombes (01005)" ...

``` r
head(ra2010lib) #affiche les premiers éléments de la table par défaut 6, quand le nombre de colonnes est très grand, la lecture dans la console n'est pas aisée
```

    ##   depcom ze10 canton_ville dep categorie_com   pop pophom popfem
    ## 1  01001 8213         0110  01           120   784    398    386
    ## 2  01002 8201         0101  01           112   221    117    104
    ## 3  01004 8201         0101  01           112 13835   6741   7094
    ## 4  01005 8213         0130  01           112  1616    816    800
    ## 5  01006 8216         0104  01           300   116     60     56
    ## 6  01007 8201         0101  01           112  2362   1169   1193
    ##   actemp_hom actemp_fem chom_hom chom_fem  ret ele foy_hom foy_fem  ina
    ## 1        172        157       18       12  185  47      NA      12  181
    ## 2         52         50        6        3   53   8       1       7   43
    ## 3       3243       2619      347      416 2717 905       7     461 3120
    ## 4        435        361       18       33  287 110       3      36  333
    ## 5         31         25        1        1   32   7      NA       2   17
    ## 6        575        490       50       43  477 142       2      76  507
    ##   autre part_ele part_ret academie                             libgeo
    ## 1    NA 5.994898 23.59694        L Abergement-Clémenciat (L') (01001)
    ## 2    NA 3.619910 23.98190        L   Abergement-de-Varey (L') (01002)
    ## 3    NA 6.541381 19.63860        L          Ambérieu-en-Bugey (01004)
    ## 4    NA 6.806931 17.75990        L        Ambérieux-en-Dombes (01005)
    ## 5    NA 6.034483 27.58621        L                    Ambléon (01006)
    ## 6    NA 6.011854 20.19475        L                   Ambronay (01007)

``` r
tail(ra2010lib) #affiche les derniers éléments (6 par défaut)
```

    ##      depcom ze10 canton_ville dep categorie_com  pop pophom popfem
    ## 2874  74310 8218         7402  74           112 1262    652    610
    ## 2875  74311 8219         7420  74           112 3889   1874   2015
    ## 2876  74312 8219         7408  74           111 1482    753    729
    ## 2877  74313 8219         7411  74           112  363    180    183
    ## 2878  74314 8219         7421  74           112  966    485    481
    ## 2879  74315 8219         7412  74           112  849    403    446
    ##      actemp_hom actemp_fem chom_hom chom_fem ret ele foy_hom foy_fem ina
    ## 2874        342        297       11       19 188  96       2      25 283
    ## 2875        985        939       89       84 631 253       2      81 825
    ## 2876        403        328       20       41 170 101       1      30 387
    ## 2877        105         91        1        4  56  23      NA       5  78
    ## 2878        266        225       12        8 159  53       1      36 206
    ## 2879        224        201       20       28 130  63       1      22 159
    ##      autre part_ele part_ret academie                   libgeo
    ## 2874    NA 7.606973 14.89699        G  Viuz-la-Chiésaz (74310)
    ## 2875    NA 6.505528 16.22525        G   Viuz-en-Sallaz (74311)
    ## 2876    NA 6.815115 11.47099        G            Vougy (74312)
    ## 2877    NA 6.336088 15.42700        G Vovray-en-Bornes (74313)
    ## 2878    NA 5.486542 16.45963        G          Vulbens (74314)
    ## 2879    NA 7.420495 15.31213        G           Yvoire (74315)

``` r
View(ra2010lib) #affiche la table dans une nouvelle fenêtre
```

### Fonctions et opérateurs utiles pour manipuler les dataframes

``` r
names(df) #retourne les noms des variables du dataframe (variant : colnames(df))
```

    ## [1] "COMMUNE"    "POPULATION"

``` r
rownames(df) #pour accéder aux noms des lignes (parfois différents des positions)
```

    ## [1] "1" "2" "3"

``` r
df$COMMUNE #pour récupérer le vecteur colonne COMMUNE
```

    ## [1] "Paris"     "Marseille" "Lyon"

``` r
df[,"COMMUNE"] #autre écriture strictement équivalente
```

    ## [1] "Paris"     "Marseille" "Lyon"

``` r
df["COMMUNE"] #retourne les mêmes données mais retourne un objet de type dataframe
```

    ##     COMMUNE
    ## 1     Paris
    ## 2 Marseille
    ## 3      Lyon

### Sélectionner des éléments d'un dataframe

``` r
#sélection avec les indices des lignes ou des colonnes
ra2010lib[1:5,] #sélectionne les 5 premières lignes et toutes les colonnes
```

    ##   depcom ze10 canton_ville dep categorie_com   pop pophom popfem
    ## 1  01001 8213         0110  01           120   784    398    386
    ## 2  01002 8201         0101  01           112   221    117    104
    ## 3  01004 8201         0101  01           112 13835   6741   7094
    ## 4  01005 8213         0130  01           112  1616    816    800
    ## 5  01006 8216         0104  01           300   116     60     56
    ##   actemp_hom actemp_fem chom_hom chom_fem  ret ele foy_hom foy_fem  ina
    ## 1        172        157       18       12  185  47      NA      12  181
    ## 2         52         50        6        3   53   8       1       7   43
    ## 3       3243       2619      347      416 2717 905       7     461 3120
    ## 4        435        361       18       33  287 110       3      36  333
    ## 5         31         25        1        1   32   7      NA       2   17
    ##   autre part_ele part_ret academie                             libgeo
    ## 1    NA 5.994898 23.59694        L Abergement-Clémenciat (L') (01001)
    ## 2    NA 3.619910 23.98190        L   Abergement-de-Varey (L') (01002)
    ## 3    NA 6.541381 19.63860        L          Ambérieu-en-Bugey (01004)
    ## 4    NA 6.806931 17.75990        L        Ambérieux-en-Dombes (01005)
    ## 5    NA 6.034483 27.58621        L                    Ambléon (01006)

``` r
#ra2010lib[,1:5] #sélectionne toutes les lignes et les 5 premières colonnes
ra2010lib[1:5,1:5] #sélectionne les 5 premières lignes et les 5 premières colonnes
```

    ##   depcom ze10 canton_ville dep categorie_com
    ## 1  01001 8213         0110  01           120
    ## 2  01002 8201         0101  01           112
    ## 3  01004 8201         0101  01           112
    ## 4  01005 8213         0130  01           112
    ## 5  01006 8216         0104  01           300

``` r
#sélection des colonnes par leur nom
ra2010lib[1:5, "pop"] #retourne le vecteur des 5 premières valeurs de la colonne-variable pop
```

    ## [1]   784   221 13835  1616   116

``` r
ra2010lib$pop[1:5] #strict équivalent à la ligne précédente
```

    ## [1]   784   221 13835  1616   116

``` r
ra2010lib[1:5, c("depcom","pop")] #retourne un dataframe de 5 lignes et 2 colonnes
```

    ##   depcom   pop
    ## 1  01001   784
    ## 2  01002   221
    ## 3  01004 13835
    ## 4  01005  1616
    ## 5  01006   116

``` r
#sélection des lignes par des conditions logiques
ra2010lib[ra2010lib$depcom == "69123",] #retourne un dataframe concernant le depcom "69123" et toutes les colonnes
```

    ##      depcom ze10 canton_ville dep categorie_com    pop pophom popfem
    ## 2108  69123 8214         6999  69           111 484344 226203 258141
    ##      actemp_hom actemp_fem chom_hom chom_fem   ret   ele foy_hom foy_fem
    ## 2108     110437     108768    14785    14731 78363 61816     384   11555
    ##        ina autre part_ele part_ret academie       libgeo
    ## 2108 83505    NA 12.76283  16.1792        L Lyon (69123)

``` r
ra2010lib$libgeo[ra2010lib$pop >= 100000] #le vecteur des noms des communes dont la population dépasse les 100000 habitants
```

    ## [1] "Grenoble (38185)"      "Saint-Étienne (42218)" "Lyon (69123)"         
    ## [4] "Villeurbanne (69266)"

``` r
ra2010lib[ra2010lib$pop >= 100000, "libgeo"] #strict équivalent de la précédente commande
```

    ## [1] "Grenoble (38185)"      "Saint-Étienne (42218)" "Lyon (69123)"         
    ## [4] "Villeurbanne (69266)"

``` r
tgdecom <- ra2010lib[ra2010lib$pop >= 100000, "libgeo"] #stocke le résultat précédent dans un objet (vecteur character)
ra2010lib[ra2010lib$libgeo %in% tgdecom, c("depcom", "libgeo", "pop", "pophom", "popfem")]
```

    ##      depcom                libgeo    pop pophom popfem
    ## 1300  38185      Grenoble (38185) 155637  75558  80079
    ## 1872  42218 Saint-Étienne (42218) 171260  80545  90715
    ## 2108  69123          Lyon (69123) 484344 226203 258141
    ## 2248  69266  Villeurbanne (69266) 145150  70377  74773

``` r
df_tgdecom <- ra2010lib[ra2010lib$libgeo %in% tgdecom, c("depcom", "libgeo", "pop", "pophom", "popfem")] #stocke le résultat précédent (df_tgdecom est un dataframe)
```

### Créer une nouvelle variable

``` r
df_tgdecom$dep <- substr(df_tgdecom$depcom, 1, 2) #variable département en extrayant les deux premiers caractères du code commune (depcom)
df_tgdecom$ratio_masc <- round(df_tgdecom$pophom/df_tgdecom$popfem*100,1) #ratio arrondi à la première décimale
df_tgdecom
```

    ##      depcom                libgeo    pop pophom popfem dep ratio_masc
    ## 1300  38185      Grenoble (38185) 155637  75558  80079  38       94.4
    ## 1872  42218 Saint-Étienne (42218) 171260  80545  90715  42       88.8
    ## 2108  69123          Lyon (69123) 484344 226203 258141  69       87.6
    ## 2248  69266  Villeurbanne (69266) 145150  70377  74773  69       94.1
