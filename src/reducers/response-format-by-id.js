import {
  SWITCH_FORMAT,
  UPDATE_FORMAT,
  UPDATE_DATATYPE,
  NEW_CODE_LIST_FORMAT,
  UPDATE_RESPONSE,
  UPDATE_MEASURE,
  UPDATE_MEASURE_FORMAT,
  ADD_MEASURE,
  REMOVE_MEASURE,
} from 'actions/response-format';

// import { emptyFormat } from '../utils/format-utils';
import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
// import { CREATE_COMPONENT } from 'actions/component';

import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { emptyDatatypeFactory } from 'utils/model/data-types/data-types-utils';
import { AXIS, DATATYPE_VIS_HINT } from 'constants/pogues-constants';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { INFO, MEASURE, FIRST_INFO, SCND_INFO } = AXIS;

/**
 * Produce a reducing function from a function that updates a response format
 *
 * It takes a function that updates a format based on an action payload and
 * produces a reducing function that takes all the response formats and updates
 * only the format corresponding to the current `id` (extracted from the
 * payload) and the relevant format based on the current type (SIMPLE, SINGLE,
 * MULTIPLE or TABLE) for this response format.
 *
 * The reducing function is not attached to a special type of format: if an
 * action assigned to this function is dispatched, then it should make sense for
 * the current type.
 *
 * @param  {Function} fn Function that updates a format based on a payload
 * @return {Function}    A reducing function for the `response-format-by-id`
 *                       reducer
 */
function fromFormatHndlr(fn) {
  return function(formats, payload) {
    const { id } = payload;
    const format = formats[id];
    const { type } = format;
    return {
      ...formats,
      [id]: {
        ...format,
        [type]: fn(format[type], payload, type),
      },
    };
  };
}

// function createComponent(formats, { id, type }) {
//   if (type !== COMPONENT_TYPE.QUESTION) return formats;
//   // We use the `id` of the question for the default datatype
//   return {
//     ...formats,
//     [id]: {
//       id,
//       ...emptyFormat,
//     },
//   };
// }

function switchFormat(formats, { id, type }) {
  return {
    ...formats,
    [id]: {
      ...formats[id],
      type,
    },
  };
}

function _updateCodeListMeasure(measure, codeListReference) {
  return {
    ...measure,
    [SINGLE_CHOICE]: {
      ...measure[SINGLE_CHOICE],
      codeListReference,
    },
  };
}

function replaceMeasure(fn, measures, index, ...args) {
  return measures.slice(0, index).concat(fn(measures[index], ...args)).concat(measures.slice(index + 1));
}

function updateResponse(responses, { id, update }) {
  return {
    ...responses,
    [id]: {
      ...responses[id],
      ...update,
    },
  };
}
/**
 * Update format
 *
 * Properties that can be updated depend on the target.
 *
 * For a SIMPLE format:
 * - `typeName` ;
 * - `length` when dealing with `TextDatatype` ;
 * - `pattern` when dealing with `TextDatatype` ;
 * - `min` when dealing with `NumericDatatype` ;
 * - `max` when dealing with `NumericDatatype` ;
 * - `precision` when dealing with `NumericDatatype`.
 *
 * For a single format: `visHint`.
 *
 * For a MUTLIPLE format: `infoCodeList`, `measureCodeList`,
 *  `measureVisHint` and `switchBooleanMultiple`.
 *
 * For a TABLE format
 *
 * @param  {Object} format             initial format
 * @param  {Object} payload            action payload
 * @param  {String} payload.update     properties to update
 * @return {Object}                    updated format
 */
function updateFormat(format, { update }) {
  return {
    ...format,
    ...update,
  };
}

function updateCodeListTable(format, clId, ctx) {
  if (ctx === 'FIRST_INFO')
    return {
      ...format,
      firstInfoCodeList: clId,
    };
  if (ctx === 'SCND_INFO')
    return {
      ...format,
      scndInfoCodeList: clId,
    };
  // ctx should be a number incated the index of the measure concerned
  return {
    ...format,
    measures: replaceMeasure(_updateCodeListMeasure, format.measures, ctx, clId),
  };
}

/**
 * Create a new code list and assign it to a format
 *
 * Valid values for `ctx`:
 * - SIMPLE: not relevant ;
 * - SINGLE: not used ;
 * - MULTIPLE: 'INFO' or 'MEASURE' ;
 * - TABLE: the index of the targeted measure.
 *
 * @param  {Object}        format               initial format
 * @param  {Object}        payload              action payload
 * @param  {String}        payload.createdClId  id of the code list to create
 * @param  {String|Number} payload.ctx          which code list is targeted
 * @return {Object}                             updated format
 */
