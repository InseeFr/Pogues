# Libellés

## Internationalisation

Même si l'application n'offre pas la possibilité de définir une version disponible en plusieurs langues des questionnaires, les libellés sont représentés sous forme de séquence (tableau en `JSON`):

```xml
  <xs:complexType name="ComponentType" abstract="true">
    <xs:sequence>
      (...)
      <xs:element name="Label" type="xs:token" maxOccurs="unbounded"/>
      (...)
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>
```

## Conditions

Le libellé d'une question peut dépendre de conditions. Ces conditions et les libellés associés sont représentés sous la forme d'une chaîne de caractères dans le langage [Velocity Templage Language](http://velocity.apache.org/) . Cette solution a été choisie afin de représenter l'information permettant d'exprimer ces conditions sous la forme d'une simple chaîne de caractères, comme attendu dans le modèle de données.

La première ligne de la chaîne VTL est un commentaire de type ligne avec une représentation en `JSON` des conditions comme elles sont représentées au sein de Pogues. Cette première ligne sera analysée par l'application pour reconstruire les conditions sans avoir à analyser le corps de la chaîne VTL (pour éviter d'avoir à utiliser un parser `VTL` en `JavasScript`):

```
##{\"label\":\"initial label\",\"conditions\":[{\"id\":\...
#if ....
```

Cette chaîne est le résultat de la fonctoin `JSON.stringify` appelée sur ce type d'objet:
```javascript
{
  label: "initial label",
  "conditions": [{
    id: "randomid1",
    label: "first label",
    condition: "first_condition"
    }, {
    id: "randomid2",
    label: "second label",
    condition: "second_condition"
  }]
}
```

Le corps de la chaîne `VTL` représente les conditions with `VTL` `#if` and `#elseif` directives. Avec les conditions de l'exemple précédent, la chaîne complète prend la forme suivante:

```
##{\"label\":\"initial label\",\"conditions\":[{\"id\":\...
#if(first_condition)
first label
#elseif(second_condition)
second label
#end
```

Remarque: on garde trace dans la première ligne de la chaîne `VTL` du libellé initial (saisi par exemple à partir du `GenericInput`, avant l'ajout de conditions). Ce libellé ne sera pas valorisé lors de la visualisation du questionnaire, il n'apparaît donc pas dans le corps de la chaîne `VTL`.

## Texte enrichi

Certains libellés peuvent contenir du texte enrichi: les libellés de questions, les libellés des question qui utilisent des conditions, et les libellés des déclarations.

On utilise l'éditeur [draft.js](https://facebook.github.io/draft-js/) pour permettre aux utilisateurs de saisir du texte enrichi, et Markdown pour représenter ce texte riche de façon cohérente avec le modèle (i.e. une simple chaîne de caractères). L'objectif est d'avoir une représentation commune entre Pogues et le serveur de visualisation, mais pas d'offrir un support complet du Markdown. Le Markdown ne sera pas rendu en l'état, mais il sera traité lors de la génération du questionaire.

Ces éléments sont utilisés:
- `_italique_`
- `**gras**`
_ `**gras et italique**`
- `[liens avec une URL et un titre\](http://example.com)`
- `[liens avec un titre et un simple . en tant qu'URL\](. "un message")`.

Le dernier élément (`[liens avec un titre et un simple . en tant qu'URL\](. "un message")`) est une convention interne pour représenter de l'information contextuelle qui sera rendue dans le questionnaire en tant que texte avec de l'information associée (par exemple, avec une bulle de survol).

Les autres éléments de la syntaxe Markdonw ne sont pas gérés par le composant de saisie de texte enrichi.

De l'information complémentaire est disponible ici: [#142](https://github.com/InseeFr/Pogues/issues/142).