export function addUnderscore(wholeModel) {
  function add(model, result) {
    let newKey;
    if (!model) return result;
    Object.keys(model).forEach(key => {
      newKey = `_${key}`;
      if (Array.isArray(model[key])) {
        result[newKey] = model[key].map(item => {
          if (typeof item === 'string') return item;
          return add(item, {});
        });
      } else if (typeof model[key] === 'object') {
        result[newKey] = add(model[key], {});
      } else {
        result[newKey] = model[key];
      }
    });
    return result;
  }
  return add(wholeModel, {});
}

export default undefined;
