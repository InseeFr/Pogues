import { DataType } from './datatype';

export enum VariableType {
  Collected = 'COLLECTED',
  Calculated = 'CALCULATED',
  External = 'EXTERNAL',
}

export type BaseVariable = {
  id: string;
  name: string;
  description: string;
  datatype: DataType;
  codeListReference?: string;
  scope?: string | null;
};

export type CalculatedVariable = BaseVariable & {
  type: VariableType.Calculated;
  formula: string;
};

export type CollectedVariable = BaseVariable & {
  type: VariableType.Collected;
};

export type ExternalVariable = BaseVariable & {
  type: VariableType.External;
};

export type Variable =
  | CalculatedVariable
  | CollectedVariable
  | ExternalVariable;
