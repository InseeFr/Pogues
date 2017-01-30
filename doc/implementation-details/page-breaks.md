# Page breaks

Pogues will build groups of components (one group per page) based on page breaks. This is additional information to the regular questionnaire representation (a tree of components).

Internally, Pogues stores information about the last component before each page break. When a component is moved or removed, the page break will then reference the component before the one that has just been moved or removed.

Outside of Pogues, this information is represented conforming to this part of the schema:

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

Names and labels are based on the page rank. In `json`, this information will look like this, where member references for the first page include all the components (no matter their depth) that should appear on the first page:

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