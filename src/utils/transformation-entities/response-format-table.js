import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';
import { defaultCodesListForm } from './codes-list';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

export const defaultTableForm = {
  [PRIMARY]: {
    type: LIST,
    [LIST]: {
      numLinesMin: 0,
      numLinesMax: 0,
    },
    [CODES_LIST]: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
    showTotalLabel: '0',
    totalLabel: '',
  },
  [SECONDARY]: {
    showSecondaryAxis: '',
    codesListId: '',
    showTotalLabel: '0',
    totalLabel: '',
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    [REF]: {},
    [QUESTIONNAIRE]: {},
  },
  [MEASURE]: {
    label: '',
    type: SIMPLE,
    [SIMPLE]: {
      type: TEXT,
      [TEXT]: {
        maxLength: 255,
        pattern: '',
      },
      [NUMERIC]: {
        minimun: '',
        maximun: '',
        decimals: '',
      },
      [DATE]: {},
      [BOOLEAN]: {},
    },
    [SINGLE_CHOICE]: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
    measures: [],
  },
};

export const defaultTableState = {
  [PRIMARY]: {
    type: undefined,
  },
  [SECONDARY]: {
    showSecondaryAxis: undefined,
    codesListId: undefined,
    showTotalLabel: undefined,
    totalLabel: undefined,
    type: undefined,
  },
  [MEASURE]: {
    measures: [],
  },
};

function formToState(form) {


  const { mandatory, visHint, codesListId, type, [type]: codesListForm } = form;
  const responseFormatTableState = {
    mandatory,
    visHint,
    type,
  };
  const stateCodesList = CodesList.formToState(codesListForm);

  responseFormatTableState.codesListId = stateCodesList.codesList.id;
  responseFormatTableState[type] = stateCodesList;

  return {
    ...defaultTableState,
    ...state,
  };
  // const { mandatory, visHint, codesListId, type, [type]: codesListForm } = form;
  // const responseFormatTableState = {
  //   mandatory,
  //   visHint,
  //   type,
  // };
  // const stateCodesList = CodesList.formToState(codesListForm);
  //
  // responseFormatTableState.codesListId = stateCodesList.codesList.id;
  // responseFormatTableState[type] = stateCodesList;
  //
  // return {
  //   ...defaultTableState,
  //   ...responseFormatTableState,
  // };
}


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
    ...defaultTableState,
    ...responseFormatTableData,
  };
}

function stateToModel(state) {}

function stateToForm(state, activeCodeLists, activeCodes) {
  // @TODO: Measures and testing
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
    ...defaultTableForm,
    ...state,
    ...responseFormatTableForm,
  };
}


export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
