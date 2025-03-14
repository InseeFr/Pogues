import {
  DATATYPE_NAME,
  DATATYPE_TYPE_FROM_NAME,
  VARIABLES_TYPES,
} from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';

const { EXTERNAL } = VARIABLES_TYPES;

export function remoteToStore(remote = []) {
  return remote.reduce((acc, ev) => {
    ev.Datatype = ev.Datatype || {};
    const {
      Name: name,
      Label: label,
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
    } = ev;
    const id = ev.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
        type: typeName,
        scope: scope || '',
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
      name: Name,
      label: Label,
      type: typeName,
      scope: Scope,
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
      Name,
      Label,
      type: EXTERNAL,
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
    if (Format !== undefined) {
      if (typeName === DATATYPE_NAME.DATE) {
        model.Datatype.Format = Format.toUpperCase();
      } else {
        model.Datatype.Format = Format;
      }
    }
    if (Scope) model.Scope = Scope;
    return model;
  });
}
