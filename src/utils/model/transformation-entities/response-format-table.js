import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  MAIN_DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';
import { defaultCodesListForm } from './codes-list';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = MAIN_DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW } = CODES_LIST_INPUT_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultResponseFormatTableState = {
  dimensionPrymary: undefined,
  dimensionSecondary: undefined,
  measures: [],
};

export const defaultResponseFormatTableForm = {
  AXISPRINCIPAL: {
    type: 'LIST',
    LIST: {
      numLinesMin: 0,
      numLinesMax: 0,
    },
    CODESLIST: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
    },
    showTotalLabel: '0',
    totalLabel: '',
  },
  AXISSECONDARY: {
    showSecondaryAxis: '',
    codesListId: '',
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    showTotalLabel: '0',
    totalLabel: '',
  },
  AXISMEASURES: {
    label: '',
    type: SIMPLE,
    [SIMPLE]: {
      type: TEXT,
      [TEXT]: {
        maxLength: 255,
      },
    },
    [SINGLE_CHOICE]: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
    },
    measures: [],
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

function stateToForm(state, activeCodeLists, activeCodes) {
  const {
    AXISPRINCIPAL: { type: axisPrincipalType, [axisPrincipalType]: axisPrincipal },
    AXISSECONDARY: axisSecondary,
    AXISMEASURES: { measures },
  } = state;
  const responseFormatTableForm = {};
  let codesList;
  let codes;

  if (axisPrincipal === CODES_LIST) {
    codesList = activeCodeLists[axisPrincipal.codesListId] || {};
    codes = codesList.codes || [];
    responseFormatTableForm.AXISPRINCIPAL[CODES_LIST][NEW] = {
      codesList: {
        id: codesList.id,
        label: codesList.label,
      },
      codes: codes.map(key => {
        return {
          id: key,
          code: activeCodes[key].code,
          label: activeCodes[key].label,
        };
      }),
    };
  }

  codesList = activeCodeLists[axisSecondary.codesListId] || {};
  codes = codesList.codes || [];
  responseFormatTableForm.AXISSECONDARY[NEW] = {
    codesList: {
      id: codesList.id,
      label: codesList.label,
    },
    codes: codes.map(key => {
      return {
        id: key,
        code: activeCodes[key].code,
        label: activeCodes[key].label,
      };
    }),
  };

  return {
    ...defaultResponseFormatTableForm,
    ...state,
    ...responseFormatTableForm,
  };
}

function formToState(form) {
  return { ...form };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
