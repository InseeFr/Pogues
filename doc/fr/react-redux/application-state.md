# L'état de l'application

Dans la section précédente, nous avons vu qu'un composant peut gérer son propre état pour enregistrer les modifications et actualiser l'affichage.

## La difficulté

Cela fonctionne bien pour de petites applications, ou lorsque l'état en question est constitués d'informations ponctuelles qui ne sont pas destinées à être sauvegardées (par exemple, l'état d'un bouton, qui peut être visible ou invisible). Mais cette approche devient complexe à maintenir lorsque la complexité de l'application augmente. Considérons par exemple le comportement attendu si l'utilisateur créer une liste de codes, la référence à plusieurs endroits dans le question, et édite ensuite les codes de la liste:

![Les éditeurs doivent être synchronisés](/img/sync.gif "Les éditeurs doivent être synchronisés")

(Les panneaux d'édition ont été affichés pour chacune des questions et l'interface a été légèrement modifiée afin que les deux éditeurs soient visuellement proches l'un de l'autre).

Les deux éditeurs doivent être **synchronisés**. Cette contrainte est difficile à satisfaire avec l'approche présentée jusqu'à maintenant. En effet, si les codes sont enregistrés dans l'état du premier `CodeListEditor`, le second éditeur ne sera pas informé des modifications opérées, et ne pourra donc pas s'actualiser.

Ce problème qui consiste à maintenir plusieurs `CodeListEditor` en phase est une problématique très courante lorsque l'on développe des appolications Web complexes, et en particulier au sein de Pogues. Il y a de nombreuses autres situations où une **action peut avoir des conséquences sur différentes parties de l'interface**. À tire d'exemple, on peut étudier ce qu'il doit se passer lorsqu'un utilisateur edite l'identifiant d'une question référencée par un `goTo`. Dans cette situation, l'application doit:
- mettre à jour chaque redirection visible qui pourrait être impactée par ce changement (par exemple, une redirection faisant référence à l'identifiant avant modification doît désormais être marquée comme invalide);
- ajuster les contrôles d'intégrités affichés en haut de la page (par exemple en ajoutant un message d'erreur inidiquant qu'une redirection est maintenant invalide).

![Synchronisés plusieurs composants](/img/keep-in-sync-multiple-components.png "Synchronisés plusieurs composants")

## La solution

Pour gérer ces mises à jour qui potentiellement peuvent être complexes, React et Redux privilégient une architecture avec un [flux de données unidirectionnel](http://redux.js.org/docs/basics/DataFlow.html). Cette [présentation de l'architecture Flux](https://facebook.github.io/flux/docs/in-depth-overview.html) est instructive, même s'il peut y avoir de légères différences avec Redux (qui peut être vu comme une implémention d'une architecture de type Flux; avec Redux, il n'y a qu'un seul store).

### En quelques mots

L'idée est de sauvegarder les codes constituant une liste de codes non pas au sein du composant lui même, mais grâce à une abstraction de plus haut niveau qui permettra de mettre à disposition de l'ensemble des composants l'information concernant ces codes. Cette abstraction est appelée "l'état de l'application". Elle rassemble en un seul endroit toute l'information nécessaire à l'affichage et l'actualisation de l'interface. Avec Redux, l'état de l'application est géré par le [store](http://redux.js.org/docs/api/Store.html).

Ensuite, lorsqu'un changement est opéré, une action informe l'application et sollicite l'actualisation de l'état. Pour cela, avec Redux il conveint de créer:
- des [actions](http://redux.js.org/docs/basics/Actions.html) qui décrivent ce qu'il s'est passé (par exemple, l'utilisateur a ajouté un code à une liste de codes); les actions sont ensuite envoyées au store;
- des [reducers](http://redux.js.org/docs/basics/Reducers.html) qui spécifient comment l'état de l'application doit être imapcté par telle ou telle action.

Enfin, l'application dans son ensemble est ré-affichée sur la bse de ce nouvel état (`setState` est appelée automatiquement sur le composant de plus haut niveau de l'applciation), mais grâce à l'algorithme de calcul de différences implémenté par React, seules les éléments véritablement impactés seront actualisées dans le DOM.

![https://github.com/facebook/flux/tree/master/examples/flux-concepts#flow-of-data](/img/flux-diagram.png "Flux de données")
