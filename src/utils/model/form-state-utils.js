import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { nameFromLabel } from 'utils/name-utils';
import { normalizeQuestion, normalizeSequence } from 'utils/model/model-to-state-utils';
import { responseFormatSimpleDefault, responseFormatSingleDefault } from 'utils/model/defaults';
import { uuid } from 'utils/data-utils';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { QUESTION } = COMPONENT_TYPE;

export function getFormFromComponent(component, codeLists) {
  const { label, name, type, responseFormat } = { ...component };
  const form = {
    label,
    name,
  };

  if (type === QUESTION) {
    const { [SINGLE_CHOICE]: singleChoice } = responseFormat;

    if (singleChoice) {
      const codesList = codeLists[singleChoice.codesList] || {};
      const codes = codesList.codes || [];

      singleChoice.codesList = {
        id: codesList.id || '',
        label: codesList.label || '',
      };
      singleChoice.codes = codes.map(key => {
        return {
          id: key,
          code: codes[key].code,
          label: codes[key].label,
        };
      });
    }

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
      responseFormat[SINGLE_CHOICE].codes = responseFormat[SINGLE_CHOICE].codes.map(code => {
        return code.id;
      });
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
