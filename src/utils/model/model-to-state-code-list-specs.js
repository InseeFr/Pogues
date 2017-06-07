import { nameFromLabel } from 'utils/name-utils';

// TODO Create a local id for each spec ?
export default function codeListSpecsToState(rawCListSpecs) {
  return rawCListSpecs.results.bindings.reduce((specs, entry) => {
    const id = entry.niveau.value;
    specs[id] = {
      id,
      retrievalQuery: entry.retrievalQuery.value,
      label: entry.label.value,
      name: nameFromLabel(entry.label.value),
    };
    return specs;
  }, {});
}
