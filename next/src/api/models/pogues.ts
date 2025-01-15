/**
 * The Pogues data model is highly inspired by the DDI model. See the DDI documentation :
 * https://ddialliance.org/Specification/DDI-Lifecycle/3.3/XMLSchema/FieldLevelDocumentation/
 */

/**
 * A data collection (or a data collection campaign) is a survey data collection
 * realization period. Each data collection can contain one ore several
 * questionnaire. It's characterised by a statistical operation and a period
 * (M01 - January,...,T02 - Second quarter,etc.).
 *
 * All these concepts are created outside of Pogues.
 */
type DataCollection = {
  /** Datacollection name (label). Exemple : "Enquête sectorielle annuelle 2018" */
  Name: string;
  /** Datacollection Id. */
  id: string;
  /** URI to external datacollection reference. */
  uri: string;
  /** Agency of Datacollection. It's optional. Exemple : "fr.insee". */
  agency?: string;
};

/**
 * A questionnaire in the sense of Pogues is an entire questionnaire template
 * or an independent part of an questionnaire.
 */
export type Questionnaire = Sequence & {
  DataCollection: DataCollection[];
  /**
   * ComponentGroup currently contains the references of all objects in the
   * questionnaire. This object was originally created for pagination which is
   * not currently implemented in Pogues.
   */
  ComponentGroup?: ComponentGroup[];
  CodeLists?: { CodeList: CodeLists };
  /** Variables contain all questionnaire's variables (external, collected, etc) */
  Variables?: {
    Variable?: (
      | CollectedVariableType
      | CalculatedVariableType
      | ExternalVariableType
    )[];
  };
  /**
   * A loop is an iteration (according to one criterion) on a group of questions.
   *
   * - The group of questions is equivalent to a sequence (= Module) or a
   *   sub-sequence (= sub-module).
   * - an iteration criterion is a condition defining the number of times the
   *   question group is repeated. It can simply be (considering that by default
   *   we start at 1 and that the step is 1).
   */
  Iterations?: { Iteration?: IterationType[] };
  /**
   * The childQuestionnaireRef currently holds the IDs of the questionnaires on
   * which the current questionnaire depends.
   */
  childQuestionnaireRef?: string[];
  /** Agency of Questionnaire. It's optional. Exemple : "fr.insee". */
  agency?: string;
  /** boolean attrubute indicating if the questionnaire is final or not */
  final?: boolean;
  /**
   * Survey designer should have the possibility to choose if they prefer to
   * describe the dynamic of their questionnaire (jump directly to a question,
   * a sequence or a subsequence according to a condition on some variables)
   * with a GoTo or an IfThenElse logic.
   */
  flowLogic?: FlowLogicEnum;
  /**
   * Choice of formula input language (VTL or XPATH). It applies to the entire
   * questionnaire, the mix of languages is not supported.
   */
  formulasLanguage?: FormulasLanguageEnum;
  /** lastUpdatedDate represents the date on which the questionnaire was last saved. */
  lastUpdatedDate?: string; // Wed Oct 23 2024 15:15:37 GMT+0200 (heure d’été d’Europe centrale)
  /** Owner of questionnaire. */
  owner?: string;
};

type ComponentType = {
  Name: string;
  Label: string[];
  /**
   * A "Declaration" is information related to a question or a sequence that
   * gives information to the respondent or interviewer.
   */
  Declaration?: DeclarationType[];
  Control?: ControlType[];
  /**
   * The FlowControl element is used in two ways : as a GoTo only used in a
   * question and as a Filtrer only used in the questionnaire.
   */
  FlowControl?: FlowControlType[];
  GoTo?: GoToType[];
  /** Survey mode of component (CAPI, CATI, CAWI, PAPI). */
  TargetMode?: SurveyModeEnum[];
  id: string;
  type?: string;
  depth?: number;
  genericName?: GenericNameEnum;
};

/**
 * In some cases it make sense to have full components (e.g. components imported
 * from repository and not yet placed on the questionnaire), so to have both
 * "Member" (a list of members which could be empty) and "MemberReference" (a
 * list of member references).
 */
