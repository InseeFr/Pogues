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
      if (c.precisionByCollectedVariableId) {
        codeState.precisionByCollectedVariableId =
          c.precisionByCollectedVariableId;
      }
      return {
        ...acc,
        [codeState.value]: codeState,
        ...remoteToCodesState(codes, codeState.value, depth + 1),
      };
    }, {});
  return res;
}

/** Add precision information to the provided codes lists. */
function computeCodesListsClarifications(
  remoteCodesLists,
  clarificationVariables,
) {
  remoteCodesLists.forEach((codesList) => {
    clarificationVariables.forEach((variable) => {
      if (variable.codelistid === codesList.id) {
        let index = 0;
        if (variable.type === MULTIPLE_CHOICE) {
          index = parseInt(variable.position, 10);
        } else {
          index = codesList.Code.findIndex(
            (code) => code.Value === variable.position,
          );
        }

        const variableId =
          variable.responseclar.Response[0].CollectedVariableReference;
        const precision = {
          precisionid: variable.responseclar.Name,
          precisionlabel:
            typeof variable.responseclar.Label === 'string'
              ? variable.responseclar.Label
              : variable.responseclar.Label[0],
          precisionsize: variable.responseclar.Response[0].Datatype.MaxLength,
        };

        let precisionByCollectedVariableId;
        if (
          codesList.Code[parseInt(index, 10)].precisionByCollectedVariableId
        ) {
          precisionByCollectedVariableId = {
            ...codesList.Code[parseInt(index, 10)]
              .precisionByCollectedVariableId,
            [variableId]: precision,
          };
        } else {
          precisionByCollectedVariableId = {
            [variableId]: precision,
          };
        }

        codesList.Code[parseInt(index, 10)] = {
          ...codesList.Code[parseInt(index, 10)],
          precisionByCollectedVariableId,
        };
      }
    });
  });
  return remoteCodesLists;
}

/**
 * Transform API codes list from a codes list.
 *
 * Our codes list get the precision information if a related calculated variable exists.
 */
export function remoteToStore(
  remoteCodesLists,
  clarificationVariables = [],
  variablesReference = [],
) {
  const remoteCodesListsWithClarification = computeCodesListsClarifications(
    remoteCodesLists,
    clarificationVariables,
  );
  const remoteCodeListWithVariables = [
    ...remoteCodesListsWithClarification,
    ...variablesReference,
  ];
  // TODO: rajouter les variables utilisées dans les qcu
  console.log('toto remote to store codes list', remoteCodeListWithVariables);
  const finalCodeListStore = remoteCodeListWithVariables.reduce(
    (acc, codesList) => {
      const {
        id,
        Label: label,
        Code: codes,
        Name: name,
        Urn: urn,
        SuggesterParameters: suggesterParameters,
        Scope: scope,
      } = codesList;

      let codesListObject;

      if (urn) {
        // Nomenclature
        codesListObject = { id, label, name, urn, suggesterParameters };
      } else if (codes) {
        // Codes list
        codesListObject = {
          id,
          label,
          name: name || '',
          codes: remoteToCodesState(codes),
        };
      } else {
        // Variable
        codesListObject = { id, label, name, scope };
      }

      acc[id] = codesListObject;
      return acc;
    },
    {},
  );
  return finalCodeListStore;
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

function buildRemoteCodesList(codesList) {
  const {
    id,
    label,
    name = '',
    codes = [],
    urn = '',
    suggesterParameters = {},
    scope = '',
  } = codesList;
  if (!urn && !scope) {
    return {
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
    };
  }

  if (scope) {
    // In variable case, we do not send it as a codeList
    return;
  }

  return {
    id,
    Urn: urn,
    Name: name,
    Label: label,
    SuggesterParameters: suggesterParameters,
  };
}

export function storeToRemote(store) {
  const codeLists = Object.values(store).map(buildRemoteCodesList);

  const filteredCodeLists = codeLists.filter(
    (codeList) => codeList !== undefined,
  );
  return filteredCodeLists;
}
