/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExternalVariableType } from '@/api/models/pogues';
import {
  DATATYPE_NAME,
  DATATYPE_TYPE_FROM_NAME,
  VARIABLES_TYPES,
} from '@/constants/pogues-constants';
import { ExternalVariable } from '@/models/variables';
import { uuid } from '@/utils/utils';

/** External variable fetched from the API. */
type ExternalVariableDTO = ExternalVariableType;

/** Compute an external variable from Pogues API to the app model. */
export function remoteToStore(remote: ExternalVariableDTO[] = []): {
  [key: string]: ExternalVariable;
} {
  const res: { [key: string]: ExternalVariable } = {};

  for (const remoteVariable of remote) {
    remoteVariable.Datatype = remoteVariable.Datatype || {};
    const {
      Name: name,
      Label: label,
      Scope: scope,
      isDeletedOnReset,
      Datatype: {
        typeName,
        /** @ts-expect-error property exist for specified datatype */
        MaxLength: maxLength,
        /** @ts-expect-error property exist for specified datatype */
        Minimum: minimum,
        /** @ts-expect-error property exist for specified datatype */
        Maximum: maximum,
        /** @ts-expect-error property exist for specified datatype */
        Decimals: decimals,
        /** @ts-expect-error property exist for specified datatype */
        Unit: unit,
        /** @ts-expect-error property exist for specified datatype */
        IsDynamicUnit: isDynamicUnit,
        /** @ts-expect-error property exist for specified datatype */
        Format: format,
      },
    } = remoteVariable;
    const id = remoteVariable.id || uuid();

    const variable: ExternalVariable = {
      id,
      name,
      label,
      /** @ts-expect-error it is the same enum values */
      type: typeName,
      scope: scope || '',
      isDeletedOnReset,
      [typeName]: {
        maxLength,
        minimum,
        maximum,
        decimals,
        unit,
        isDynamicUnit,
        format,
      },
    };
    res[id] = variable;
  }

  return res;
}

/** Compute an external variable from the app model into the Pogues API. */
export function storeToRemote(store: {
  [key: string]: ExternalVariable;
}): ExternalVariableDTO[] {
  return Object.keys(store).map((key) => {
    const {
      id,
      name: Name,
      label: Label,
      type: typeName,
      scope: Scope,
      isDeletedOnReset,
      /** @ts-expect-error it necessarily exists */
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

    const model: ExternalVariableDTO = {
      id,
      Name,
      Label,
      /** @ts-expect-error it is the same enum values */
      type: VARIABLES_TYPES.EXTERNAL,
      isDeletedOnReset,
      Datatype: {
        /** @ts-expect-error it is the same enum values */
        typeName,
        /** @ts-expect-error it is the same enum values */
        type: DATATYPE_TYPE_FROM_NAME[typeName],
      },
    };
    /** @ts-expect-error property exist because we assume back-end value is valid */
    if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
    /** @ts-expect-error property exist because we assume back-end value is valid */
    if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
    /** @ts-expect-error property exist because we assume back-end value is valid */
    if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
    /** @ts-expect-error property exist because we assume back-end value is valid */
    if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
    /** @ts-expect-error property exist because we assume back-end value is valid */
    if (Unit !== undefined) model.Datatype.Unit = Unit;
    if (IsDynamicUnit !== undefined)
      /** @ts-expect-error property exist because we assume back-end value is valid */
      model.Datatype.IsDynamicUnit = IsDynamicUnit;
    if (Format !== undefined) {
      if (typeName === DATATYPE_NAME.DATE) {
        /** @ts-expect-error property exist because we assume back-end value is valid */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        model.Datatype.Format = Format?.toUpperCase();
      } else {
        /** @ts-expect-error property exist because we assume back-end value is valid */
        model.Datatype.Format = Format;
      }
    }
    if (Scope) model.Scope = Scope;
    return model;
  });
}
