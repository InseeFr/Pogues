import {
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import { uuid } from 'utils/utils';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

export function getCollecteVariable(name, label) {
  return {
    id: uuid(),
    name,
    label,
  };
}

export function getCollectedVariablesMultiple(questionName, form, codesListStore) {
  const { [PRIMARY]: { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes, id } } } = form;
  let listCodes = codes;

  if (codesListStore[id]) {
    const codesStore = codesListStore[id].codes;
    listCodes = Object.keys(codesStore).map(key => codesStore[key]);
  }

  return listCodes.map((c, index) => getCollecteVariable(`${questionName}${index + 1}`, `${c.value} - ${c.label}`));
}

export function getCollectedVariablesTable(questionName, form, codesListStore) {
  const collectedVariables = [];
  let codesListState;
  let codesStore;
  let codesStatePrimary;
  let codesStateSecondary;
  let codePrimary;
  let codeSecondary;
  let measure;
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = form;

  if (primaryState.type === CODES_LIST) {
    const {
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes: componentCodesStatePrimary, id: codesListIdPrimary },
      },
    } = primaryState;

    codesListState = codesListStore[codesListIdPrimary] || {};
    codesStore = codesListState.codes || {};
    codesStatePrimary = Object.keys(codesStore).map(key => codesStore[key]);
    if (codesStatePrimary.length === 0) codesStatePrimary = componentCodesStatePrimary;

    if (secondaryState.showSecondaryAxis) {
      const {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes: componentCodesStateSecondary, id: codesListIdSecondary },
      } = secondaryState;

      codesListState = codesListStore[codesListIdSecondary] || {};
      codesStore = codesListState.codes || {};
      codesStateSecondary = Object.keys(codesStore).map(key => codesStore[key]);
      if (codesStateSecondary.length === 0) codesStateSecondary = componentCodesStateSecondary;

      // First case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < codesStateSecondary.length; j += 1) {
          codeSecondary = codesStateSecondary[j];
          collectedVariables.push(
            getCollecteVariable(
              `${questionName}${i + 1}${j + 1}`,
              `${codePrimary.label}-${codeSecondary.label}-${measureState.label}`
            )
          );
        }
      }
    } else {
      // Second case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
          measure = listMeasuresState.measures[j];
          collectedVariables.push(
            getCollecteVariable(`${questionName}${i + 1}${j + 1}`, `${codePrimary.label}-${measure.label}`)
          );
        }
      }
    }
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    const numLines = numLinesMax - numLinesMin + 1;

    // Third case
    for (let i = 0; i < numLines; i += 1) {
      for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
        measure = listMeasuresState.measures[j];
        collectedVariables.push(
          getCollecteVariable(`${questionName}${i + 1}${j + 1}`, `Line${i + 1}-${measure.label}`)
        );
      }
    }
  }
  return collectedVariables;
}

export function generateCollectedVariables(responseFormat, questionName, form, codesListStore) {
  let generatedCollectedVariables = [];

  if (responseFormat === SIMPLE || responseFormat === SINGLE_CHOICE) {
    generatedCollectedVariables = [getCollecteVariable(questionName, `${questionName} label`)];
  } else if (responseFormat === MULTIPLE_CHOICE) {
    generatedCollectedVariables = getCollectedVariablesMultiple(questionName, form, codesListStore);
  } else if (responseFormat === TABLE) {
    generatedCollectedVariables = getCollectedVariablesTable(questionName, form, codesListStore);
  }

  return generatedCollectedVariables;
}
