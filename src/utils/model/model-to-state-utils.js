// @TODO: Documentation
import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

export function getQuestionnaireIdFromUri(uri) {
  return uri.substr(uri.lastIndexOf('/') + 1);
}

export function removeUnderscore(wholeModel) {
  function remove(model, result) {
    let newKey;
    if (!model) return result;
    Object.keys(model).forEach(key => {
      newKey = key.replace(/(_)(.+)/, '$2');
      if (Array.isArray(model[key])) {
        result[newKey] = model[key].map(item => {
          if (typeof item === 'string') return item;
          return remove(item, {});
        });
      } else if (typeof model[key] === 'object') {
        result[newKey] = remove(model[key], {});
      } else {
        result[newKey] = model[key];
      }
    });
    return result;
  }
  return remove(wholeModel, {});
}

export function containsComment(str) {
  const regExpCmt = /##([^\n]*)/;
  return str.match(regExpCmt);
}

export function getQuestionLabelFromRaw(rawLabel) {
  const hasComment = containsComment(rawLabel);
  if (!hasComment) return rawLabel;
  const { label } = JSON.parse(hasComment[1]);
  return label;
}

export function getConditionsFromRaw(rawLabel) {
  const hasComment = containsComment(rawLabel);
  if (!hasComment) return [];
  const { conditions } = JSON.parse(hasComment[1]);
  return conditions;
}

export function getCondiditionsIdsFromRaw(rawLabel) {
  return getConditionsFromRaw(rawLabel).map(c => c.id);
}

export function getConditionsFromComponents(components) {
  return Object.keys(components)
    .filter(key => {
      return components[key].type === QUESTION && components[key].conditions.length > 0;
    })
    .reduce((acc, key) => {
      const conditionsById = {};
      getConditionsFromRaw(components[key].rawLabel).forEach(c => (conditionsById[c.id] = c));
      return { ...acc, ...conditionsById };
    }, {});
}

export function normalizeComponent({ id, name, label: [label], children, type }, parent) {
  const component = {
    id,
    name,
    parent,
  };

  if (type === SEQUENCE_TYPE_NAME) {
    component.type = SEQUENCE;
    component.label = label;
    component.children = children.map(c => c.id);
  } else {
    component.type = QUESTION;
    component.rawLabel = label;
    component.label = getQuestionLabelFromRaw(label);
    component.conditions = getCondiditionsIdsFromRaw(label);
  }

  return component;
}

export function normalizeNestedComponents(components, questionnaireId) {
  function normalize(objs, parent, carry) {
    objs.forEach(o => {
      carry[o.id] = normalizeComponent(o, parent);
      if (o.children) normalize(o.children, o.id, carry);
    });

    return carry;
  }
  return normalize(components, questionnaireId, {});
}

export function normalizeQuestionnaire(questionnaire) {
  const { id, label: [label], children } = questionnaire;
  const componentById = normalizeNestedComponents(children, id);
  componentById[id] = normalizeComponent(questionnaire);
  const conditionById = getConditionsFromComponents(componentById);
  return {
    questionnaire: {
      id,
      label,
    },
    componentById,
    conditionById,
  };
}

export function getNumNestedChildren(children) {
  return children.reduce((carry, value) => {
    let result = 1;
    if (value.children) {
      result = getNumNestedChildren(value.children) + result;
    }
    return result + carry;
  }, 0);
}

export default undefined;
