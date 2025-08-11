import { DataType } from './datatype';

export enum VariableType {
  Collected,
  Calculated,
  External,
}

export type Variable = {
  id: string;
  name: string;
  description?: string;
  datatype: DataType;
  scope?: string;
  type: VariableType;
} & (
  | {
      type: VariableType.Calculated;
      formula?: string;
    }
  | { type: VariableType.External | VariableType.Collected }
);
