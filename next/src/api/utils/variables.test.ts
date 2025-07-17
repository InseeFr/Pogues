import { describe, expect, it } from 'vitest';

import { DatatypeType, DateFormat, DurationFormat } from '@/models/datatype';
import { VariableType } from '@/models/variables';

import {
  DatatypeTypeEnum as PoguesDatatypeType,
  DateFormatEnum as PoguesDateFormat,
  Variable as PoguesVariable,
  VariableTypeType as PoguesVariableType,
} from '../models/pogues';
import { computeVariable } from './variables';

describe('computeVariable', () => {
  describe('text variable', () => {
    it('should compute a Collected text variable correctly', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Text variable',
        Datatype: {
          type: 'TextDatatypeType',
          typeName: PoguesDatatypeType.Text,
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Text variable',
        datatype: { typeName: DatatypeType.Text },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });

    it('should compute a Calculated text variable correctly', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CalculatedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Text variable',
        Datatype: {
          type: 'TextDatatypeType',
          typeName: PoguesDatatypeType.Text,
        },
        CodeListReference: 'ref',
        Scope: 'scope',
        Formula: 'formula',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Calculated,
        id: '1',
        name: 'variable1',
        label: 'Text variable',
        datatype: { typeName: DatatypeType.Text },
        codeListReference: 'ref',
        scope: 'scope',
        formula: 'formula',
      });
    });

    it('should compute an External text variable correctly', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.ExternalVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Text variable',
        Datatype: {
          type: 'TextDatatypeType',
          typeName: PoguesDatatypeType.Text,
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.External,
        id: '1',
        name: 'variable1',
        label: 'Text variable',
        datatype: { typeName: DatatypeType.Text },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });
  });

  describe('boolean variable', () => {
    it('should compute a Collected boolean variable correctly', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Boolean variable',
        Datatype: {
          type: 'BooleanDatatypeType',
          typeName: PoguesDatatypeType.Boolean,
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Boolean variable',
        datatype: { typeName: DatatypeType.Boolean },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });
  });

  describe('date variable', () => {
    it('should compute a Collected date variable with YearMonthDay format', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Date variable',
        Datatype: {
          type: 'DateDatatypeType',
          typeName: PoguesDatatypeType.Date,
          Format: PoguesDateFormat.YearMonthDay,
          Minimum: '1900-01-10',
          Maximum: '2020-12-20',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Date variable',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.YearMonthDay,
          minimum: new Date('1900-01-10'),
          maximum: new Date('2020-12-20'),
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });

    it('should compute a Collected date variable with YearMonth format', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Date variable',
        Datatype: {
          type: 'DateDatatypeType',
          typeName: PoguesDatatypeType.Date,
          Format: PoguesDateFormat.YearMonth,
          Minimum: '1900-01',
          Maximum: '2020-12',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Date variable',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.YearMonth,
          minimum: new Date('1900-01'),
          maximum: new Date('2020-12'),
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });

    it('should compute a Collected date variable with YearMonth format', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Date variable',
        Datatype: {
          type: 'DateDatatypeType',
          typeName: PoguesDatatypeType.Date,
          Format: PoguesDateFormat.Year,
          Minimum: '1900',
          Maximum: '2020',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Date variable',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.Year,
          minimum: new Date('1900'),
          maximum: new Date('2020'),
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });
  });

  describe('duration variable', () => {
    it('should compute a Collected duration variable with YearMonth format', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Duration variable',
        Datatype: {
          type: 'DurationDatatypeType',
          typeName: PoguesDatatypeType.Duration,
          Format: 'PnYnM',
          Minimum: 'P1Y2M',
          Maximum: 'P5Y6M',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Duration variable',
        datatype: {
          typeName: DatatypeType.Duration,
          format: DurationFormat.YearMonth,
          minimum: { years: 1, months: 2 },
          maximum: { years: 5, months: 6 },
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });

    it('should compute a Collected duration variable with MinuteSecond format', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Duration variable',
        Datatype: {
          type: 'DurationDatatypeType',
          typeName: PoguesDatatypeType.Duration,
          Format: 'PTnHnM',
          Minimum: 'PT1H2M',
          Maximum: 'PT5H6M',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Duration variable',
        datatype: {
          typeName: DatatypeType.Duration,
          format: DurationFormat.MinuteSecond,
          minimum: { hours: 1, minutes: 2 },
          maximum: { hours: 5, minutes: 6 },
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });
  });

  describe('numeric variable', () => {
    it('should compute a Collected numeric variable correctly', () => {
      const poguesVariable: PoguesVariable = {
        type: PoguesVariableType.CollectedVariableType,
        id: '1',
        Name: 'variable1',
        Label: 'Numeric variable',
        Datatype: {
          type: 'NumericDatatypeType',
          typeName: PoguesDatatypeType.Numeric,
          Minimum: '1',
          Maximum: '10',
          Decimals: '2',
          IsDynamicUnit: false,
          Unit: '€',
        },
        CodeListReference: 'ref',
        Scope: 'scope',
      };

      const result = computeVariable(poguesVariable);

      expect(result).toEqual({
        type: VariableType.Collected,
        id: '1',
        name: 'variable1',
        label: 'Numeric variable',
        datatype: {
          typeName: DatatypeType.Numeric,
          minimum: 1,
          maximum: 10,
          decimals: 2,
          isDynamicUnit: false,
          unit: '€',
        },
        codeListReference: 'ref',
        scope: 'scope',
      });
    });
  });
});
