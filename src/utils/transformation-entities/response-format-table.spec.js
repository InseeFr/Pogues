jest.dontMock('./response-format-table.js');

// @TODO: This test suit hava to be implemented

// import _ from 'lodash';
//
// import CodesList, { defaultCodesListForm } from './codes-list';
// import { defaultSimpleForm } from './response-format-simple';
// import { defaultSingleForm, defaultSingleState } from './response-format-single';
// import {
//   DIMENSION_TYPE,
//   DIMENSION_FORMATS,
//   QUESTION_TYPE_ENUM,
//   CODES_LIST_INPUT_ENUM,
//   DATATYPE_NAME,
//   DATATYPE_VIS_HINT,
// } from 'constants/pogues-constants';

// const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
// const { LIST, CODES_LIST } = DIMENSION_FORMATS;
// const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
// const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
// const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
// const { CHECKBOX } = DATATYPE_VIS_HINT;

// import ResponseFormatTable, {
//   defaultTableForm,
//   defaultTableState,
//   defaultTableModel,
//   formToStateMeasure,
//   formToStateListMeasure,
//   formToStatePrimary,
// } from './response-format-table';

describe.skip('Transformation entities - Response format - Table', () => {
  test('Fake test', () => {
    expect(true).toBe(true);
  });
  // const measureSimpleText = { ...defaultSimpleForm };
  // const measureSingle = { ...defaultSingleForm };
  // test('Default form shape should be the expected', () => {
  //   const expectedForm = {
  //     [PRIMARY]: {
  //       showTotalLabel: '0',
  //       totalLabel: '',
  //       type: LIST,
  //       [LIST]: {
  //         numLinesMin: 0,
  //         numLinesMax: 0,
  //       },
  //       [CODES_LIST]: {
  //         codesListId: '',
  //         type: NEW,
  //         [NEW]: { ...defaultCodesListForm },
  //         [REF]: {},
  //         [QUESTIONNAIRE]: {},
  //       },
  //     },
  //     [SECONDARY]: {
  //       showSecondaryAxis: false,
  //       codesListId: '',
  //       showTotalLabel: '0',
  //       totalLabel: '',
  //       type: NEW,
  //       [NEW]: { ...defaultCodesListForm },
  //       [REF]: {},
  //       [QUESTIONNAIRE]: {},
  //     },
  //     [MEASURE]: {
  //       label: '',
  //       type: SIMPLE,
  //       [SIMPLE]: {
  //         type: TEXT,
  //         [TEXT]: {
  //           maxLength: 255,
  //           pattern: '',
  //         },
  //         [NUMERIC]: {
  //           maximum: '',
  //           minimum: '',
  //           decimals: '',
  //         },
  //         [DATE]: {},
  //         [BOOLEAN]: {},
  //       },
  //       [SINGLE_CHOICE]: {
  //         codesListId: '',
  //         visHint: CHECKBOX,
  //         type: NEW,
  //         [NEW]: { ...defaultCodesListForm },
  //         [REF]: {},
  //         [QUESTIONNAIRE]: {},
  //       },
  //     },
  //     [LIST_MEASURE]: {
  //       label: '',
  //       type: SIMPLE,
  //       [SIMPLE]: {
  //         type: TEXT,
  //         [TEXT]: {
  //           maxLength: 255,
  //           pattern: '',
  //         },
  //         [NUMERIC]: {
  //           maximum: '',
  //           minimum: '',
  //           decimals: '',
  //         },
  //         [DATE]: {},
  //         [BOOLEAN]: {},
  //       },
  //       [SINGLE_CHOICE]: {
  //         codesListId: '',
  //         type: NEW,
  //         visHint: CHECKBOX,
  //         [NEW]: { ...defaultCodesListForm },
  //         [REF]: {},
  //         [QUESTIONNAIRE]: {},
  //       },
  //       measures: [],
  //     },
  //   };
  //   expect(defaultTableForm).toEqual(expectedForm);
  // });
  // test('Default state shape should be the expected', () => {
  //   const expectedState = {
  //     [PRIMARY]: {
  //       type: LIST,
  //       showTotalLabel: '0',
  //       totalLabel: '',
  //       [LIST]: {
  //         numLinesMin: 0,
  //         numLinesMax: 0,
  //       },
  //     },
  //     [SECONDARY]: {
  //       showSecondaryAxis: false,
  //       codesListId: undefined,
  //       showTotalLabel: '0',
  //       totalLabel: undefined,
  //       type: undefined,
  //     },
  //     [MEASURE]: {
  //       label: '',
  //       type: SIMPLE,
  //       [SIMPLE]: {
  //         type: TEXT,
  //         [TEXT]: {
  //           maxLength: 255,
  //           pattern: '',
  //         },
  //       },
  //     },
  //     [LIST_MEASURE]: [],
  //   };
  //   expect(defaultTableState).toEqual(expectedState);
  // });
  // test('Default model shape should be the expected', () => {
  //   const expectedModel = {
  //     dimensions: [],
  //     responses: [],
  //   };
  //   expect(defaultTableModel).toEqual(expectedModel);
  // });
  // describe.skip('Form to State', () => {
  //   const measureSimpleNumericForm = {
  //     ...defaultTableForm[PRIMARY][CODES_LIST][MEASURE],
  //     label: 'This is the measure label',
  //     type: SIMPLE,
  //     [SIMPLE]: {
  //       ...defaultTableForm[PRIMARY][CODES_LIST][MEASURE][SIMPLE],
  //       type: NUMERIC,
  //       [NUMERIC]: {
  //         ...defaultSimpleForm[NUMERIC],
  //         minimum: 10,
  //         maximum: 20,
  //       },
  //     },
  //   };
  //
  //   const measureCodesListForm = {
  //     ...defaultTableForm[PRIMARY][CODES_LIST][MEASURE],
  //     label: 'This is the measure label',
  //     type: SINGLE_CHOICE,
  //   };
  //
  //   const measureSimpleNumericState = {
  //     label: 'This is the measure label',
  //     type: SIMPLE,
  //     [SIMPLE]: {
  //       type: NUMERIC,
  //       [NUMERIC]: {
  //         ...defaultSimpleForm[NUMERIC],
  //         minimum: 10,
  //         maximum: 20,
  //       },
  //     },
  //   };
  //
  //   const measureCodesListState = {
  //     label: 'This is the measure label',
  //     type: SINGLE_CHOICE,
  //     [SINGLE_CHOICE]: { ...defaultSingleState },
  //   };
  //
  //   describe('Measure', () => {
  //     test('Type SIMPLE - NUMERIC', () => {
  //       expect(formToStateMeasure(measureSimpleNumericForm)).toEqual(measureSimpleNumericState);
  //     });
  //     test('Type SIMPLE - CODES_LIST', () => {
  //       expect(formToStateMeasure(measureCodesListForm)).toEqual(measureCodesListState);
  //     });
  //   });
  //   describe('List Measures', () => {
  //     test('Type SIMPLE - NUMERIC and Type SIMPLE - CODES_LIST measures', () => {
  //       const form = {
  //         ...defaultTableForm[PRIMARY][LIST][LIST_MEASURE],
  //         measures: [{ ...measureSimpleNumericForm }, { ...measureCodesListForm }],
  //       };
  //       const expectedState = {
  //         measures: [{ ...measureSimpleNumericState }, { ...measureCodesListState }],
  //       };
  //       expect(formToStateListMeasure(form)).toEqual(expectedState);
  //     });
  //   });
  //   describe('Primary axis', () => {
  //     test('Type LIST', () => {
  //       const form = {
  //         ...defaultTableForm[PRIMARY],
  //         showTotalLabel: '1',
  //         totalLabel: 'This is the total label',
  //         type: LIST,
  //         [LIST]: {
  //           numLinesMin: 2,
  //           numLinesMax: 5,
  //         },
  //       };
  //       const expectedState = {
  //         type: LIST,
  //         showTotalLabel: '1',
  //         totalLabel: 'This is the total label',
  //         [LIST]: {
  //           numLinesMin: 2,
  //           numLinesMax: 5,
  //         },
  //       };
  //       expect(formToStatePrimary(form)).toEqual(expectedState);
  //     });
  //     test('Type CODES_LIST', () => {
  //       const form = {
  //         ...defaultTableForm[PRIMARY],
  //         showTotalLabel: '1',
  //         totalLabel: 'This is the total label',
  //         type: CODES_LIST,
  //       };
  //       const expectedState = {
  //         showTotalLabel: '1',
  //         totalLabel: 'This is the total label',
  //         type: CODES_LIST,
  //         [CODES_LIST]: {
  //           type: 'NEW',
  //           codesListId: '',
  //           NEW: {
  //             codesList: {
  //               id: '',
  //               label: '',
  //             },
  //             codes: [],
  //           },
  //         },
  //       };
  //       expect(formToStatePrimary(form)).toEqual(expectedState);
  //     });
  //   });
  //   describe('Secondary axis', () => {
  //
  //   });
  // });
});
