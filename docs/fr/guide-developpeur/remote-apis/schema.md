# XML Schema

Le modèle de données Pogues est maintenu dans le dépôt github [Pogues-Model](https://github.com/InseeFr/Pogues-Model/blob/main/src/main/resources/xsd/Questionnaire.xsd).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns="http://xml.insee.fr/schema/applis/pogues"
  targetNamespace="http://xml.insee.fr/schema/applis/pogues" elementFormDefault="qualified"
  attributeFormDefault="unqualified">


  <xs:annotation>
    <xs:documentation>The Pogues data model is highly inspired by the DDI model. See the DDI
      documentation :
      https://ddialliance.org/Specification/DDI-Lifecycle/3.3/XMLSchema/FieldLevelDocumentation/</xs:documentation>
  </xs:annotation>

  <xs:element name="DataCollection">
    <xs:annotation>
      <xs:documentation> DataCollection : A data collection (or a data collection campaign) is a
        survey data collection realization period. Each data collection can contain one ore several
        questionnaire. It's characterised by a statistical operation and a period (M01 -
        January,...,T02 - Second quarter,etc.). All these concepts are created outside Pogues.
      </xs:documentation>
    </xs:annotation>
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token">
          <xs:annotation>
            <xs:documentation>Datacollection name (label). Exemple : "Enquête sectorielle annuelle
              2018"</xs:documentation>
          </xs:annotation>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required">
        <xs:annotation>
          <xs:documentation>Datacollection Id.</xs:documentation>
        </xs:annotation>
      </xs:attribute>
      <xs:attribute name="uri" type="xs:anyURI" use="required">
        <xs:annotation>
          <xs:documentation>URI to external datacollection reference.</xs:documentation>
        </xs:annotation>
      </xs:attribute>
      <xs:attribute name="agency" type="xs:token" default="com.example">
        <xs:annotation>
          <xs:documentation>Agency of Datacollection. It's optional. Exemple :
            "fr.insee".</xs:documentation>
        </xs:annotation>
      </xs:attribute>
    </xs:complexType>
  </xs:element>

  <xs:element name="Questionnaire">
    <xs:annotation>
      <xs:documentation>A questionnaire in the sense of Pogues is an entire questionnaire template
        or an independent part of an questionnaire.</xs:documentation>
    </xs:annotation>
    <xs:complexType>
      <xs:complexContent>
        <xs:extension base="SequenceType">
          <xs:sequence>
            <xs:element ref="DataCollection" maxOccurs="unbounded"/>
            <xs:element ref="ComponentGroup" minOccurs="0" maxOccurs="unbounded">
              <xs:annotation>
                <xs:documentation>ComponentGroup currently contains the references of all objects in
                  the questionnaire. This object was originally created for pagination which is not
                  currently implemented in Pogues.</xs:documentation>
              </xs:annotation>
            </xs:element>
            <xs:element ref="CodeLists" minOccurs="0"/>
            <xs:element name="Variables" minOccurs="0">
              <xs:annotation>
                <xs:documentation>Variables contain all questionnaire's variables (external,
                  collected, etc)</xs:documentation>
              </xs:annotation>
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="Variable" type="VariableType" minOccurs="0"
                    maxOccurs="unbounded"/>
                </xs:sequence>
              </xs:complexType>
            </xs:element>
            <xs:element name="Iterations" minOccurs="0">
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="Iteration" type="IterationType" minOccurs="0"
                    maxOccurs="unbounded">
                    <xs:annotation>
                      <xs:documentation> A loop is an iteration (according to one criterion) on a
                        group of questions.</xs:documentation>
                      <xs:documentation>- The group of questions is equivalent to a sequence (=
                        Module) or a sub-sequence (= sub-module).</xs:documentation>
                      <xs:documentation>- an iteration criterion is a condition defining the number
                        of times the question group is repeated. It can simply be (considering that
                        by default we start at 1 and that the step is 1).</xs:documentation>
                    </xs:annotation>
                  </xs:element>
                </xs:sequence>
              </xs:complexType>
            </xs:element>
          </xs:sequence>
          <xs:attribute name="agency" type="xs:token" default="com.example">
            <xs:annotation>
              <xs:documentation>Agency of Questionnaire. It's optional. Exemple :
                "fr.insee".</xs:documentation>
            </xs:annotation>
          </xs:attribute>
          <xs:attribute name="final" type="xs:boolean">
            <xs:annotation>
              <xs:documentation>final : boolean attrubute indicating if the questionnaire is final
                or not</xs:documentation>
            </xs:annotation>
          </xs:attribute>
          <xs:attribute name="flowLogic" type="FlowLogicEnum">
            <xs:annotation>
              <xs:documentation> Survey designer should have the possibility to choose if they
                prefer to describe the dynamic of their questionnaire (jump directly to a question,
                a sequence or a subsequence according to a condition on some variables) with a GoTo
                or an IfThenElse logic. </xs:documentation>
            </xs:annotation>
          </xs:attribute>
          <xs:attribute name="formulasLanguage" type="FormulasLanguageEnum">
            <xs:annotation>
              <xs:documentation> Choice of formula input language (VTL or XPATH). It applies to the
                entire questionnaire, the mix of languages is not supported. </xs:documentation>
            </xs:annotation>
          </xs:attribute>
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="ComponentType" abstract="true">
    <xs:sequence>
      <xs:element name="Name" type="xs:token"/>
      <xs:element name="Label" type="xs:string" maxOccurs="unbounded"/>
      <xs:element name="Declaration" type="DeclarationType" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>A "Declaration" is information related to a question or a sequence that
            gives information to the respondent or interviewer.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Control" type="ControlType" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element name="FlowControl" type="FlowControlType" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation> The FlowControl element is used in two ways : as a GoTo only used in a
            question and as a Filtrer only used in the questionnaire. </xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="GoTo" type="GoToType" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element name="TargetMode" type="SurveyModeEnum" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>Survey mode of component (CAPI, CATI, CAWI, PAPI).</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>

  <xs:element name="ComponentGroup">
    <xs:annotation>
      <xs:documentation>In some cases it make sense to have full components (e.g. components
        imported from repository and not yet placed on the questionnaire), so to have both "Member"
        (a list of members which could be empty) and "MemberReference" (a list of member
        references).</xs:documentation>
    </xs:annotation>
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
        <xs:element name="Label" type="xs:token" maxOccurs="unbounded"/>
        <xs:element name="Member" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
        <!-- Could be a reference ID -->
        <xs:element name="MemberReference" type="xs:token" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="Question" type="QuestionType"/>
  <xs:complexType name="QuestionType">
    <xs:complexContent>
      <xs:extension base="ComponentType">
        <xs:sequence>
          <xs:element name="Response" type="ResponseType" maxOccurs="unbounded"/>
          <xs:element name="ResponseStructure" type="ResponseStructureType" minOccurs="0"/>
          <xs:element name="ClarificationQuestion" type="QuestionType" minOccurs="0"
            maxOccurs="unbounded">
            <xs:annotation>
              <xs:documentation>Clarification question is a request for additional information from
                a list of choices defined a priori (single or multiple choice question). This
                additional information is related to a response domain and triggered when a specific
                response value is selected or typed. The triggering of the clarification question
                can be made through the FlowControl element and the CLARIFICATION
                flowControlType.</xs:documentation>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
        <xs:attribute name="questionType" type="QuestionTypeEnum"/>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <!-- Iterations -->

  <xs:complexType name="IterationType" abstract="true">
    <xs:sequence>
      <xs:element name="Name" type="xs:token"/>
      <xs:element name="Label" type="xs:token" minOccurs="0"/>
      <xs:element name="MemberReference" type="xs:token" minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>


  <xs:complexType name="DynamicIterationType">
    <xs:complexContent>
      <xs:extension base="IterationType">
        <xs:sequence>
          <xs:element name="Minimum" type="ExpressionType" minOccurs="0"/>
          <xs:element name="Maximum" type="ExpressionType" minOccurs="0"/>
          <xs:element name="Step" type="xs:nonNegativeInteger" minOccurs="0"/>
          <xs:element name="IterableReference" type="xs:token">
            <xs:annotation>
              <xs:documentation>Could be a Roster (dynamic table) or another
                iteration</xs:documentation>
            </xs:annotation>
          </xs:element>
          <xs:element name="Filter" type="ExpressionType" minOccurs="0">
            <xs:annotation>
              <xs:documentation> Specifies a condition for filter for NOT displaying the code value
              </xs:documentation>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <!-- Variables -->

  <xs:complexType name="VariableType" abstract="true">
    <xs:annotation>
      <xs:documentation> VariableType base type, which is extended by types for collected
        (CollectedVariableType), calculated (CalculatedVariableType) and external
        (ExternalVariableType) variables. </xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="CodeListReference" type="xs:token" minOccurs="0"/>
      <xs:element name="Datatype" type="DatatypeType">
        <xs:annotation>
          <xs:documentation>Variable representation type to characterize the variable (numeric,
            boolean, text, etc)</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Name" type="xs:token"/>
      <xs:element name="Label" type="xs:token"/>
      <xs:element name="Scope" type="xs:token" minOccurs="0">
        <xs:annotation>
          <xs:documentation>Iteration reference (in which the variable has a local
            scope)</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>

  <xs:complexType name="CollectedVariableType">
    <xs:annotation>
      <xs:documentation> A collected variable is a statistical variable collected within a
        questionnaire for the survey need. </xs:documentation>
    </xs:annotation>
    <xs:complexContent>
      <xs:extension base="VariableType"/>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="CalculatedVariableType">
    <xs:annotation>
      <xs:documentation> A calculated variable is a variable calculated from others variables
        including the calculated variables. </xs:documentation>
    </xs:annotation>
    <xs:complexContent>
      <xs:extension base="VariableType">
        <xs:sequence>
          <xs:element name="Formula" type="ExpressionType"/>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="ExternalVariableType">
    <xs:annotation>
      <xs:documentation> An external variable refers to a variable not collected in the
        questionnaire, but useful for personalization. For example, it may be a collection wave
        number for filtering questions, a date to be displayed in the wording of a question, etc.
      </xs:documentation>
    </xs:annotation>
    <xs:complexContent>
      <xs:extension base="VariableType"/>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="ResponseStructureType">
    <xs:sequence>
      <xs:element name="Dimension" type="DimensionType" maxOccurs="unbounded"/>
      <xs:element name="Attribute" type="AttributeType" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>Used to model "No data by definition" ((a no meaning
            intersection))</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Mapping" type="MappingType" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>Mapping makes it possible to make the link between the box and the
            answer.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="DimensionType">
    <xs:sequence>
      <xs:element name="CodeListReference" type="xs:token" minOccurs="0"/>
      <xs:element name="Label" type="xs:string" minOccurs="0"/>
      <xs:element name="TotalLabel" type="xs:string" minOccurs="0">
        <xs:annotation>
          <xs:documentation>Indicates if the dimension has a 'total' item and if yes the
            corresponding label</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="dimensionType" type="DimensionTypeEnum" use="required"/>
    <xs:attribute name="dynamic" type="xs:token" use="required">
      <xs:annotation>
        <xs:documentation>'0': no constraint; 'm-': min m, no max; '-n': no min, n max; 'm-n': m
          min, n max</xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:complexType name="AttributeType">
    <xs:sequence>
      <xs:element name="AttributeValue" type="xs:string">
        <xs:annotation>
          <xs:documentation>In the case of a "no data by definition", is
            "NoDataByDefinition"</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="AttributeTarget" type="xs:string">
        <xs:annotation>
          <xs:documentation>n-uple giving the coordinates (1-based) of the target cell according to
            the dimensions, format "i" (one dimension) or "i j" (two dimensions)</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="MappingType">
    <xs:sequence>
      <xs:element name="MappingSource" type="xs:string">
        <xs:annotation>
          <xs:documentation>Identifier of the response</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="MappingTarget" type="xs:string">
        <xs:annotation>
          <xs:documentation>n-uple giving the coordinates (1-based) of the target cell according to
            the dimensions, format "i" (one dimension) or "i j" (two dimensions)</xs:documentation>
        </xs:annotation>
      </xs:element>
      <!-- XPath -->
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="DimensionTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="PRIMARY">
        <xs:annotation>
          <xs:documentation>In a fixed table (with row header in the first column and without the
            possibility of dynamically adding a row to the table), the primary information axis
            corresponds to the left column.</xs:documentation>
          <xs:documentation>In a roster question (without a first column row header and with the
            ability to dynamically add a row to the table), the primary information is the main (and
            single) axis of information.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="SECONDARY">
        <xs:annotation>
          <xs:documentation>In a fixed table with double entry, the secondary information axis
            corresponds to the information in the column header (secondary axis).</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="MEASURE">
        <xs:annotation>
          <xs:documentation>This is the information measured (only one if secondary information
            axis, one or more possible otherwise). Simple Answer or Single Choice Response
            Information.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
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
      <xs:element name="NonResponseModality" type="NonResponseModalityType" minOccurs="0"
        maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>NOT USED</xs:documentation>
          <xs:documentation>NonResponseModality : specify the non response specific modality (the
            most significant case is the modality "Don't know" or later
            "Refusal")</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="CollectedVariableReference" type="xs:token">
        <xs:annotation>
          <xs:documentation>CollectedVariableReference : collected variable reference to link the
            variable in the wrap and the variable created in the response
            element.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required">
      <xs:annotation>
        <xs:documentation> an identifier to responses in order to be able to reference them in
          mappings</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="simple" type="xs:boolean"/>
    <xs:attribute name="mandatory" type="xs:boolean"/>
  </xs:complexType>

  <xs:complexType name="NonResponseModalityType">
    <xs:sequence>
      <xs:element name="Label" type="xs:token">
        <xs:annotation>
          <xs:documentation>The label of the modality</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Value" type="xs:anyType">
        <xs:annotation>
          <xs:documentation>The Value of the code</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="firstIntentionDisplay" type="xs:boolean" use="required">
      <xs:annotation>
        <xs:documentation> An boolean with first intention or not (the dynamic behaviour in the
          generated questionnaire</xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:element name="Sequence" type="SequenceType"/>
  <xs:complexType name="SequenceType">
    <xs:complexContent>
      <xs:extension base="ComponentType">
        <xs:sequence>
          <xs:element name="Child" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
        </xs:sequence>
        <xs:attribute name="depth" type="xs:nonNegativeInteger"/>
        <xs:attribute name="genericName" type="GenericNameEnum">
          <xs:annotation>
            <xs:documentation>\Eno\src\main\resources\xslt\inputs\pogues-xml\source-fixed.xsl</xs:documentation>
            <xs:documentation>Type of Sequence : "QUESTIONNAIRE", "MODULE" or
              "SUBMODULE"</xs:documentation>
          </xs:annotation>
        </xs:attribute>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="DeclarationType">
    <xs:sequence>
      <xs:element name="Text" type="xs:string">
        <xs:annotation>
          <xs:documentation>Text of the declaration.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="DeclarationMode" type="SurveyModeEnum" minOccurs="0" maxOccurs="unbounded">
        <xs:annotation>
          <xs:documentation>Survey modes of declaration.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required">
      <xs:annotation>
        <xs:documentation>Identifier of the declaration.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="declarationType" type="DeclarationTypeEnum">
      <xs:annotation>
        <xs:documentation>Type of declaration.</xs:documentation>
      </xs:annotation>
    </xs:attribute>
    <xs:attribute name="position" type="DeclarationPositionEnum">
      <xs:annotation>
        <xs:documentation> Position of the statement for viewing. </xs:documentation>
      </xs:annotation>
    </xs:attribute>
  </xs:complexType>

  <xs:simpleType name="DeclarationTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="INSTRUCTION">
        <xs:annotation>
          <xs:documentation> INSTRUCTION : when the declaration concerns only the interviewer (CAPI
            or CATI mode). </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="HELP">
        <xs:annotation>
          <xs:documentation> HELP : when the declaration concerns the respondent, whatever the mode.
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="CODECARD">
        <xs:annotation>
          <xs:documentation> CODECARD : for questions where the interviewer will be required to
            present a code card to the respondent (CAPI Mode). </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="DeclarationPositionEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="AFTER_QUESTION_TEXT">
        <xs:annotation>
          <xs:documentation> After question label position. </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="BEFORE_QUESTION_TEXT">
        <xs:annotation>
          <xs:documentation> Before question label position. </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="ControlType">
    <xs:sequence>
      <xs:element name="Description" type="xs:string"/>
      <xs:element name="Expression" type="ExpressionType">
        <xs:annotation>
          <xs:documentation>quand il doit se déclencher</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="FailMessage" type="xs:string" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
    <xs:attribute name="criticity" type="ControlCriticityEnum"/>
  </xs:complexType>

  <xs:complexType name="FlowControlType">
    <xs:sequence>
      <xs:element name="Description" type="xs:string" minOccurs="0"/>
      <xs:element name="Expression" type="ExpressionType"/>
      <xs:element name="IfTrue" type="xs:token"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
    <xs:attribute name="flowControlType" type="FlowControlTypeEnum"/>
  </xs:complexType>

  <xs:simpleType name="FlowControlTypeEnum">
    <xs:annotation>
      <xs:documentation>We create an optional Enum to make the difference between an ex-Goto
        FlowControl and a Clarification FlowControl. We don't need other values for
        now</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:token">
      <xs:enumeration value="CLARIFICATION">
        <xs:annotation>
          <xs:documentation>Jump to a clarification question ('other, please
            specify')</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="GoToType">
    <xs:sequence>
      <xs:element name="Description" type="xs:string" minOccurs="0"/>
      <xs:element name="Expression" type="ExpressionType"/>
      <xs:element name="IfTrue" type="xs:token"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
  </xs:complexType>

  <xs:complexType name="ExpressionType">
    <xs:annotation>
      <xs:documentation>Into declarated language in "FormulasLanguage"</xs:documentation>
    </xs:annotation>
    <xs:simpleContent>
      <xs:extension base="xs:string"/>
    </xs:simpleContent>
  </xs:complexType>

  <xs:element name="CodeLists">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="CodeList" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="CodeList">
    <xs:annotation>
      <xs:documentation>"A structure used to associate a list of code values to specified
        categories. May be flat or hierarchical.". See DDI documentation :
        https://ddialliance.org/Specification/DDI-Lifecycle/3.3/XMLSchema/FieldLevelDocumentation/
        The elements of the code list are those of the DDI. You can refer to their definition in the
        DDI documentation. </xs:documentation>
    </xs:annotation>
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:token"/>
        <xs:element name="Label" type="xs:token"/>
        <xs:element name="Code" type="CodeType" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="CodeType">
    <xs:sequence>
      <xs:element name="Value" type="xs:token">
        <xs:annotation>
          <xs:documentation>The value of the code.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Label" type="xs:string">
        <xs:annotation>
          <xs:documentation>The label of the code.</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Filter" type="ExpressionType" minOccurs="0">
        <xs:annotation>
          <xs:documentation>NOT USED</xs:documentation>
          <xs:documentation>Specifies a condition for NOT displaying the code
            value</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Parent" type="xs:token" minOccurs="0">
        <xs:annotation>
          <xs:documentation>This attribute is used in hierarchical code lists case (a code may
            contain a code that may contain a code, etc. (as a recursive description)). It refers
            the parent code of this code.</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <!-- Data types -->

  <xs:complexType name="DatatypeType" abstract="true">
    <xs:attribute name="typeName" type="DatatypeTypeEnum" use="required"/>
    <xs:attribute name="visualizationHint" type="VisualizationHintEnum">
      <xs:annotation>
        <xs:documentation>visualizationHint is the type of input as part of an answer to a
          single-choice question</xs:documentation>
        <xs:documentation>That may not be the perfect choice of a name, a better choice could be
          "GraphicalImplementation" </xs:documentation>
      </xs:annotation>
    </xs:attribute>
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
          <xs:element name="Minimum" type="xs:token" minOccurs="0"/>
          <xs:element name="Maximum" type="xs:token" minOccurs="0"/>
          <xs:element name="Format" type="DateFormatEnum" minOccurs="0">
            <xs:annotation>
              <xs:documentation>date output format among YYYY-MM-DD, YYYY-MM and
                YYYY.</xs:documentation>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="DurationDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="Minimum" type="xs:token" minOccurs="0"/>
          <xs:element name="Maximum" type="xs:token" minOccurs="0"/>
          <xs:element name="Format" type="xs:token" minOccurs="0">
            <xs:annotation>
              <xs:documentation/>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="NumericDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="Minimum" type="xs:decimal" minOccurs="0"/>
          <xs:element name="Maximum" type="xs:decimal" minOccurs="0"/>
          <xs:element name="Decimals" type="xs:nonNegativeInteger" minOccurs="0">
            <xs:annotation>
              <xs:documentation>Number of decimal places.</xs:documentation>
            </xs:annotation>
          </xs:element>
          <xs:element name="Unit" type="xs:anyURI" minOccurs="0">
            <xs:annotation>
              <xs:documentation>The list of units available at INSEE is described in this file :
                https://github.com/InseeFr/DDI-Access-Services/blob/main/src/main/resources/measure-units.json.</xs:documentation>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:complexType name="TextDatatypeType">
    <xs:complexContent>
      <xs:extension base="DatatypeType">
        <xs:sequence>
          <xs:element name="MaxLength" type="xs:positiveInteger" minOccurs="0">
            <xs:annotation>
              <xs:documentation>Maximum text response size in number of
                characters</xs:documentation>
            </xs:annotation>
          </xs:element>
          <xs:element name="Pattern" type="xs:token" minOccurs="0">
            <xs:annotation>
              <xs:documentation>NOT FUNCTIONAL</xs:documentation>
              <xs:documentation>The pattern allows you to specify regular
                expressions.</xs:documentation>
              <xs:documentation>
                <xs:documentation>Pattern should perhaps be attached to the answer rather than the
                  question.</xs:documentation>
              </xs:documentation>
            </xs:annotation>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>

  <xs:simpleType name="DatatypeTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="BOOLEAN"/>
      <xs:enumeration value="DATE"/>
      <xs:enumeration value="DURATION"/>
      <xs:enumeration value="NUMERIC"/>
      <xs:enumeration value="TEXT"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ControlCriticityEnum">
    <xs:annotation>
      <xs:documentation>NOT FUNCTIONAL</xs:documentation>
    </xs:annotation>
    <xs:restriction base="xs:token">
      <xs:enumeration value="INFO"/>
      <xs:enumeration value="WARN"/>
      <xs:enumeration value="ERROR"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="SurveyModeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="CAPI">
        <xs:annotation>
          <xs:documentation> Computer-Assisted Personal Interviewing (CAPI) mode </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="CATI">
        <xs:annotation>
          <xs:documentation> Computer Assisted Telephone Interviewing (CATI) mode
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="CAWI">
        <xs:annotation>
          <xs:documentation> Computer-assisted web interviewing (CAWI) mode </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="PAPI">
        <xs:annotation>
          <xs:documentation> Paper-and-pencil interviewing (PAPI) mode </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="QuestionTypeEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="SIMPLE">
        <xs:annotation>
          <xs:documentation>a SIMPLE question is a question made of a label and only one response
            domain whichever its type be: text, numeric, date, boolean, or less frequently any type
            available in the DDI schemas.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="SINGLE_CHOICE">
        <xs:annotation>
          <xs:documentation>a SINGLE_CHOICE question is a question made of a label and a response
            domain typed as a code list. This type of question allows to the respondent to select
            one single response from a predefined list.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="MULTIPLE_CHOICE">
        <xs:annotation>
          <xs:documentation>A MULTIPLE_CHOICE question is a question whose label is the mutual part
            of several sub-questions (constituting a coherent whole i.e an information axis). Each
            modality of the information axis is peculiar to a specific response domain. This type of
            question allows to the respondent to select the best possible answers out of a number of
            choices from a predefined list.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="TABLE">
        <xs:annotation>
          <xs:documentation>A TABLE is a two-way table. It's a question made of a label and a
            response domain defined by two dimensions. The information located at the intersection
            of a row and a column corresponds to a response. </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="VisualizationHintEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="CHECKBOX">
        <xs:annotation>
          <xs:documentation>Checkbox (each modality will be checkable or uncheckable, but only one
            answer possible)</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="DROPDOWN">
        <xs:annotation>
          <xs:documentation>Drop-down list (when the list of modalities is known to the respondents
            and particularly long, this type of response translates into a free text field on the
            paper questionnaire</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="RADIO">
        <xs:annotation>
          <xs:documentation>Radio button (standard web ergonomics for this type of answer, you can't
            uncheck the answer to the question (you can change the answer, but you can't delete an
            answer))</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="FlowLogicEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="REDIRECTION">
        <xs:annotation>
          <xs:documentation>GoTo logic : condition the hiding of certain elements of the
            questionnaire: jump from a starting element to a target element according to a certain
            condition.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="FILTER">
        <xs:annotation>
          <xs:documentation>IfThenElse logic : condition the display of a sequence, sub-sequence or
            a set of questions.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="FormulasLanguageEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="XPATH">
        <xs:annotation>
          <xs:documentation>XPATH : Xforms/Orbeon technologies tools (V1 tools) need formulas
            written in pseudo-xpath.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="VTL">
        <xs:annotation>
          <xs:documentation>The tools based on JavaScript and Lunatic (V2 tools) need formulas
            written in VTL. VTL (Validation and Transformation Language) is a programming language
            born in the bosom of the SDMX aggregate data description standard.</xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="GenericNameEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="QUESTIONNAIRE">
        <xs:annotation>
          <xs:documentation>
            <xs:documentation>In DDI, type of Sequence "template"</xs:documentation>
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="MODULE">
        <xs:annotation>
          <xs:documentation>
            <xs:documentation>In DDI, type of Sequence "module"</xs:documentation>
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="SUBMODULE">
        <xs:annotation>
          <xs:documentation>
            <xs:documentation>In DDI, type of Sequence "submodule"</xs:documentation>
          </xs:documentation>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="DateFormatEnum">
    <xs:restriction base="xs:token">
      <xs:enumeration value="YYYY-MM-DD"/>
      <xs:enumeration value="YYYY-MM"/>
      <xs:enumeration value="YYYY"/>
    </xs:restriction>
  </xs:simpleType>

</xs:schema>
```
