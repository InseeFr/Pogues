import {
  DIMENSION_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;

export function stateToRemote(state) {
  const {
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListState,
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
    if (numLinesMin !== undefined && numLinesMax !== undefined)
      model.dynamic = `${numLinesMin}-${numLinesMax}`;
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
