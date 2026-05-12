/**
 * Types used in the various state <-> remote transformations.
 */
import {
  CHOICE_TYPE,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from '@/constants/pogues-constants';

export type StateResponse = {
  id?: string;
  mandatory?: boolean;
  typeName?: DATATYPE_NAME;
  type?: unknown;
  maxLength?: unknown;
  minimum?: unknown;
  maximum?: unknown;
  decimals?: unknown;
  isDynamicUnit?: unknown;
  unit?: unknown;
  format?: unknown;
  mihours?: unknown;
  miminutes?: unknown;
  miyears?: unknown;
  mimonths?: unknown;
  mahours?: unknown;
  maminutes?: unknown;
  mayears?: unknown;
  mamonths?: unknown;
  codesListId?: string;
  nomenclatureId?: string;
  variableReferenceId?: string;
  optionFilter?: string;
  allowArbitraryResponse?: unknown;
  visHint?: DATATYPE_VIS_HINT;
  choiceType?:
    | CHOICE_TYPE.CODE_LIST
    | CHOICE_TYPE.VARIABLE
    | CHOICE_TYPE.SUGGESTER;
  collectedVariable?: string;
  conditionFilter?: string;
  conditionReadOnly?: string;
};

export type RemoteResponse = {
  id: string;
  Datatype: {
    typeName: DATATYPE_NAME;
    type: string;
    allowArbitraryResponse?: unknown;
    visualizationHint?: DATATYPE_VIS_HINT;
    MaxLength?: unknown;
    Minimum?: unknown;
    Maximum?: unknown;
    Decimals?: unknown;
    IsDynamicUnit?: unknown;
    Unit?: unknown;
    Format?: unknown;
    Mihours?: unknown;
    Miminutes?: unknown;
    Miyears?: unknown;
    Mimonths?: unknown;
    Mahours?: unknown;
    Maminutes?: unknown;
    Mayears?: unknown;
    Mamonths?: unknown;
  };
  CollectedVariableReference?: string;
  CodeListReference?: unknown;
  VariableReference?: unknown;
  optionFilter?: string;
  choiceType?:
    | CHOICE_TYPE.CODE_LIST
    | CHOICE_TYPE.VARIABLE
    | CHOICE_TYPE.SUGGESTER;
  mandatory?: boolean;
  conditionFilter?: string;
  conditionReadOnly?: string;
};
