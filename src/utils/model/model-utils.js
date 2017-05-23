export function removeUnderscore(model, result) {
  let newKey;

  if (!model) return result;

  Object.keys(model).forEach(key => {
    newKey = key.replace(/(_)(.+)/, '$2');

    if (Array.isArray(model[key])) {
      result[newKey] = model[key].map(item => {
        if (typeof item === 'string') return item;
        return removeUnderscore(item, {});
      });
    } else if (typeof model[key] === 'object') {
      result[newKey] = removeUnderscore(model[key], {});
    } else {
      result[newKey] = model[key];
    }
  });

  return result;
}

export function normalizeElements(elements, childIds, parent) {
  parent = parent || '';
  if (!childIds) return {};
  return childIds.reduce((acc, childId) => {
    acc = { ...normalizeElements(elements, elements[childId].childCmpnts, childId), ...acc };
    acc[childId] = {
      id: elements[childId].id,
      name: elements[childId].name,
      label: elements[childId].label,
      type: elements[childId].type,
      parent: parent,
      children: elements[childId].childCmpnts || [],
    };

    return acc;
  }, {});
}

export default undefined;
