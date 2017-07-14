import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export function getCodesListFromForm(form) {
  const codesList = {};

  if (form.responseFormat) {
    const type = form.responseFormat.type;
    const responseFormatType = form.responseFormat[type];

    if (type === SINGLE_CHOICE) {
      const responseFormatCodesList = responseFormatType[responseFormatType.type].codesList;
      const responseFormatCodes = responseFormatType[responseFormatType.type].codes;
      codesList[responseFormatCodesList.id] = {
        ...responseFormatCodesList,
        codes: responseFormatCodes.map(code => code.id),
      };
    } else if (type === MULTIPLE_CHOICE) {
    } else if (type === TABLE) {
    }
  }

  return codesList;
}

export function getCodesFromForm(form) {
  let codes = {};

  if (form.responseFormat) {
    const type = form.responseFormat.type;
    const responseFormatType = form.responseFormat[type];

    if (type === SINGLE_CHOICE) {
      const responseFormatCodes = responseFormatType[responseFormatType.type].codes;
      codes = responseFormatCodes.reduce((acc, code) => {
        acc[code.id] = { ...code };
        return acc;
      }, {});
    } else if (type === MULTIPLE_CHOICE) {
    } else if (type === TABLE) {
    }
  }

  return codes;
}

export function updateNewComponentParent(activeComponents, parentId, newComponentId) {
  const parent = activeComponents[parentId];
  return {
    [parentId]: {
      ...parent,
      children: [...parent.children, newComponentId],
    },
  };
}

export function updateNewComponentSiblings(activesComponents, siblingsIds, newComponentWeight) {
  return siblingsIds.reduce((acc, key) => {
    const sibling = activesComponents[key];
    let siblingWeight = sibling.weight;
    if (newComponentWeight <= siblingWeight) {
      siblingWeight += 1;
    }
    return {
      ...acc,
      [key]: {
        ...sibling,
        weight: siblingWeight,
      },
    };
  }, {});
}