function newCodeListFormat(format, { createdClId, ctx }, type) {
  if (type === SINGLE_CHOICE)
    return {
      ...format,
      codeListReference: createdClId,
    };
  if (type === MULTIPLE_CHOICE) {
    if (ctx === INFO)
      return {
        ...format,
        infoCodeList: createdClId,
      };
    if (ctx === MEASURE)
      return {
        ...format,
        measureCodeList: createdClId,
      };
  }
  if (type === TABLE) {
    return updateCodeListTable(format, createdClId, ctx);
  }
  return format;
}

/**
 * Update a datatype within a measure
 *
 * @param  {Object} measure a measure object
 * @param  {Object} update  the update to apply to the SIMPLE format (a
 *                          datatype) held by the measure
 * @return {Object}         the updated measure
 */
function _updateDatatype(measure, update) {
  return {
    ...measure,
    [SIMPLE]: {
      ...measure[SIMPLE],
      [measure[SIMPLE].typeName]: {
        ...measure[SIMPLE][measure[SIMPLE].typeName],
        ...update,
      },
    },
  };
}

/**
 * Update a datatype
 *
 * Can be used for SIMPLE resonse format (`index` will not be set) and for
 * measures defined within a TABLE response format (`index` will) be a number
 * representing the measure targeted.
 *
 * @param  {Object}  format          initial format
 * @param  {Object}  payload         action payload
 * @param  {String}  payload.update  udate to apply to the format
 * @param  {Number}  payload.index   which measure is targeted (TABLE format
 *                                   only)
 * @return {Object}                  updated format
 */
function updateDatatype(format, { update, index }, type) {
  if (type === SIMPLE)
    return {
      ...format,
      // we update the current datatype
      [format.typeName]: {
        ...format[format.typeName],
        ...update,
      },
    };
  if (type === TABLE) {
    return {
      ...format,
      // we will update the measure at position `index`
      measures: replaceMeasure(_updateDatatype, format.measures, index, update),
    };
  }
  return format;
}

function _updateMeasureFormat(measure, update) {
  return {
    ...measure,
    [measure.type]: {
      ...measure[measure.type],
      ...update,
    },
  };
}

function _updateMeasure(measure, update) {
  return {
    ...measure,
    ...update,
  };
}

function updateMeasure(format, { index, update }) {
  return {
    ...format,
    measures: replaceMeasure(_updateMeasure, format.measures, index, update),
  };
}

function updateMeasureFormat(format, { index, update }) {
  return {
    ...format,
    measures: replaceMeasure(_updateMeasureFormat, format.measures, index, update),
  };
}

function addMeasure(format, { index }) {
  return {
    ...format,
    measures: [
      ...format.measures,
      {
        type: SIMPLE,
        label: '',
        [SIMPLE]: emptyDatatypeFactory,
        [SINGLE_CHOICE]: {
          codeListReference: '',
          visHint: CHECKBOX,
        },
      },
    ],
  };
}

function removeMeasure(format, { index }) {
  const { measures } = format;
  return {
    ...format,
    measures: [...measures.slice(0, index), ...measures.slice(index + 1)],
  };
}

export function loadQuestionnaireSuccess(state, { update }) {
  return {
    ...state,
    ...update.responseFormatById,
  };
}

const actionsHndlrs = {
  // [CREATE_COMPONENT]: createComponent,
  [SWITCH_FORMAT]: switchFormat,
  [UPDATE_RESPONSE]: updateResponse,
  [UPDATE_DATATYPE]: fromFormatHndlr(updateDatatype),
  [UPDATE_FORMAT]: fromFormatHndlr(updateFormat),
  [NEW_CODE_LIST_FORMAT]: fromFormatHndlr(newCodeListFormat),
  [UPDATE_MEASURE]: fromFormatHndlr(updateMeasure),
  [UPDATE_MEASURE_FORMAT]: fromFormatHndlr(updateMeasureFormat),
  [ADD_MEASURE]: fromFormatHndlr(addMeasure),
  [REMOVE_MEASURE]: fromFormatHndlr(removeMeasure),
  [LOAD_QUESTIONNAIRE_SUCCESS]: loadQuestionnaireSuccess,
};

export default function(state = {}, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionsHndlrs[type];
  return hndlr ? hndlr(state, payload, action) : state;
}
