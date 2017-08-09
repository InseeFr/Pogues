# Labels

## Internationalisation

Even if the application does not provide the option to define multilingual versions of labels, they are represented as a sequence (an array in `JSON`):

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

A question can have multiple labels depending on conditions. The conditions and the labels they are associated to will be represented as a [Velocity Template Language](http://velocity.apache.org/) string. This option was chosen in order to represent the structured data related to conditions as a regular string that fits into the model. 

The first line of the VTL string will be a VTL single line comment with a `JSON` representation of the conditions as they are represented within Pogues. This first line will be parsed by the application to build back the conditions without having to process the body of the VTL string (to avoid the need of a `VTL` parser in `JavaScript`):

```
##{\"label\":\"initial label\",\"conditions\":[{\"id\":\...
#if ....
```

It is built with the result of `JSON.stringify` called on that kind of object:
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

The body of the VTL string represents the conditions with VTL `#if` and `#elseif` directives. With the conditions from the previous example, the whole string will look like:

```
##{\"label\":\"initial label\",\"conditions\":[{\"id\":\...
#if(first_condition)
first label
#elseif(second_condition)
second label
#end
```

Remark: we keep track in the first line of the VTL string of the initial label (input for instance with the `GenericInput`, before conditions have been added). This label will not be valued in the questionnaire visualisation process, so it does not appear elsewhere in the VTL string.


## Rich text

Some labels can hold rich text: question labels, question labels that use conditions and statement labels.

We use [draft.js](https://facebook.github.io/draft-js/) editor to let users type in some rich text, and Markdown to represent this structured text in a way which complies to the Pogues model (i.e. a regular string). The purpose is to have a common representation between Pogues and the rendering server, not to offer a fully compliant markdown editor. Markdown won't be rendered as is, but will be further processed to generate the questionnaire.

These elements are used:
- `_italic_`
- `**bold**`
_ `**bold and italic**`
- `[links with an url and no title\](http://example.com)`
- `[links with a title and a simple dot as url\](. "a message")`.

The last item (`[links with a title and a simple dot as url](. "a message")`) is an internal convention to represent contextual information intended to be rendered in the questionnaire as some text with some information attached (for instance, with a tooltip on mouseover).

Other elements of the markdown syntax are not handled by the component for rich text edition.

Additional information can be found in [#142](https://github.com/InseeFr/Pogues/issues/142).