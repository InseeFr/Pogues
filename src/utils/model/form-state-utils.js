import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { nameFromLabel } from 'utils/name-utils';
import { normalizeQuestion, normalizeSequence } from 'utils/model/model-to-state-utils';
import { responseFormatSimpleDefault, responseFormatSingleDefault } from 'utils/model/defaults';
import { uuid } from 'utils/data-utils';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { QUESTION } = COMPONENT_TYPE;

export function getFormFromComponent(component, activeCodeLists, activeCodes) {
  const { label, name, type } = component;
  const form = {
    label,
    name,
  };

  if (type === QUESTION) {
    const responseFormatName = component.responseFormat.type;
    let formDataType = {};

    if (responseFormatName === SINGLE_CHOICE) {
      const componentSingleChoice = component.responseFormat[SINGLE_CHOICE];
      const codesList = activeCodeLists[componentSingleChoice.codesList] || {};
      const codes = codesList.codes || [];

      formDataType = {
        ...componentSingleChoice,
        codesList: {
          id: codesList.id || '',
          label: codesList.label || '',
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

    const responseFormat = {
      type: responseFormatName,
      [responseFormatName]: formDataType,
    };

    form.responseFormat = {
      ...responseFormatSimpleDefault,
      ...responseFormatSingleDefault,
      ...responseFormat,
    };
  }

  return form;
}

export function getComponentFromForm(form) {
  const { responseFormat, ...component } = form;
  component.name = component.name || nameFromLabel(component.label);

  if (responseFormat) {
    const { type } = responseFormat;

    if (type === SINGLE_CHOICE) {
      responseFormat[SINGLE_CHOICE].codesList = responseFormat[SINGLE_CHOICE].codesList.id;
      if (responseFormat[SINGLE_CHOICE].codes.length > 0) {
        responseFormat[SINGLE_CHOICE].codes = responseFormat[SINGLE_CHOICE].codes.map(code => {
          return code.id;
        });
      }
    }

    component.responseFormat = {
      type,
      [type]: responseFormat[type],
    };
  }

  return component;
}

export function normalizeComponentFromForm(form, id, parent, weight, type) {
  let component = getComponentFromForm(form);
  if (type === QUESTION) {
    component = normalizeQuestion({ ...component, id, parent, weight, type });
  } else {
    component = normalizeSequence({ ...component, id, parent, weight, type });
  }

  return {
    [id]: component,
  };
}

export function addIdsNewFormItems(selectedFormat) {
  const normalizedData = {};

  if (selectedFormat.codesList) {
    const codesList = selectedFormat.codesList;

    if (codesList.label !== '' && !codesList.id) {
      codesList.id = uuid();
    }

    normalizedData.codesList = {
      id: codesList.id,
      label: codesList.label,
      name: nameFromLabel(codesList.label),
    };
  }

  if (selectedFormat.codes) {
    normalizedData.codes = selectedFormat.codes.map(code => {
      return {
        ...code,
        id: code.id || uuid(),
      };
    });
  }

  return {
    ...selectedFormat,
    ...normalizedData,
  };
}
