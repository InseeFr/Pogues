import { uuid } from 'utils/utils';
import {
  VARIABLES_TYPES,
  DATATYPE_TYPE_FROM_NAME,
} from 'constants/pogues-constants';

const { COLLECTED } = VARIABLES_TYPES;

export function remoteToStore(
  remote = [],
  responsesByVariable,
  codesListsStore,
) {
  return remote.reduce((acc, ev) => {
    ev.Datatype = ev.Datatype || {};
    const {
      Name: name,
      Label: label,
      CodeListReference,
      Datatype: {
        typeName,
        MaxLength: maxLength,
        Pattern: pattern,
        Minimum: minimum,
        Maximum: maximum,
        Decimals: decimals,
        Unit: unit,
      },
    } = ev;
    const id = ev.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
        type: typeName,
        codeListReference: CodeListReference,
        codeListReferenceLabel: CodeListReference
          ? codesListsStore[CodeListReference].label
          : '',
        [typeName]: {
          maxLength,
          pattern,
          minimum,
          maximum,
          decimals,
          unit,
        },
        ...responsesByVariable[id],
      },
    };
  }, {});
}

export function remoteToComponentState(remote = []) {
  return remote
    .filter(r => r.CollectedVariableReference)
    .map(r => r.CollectedVariableReference);
}

export function storeToRemote(store) {
  return Object.keys(store).map(key => {
    const {
      id,
      name: Name,
      label: Label,
      type: typeName,
      codeListReference,
      [typeName]: {
        maxLength: MaxLength,
        pattern: Pattern,
        minimum: Minimum,
        maximum: Maximum,
        decimals: Decimals,
        unit: Unit,
      },
    } = store[key];
    const model = {
      id,
      Name,
      Label,
      type: COLLECTED,
      CodeListReference: codeListReference,
      Datatype: {
        typeName,
        type: DATATYPE_TYPE_FROM_NAME[typeName],
      },
    };
    if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
    if (Pattern !== undefined) model.Datatype.Pattern = Pattern;
    if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
    if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
    if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
    if (Unit !== undefined) model.Datatype.Unit = Unit;
    return model;
  });
}