type ComponentGroup = {
  Name: string;
  Label: string[];
  Member?: ComponentType[];
  MemberReference?: string[];
  id: string;
};

type QuestionType = ComponentType & {
  Response: ResponseType[];
  ResponseStructure?: ResponseStructureType;
  /**
   * Clarification question is a request for additional information from a list
   * of choices defined a priori (single or multiple choice question). This
   * additional information is related to a response domain and triggered when a
   * specific response value is selected or typed. The triggering of the
   * clarification question can be made through the FlowControl element and the
   * CLARIFICATION flowControlType
   */
  ClarificationQuestion?: QuestionType[];
  Scope?: string;
  questionType?: QuestionTypeEnum;
};

type IterationType = {
  Name: string;
  Label?: string;
  MemberReference?: string[];
  id: string;
};

type DynamicIterationType = IterationType & {
  Minimum?: ExpressionType;
  Maximum?: ExpressionType;
  Step?: number;
  /** Could be a Roster (dynamic table) or another iteration */
  IterableReference: string;
  /** Specifies a condition for filter for NOT displaying the code value */
  Filter?: ExpressionType;
};

type Roundabout = ComponentType & {
  OccurrenceLabel: string;
  OccurrenceDescription?: string;
  Locked: boolean;
  Loop: DynamicIterationType[];
};

/**
 * VariableType base type, which is extended by types for collected
 * (CollectedVariableType), calculated (CalculatedVariableType) and external
 * (ExternalVariableType) variables.
 */
type VariableType = {
  CodeListReference?: string;
  /** Variable representation type to characterize the variable (numeric, boolean, text, etc) */
  Datatype: DatatypeType;
  Name: string;
  Label: string;
  /** Iteration reference (in which the variable has a local scope) */
  Scope?: string;
  id: string;
};

/**
 * A collected variable is a statistical variable collected within a
 * questionnaire for the survey need.
 */
type CollectedVariableType = VariableType;

/**
 * A calculated variable is a variable calculated from others variables
 * including the calculated variables.
 */
type CalculatedVariableType = VariableType & {
  Formula: ExpressionType;
};

/**
 * An external variable refers to a variable not collected in the questionnaire,
 * but useful for personalization. For example, it may be a collection wave
 * number for filtering questions, a date to be displayed in the wording of a
 * question, etc.
 */
type ExternalVariableType = VariableType;

type ResponseStructureType = {
  Dimension: DimensionType[];
  /** Used to model "No data by definition" ((a no meaning intersection)) */
  Attribute?: AttributeType[];
  /** Mapping makes it possible to make the link between the box and the answer. */
  Mapping?: MappingType[];
};

type DimensionType = {
  CodeListReference?: string;
  Label?: string;
  MinLines?: number;
  MaxLines?: number;
  FixedLength?: ExpressionType;
  dimensionType: DimensionTypeEnum;
  /**
   * previous modeling:
   * - '0': no constraint;
   * - 'm-': min m, no max;
   * - '-n': no min, n max;
   * - 'm-n': m min, n max
   *
   * new modeling (not Enum because of the existing questionnaires):
   * - NON_DYNAMIC (previously '0'; default value);
   * - DYNAMIC_LENGTH (used with MinLines and MaxLines)
   *
   * new value:
   * - FIXED_LENGTH (used with FixedLength): dynamic dimension with length fixed
   * by a formula based on previous values
   */
  dynamic?: string;
};

type AttributeType = {
  /** In the case of a "no data by definition", is "NoDataByDefinition" */
  AttributeValue: string;
  /**
   * n-uple giving the coordinates (1-based) of the target cell according to the
   * dimensions, format "i" (one dimension) or "i j" (two dimensions)
   */
  AttributeTarget: string;
  /** optional Label for noDataByDefintion cells */
  Label?: string;
};

