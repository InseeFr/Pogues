import {
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;
const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE, PAIRING } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function getMeasureCodesLists(measureFormat) {
  const codesListsIds = [];
  const { type, [type]: measure } = measureFormat;

  if (type === SINGLE_CHOICE || type === PAIRING) {
    codesListsIds.push(measure[DEFAULT_CODES_LIST_SELECTOR_PATH].id);
  }

  return codesListsIds;
}

export function getSingleCodesLists(singleFormat) {
  return [singleFormat[DEFAULT_CODES_LIST_SELECTOR_PATH].id];
}

export function getMultipleCodesLists(multipleFormat) {
  const codesListsIds = [
    multipleFormat[PRIMARY][DEFAULT_CODES_LIST_SELECTOR_PATH].id,
  ];
  const {
    [MEASURE]: { type, [type]: measure },
  } = multipleFormat;

  if (type === CODES_LIST) {
    codesListsIds.push(measure[DEFAULT_CODES_LIST_SELECTOR_PATH].id);
  }

  return codesListsIds;
}

export function getTableCodesLists(tableFormat) {
  let codesListsIds = [];
  const {
    [PRIMARY]: { type: typePrimary, [typePrimary]: primary },
    [SECONDARY]: secondary,
    [MEASURE]: measure,
    [LIST_MEASURE]: measures,
  } = tableFormat;

  if (typePrimary === CODES_LIST) {
    codesListsIds.push(primary[DEFAULT_CODES_LIST_SELECTOR_PATH].id);
  }

  if (secondary) {
    codesListsIds.push(secondary[DEFAULT_CODES_LIST_SELECTOR_PATH].id);
  }

  if (measure) {
    codesListsIds = [...codesListsIds, ...getMeasureCodesLists(measure)];
  }

  if (measures) {
    measures.forEach(m => {
      codesListsIds = [...codesListsIds, ...getMeasureCodesLists(m)];
    });
  }

  return codesListsIds;
}

export function removeOrphansCodesLists(codesListsStore, componentsStore) {
  return Object.keys(componentsStore)
    .filter(key => {
      return componentsStore[key].type === QUESTION;
    })
    .reduce((acc, key) => {
      const { type, [type]: format } = componentsStore[key].responseFormat;
      let codesListsIds = [];

      if (type === SINGLE_CHOICE || type === PAIRING) {
        codesListsIds = getSingleCodesLists(format);
      } else if (type === MULTIPLE_CHOICE) {
        codesListsIds = getMultipleCodesLists(format);
      } else if (type === TABLE) {
        codesListsIds = getTableCodesLists(format);
      }

      const codesListsLinked = codesListsIds.reduce((accInner, keyInner) => {
        return {
          ...accInner,
          [keyInner]: codesListsStore[keyInner],
        };
      }, {});

      return {
        ...acc,
        ...codesListsLinked,
      };
    }, {});
}
/**
 * This method will check if a code list contains a given child
 */
export const hasChild = (code, listCodes) =>
  listCodes.reduce((_, c) => {
    if (c.parent === code.value) _ = true;
    return _;
  }, false);
