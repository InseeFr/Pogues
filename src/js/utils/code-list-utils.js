export function nbCodesFromId(codeListById, id) {
  return id  ? nbCodes(codeListById[id]) : 0
}

function nbCodes({ isSpec, isLoaded, codes }) {
  return isSpec && !isLoaded ? 10 : codes.length
}