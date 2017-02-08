# Contrôles d'intégrité

Cette fonctionnalité réalise des contrôles d'intégrité sur le questionnaire après chaque modification. Ces contrôles génèrent d'éventuels messages d'erreurs qui apparaîtront en haut du questionnaire, dans un encart dédié.

Cette fonctionnalité repose sur la fonction [integrityChecker](https://github.com/InseeFr/Pogues/blob/5df2bc748fc947b1e92d5ec637dc32ec437b11c9/src/js/reducers/integrity-checker.js#L12), qui est appelée pour [construire le reducer principal de l'application](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/index.js#L29). Elle prend un reducer comme premier argument et un `checker` comme second argument, et retourne un reducer créé de façon dynamique et qui va dans [un premier temps traiter les actions grâce au reducer fourni](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/integrity-checker.js#L28p
), puis, dans un deuxième temps, réaliser les contrôles d'intégrité grâce au `checker` sur la base du nouvel état renvoyé par le reducer initial. 

Le reducer initial est une combinaison de tous les reducers (il implémente la logique générale de l'application, par exemple comment actualiser l'état quand une question est ajoutée).

Le `checker` peut être produit en associant plusieurs `checker`s grâce à la fonction [combineCheckers](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/checkers.js#L16) .

Le reducer produit par `integrityChecker` ajoutera une entrée nommée `errors` à l'état de l'application.

Pour l'instant, seuls des [contrôles sur la validité des redirections](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/goTosChecker.js) et sur [la longueur du questionnaire](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/questionnaireLengthChecker.js) ont été implémentés.


