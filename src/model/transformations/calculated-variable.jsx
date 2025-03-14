import {
  DATATYPE_TYPE_FROM_NAME,
  VARIABLES_TYPES,
} from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';

const { CALCULATED } = VARIABLES_TYPES;

export function remoteToStore(remote = []) {
  return remote.reduce((acc, cv) => {
    cv.Datatype = cv.Datatype || {};
    const {
      Label: label,
      Name: name,
      Formula: formula,
      Scope: scope,
      Datatype: {
        typeName,
        MaxLength: maxLength,
        Minimum: minimum,
        Maximum: maximum,
        Decimals: decimals,
        Unit: unit,
        IsDynamicUnit: isDynamicUnit,
        Format: format,
      },
    } = cv;
    const id = cv.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        formula,
        scope: scope || '',
        type: typeName,
        [typeName]: {
          maxLength,
          minimum,
          maximum,
          decimals,
          unit,
          isDynamicUnit,
          format,
        },
      },
    };
  }, {});
}

export function storeToRemote(store) {
  return Object.keys(store).map((key) => {
    const {
      id,
      label: Label,
      name: Name,
      formula: Formula,
      scope: Scope,
      type: typeName,

      [typeName]: {
        maxLength: MaxLength,
        minimum: Minimum,
        maximum: Maximum,
        decimals: Decimals,
        isDynamicUnit: IsDynamicUnit,
        unit: Unit,
        format: Format,
      },
    } = store[key];

    const model = {
      id,
      Label,
      Name,
      Formula,
      type: CALCULATED,
      Datatype: {
        typeName,
        type: DATATYPE_TYPE_FROM_NAME[typeName],
      },
    };
    if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
    if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
    if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
    if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
    if (Unit !== undefined) model.Datatype.Unit = Unit;
    if (IsDynamicUnit !== undefined)
      model.Datatype.IsDynamicUnit = IsDynamicUnit;
    if (Format !== undefined) model.Datatype.Format = Format;
    if (Scope) model.Scope = Scope;
    return model;
  });
}
