import {
  VariableRole as AntlrVariableRole,
  VariableType as AntlrVariableType,
  Variables as AntlrVariables,
} from '@making-sense/antlr-editor/model';
import { describe, expect, it } from 'vitest';

import { DatatypeType } from '@/models/datatype';
import { Variable, VariableType } from '@/models/variables';

import { computeAntlrVariables } from './vtlEditor';

describe('computeAntlrVariables', () => {
  it('should convert boolean variables correctly', () => {
    const input = [
      {
        name: 'collectedBoolean',
        label: 'collected boolean variable',
        type: VariableType.Collected,
        datatype: { typeName: DatatypeType.Boolean },
      },
      {
        name: 'calculatedBoolean',
        label: 'calculated boolean variable',
        type: VariableType.Calculated,
        datatype: { typeName: DatatypeType.Boolean },
      },
      {
        name: 'externalBoolean',
        label: 'external boolean variable',
        type: VariableType.External,
        datatype: { typeName: DatatypeType.Boolean },
      },
    ] as unknown as Variable[];

    const expectedOutput: AntlrVariables = {
      collectedBoolean: {
        type: AntlrVariableType.BOOLEAN,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'collectedBoolean',
        label: 'collected boolean variable',
      },
      calculatedBoolean: {
        type: AntlrVariableType.BOOLEAN,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'calculatedBoolean',
        label: 'calculated boolean variable',
      },
      externalBoolean: {
        type: AntlrVariableType.BOOLEAN,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'externalBoolean',
        label: 'external boolean variable',
      },
    };

    expect(computeAntlrVariables(input)).toEqual(expectedOutput);
  });

  it('should convert numeric variables correctly', () => {
    const input = [
      {
        name: 'collectedNumeric',
        label: 'collected numeric variable',
        type: VariableType.Collected,
        datatype: { typeName: DatatypeType.Numeric },
      },
      {
        name: 'calculatedNumeric',
        label: 'calculated numeric variable',
        type: VariableType.Calculated,
        datatype: { typeName: DatatypeType.Numeric },
      },
      {
        name: 'externalNumeric',
        label: 'external numeric variable',
        type: VariableType.External,
        datatype: { typeName: DatatypeType.Numeric },
      },
    ] as unknown as Variable[];

    const expectedOutput: AntlrVariables = {
      collectedNumeric: {
        type: AntlrVariableType.NUMBER,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'collectedNumeric',
        label: 'collected numeric variable',
      },
      calculatedNumeric: {
        type: AntlrVariableType.NUMBER,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'calculatedNumeric',
        label: 'calculated numeric variable',
      },
      externalNumeric: {
        type: AntlrVariableType.NUMBER,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'externalNumeric',
        label: 'external numeric variable',
      },
    };

    expect(computeAntlrVariables(input)).toEqual(expectedOutput);
  });

  it('should convert text variables correctly', () => {
    const input = [
      {
        name: 'collectedText',
        label: 'collected text variable',
        type: VariableType.Collected,
        datatype: { typeName: DatatypeType.Text },
      },
      {
        name: 'calculatedText',
        label: 'calculated text variable',
        type: VariableType.Calculated,
        datatype: { typeName: DatatypeType.Text },
      },
      {
        name: 'externalText',
        label: 'external text variable',
        type: VariableType.External,
        datatype: { typeName: DatatypeType.Text },
      },
    ] as unknown as Variable[];

    const expectedOutput: AntlrVariables = {
      collectedText: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'collectedText',
        label: 'collected text variable',
      },
      calculatedText: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'calculatedText',
        label: 'calculated text variable',
      },
      externalText: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'externalText',
        label: 'external text variable',
      },
    };

    expect(computeAntlrVariables(input)).toEqual(expectedOutput);
  });

  it('should convert date variables correctly', () => {
    const input = [
      {
        name: 'collectedDate',
        label: 'collected date variable',
        type: VariableType.Collected,
        datatype: { typeName: DatatypeType.Date },
      },
      {
        name: 'calculatedDate',
        label: 'calculated date variable',
        type: VariableType.Calculated,
        datatype: { typeName: DatatypeType.Date },
      },
      {
        name: 'externalDate',
        label: 'external date variable',
        type: VariableType.External,
        datatype: { typeName: DatatypeType.Date },
      },
    ] as unknown as Variable[];

    const expectedOutput: AntlrVariables = {
      collectedDate: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'collectedDate',
        label: 'collected date variable',
      },
      calculatedDate: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'calculatedDate',
        label: 'calculated date variable',
      },
      externalDate: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'externalDate',
        label: 'external date variable',
      },
    };

    expect(computeAntlrVariables(input)).toEqual(expectedOutput);
  });

  it('should convert duration variables correctly', () => {
    const input = [
      {
        name: 'collectedDuration',
        label: 'collected duration variable',
        type: VariableType.Collected,
        datatype: { typeName: DatatypeType.Duration },
      },
      {
        name: 'calculatedDuration',
        label: 'calculated duration variable',
        type: VariableType.Calculated,
        datatype: { typeName: DatatypeType.Duration },
      },
      {
        name: 'externalDuration',
        label: 'external duration variable',
        type: VariableType.External,
        datatype: { typeName: DatatypeType.Duration },
      },
    ] as unknown as Variable[];

    const expectedOutput: AntlrVariables = {
      collectedDuration: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'collectedDuration',
        label: 'collected duration variable',
      },
      calculatedDuration: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'calculatedDuration',
        label: 'calculated duration variable',
      },
      externalDuration: {
        type: AntlrVariableType.STRING,
        role: AntlrVariableRole.IDENTIFIER,
        name: 'externalDuration',
        label: 'external duration variable',
      },
    };

    expect(computeAntlrVariables(input)).toEqual(expectedOutput);
  });

  it('should return an empty object when given an empty array', () => {
    expect(computeAntlrVariables([])).toEqual({});
  });
});
