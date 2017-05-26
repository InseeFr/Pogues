import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

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

export function normalizeComponent({ id, name, label: [label], children, type }, parent) {
  return {
    id,
    name,
    label,
    parent,
    children: children ? children.map(c => c.id) : [],
    type: type === SEQUENCE_TYPE_NAME ? SEQUENCE : QUESTION,
  };
}

export function normalizeNestedComponents(components, root) {
  function normalize(objs, parent, carry) {
    objs.forEach(o => {
      carry[o.id] = normalizeComponent(o, parent);
      if (o.children) normalize(o.children, o.id, carry);
    });

    return carry;
  }
  return normalize(components, root, {});
}

export function normalizeQuestionnaire({ id, label: [label], children }) {
  return {
    questionnaire: {
      id,
      label,
    },
    componentById: normalizeNestedComponents(children, id),
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
