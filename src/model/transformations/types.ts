/**
 * Types used in the various state <-> remote transformations.
 */
import { DATATYPE_TYPE_FROM_NAME } from '@/constants/pogues-constants';

export type StateResponse = {
  id?: string;
  mandatory?: unknown;
  typeName?: keyof typeof DATATYPE_TYPE_FROM_NAME;
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
  codesListId?: unknown;
  allowArbitraryResponse?: unknown;
  visHint?: unknown;
  collectedVariable?: string;
  conditionFilter?: string;
};

export type RemoteResponse = {
  id: string;
  Datatype: {
    typeName: keyof typeof DATATYPE_TYPE_FROM_NAME;
    type: string;
    allowArbitraryResponse?: unknown;
    visualizationHint?: unknown;
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
  mandatory?: unknown;
  conditionFilter?: string;
};