type MappingType = {
  /** Identifier of the response */
  MappingSource: string;
  /**
   * n-uple giving the coordinates (1-based) of the target cell according to the
   * dimensions, format "i" (one dimension) or "i j" (two dimensions)
   */
  MappingTarget: string;
};

enum DimensionTypeEnum {
  /**
   * In a fixed table (with row header in the first column and without the
   * possibility of dynamically adding a row to the table), the primary
   * information axis corresponds to the left column.
   *
   * In a roster question (without a first column row header and with the
   * ability to dynamically add a row to the table), the primary information is
   * the main (and single) axis of information.
   */
  Primary = 'PRIMARY',
  /**
   * In a fixed table with double entry, the secondary information axis
   * corresponds to the information in the column header (secondary axis).
   */
  Secondary = 'SECONDARY',
  /**
   * This is the information measured (only one if secondary information axis,
   * one or more possible otherwise). Simple Answer or Single Choice Response
   * Information.
   */
  Measure = 'MEASURE',
}

type ResponseType = {
  CodeListReference?: string;
  Datatype: DatatypeType;
  Value?: unknown[];
  /**
   * NOT USED
   *
   * NonResponseModality : specify the non response specific modality (the most
   * significant case is the modality "Don't know" or later "Refusal")
   */
  NonResponseModality?: NonResponseModalityType[];
  /**
   * CollectedVariableReference : collected variable reference to link the
   * variable in the wrap and the variable created in the response element.
   */
  CollectedVariableReference: string;
  /** an identifier to responses in order to be able to reference them in mappings */
  id: string;
  simple?: boolean;
  mandatory?: boolean;
};

type NonResponseModalityType = {
  /** The label of the modality */
  Label: string;
  /** The Value of the code */
  Value: unknown;
  /**
   * An boolean with first intention or not (the dynamic behaviour in the
   * generated questionnaire
   */
  firstIntentionDisplay: boolean;
};

type Sequence = ComponentType & {
  Child?: ComponentType[];
  depth?: number;
  /**
   * \Eno\src\main\resources\xslt\inputs\pogues-xml\source-fixed.xsl
   *
   * Type of Sequence : "QUESTIONNAIRE", "MODULE" or "SUBMODULE"
   */
  genericName?: GenericNameEnum;
};

type DeclarationType = {
  /** Text of the declaration. */
  Text: string;
  /** Survey modes of declaration. */
  DeclarationMode?: SurveyModeEnum[];
  /** Identifier of the declaration. */
  id: string;
  /** Type of declaration. */
  declarationType?: DeclarationTypeEnum;
  /** Position of the statement for viewing. */
  position?: DeclarationPositionEnum;
};

enum DeclarationTypeEnum {
  /** when the declaration concerns only the interviewer (CAPI or CATI mode). */
  Instruction = 'INSTRUCTION',
  /** when the declaration concerns the respondent, whatever the mode. */
  Help = 'HELP',
  /** for questions where the interviewer will be required to present a code card to the respondent (CAPI Mode). */
  CodeCard = 'CODECARD',
}

enum DeclarationPositionEnum {
  /** After question label position. */
  AfterQuestionText = 'AFTER_QUESTION_TEXT',
  /** Before question label position. */
  BeforeQuestionText = 'BEFORE_QUESTION_TEXT',
}

type ControlType = {
  Description: string;
  /** quand il doit se déclencher */
  Expression: ExpressionType;
  FailMessage?: string;
  id: string;
  criticity?: ControlCriticityEnum;
  scope?: string;
};

type FlowControlType = {
  Description?: string;
  Expression: ExpressionType;
  IfTrue: string;
  id: string;
  flowControlType?: FlowControlTypeEnum;
};

/**
 * We create an optional Enum to make the difference between an ex-Goto
 * FlowControl and a Clarification FlowControl. We don't need other values for
 * now
 */
enum FlowControlTypeEnum {
  /** Jump to a clarification question ('other, please specify') */
  Clarification = 'CLARIFICATION',
}

type GoToType = {
  Description?: string;
  Expression: ExpressionType;
  IfTrue: string;
  id: string;
};

