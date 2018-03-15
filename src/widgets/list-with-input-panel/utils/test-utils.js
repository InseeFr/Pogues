export function getFakeFields(items, inputName) {
  return {
    name: 'FAKE_NAME.FAKE_NAME',
    length: items.length,
    items: items,
    fields: items.map((it, index) => {
      return {
        index,
        name: `${inputName}[${index}]`,
        listFields: {
          get: indexInner => items[indexInner]
        }
      };
    }),
    map(func) {
      return items.map((it, index) => {
        const field = this.fields[index];
        return func.call(this, field.name, field.index, field.listFields);
      });
    }
  };
}
