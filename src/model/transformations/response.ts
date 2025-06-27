import {
  DATATYPE_TYPE_FROM_NAME,
  DATATYPE_VIS_HINT,
} from '@/constants/pogues-constants';
import { uuid } from '@/utils/utils';

import { RemoteResponse, StateResponse } from './types';

export type Response = {
  id: string;
  CollectedVariableReference: unknown;
};

export function stateToRemote(
  state: StateResponse,
  response?: Response[],
): RemoteResponse {
  const {
    id,
    mandatory,
    typeName,
    maxLength: MaxLength,
    minimum: Minimum,
    maximum: Maximum,
    decimals: Decimals,
    isDynamicUnit: IsDynamicUnit,
    unit: Unit,
    format: Format,
    mihours: Mihours,
    miminutes: Miminutes,
    miyears: Miyears,
    mimonths: Mimonths,
    mahours: Mahours,
    maminutes: Maminutes,
    mayears: Mayears,
    mamonths: Mamonths,
    codesListId,
    nomenclatureId,
    allowArbitraryResponse,
    visHint: visualizationHint,
    collectedVariable: CollectedVariableReference,
    conditionFilter,
    conditionReadOnly,
  } = state;

  const find = response
    ? response.find(
        (element) =>
          element.CollectedVariableReference === CollectedVariableReference,
      )
    : undefined;

  const model: RemoteResponse = {
    id: find ? find.id : (id ?? uuid()),
    Datatype: {
      typeName: typeName!,
      type: DATATYPE_TYPE_FROM_NAME[typeName!],
    },
  };

  // For suggester we store the nomenclature as codeList reference. Else we store the codeList
  model.CodeListReference =
    visualizationHint === DATATYPE_VIS_HINT.SUGGESTER
      ? nomenclatureId
      : codesListId;

  if (CollectedVariableReference !== undefined)
    model.CollectedVariableReference = CollectedVariableReference;
  if (mandatory !== undefined)
    model.mandatory = mandatory === '' ? false : mandatory;
  if (allowArbitraryResponse !== undefined)
    // we keep allowArbitraryResponse value only for suggester
    model.Datatype.allowArbitraryResponse =
      visualizationHint === DATATYPE_VIS_HINT.SUGGESTER
        ? allowArbitraryResponse
        : undefined;
  if (visualizationHint !== undefined)
    model.Datatype.visualizationHint = visualizationHint;
  if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
  if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
  if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
  if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
  if (IsDynamicUnit !== undefined) model.Datatype.IsDynamicUnit = IsDynamicUnit;
  if (Unit !== undefined) model.Datatype.Unit = Unit;
  if (Format !== undefined) model.Datatype.Format = Format;
  if (Mihours !== undefined) model.Datatype.Mihours = Mihours;
  if (Miminutes !== undefined) model.Datatype.Miminutes = Miminutes;
  if (Miyears !== undefined) model.Datatype.Miyears = Miyears;
  if (Mimonths !== undefined) model.Datatype.Mimonths = Mimonths;
  if (Mahours !== undefined) model.Datatype.Mahours = Mahours;
  if (Maminutes !== undefined) model.Datatype.Maminutes = Maminutes;
  if (Mayears !== undefined) model.Datatype.Mayears = Mayears;
  if (Mamonths !== undefined) model.Datatype.Mamonths = Mamonths;
  if (conditionFilter !== undefined) model.conditionFilter = conditionFilter;
  if (conditionReadOnly !== undefined)
    model.conditionReadOnly = conditionReadOnly;

  return model;
}
