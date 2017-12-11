function sortByWeight(store) {
  return (keyA, keyB) => {
    if (store[keyA].weight < store[keyB].weight) return -1;
    if (store[keyA].weight > store[keyB].weight) return 1;
    return 0;
  };
}

export function remoteToCodesState(codes, parent = '', depth = 1) {
  return codes.filter(c => c.Parent === parent).reduce((acc, c, index) => {
    const codeState = {
      value: c.Value,
      label: c.Label,
      parent: c.Parent,
      depth,
      weight: index + 1,
    };
    return {
      ...acc,
      [codeState.value]: codeState,
      ...remoteToCodesState(codes, codeState.value, depth + 1),
    };
  }, {});
}

export function remoteToStore(remote) {
  return remote.reduce((acc, codesList) => {
    const { id, Label: label, Code: codes } = codesList;
    return {
      ...acc,
      [id]: {
        id,
        label,
        codes: remoteToCodesState(codes),
      },
    };
  }, {});
}

export function remoteToState(remote) {
  return { id: remote };
}

export function storeToRemote(store) {
  const codesLists = [];

  Object.keys(store).forEach(key => {
    const { id, label, codes } = store[key];
    codesLists.push({
      id,
      Label: label,
      Code: Object.keys(codes)
        .sort(sortByWeight(codes))
        .map(keyCode => {
          const { label: labelCode, value, parent } = codes[keyCode];
          return {
            Label: labelCode,
            Value: value,
            Parent: parent,
          };
        }),
    });
  });

  return codesLists;
}
