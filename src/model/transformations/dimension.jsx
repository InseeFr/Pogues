import {
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_CALCULATION,
  DIMENSION_TYPE,
} from '../../constants/pogues-constants';

const { FORMULA } = DIMENSION_CALCULATION;
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;

export function stateToRemote(state) {
  const {
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListState,
    calculationMethod,
    size,
    minimum,
    maximum,
    label: Label,
  } = state;
  const model = {
    dimensionType: type,
  };

  if (type === PRIMARY || type === SECONDARY) {
    if (CodesListState) model.CodeListReference = CodesListState.id;
  }

  if (type === PRIMARY) {
    const valueType = calculationMethod === FORMULA ? 'VTL' : 'number';

    if (size !== undefined) {
      model.dynamic = 'DYNAMIC_FIXED';
      model.size = { value: size, type: valueType };
    } else if (minimum !== undefined && maximum !== undefined) {
      model.dynamic = 'DYNAMIC';
      model.minimum = { value: minimum, type: valueType };
      model.maximum = { value: maximum, type: valueType };
    } else {
      model.dynamic = 'NON_DYNAMIC';
    }
  }

  if (type === MEASURE && Label) {
    model.Label = Label;
  }

  return {
    dimensionType: '',
    ...model,
  };
}
