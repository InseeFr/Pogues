export function getInvalidItemsByType(invalidItems) {
  return Object.keys(invalidItems).reduce((acc, key) => {
    const item = invalidItems[key];
    let type = acc[item.type] || {};

    type = {
      ...type,
      [item.id]: item,
    };

    return {
      ...acc,
      [item.type]: type,
    };
  }, {});
}

export function checkVariableNumberStart(variables) {
  let numberStart = false;
  variables.forEach(variable => {
    if (!isNaN(Number(variable.name.charAt(0)))) {
      numberStart = true;
    }
  });
  return numberStart;
}
