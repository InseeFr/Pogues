import { COMPONENT_TYPE, QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;
const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function getMeasureCodesLists(measureFormat) {
  const codesListsIds = [];
  const { type, [type]: measure } = measureFormat;

  if (type === SINGLE_CHOICE) {
    codesListsIds.push(measure.codesListId);
  }

  return codesListsIds;
}

export function getSingleCodesLists(singleFormat) {
  return [singleFormat.codesListId];
}

export function getMultipleCodesLists(multipleFormat) {
  const codesListsIds = [multipleFormat[PRIMARY].codesListId];
  const { [MEASURE]: { type, [type]: measure } } = multipleFormat;

  if (type === CODES_LIST) {
    codesListsIds.push(measure.codesListId);
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
    codesListsIds.push(primary.codesListId);
  }

  if (secondary) {
    codesListsIds.push(secondary.codesListId);
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

      if (type === SINGLE_CHOICE) {
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
