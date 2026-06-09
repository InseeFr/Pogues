import { format } from 'url';
import { describe, expect, test } from 'vitest';

import {
  CHOICE_TYPE,
  DATATYPE_NAME,
  DATATYPE_TYPE_FROM_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { stateToRemote } from './response';

describe('response tranformations', () => {
  test('should return the default object with a generated id', () => {
    const typeName = DATATYPE_NAME.DATE;

    const result = stateToRemote({ typeName });

    expect(result.Datatype).toEqual({
      typeName,
      type: DATATYPE_TYPE_FROM_NAME.DATE,
    });
    expect(result.id).toBeDefined();
  });

  test('should return the default object with the id passed as a parameter', () => {
    const typeName = DATATYPE_NAME.DATE;

    const result = stateToRemote({ id: '1', typeName });

    expect(result.Datatype).toEqual({
      typeName,
      type: DATATYPE_TYPE_FROM_NAME.DATE,
    });
    expect(result.id).toEqual('1');
  });

  test('when CollectedVariableReference is defined', () => {
    const typeName = DATATYPE_NAME.DATE;
    const collectedVariable = 'CollectedVariableReference';

    const result = stateToRemote({ id: '1', typeName, collectedVariable });

    expect(result.CollectedVariableReference).toEqual(collectedVariable);
  });

  test.each([
    DATATYPE_VIS_HINT.CHECKBOX,
    DATATYPE_VIS_HINT.DROPDOWN,
    DATATYPE_VIS_HINT.RADIO,
  ])(
    'when visHint is not a suggester, with a defined codesListId',
    (visHint) => {
      const typeName = DATATYPE_NAME.DATE;
      const codesListId = 'codesListId';
      const choiceType = CHOICE_TYPE.CODE_LIST;

      const result = stateToRemote({
        id: '1',
        typeName,
        codesListId,
        visHint,
        choiceType,
      });

      expect(result.CodeListReference).toEqual(codesListId);
    },
  );

  test('when visHint is not a suggester, with choiceType variable', () => {
    const typeName = DATATYPE_NAME.DATE;
    const variableReferenceId = 'variableId';

    const result = stateToRemote({
      id: '1',
      typeName,
      variableReferenceId,
      visHint: DATATYPE_VIS_HINT.RADIO,
      choiceType: CHOICE_TYPE.VARIABLE,
    });

    expect(result.VariableReference).toEqual(variableReferenceId);
  });

  test('when visHint is a suggester, with a defined nomenclatureId', () => {
    const typeName = DATATYPE_NAME.DATE;
    const nomenclatureId = 'nomenclatureId';

    const result = stateToRemote({
      id: '1',
      typeName,
      nomenclatureId,
      visHint: DATATYPE_VIS_HINT.SUGGESTER,
      choiceType: CHOICE_TYPE.SUGGESTER,
    });

    expect(result.CodeListReference).toEqual(nomenclatureId);
  });

  test('when mandatory is defined and is a boolean', () => {
    const typeName = DATATYPE_NAME.DATE;
    const mandatory = true;

    const result = stateToRemote({
      id: '1',
      typeName,
      mandatory,
    });

    expect(result.mandatory).toEqual(mandatory);
  });

  test('when mandatory is not defined', () => {
    const result = stateToRemote({ id: '1', typeName: DATATYPE_NAME.DATE });

    expect(result.mandatory).toBeUndefined();
  });

  test('when visualizationHint is defined', () => {
    const typeName = DATATYPE_NAME.DATE;
    const visHint = DATATYPE_VIS_HINT.CHECKBOX;

    const result = stateToRemote({ id: '1', typeName, visHint });

    expect(result.Datatype.visualizationHint).toEqual(visHint);
  });

  test('when MaxLength is defined', () => {
    const typeName = DATATYPE_NAME.DATE;
    const maxLength = 1;

    const result = stateToRemote({ id: '1', typeName, maxLength });

    expect(result.Datatype.MaxLength).toEqual(maxLength);
  });
  test('when Minimum is defined', () => {
    const typeName = DATATYPE_NAME.DATE;
    const minimum = 1;

    const result = stateToRemote({ id: '1', typeName, minimum });

    expect(result.Datatype.Minimum).toEqual(minimum);
  });

  test('when Maximum is defined', () => {
    const typeName = DATATYPE_NAME.DATE;
    const maximum = 1;

    const result = stateToRemote({ id: '1', typeName, maximum });

    expect(result.Datatype.Maximum).toEqual(maximum);
  });

  test('when Decimals is defined', () => {
    const typeName = DATATYPE_NAME.NUMERIC;
    const decimals = 1;

    const result = stateToRemote({ id: '1', typeName, decimals });

    expect(result.Datatype.Decimals).toEqual(decimals);
  });

  test('when IsDynamicUnit is defined', () => {
    const typeName = DATATYPE_NAME.NUMERIC;
    const isDynamicUnit = true;

    const result = stateToRemote({ id: '1', typeName, isDynamicUnit });

    expect(result.Datatype.IsDynamicUnit).toEqual(isDynamicUnit);
  });

  test('when Unit is defined', () => {
    const typeName = DATATYPE_NAME.NUMERIC;
    const unit = 1;

    const result = stateToRemote({ id: '1', typeName, unit });

    expect(result.Datatype.Unit).toEqual(unit);
  });

  test('when allowArbitraryResponse is defined', () => {
    const typeName = DATATYPE_NAME.TEXT;
    const allowArbitraryResponse = true;

    // Get all values of DATATYPE_VIS_HINT except 'SUGGESTER'
    const nonSuggesterVisHints = Object.values(DATATYPE_VIS_HINT).filter(
      (visHint) => visHint !== DATATYPE_VIS_HINT.SUGGESTER,
    );

    const resultSuggester = stateToRemote({
      typeName,
      id: '1',
      visHint: DATATYPE_VIS_HINT.SUGGESTER,
      allowArbitraryResponse,
    });

    expect(resultSuggester.Datatype.allowArbitraryResponse).toEqual(
      allowArbitraryResponse,
    );

    // Test for all non-SUGGESTER visHint values
    nonSuggesterVisHints.forEach((visHint) => {
      const result = stateToRemote({
        typeName,
        id: '1',
        visHint,
        allowArbitraryResponse,
      });

      expect(result.Datatype.allowArbitraryResponse).toEqual(undefined);
    });
  });

  test('when Format is defined', () => {
    const typeName = DATATYPE_NAME.DATE;

    const result = stateToRemote({ id: '1', typeName, format });

    expect(result.Datatype.Format).toEqual(format);
  });

  test('test when response is undefined ', () => {
    const response = undefined;
    const state = {
      collectedVariable: 'my-var-id',
      typeName: DATATYPE_NAME.BOOLEAN,
    };

    const result = stateToRemote(state, response);

    expect(result.Datatype).toEqual({
      typeName: 'BOOLEAN',
      type: 'BooleanDatatypeType',
    });
    expect(result.id).toBeDefined();
  });

  test('test when response is not undefined ', () => {
    const response = [
      {
        CollectedVariableReference: 'my-var-id',
        Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
        id: 'my-response-id',
      },
    ];
    const state = {
      collectedVariable: 'my-var-id',
      typeName: DATATYPE_NAME.BOOLEAN,
    };

    const result = stateToRemote(state, response);

    expect(result).toEqual({
      CollectedVariableReference: 'my-var-id',
      Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
      id: 'my-response-id',
    });
  });
});
