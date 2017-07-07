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
      const responses = [];

      if (responseFormatName === SIMPLE) {
        const dataTypeName = component.responseFormat[responseFormatName].type;
        responses.push({
          mandatory: component.responseFormat[responseFormatName].mandatory,
          datatype: {
            typeName: dataTypeName,
            type: DATATYPE_TYPE_FROM_NAME[dataTypeName],
            ...component.responseFormat[responseFormatName][dataTypeName],
          },
        });
      } else if (responseFormatName === SINGLE_CHOICE) {
        responses.push({
          codeListReference: component.responseFormat[responseFormatName].codesListId,
          mandatory: component.responseFormat[responseFormatName].mandatory,
          datatype: {
            visHint: component.responseFormat[responseFormatName].visHint,
          },
        });
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

function serializePlainToNestedCodesLists(ids, lists, codes) {
  return ids.reduce((acc, key) => {
    const list = lists[key];
    if (list) {
      acc.push({
        ...list,
        codes: list.codes.map(keyCode => {
          return codes[keyCode];
        }),
      });
    }
    return acc;
  }, []);
}

export function codesListsIdsInComponents(components) {
  const codesListsIds = [];
  Object.keys(components).forEach(key => {
    const component = components[key];
    if (component.type === QUESTION) {
      if (component.responseFormat.type === SINGLE_CHOICE) {
        codesListsIds.push(component.responseFormat[SINGLE_CHOICE].codesListId);
      }
    }
  });
  return codesListsIds;
}

export function serializeUpdateQuestionnaire(questionnaire, components, codesLists, codes) {
  const codesListsInComponents = codesListsIdsInComponents(components, codesLists);
  // const test = serializePlainToNestedCodesLists(codesListsInComponents, codesLists, codes);
  return {
    ...questionnaireModelTmpl,
    id: questionnaire.id,
    name: questionnaire.name,
    label: [questionnaire.label],
    children: serializePlainToNestedComponents(questionnaire.id, components),
    codeLists: {
      codeList: serializePlainToNestedCodesLists(codesListsInComponents, codesLists, codes),
      codeListSpecification: [],
    },
  };
}
