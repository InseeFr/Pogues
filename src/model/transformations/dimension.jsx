import {
  DIMENSION_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;

export function stateToRemote(state) {
  const {
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListState,
    isFixedLength,
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
    if (isFixedLength === '1') {
      model.isFixedLength = true;
      model.dynamic = 'FIXED_LENGTH';
      model.fixedLength = fixedLength;
    } else if (numLinesMin !== undefined && numLinesMax !== undefined) {
      model.isFixedLength = false;
      model.minimum = numLinesMin;
      model.maximum = numLinesMax;
      model.dynamic = 'DYNAMIC_LENGTH';
    } else {
      model.dynamic = 'NON_DYNAMIC';
    }
  }

  if (type === MEASURE && Label) {
    model.Label = Label;
  }

  return {
    dimensionType: '',
    dynamic: '0',
    ...model,
  };
}
