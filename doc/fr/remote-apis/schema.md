# XML Schema

The questionnaire schema is maintained in the [Pogues Model repo](https://github.com/InseeFr/Pogues-Model/blob/master/src/main/resources/xsd/Questionnaire.xsd).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://xml.insee.fr/schema/applis/pogues" targetNamespace="http://xml.insee.fr/schema/applis/pogues" elementFormDefault="qualified"
  attributeFormDefault="unqualified">

  <!-- TODO Internationalization -->

  <xs:element name="Survey">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
      <xs:attribute name="agency" type="xs:token"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="Questionnaire">
    <xs:complexType>
      <xs:complexContent>
        <xs:extension base="SequenceType">
          <xs:sequence>
            <xs:element ref="Survey"/>
            <xs:element ref="ComponentGroup" minOccurs="0" maxOccurs="unbounded"/>
            <xs:element ref="CodeLists" minOccurs="0"/>
          </xs:sequence>
          <xs:attribute name="agency" type="xs:token"/>
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="ComponentType" abstract="true">
    <xs:sequence>
      <xs:element name="Name" type="xs:token"/>
      <xs:element name="Label" type="xs:token" maxOccurs="unbounded"/>
      <xs:element name="Declaration" type="DeclarationType" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element name="Control" type="ControlType" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element name="GoTo" type="GoToType" minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>

  <xs:element name="ComponentGroup">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
        <xs:element name="Label" type="xs:token" maxOccurs="unbounded"/>
        <xs:element name="Declaration" type="DeclarationType" minOccurs="0" maxOccurs="unbounded"/>
        <xs:element name="Member" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
        <!-- Could be a REFID -->
        <xs:element name="MemberReference" type="xs:token" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="QuestionType">
    <xs:complexContent>
      <xs:extension base="ComponentType">
        <xs:sequence>
          <xs:element name="Response" type="ResponseType" maxOccurs="unbounded"/>
          <xs:element name="ResponseStructure" type="ResponseStructureType" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="questionType" type="QuestionTypeEnum"/>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="ResponseStructureType">
    <xs:sequence>
      <xs:element name="Dimension" type="DimensionType" maxOccurs="unbounded"/>
      <xs:element name="Attribute" type="AttributeType" minOccurs="0" maxOccurs="unbounded"/>
      <!-- Is this useful? Can it be a type of mapping? -->
      <xs:element name="Mapping" type="MappingType" minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="DimensionType">
    <xs:sequence>
      <xs:element name="CodeListReference" type="xs:token" minOccurs="0"/>
      <xs:element name="Label" type="xs:string" minOccurs="0"/>
      <xs:element name="TotalLabel" type="xs:string" minOccurs="0">
        <xs:annotation>
          <xs:documentation>Indicates if the dimension has a 'total' item and if yes the corresponding label</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="dimensionType" type="DimensionTypeEnum" use="required"/>
    <xs:attribute name="dynamic" type="xs:token" use="required">
      <xs:annotation>
        <xs:documentation>'0': no constraint; 'm-': min m, no max; '-n': no min, n max; 'm-n': m min, n max</xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="AttributeType">
    <xs:sequence>
      <xs:element name="AttributeValue" type="xs:string"/>
      <xs:element name="AttributeTarget" type="xs:string"/>
      <!-- XPath -->
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="MappingType">
    <xs:sequence>
      <xs:element name="MappingSource" type="xs:string"/>
      <!-- XPath -->
      <xs:element name="MappingTarget" type="xs:string"/>
      <!-- XPath -->
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="DimensionTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="PRIMARY"/>
      <xs:enumeration value="SECONDARY"/>
      <xs:enumeration value="MEASURE"/>
    </xs:restriction>
  </xs:simpleType>

  <!-- TODO Ajouter des noms, identifiants, commentaires et autres pour les dimensions, attributs, etc. -->
  <!-- TODO Ou faire un type ResponseStructureType abstrait et un type TableResponseStructureType ? -->
  <!-- TODO Mesure est-il un type particulier, ou réutilise-t-on Dimension ? -->
  <!-- TODO Les labels sont-ils sur les axes ou les reporte-t-on sur les réponses ? -->
  <!-- TODO énumération pour les orientations des dimensions -->
  <!-- TODO On pourrait aussi limiter les attributs à leurs valeurs et utiliser des mappings pour les associer -->

  <xs:complexType name="ResponseType">
    <xs:sequence>
      <xs:element name="CodeListReference" type="xs:token" minOccurs="0"/>
      <xs:element name="Datatype" type="DatatypeType"/>
      <xs:element name="Value" type="xs:anyType" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element name="NonResponseModality" type="NonResponseModalityType" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="simple" type="xs:boolean"/>
    <xs:attribute name="mandatory" type="xs:boolean"/>
  </xs:complexType>

  <xs:complexType name="NonResponseModalityType">
    <xs:sequence>
      <xs:element name="Label" type="xs:token"/>
      <xs:element name="Value" type="xs:anyType"/>
      <xs:element name="Invite" type="xs:string" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="firstIntentionDisplay" type="xs:boolean" use="required"/>
  </xs:complexType>

  <xs:complexType name="SequenceType">
    <xs:complexContent>
      <xs:extension base="ComponentType">
        <xs:sequence>
          <xs:element name="Child" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
        </xs:sequence>
        <xs:attribute name="depth" type="xs:nonNegativeInteger"/>
        <xs:attribute name="genericName" type="xs:token"/>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="DeclarationType">
    <xs:sequence>
      <xs:element name="Text" type="xs:string"/>
    </xs:sequence>
    <xs:attribute name="declarationType" type="DeclarationTypeEnum"/>
    <xs:attribute name="position" type="DeclarationPositionEnum"/>
  </xs:complexType>

  <xs:simpleType name="DeclarationTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="INSTRUCTION"/>
      <xs:enumeration value="COMMENT"/>
      <xs:enumeration value="HELP"/>
      <xs:enumeration value="WARNING"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="DeclarationPositionEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="AFTER_QUESTION_TEXT"/>
      <xs:enumeration value="AFTER_RESPONSE"/>
      <xs:enumeration value="BEFORE_QUESTION_TEXT"/>
      <xs:enumeration value="DETACHABLE"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="ControlType">
    <xs:sequence>
      <xs:element name="Description" type="xs:string"/>
      <xs:element name="Expression" type="ExpressionType"/>
      <xs:element name="FailMessage" type="xs:string" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
    <xs:attribute name="criticity" type="ControlCriticityEnum"/>
  </xs:complexType>

  <xs:complexType name="GoToType">
    <xs:sequence>
      <xs:element name="Description" type="xs:string" minOccurs="0"/>
      <xs:element name="Expression" type="ExpressionType"/>
      <xs:element name="IfTrue" type="xs:token"/>
      <!-- Could be a REFID to a component -->
      <xs:choice minOccurs="0">
        <xs:element name="IfFalse" type="xs:token"/>
        <!-- Could be a REFID to a component -->
        <xs:element name="Next" type="xs:token"/>
        <!-- Could be a REFID to a go-to -->
      </xs:choice>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>

  <xs:complexType name="ExpressionType">
    <xs:simpleContent>
      <xs:extension base="xs:string"/>
    </xs:simpleContent>
  </xs:complexType>

  <xs:element name="CodeLists">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="CodeList" minOccurs="0" maxOccurs="unbounded"/>
        <xs:element ref="CodeListSpecification" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="CodeList">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
        <xs:element name="Label" type="xs:token"/>
        <xs:element name="Code" minOccurs="0" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="Value" type="xs:token"/>
              <xs:element name="Label" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="CodeListSpecification">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
        <xs:element name="Label" type="xs:token"/>
        <xs:element name="retrievalQuery" type="xs:string"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>

  <!-- Data types -->

  <xs:complexType name="DatatypeType" abstract="true">
    <xs:attribute name="typeName" type="DatatypeTypeEnum" use="required"/>
    <xs:attribute name="visualizationHint" type="VisualizationHintEnum"/>
  </xs:complexType>

  <xs:complexType name="BooleanDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType"/>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="DateDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="Minimum" type="xs:integer" minOccurs="0"/>
          <xs:element name="Maximum" type="xs:integer" minOccurs="0"/>
          <xs:element name="Format" type="xs:token" minOccurs="0"/>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="NumericDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="Minimum" type="xs:integer" minOccurs="0"/>
          <xs:element name="Maximum" type="xs:integer" minOccurs="0"/>
          <xs:element name="Decimals" type="xs:nonNegativeInteger" minOccurs="0"/>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="TextDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="MaxLength" type="xs:positiveInteger" minOccurs="0"/>
          <xs:element name="Pattern" type="xs:token" minOccurs="0"/>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:simpleType name="DatatypeTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="BOOLEAN"/>
      <xs:enumeration value="DATE"/>
      <xs:enumeration value="NUMERIC"/>
      <xs:enumeration value="TEXT"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ControlCriticityEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="INFO"/>
      <xs:enumeration value="WARN"/>
      <xs:enumeration value="ERROR"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="QuestionTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="SIMPLE"/>
      <xs:enumeration value="SINGLE_CHOICE"/>
      <xs:enumeration value="MULTIPLE_CHOICE"/>
      <xs:enumeration value="TABLE"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="VisualizationHintEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="CHECKBOX"/>
      <xs:enumeration value="DROPDOWN"/>
      <xs:enumeration value="RADIO"/>
    </xs:restriction>
  </xs:simpleType>

</xs:schema>
```