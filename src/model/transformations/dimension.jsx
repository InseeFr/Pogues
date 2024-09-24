import {
  DIMENSION_TYPE,
  DIMENSION_LENGTH,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { DYNAMIC_LENGTH, FIXED_LENGTH, NON_DYNAMIC } = DIMENSION_LENGTH;

export function stateToRemote(state) {
  const {
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListState,
    fixedLength,
    numLinesMin,
    numLinesMax,
    label: Label,
  } = state;
  const model = {
    dimensionType: type,
  };

  if (type === PRIMARY || type === SECONDARY) {
    if (CodesListState) model.CodeListReference = CodesListState.id;
  }

  if (type === PRIMARY) {
    if (fixedLength !== undefined) {
      model.dynamic = FIXED_LENGTH;
      model.fixedLength = fixedLength;
    } else if (numLinesMin !== undefined && numLinesMax !== undefined) {
      model.minimum = numLinesMin;
      model.maximum = numLinesMax;
      model.dynamic = DYNAMIC_LENGTH;
    } else {
      model.dynamic = NON_DYNAMIC;
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
