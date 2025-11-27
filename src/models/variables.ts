import { DATATYPE_NAME } from '@/constants/pogues-constants';

/** External variable model used in the state. */
export type ExternalVariable = {
  id: string;
  name: string;
  label: string;
  type: string;
  scope: string;
  isDeletedOnReset?: boolean;
} & (
  | {
      type: DATATYPE_NAME.BOOLEAN;
      [DATATYPE_NAME.BOOLEAN]: object;
    }
  | {
      type: DATATYPE_NAME.DATE;
      [DATATYPE_NAME.DATE]: {
        minimum?: unknown;
        maximum?: unknown;
        format?: unknown;
      };
    }
  | {
      type: DATATYPE_NAME.DURATION;
      [DATATYPE_NAME.DURATION]: {
        minimum?: unknown;
        maximum?: unknown;
        format?: unknown;
      };
    }
  | {
      type: DATATYPE_NAME.NUMERIC;
      [DATATYPE_NAME.NUMERIC]: {
        minimum?: string;
        maximum?: string;
        decimals?: string;
        isDynamicUnit?: boolean;
        unit?: string;
      };
    }
  | {
      type: DATATYPE_NAME.TEXT;
      [DATATYPE_NAME.TEXT]: {
        maxLength?: number;
      };
    }
);