/** Into declarated language in "FormulasLanguage" */
type ExpressionType = string;

type CodeLists = CodeList[];

/**
 * "A structure used to associate a list of code values to specified categories.
 * May be flat or hierarchical.".
 *
 * See DDI documentation : https://ddialliance.org/Specification/DDI-Lifecycle/3.3/XMLSchema/FieldLevelDocumentation/
 *
 * The elements of the code list are those of the DDI. You can refer to their
 * definition in the  DDI documentation.
 */
type CodeList = {
  Name: string;
  Label: string;
  Code?: CodeType[];
  SuggesterParameters?: SuggesterParametersType;
  id: string;
  Urn?: string;
};

type CodeType = {
  /** The value of the code. */
  Value: string;
  /** The label of the code. */
  Label: string;
  /**
   * NOT USED
   *
   * Specifies a condition for NOT displaying the code value
   */
  Filter?: ExpressionType;
  /**
   * This attribute is used in hierarchical code lists case (a code may contain
   * a code that may contain a code, etc. (as a recursive description)). It
   * refers the parent code of this code.
   */
  Parent?: string;
};

type SuggesterParametersType = {
  name: string;
  fields: SuggesterField[];
  meloto?: boolean;
  max?: number;
  stopWords?: string[];
  order?: SuggesterOrder;
  queryParser?: SuggesterQueryParser;
  url?: string;
  version?: number;
  id: string;
};

type SuggesterField = {
  name: string;
  rules: string[];
  language?: string;
  min?: number;
  stemmer?: boolean;
  synonyms?: FieldSynonym[];
};

type FieldSynonym = {
  source: string;
  target: string[];
};

type SuggesterOrder = {
  field: string;
  type: string;
};

type SuggesterQueryParser = {
  type: string;
  params?: SuggesterQueryParserParams;
};

type SuggesterQueryParserParams = {
  language?: string;
  min?: number;
  pattern?: string;
  stemmer?: boolean;
};

type DatatypeType = {
  typeName: DatatypeTypeEnum;
  /**
   * visualizationHint is the type of input as part of an answer to a
   * single-choice question
   *
   * That may not be the perfect choice of a name, a better choice could be
   * "GraphicalImplementation"
   */
  visualizationHint?: VisualizationHintEnum;
};

type BooleanDatatypeType = DatatypeType;

type DateDatatypeType = DatatypeType & {
  Minimum?: string;
  Maximum?: string;
  /** date output format among YYYY-MM-DD, YYYY-MM and YYYY. */
  Format?: DateFormatEnum;
};

type DurationDatatypeType = DatatypeType & {
  Minimum?: string;
  Maximum?: string;
  Format?: string;
};

type NumericDatatypeType = DatatypeType & {
  Minimum?: number;
  Maximum?: number;
  /** Number of decimal places. */
  Decimals?: number;
  /**
   * default value is false
   *
   * Allows Unit to interpret the content of Unit (reference to a Variable or
   * Uri leading to a static unit)
   */
  IsDynamicUnit?: boolean;
  /**
   * When dynamic, Unit contains a reference to a Variable (containing the value)
   *
   * When not dynamic, Unit contains a Uri leading to an element of the list of
   * units available at INSEE is described in this file:
   * https://github.com/InseeFr/DDI-Access-Services/blob/main/src/main/resources/measure-units.json.
   */
  Unit?: string;
};

type TextDatatypeType = DatatypeType & {
  /** Maximum text response size in number of characters */
  MaxLength?: number;
  /**
   * NOT FUNCTIONAL
   *
   * The pattern allows you to specify regular expressions.
   *
   * Pattern should perhaps be attached to the answer rather than the question.
   */
  Pattern?: string;
};

enum DatatypeTypeEnum {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Duration = 'DURATION',
  Numeric = 'NUMERIC',
  Text = 'TEXT',
}

/** NOT FUNCTIONAL */
enum ControlCriticityEnum {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}

