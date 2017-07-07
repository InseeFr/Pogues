import Questionnaire from 'utils/model/transformation-entities/questionnaire';
import { COMPONENT_TYPE, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { QUESTION } = COMPONENT_TYPE;

export function codesListsIdsInComponents(components) {
  const codesListsIds = [];
  Object.keys(components).forEach(key => {
    const component = components[key];
    if (component.type === QUESTION) {
      if (component.responseFormat.type === SINGLE_CHOICE) {
        codesListsIds.push(component.responseFormat[SINGLE_CHOICE].codesList);
      }
    }
  });
  return codesListsIds;
}

export function getNestedComponentsFromPlainList(questionnaireId, listComponents) {
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
          codeListReference: component.responseFormat[responseFormatName].codesList,
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


export function getNestedCodesListFromPlainList(ids, lists, codes) {
  return ids.map(key => {
    const list = lists[key];
    return {
      ...list,
      codes: list.codes.map(keyCode => {
        return codes[keyCode];
      }),
    };
  });
}

export function questionnaireListStateToModel(questionnaire, components, codesLists, codes) {
  const codesListsInComponents = codesListsIdsInComponents(components, codesLists);
  const children = getNestedComponentsFromPlainList(components);
  const codeList = getNestedCodesListFromPlainList(codesListsInComponents, codesLists, codes);
  return Questionnaire.stateToModel(questionnaire, children, codeList);
}
