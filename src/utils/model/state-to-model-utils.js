import questionnaireModelTmpl from './questionnaire-model-tmpl';
import componentModelTmpl from './component-model-tmpl';
import { uuid } from 'utils/data-utils';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import {
  COMPONENT_TYPE,
  SEQUENCE_GENERIC_NAME,
  QUESTION_TYPE_NAME,
  SEQUENCE_TYPE_NAME,
  DATATYPE_TYPE_FROM_NAME,
} from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;
const { MODULE, SUBMODULE } = SEQUENCE_GENERIC_NAME;

const typeNamesByComponentType = {};
typeNamesByComponentType[SEQUENCE] = SEQUENCE_TYPE_NAME;
typeNamesByComponentType[SUBSEQUENCE] = SEQUENCE_TYPE_NAME;
typeNamesByComponentType[QUESTION] = QUESTION_TYPE_NAME;

const genericNamesByComponentType = {};
genericNamesByComponentType[SEQUENCE] = MODULE;
genericNamesByComponentType[SUBSEQUENCE] = SUBMODULE;
genericNamesByComponentType[QUESTION] = '';

export function serializeNewQuestionnaire(name, label) {
  return {
    ...questionnaireModelTmpl,
    id: uuid(),
    name: name,
    label: [label],
    survery: {
      ...questionnaireModelTmpl.survey,
      id: uuid(),
    },
    componentGroups: {
      ...questionnaireModelTmpl.componentGroups,
      id: uuid(),
    },
  };
}

export function serializeDataType(type, data, mandatory, codesList = {}) {
  return {
    mandatory,
    codeListReference: codesList.id || '',
    datatype: {
      typeName: type,
      type: DATATYPE_TYPE_FROM_NAME[type],
      ...data,
    },
  };
}

export function serializePlainToNestedComponents(questionnaireId, listComponents) {
  function serializePlainToNested(component, depth = 0) {
    const componentType = component.type;
    const newDepth = depth + 1;
    let nestedComponent = {
      ...componentModelTmpl,
      id: component.id,
      name: component.name,
      label: [component.label],
      depth: newDepth,
      type: typeNamesByComponentType[componentType],
      genericName: genericNamesByComponentType[componentType],
    };

    if (componentType === QUESTION) {
      const responseFormatName = component.responseFormat.type;
      const formatResponse = component.responseFormat[responseFormatName];
      const dataTypeName = formatResponse.type;
      const dataType = formatResponse[dataTypeName];
      const responses = [];

      if (responseFormatName === SIMPLE) {
        responses.push(serializeDataType(dataTypeName, dataType, formatResponse.mandatory));
      } else if (responseFormatName === SINGLE_CHOICE) {
        responses.push(serializeDataType(dataTypeName, dataType, formatResponse.mandatory, formatResponse.codesList));
      }

      nestedComponent = { ...nestedComponent, responses, questionType: responseFormatName };
    } else {
      nestedComponent.children = component.children.map(key => {
        return serializePlainToNested(listComponents[key], newDepth);
      });
    }

    return nestedComponent;
  }

  return listComponents[questionnaireId].children.map(key => serializePlainToNested(listComponents[key]));
}

function serializePlainToNestedCodesLists(lists, codes) {
  return Object.keys(lists).map(key => {
    const list = lists[key];
    return {
      ...list,
      codes: list.codes.map(keyCode => {
        return codes[keyCode];
      }),
    };
  });
}

export function serializeUpdateQuestionnaire(questionnaire, components, codesLists, codes) {
  return {
    ...questionnaireModelTmpl,
    id: questionnaire.id,
    name: questionnaire.name,
    label: [questionnaire.label],
    children: serializePlainToNestedComponents(questionnaire.id, components),
    codeLists: {
      codeList: serializePlainToNestedCodesLists(codesLists, codes),
      codeListSpecification: [],
    },
  };
}
