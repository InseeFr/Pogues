/**
 * This is the manual typescript transcription of the
 * {@link https://github.com/InseeFr/Pogues-Model Pogues Model.}
 *
 * This is what is fetched and sent to the raw questionnaire API call.
 *
 * @version 1.13.0 (last updated 2025/12/01)
 */
import type { TypedValueType } from './poguesModelTypeUtils';

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

export type Variable =
  | CollectedVariableType
  | CalculatedVariableType
  | ExternalVariableType;

export type VariablesObject = {
  Variable?: Variable[];
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
  Variables?: VariablesObject;
  /**
   * A loop is an iteration (according to one criterion) on a group of questions.
   *
   * - The group of questions is equivalent to a sequence (= Module) or a
   *   sub-sequence (= sub-module).
   * - an iteration criterion is a condition defining the number of times the
   *   question group is repeated. It can simply be (considering that by default
   *   we start at 1 and that the step is 1).
   */
  Iterations?: { Iteration?: Loop[] };
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

export type QuestionType = ComponentType & {
  Response: ResponseType[];
  ResponseStructure?: ResponseStructureType;
  /**
   * Arbitrary response is a possibility for the respondent to enter an
   * arbitrary answer if he cannot find an answer among the suggested options.
   * The arbitrary response is retrieved in a specific text variable. It is
   * currently used only for single response question for suggester.
   *
   * @version 1.6.0
   */
  ArbitraryResponse?: ResponseType;
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
  /**
   * codeFilters is list of CodeFilter, indicate in this question,
   * codeValue filtered according to a condition.
   *
   * @version 1.6.4
   */
  codeFilters?: CodeFilter[];
  questionType?: QuestionTypeEnum;
  /**
   * Whether the question is mandatory. Only used by multiple choice question
   * for now: we need it at the question root as it is related to multiple
   * responses. For simple questions and QCU we put it at the response level.
   *
   * @version 1.12.0
   */
  mandatory?: boolean;
};

/** @version 1.6.5 */
type CodeFilter = {
  codeValue: string;
  conditionFilter: string;
};

export interface IterationType {
  Name: string;
  Label?: string;
  MemberReference?: string[];
  id: string;
}

export interface Loop extends IterationType {
  /** @deprecated since 1.10.0, use "minimum" instead (VTL formula) */
  Minimum?: ExpressionType;
  /** @deprecated since 1.10.0, use "maximum" instead (VTL formula) */
  Maximum?: ExpressionType;
  /**
   * When there is no IterableReference, ables to know if a loop dimension is
   * fixed (with a size value) or not (with minimum and maximum values)
   *
   * @defaultValue false
   * @since 1.10.0
   */
  isFixedLength?: boolean;
  /**
   * Minimum allowed value for a loop dimension. Used only if isFixedLength is
   * false/undefined.
   *
   * @since 1.10.0
   */
  minimum?: ExpressionType;
  /**
   * Maximum allowed value for a loop dimension. Used only if isFixedLength is
   * false/undefined.
   *
   * @since 1.10.0
   */
  maximum?: ExpressionType;
  /**
   * Size of a loop. Used only if isFixedLength is true.
   *
   * @since 1.10.0
   */
  size?: ExpressionType;
  /**
   * When there is a size, it allows to display a loop with one page per
   * iteration.
   *
   * @defaultValue false
   * @since 1.10.0
   */
  shouldSplitIterations?: boolean;
  Step?: number;
  /** Could be a Roster (dynamic table) or another iteration */
  IterableReference?: string;
  /** Specifies a condition for filter for NOT displaying an iteration */
  Filter?: ExpressionType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Roundabout = ComponentType & {
  OccurrenceLabel: string;
  OccurrenceDescription?: string;
  Locked: boolean;
  Loop: Loop[];
};

/**
 * VariableType base type, which is extended by types for collected
 * (CollectedVariableType), calculated (CalculatedVariableType) and external
 * (ExternalVariableType) variables.
 */
type VariableType = {
  CodeListReference?: string;
  /** Variable representation type to characterize the variable (numeric, boolean, text, etc) */
  Datatype:
    | BooleanDatatypeType
    | DateDatatypeType
    | DurationDatatypeType
    | NumericDatatypeType
    | TextDatatypeType;
  Name: string;
  Label: string;
  /** Iteration reference (in which the variable has a local scope) */
  Scope?: string;
  id: string;
};

export enum VariableTypeType {
  CalculatedVariableType = 'CalculatedVariableType',
  CollectedVariableType = 'CollectedVariableType',
  ExternalVariableType = 'ExternalVariableType',
}

/**
 * A collected variable is a statistical variable collected within a
 * questionnaire for the survey need.
 */
export type CollectedVariableType = VariableType & {
  type: VariableTypeType.CollectedVariableType;
};

/**
 * A calculated variable is a variable calculated from others variables
 * including the calculated variables.
 */
export type CalculatedVariableType = VariableType & {
  Formula: ExpressionType;
  type: VariableTypeType.CalculatedVariableType;
};

/**
 * An external variable refers to a variable not collected in the questionnaire,
 * but useful for personalization. For example, it may be a collection wave
 * number for filtering questions, a date to be displayed in the wording of a
 * question, etc.
 *
 * External variables are immutable by default. The 'isDeletedOnReset' attribute
 * indicates whether the variable value is allowed to be emptied when the
 * questionnaire is reset.
 */
export type ExternalVariableType = VariableType & {
  type: VariableTypeType.ExternalVariableType;
  /**
   * This attribute allows distinguishing external variables whose values should
   * be reset in some scenarios from those that should remain unchanged.
   * - true  : the value is deleted
   * - false : the value is preserved
   *
   * @defaultValue false
   * @since 1.13.0
   */
  isDeletedOnReset?: boolean;
};

type ResponseStructureType = {
  Dimension: DimensionType[];
  /** Used to model "No data by definition" ((a no meaning intersection)) */
  Attribute?: AttributeType[];
  /** Mapping makes it possible to make the link between the box and the answer. */
  Mapping?: MappingType[];
};

/**
 * Defines a dimension of a table (e.g., PRIMARY, SECONDARY, MEASURE).
 *
 * The behavior of the dimension is controlled by the 'dynamic' attribute:
 * - NON_DYNAMIC: fixed size, potentially based on a codeList.
 * - DYNAMIC: dynamic size with minimum different from maximum.
 * - DYNAMIC_FIXED: dynamic size with minimum equal to maximum (using the 'size' field).
 */
type DimensionType = {
  /**
   * Reference to an external code list (codeList), used for NON_DYNAMIC
   * dimensions.
   */
  CodeListReference?: string;
  /** Optional label for the dimension. */
  Label?: string;
  /** @deprecated since 1.8.1, use "minimum" instead (VTL formula) */
  MinLines?: number;
  /** @deprecated since 1.8.1, use "maximum" instead (VTL formula) */
  MaxLines?: number;
  /**
   * Minimum allowed value for a DYNAMIC dimension (type: number or VTL).
   *
   * @since 1.9.0
   */
  minimum?: TypedValueType;
  /**
   * Maximum allowed value for a DYNAMIC dimension (type: number or VTL).
   *
   * @since 1.9.0
   */
  maximum?: TypedValueType;
  /**
   * Used only if dynamic = DYNAMIC_FIXED. Size dynamically fixed by a formula
   * or a value (min = max).
   *
   * @since 1.9.0
   */
  size?: TypedValueType;
  /** @deprecated since 1.9.0, use "size" instead (VTL formula) */
  FixedLength?: ExpressionType;
  dimensionType: DimensionTypeEnum;
  /**
   * For now, we keep this as xs:token. Later, this will be replaced by an
   * enumeration based on DynamicTypeEnum.
   */
  dynamic?: string;
};

/** @since 1.9.0 */
// @ts-expect-error not used by pogues model yet
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum DynamicTypeEnum {
  NonDynamic = 'NON_DYNAMIC',
  Dynamic = 'DYNAMIC',
  DynamicFixed = 'DYNAMIC_FIXED',
}

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

export enum DimensionTypeEnum {
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
  /**
   * conditionFilter is used in dynamic table to tell if cell that collects
   * response has to be filtered or not.
   *
   * @since 1.7.0
   */
  conditionFilter: string;
  /**
   * conditionReadOnly allows defining a condition that makes the field
   * non-editable (read-only).
   *
   * @since 1.8.0
   */
  conditionReadOnly?: string;
  /** an identifier to responses in order to be able to reference them in mappings */
  id: string;
  simple?: boolean;
  /**
   * Whether the response is mandatory. Used by simple and single choice
   * questions. Note that for QCM we use the mandatory attribute at the question
   * root since it is not related to a single response.
   */
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

export type Sequence = ComponentType & {
  Child?: (Sequence | QuestionType)[];
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
  /** @since 1.6.1 */
  scope: ControlScopeEnum;
};

/**
 * Scope can be: "occurrence" or "whole (occurrence: for control in row (dynamic
 * table) or in occurrence level in Roundabout, whole: questionnaire scope)".
 *
 * @since 1.6.1
 */
enum ControlScopeEnum {
  Occurence = 'occurence',
  Whole = 'whole',
}

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
export type CodeList = {
  Name: string;
  Label: string;
  Code?: CodeType[];
  SuggesterParameters?: SuggesterParametersType;
  id: string;
  Urn?: string;
};

export type CodeType = {
  /** The value of the code. */
  Value: string;
  /** The label of the code. */
  Label: string;
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
  stemmer?: boolean;
  pattern?: string;
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
  /**
   * Allows the respondent to enter an arbitrary response if he cannot find an
   * answer among the suggested options. In this case, the related question has
   * an "ArbitraryResponse" object to define the arbitrary variable. It is
   * currently used only for single response question for suggester.
   *
   * @defaultValue false
   * @since 1.6.0
   */
  allowArbitraryResponse?: boolean;
};

type BooleanDatatypeType = DatatypeType & {
  type: 'BooleanDatatypeType';
};

type DateDatatypeType = DatatypeType & {
  type: 'DateDatatypeType';
  Minimum?: string;
  Maximum?: string;
  /** date output format among YYYY-MM-DD, YYYY-MM and YYYY. */
  Format?: DateFormatEnum;
};

type DurationDatatypeType = DatatypeType & {
  type: 'DurationDatatypeType';
  Minimum?: string;
  Maximum?: string;
  Format?: string;
};

type NumericDatatypeType = DatatypeType & {
  type: 'NumericDatatypeType';
  /** Minimum is a string containing a number */
  Minimum?: string;
  /** Maximum is a string containing a number */
  Maximum?: string;
  /** Number of decimal places. It is a string containing a number */
  Decimals?: string;
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
  type: 'TextDatatypeType';
  /** Maximum text response size in number of characters */
  MaxLength?: number;
};

export enum DatatypeTypeEnum {
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

export enum QuestionTypeEnum {
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
  /**
   * Indicates that Sequence is external (Composition of questionnaire)
   *
   * @since 1.6.6
   */
  ExternalElement = 'EXTERNAL_ELEMENT',
}

export enum DateFormatEnum {
  YearMonthDay = 'YYYY-MM-DD',
  YearMonth = 'YYYY-MM',
  Year = 'YYYY',
}
