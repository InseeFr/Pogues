import { QUESTION_TYPE_ENUM } from '../../constants/pogues-constants';

const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

/**
 * @param {*} codes The list of codes
 */
function sortByWeight(codes) {
  return (code1, code2) => {
    const weight1 = codes[code1].weight;
    const weight2 = codes[code2].weight;
    if (weight1 < weight2) return -1;
    if (weight1 > weight2) return 1;
    return 0;
  };
}

export function remoteToCodesState(codes, parent = '', depth = 1) {
  const res = codes
    .filter(
      (c) => c.Parent === parent || (parent === '' && c.Parent === undefined),
    )
    .reduce((acc, c, index) => {
      const codeState = {
        value: c.Value,
        label: c.Label,
        parent: c.Parent || '',
        depth,
        weight: index + 1,
      };
      if (c.Precisionid) {
        codeState.precisionid = c.Precisionid;
        codeState.precisionlabel = c.Precisionlabel;
        codeState.precisionsize = c.Precisionsize;
      }
      return {
        ...acc,
        [codeState.value]: codeState,
        ...remoteToCodesState(codes, codeState.value, depth + 1),
      };
    }, {});
  console.debug('[remoteToCodesState]', codes, res);
  return res;
}

export function getcodelistwithclarification(remote, variableclarification) {
  remote.forEach((codelist) => {
    variableclarification.forEach((clarif) => {
      if (clarif.codelistid === codelist.id) {
        let index = 0;
        if (clarif.type === MULTIPLE_CHOICE) {
          index = parseInt(clarif.position, 10);
        } else {
          index = codelist.Code.findIndex(
            (code) => code.Value === clarif.position,
          );
        }
        codelist.Code[parseInt(index, 10)] = {
          ...codelist.Code[parseInt(index, 10)],
          Precisionid: clarif.responseclar.Name,
          Precisionlabel: clarif.responseclar.Label,
          Precisionsize: clarif.responseclar.Response[0].Datatype.MaxLength,
        };
      }
    });
  });
  return remote;
}

/**
 * Transform API codes list from a codes list.
 *
 * Our codes list get the precision information if a related calculated variable exists.
 */
export function remoteToStore(remote, variableclarification) {
  const remoteCodesList = getcodelistwithclarification(
    remote,
    variableclarification,
  );
  console.debug(
    '[remoteToStore]',
    remote,
    variableclarification,
    remoteCodesList,
  );
  const res = {};
  for (const codesList of remoteCodesList) {
    const {
      id,
      Label: label,
      Code: codes,
      Name: name,
      Urn: urn,
      SuggesterParameters: suggesterParameters,
    } = codesList;
    res[id] = urn
      ? {
          id,
          label,
          name,
          urn,
          suggesterParameters,
        }
      : {
          id,
          label,
          codes: remoteToCodesState(codes),
          name: name || '',
        };
  }
  return res;
}

export function remoteToState(remote) {
  return { id: remote };
}

/**
 * @param {*} codes The list of codes
 * @param {*} depth The depth of a code
 * @param {*} parent The parent code of another one
 */
function getCodesListSortedByDepthAndWeight(codes, depth = 1, parent = '') {
  return Object.keys(codes)
    .filter((code) => codes[code].depth === depth)
    .filter((code) => codes[code].parent === parent)
    .sort(sortByWeight(codes))
    .reduce(
      (acc, code) => [
        ...acc,
        code,
        ...getCodesListSortedByDepthAndWeight(codes, depth + 1, code),
      ],
      [],
    );
}

export function storeToRemote(store) {
  return Object.keys(store).reduce((acc, key) => {
    const {
      id,
      label,
      name = '',
      codes = [],
      urn = '',
      suggesterParameters = {},
    } = store[key];
    const code =
      urn === ''
        ? {
            id,
            Label: label,
            Code: getCodesListSortedByDepthAndWeight(codes).map((keyCode) => {
              const { label: labelCode, value, parent } = codes[keyCode];
              return {
                Label: labelCode,
                Value: value,
                Parent: parent || '',
              };
            }),
          }
        : {
            id,
            Urn: urn,
            Name: name,
            Label: label,
            SuggesterParameters: suggesterParameters,
          };
    return [...acc, code];
  }, []);
}
