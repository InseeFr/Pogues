import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  MAIN_DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { LIST } = MAIN_DIMENSION_FORMATS;
const { TABLE, SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW } = CODES_LIST_INPUT_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultResponseFormatTableState = {
  dimensionPrymary: undefined,
  dimensionSecondary: undefined,
  measures: [],
};

export const defaultResponseFormatTableForm = {
  [TABLE]: {
    AXISPRINCIPAL: {
      type: 'LIST',
      LIST: {
        numLinesMin: 0,
        numLinesMax: 0,
      },
      CODESLIST: {
        type: NEW,
        [NEW]: {
          codesList: '',
          codes: [],
        },
      },
      showTotalLabel: '0',
      totalLabel: '',
    },
    AXISSECONDARY: {
      showSecondaryAxis: '',
      type: NEW,
      [NEW]: {
        codesList: '',
        codes: [],
      },
      showTotalLabel: '0',
      totalLabel: '',
    },
    AXISMEASURES: {
      lable: '',
      type: SIMPLE,
      [SIMPLE]: {
        type: TEXT,
        [TEXT]: {
          maxLength: 255,
        },
      },
      [SINGLE_CHOICE]: {
        type: NEW,
        [NEW]: {
          codesList: '',
          codes: [],
        },
      },
      measures: [],
    },
  },
};

function getDimensionsByType(type, dimensions) {
  return dimensions.filter(d => d.dimensionType === type)[0];
}

function getMeasures(dimensions) {
  return dimensions.reduce((acc, d) => {
    if (d.dimensionType === MEASURE) acc.push(d);
    return acc;
  }, []);
}

function modelToState(model) {
  const { dimensions, responses } = model;
  const responseFormatTableData = {};
  const dimensionPrymaryState = getDimensionsByType(PRIMARY, dimensions);
  const dimensionSecondaryState = getDimensionsByType(SECONDARY, dimensions);
  const measuresStates = getMeasures(dimensions);
  let responseOffset = 1;

  responseFormatTableData.dimensionPrymary = Dimension.modelToState(dimensionPrymaryState);

  if (responseFormatTableData.dimensionPrymary.mainDimensionFormat === LIST)
    responseOffset = responseFormatTableData.dimensionPrymary.numLinesMax || responseOffset;

  if (dimensionSecondaryState)
    responseFormatTableData.dimensionSecondary = Dimension.modelToState(dimensionSecondaryState);

  responseFormatTableData.measures = measuresStates.map((m, index) =>
    Dimension.modelToState({ ...m, response: responses[index * responseOffset] })
  );
  return {
    ...defaultResponseFormatTableState,
    ...responseFormatTableData,
  };
}

function stateToModel(state) {}

export default {
  modelToState,
  stateToModel,
};
