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
    showTotalLabel,
    totalLabel,
    label: Label,
  } = state;
  const model = {
    dimensionType: type,
  };

  if (type === PRIMARY || type === SECONDARY) {
    if (CodesListState) model.CodeListReference = CodesListState.id;
    if (showTotalLabel && totalLabel) model.totalLabel = totalLabel;
  }

  if (type === PRIMARY) {
    model.isFixedLength = isFixedLength === '1';

    if (model.isFixedLength) {
      model.dynamic = 'FIXED_LENGTH';
      model.fixedLength = fixedLength;
    } else if (numLinesMin !== undefined && numLinesMax !== undefined) {
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
