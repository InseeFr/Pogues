export default function removeUnderscore(model, result) {
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