export enum SurveyModeEnum {
  /** Computer-Assisted Personal Interviewing (CAPI) mode */
  CAPI = 'CAPI',
  /** Computer Assisted Telephone Interviewing (CATI) mode */
  CATI = 'CATI',
  /** Computer-assisted web interviewing (CAWI) mode */
  CAWI = 'CAWI',
  /** Paper-and-pencil interviewing (PAPI) mode */
  PAPI = 'PAPI',
}

enum QuestionTypeEnum {
  /**
   * a SIMPLE question is a question made of a label and only one response
   * domain whichever its type be: text, numeric, date, boolean, or less
   * frequently any type available in the DDI schemas.
   */
  Simple = 'SIMPLE',
  /**
   * a SINGLE_CHOICE question is a question made of a label and a response
   * domain typed as a code list. This type of question allows to the respondent
   * to select one single response from a predefined list.
   */
  SingleChoice = 'SINGLE_CHOICE',
  /**
   * A MULTIPLE_CHOICE question is a question whose label is the mutual part of
   * several sub-questions (constituting a coherent whole i.e an information
   * axis). Each modality of the information axis is peculiar to a specific
   * response domain. This type of question allows to the respondent to select
   * the best possible answers out of a number of choices from a predefined list.
   */
  MultipleChoice = 'MULTIPLE_CHOICE',
  /**
   * A TABLE is a two-way table. It's a question made of a label and a response
   * domain defined by two dimensions. The information located at the
   * intersection of a row and a column corresponds to a response.
   */
  Table = 'TABLE',
  /**
   * When surveying households, we distinguish the household and the individual
   * members of the household. In order to properly set up the questionnaire, we
   * want to map individuals relationships, in fact pairing them. Moreover, as
   * far as possible we would like to infer some relationships instead of asking
   * redundant questions.  For example, if Alice is the mother of Bob, then Bob
   * is the child of Alice.
   */
  Pairwise = 'PAIRWISE',
}

enum VisualizationHintEnum {
  /** Checkbox (each modality will be checkable or uncheckable, but only one answer possible) */
  Checkbox = 'CHECKBOX',
  /**
   * Drop-down list (when the list of modalities is known to the respondents and
   * particularly long, this type of response translates into a free text field
   * on the paper questionnaire
   */
  Dropdown = 'DROPDOWN',
  /**
   * Radio button (standard web ergonomics for this type of answer, you can't
   * uncheck the answer to the question (you can change the answer, but you
   * can't delete an answer))
   */
  Radio = 'RADIO',
  /**
   * For a large list of codes, such as a nomenclature, this component is used
   * to suggest the sublist of codes whose labels correspond to the text entered
   * by the respondent and the suggester's rules
   */
  Suggester = 'SUGGESTER',
}

export enum FlowLogicEnum {
  /**
   * IfThenElse logic: condition the display of a sequence, sub-sequence or
   * a set of questions.
   */
  Filter = 'FILTER',
  /**
   * GoTo logic: condition the hiding of certain elements of the questionnaire:
   * jump from a starting element to a target element according to a certain
   * condition.
   */
  Redirection = 'REDIRECTION',
}

export enum FormulasLanguageEnum {
  /** Xforms/Orbeon technologies tools (V1 tools) need formulas written in pseudo-xpath. */
  XPath = 'XPATH',
  /**
   * The tools based on JavaScript and Lunatic (V2 tools) need formulas written
   * in VTL. VTL (Validation and Transformation Language) is a programming
   * language born in the bosom of the SDMX aggregate data description standard.
   */
  VTL = 'VTL',
}

export enum GenericNameEnum {
  /** In DDI, type of Sequence "template" */
  Questionnaire = 'QUESTIONNAIRE',
  /** In DDI, type of Sequence "module" */
  Module = 'MODULE',
  /** In DDI, type of Sequence "submodule */
  Submodule = 'SUBMODULE',
}

enum DateFormatEnum {
  YearMonthDay = 'YYYY-MM-DD',
  YearMonth = 'YYYY-MM',
  Year = 'YYYY',
}
