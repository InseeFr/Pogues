import {
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_CALCULATION,
  DIMENSION_TYPE,
} from '@/constants/pogues-constants';

type StateDimension = {
  type: DIMENSION_TYPE;
  label?: string;
  CodesList?: { id: string };
  calculationMethod?: DIMENSION_CALCULATION;
  minimum?: unknown;
  maximum?: unknown;
  size?: unknown;
};

export type RemoteDimension =
  | RemoteDimensionPrimary
  | { dimensionType: 'SECONDARY'; CodeListReference?: string }
  | { dimensionType: 'MEASURE'; Label?: string };

export type RemoteDimensionPrimary = {
  dimensionType: 'PRIMARY';
  CodeListReference?: string;
} & (
  | {
      dynamic: 'DYNAMIC_FIXED';
      size: { value: unknown; type: 'VTL' | 'number' };
    }
  | {
      dynamic: 'DYNAMIC';
      minimum: { value: unknown; type: 'VTL' | 'number' };
      maximum: { value: unknown; type: 'VTL' | 'number' };
    }
  | {
      dynamic: 'NON_DYNAMIC';
    }
);

/** Compute a dimension in a Pogues model from the state */
export function stateToRemote(state: StateDimension): RemoteDimension {
  const {
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListState,
    calculationMethod,
    size,
    minimum,
    maximum,
    label,
  } = state;

  if (type === DIMENSION_TYPE.MEASURE) {
    return {
      dimensionType: 'MEASURE',
      Label: label,
    };
  }

  if (type === DIMENSION_TYPE.SECONDARY) {
    return {
      dimensionType: 'SECONDARY',
      CodeListReference: CodesListState?.id,
    };
  }

  if (type === DIMENSION_TYPE.PRIMARY) {
    const valueType =
      calculationMethod === DIMENSION_CALCULATION.FORMULA ? 'VTL' : 'number';

    if (size !== undefined) {
      return {
        dimensionType: 'PRIMARY',
        dynamic: 'DYNAMIC_FIXED',
        size: { value: size, type: valueType },
        CodeListReference: CodesListState?.id,
      };
    }

    if (minimum !== undefined && maximum !== undefined) {
      return {
        dimensionType: 'PRIMARY',
        dynamic: 'DYNAMIC',
        minimum: { value: minimum, type: valueType },
        maximum: { value: maximum, type: valueType },
        CodeListReference: CodesListState?.id,
      };
    }

    return {
      dimensionType: 'PRIMARY',
      dynamic: 'NON_DYNAMIC',
      CodeListReference: CodesListState?.id,
    };
  }

  throw new Error('Invalid dimension type');
}
