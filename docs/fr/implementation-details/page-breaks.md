# Sauts de pages

Pogues construit des groupes de composants (un groupe par page) afin de décrire les sauts de pages. Cette information complète la représentation par défaut du questionnaire sous la forme d'une structure arborescente.

En interne, Pogues sauvegarde le dernier composant avant chaque saut de page. Lorsqu'un composant est déplacé ou supprimé, le saut de page référencera le composant précédent.

En dehors de Pogues, cette information est représentée grâce à cette partie du modèle:

```xml
<xs:element name="ComponentGroup">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="Name" type="xs:token"/>
      <xs:element name="Label" type="xs:token" maxOccurs="unbounded"/>
      <xs:element name="MemberReference" type="xs:token" minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>
</xs:element>
```

Les noms et les libellés sont construits à partir du rang du saut de page. En `JSON`, cette information prendra la forme suivante, où les références aux éléments d'une page incluent tous les composants (quelque soit leur profondeur) qui doivent apparaître sur cette page:

```json
"ComponentGroup": [
  {
    "Name": "PAGE_1",
    "Label": "Components for page 1",
    "MemberReference": [
      "isoxwy7u",
      "isoy48wk"
    ],
    "id": "isrp627z"
  },
  {
    "Name": "PAGE_2",
    "Label": "Components for page 2",
    "MemberReference": [
      "isoybsd1",
      "isoxxg2x",
      "isoycgws"
    ],
    "id": "isrpd31w"
  }
]
```