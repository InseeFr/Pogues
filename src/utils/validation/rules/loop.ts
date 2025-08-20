/*
List of business rules to be applied to each questionnaire's components.
*/
import get from 'lodash.get';

import { nameLoop, required } from '../validate-rules';

export const loopRules = {
  nameLoop: [required, nameLoop],
  initialMember: [required],
  finalMember: [required],
  // we need a minimum only if the loop has a dynamic length
  minimum: [
    (
      value: string | number,
      { form }: { form: { basedOn?: string; isFixedLength?: boolean } },
    ) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && !isFixedLength ? required(value) : undefined;
    },
  ],
  // we need a maximum only if the loop has a dynamic length
  maximum: [
    (
      value: string | number,
      { form }: { form: { basedOn?: string; isFixedLength?: boolean } },
    ) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && !isFixedLength ? required(value) : undefined;
    },
  ],
  // we need a minimum only if the loop has a fixed length
  size: [
    (
      value: string | number,
      { form }: { form: { basedOn?: string; isFixedLength?: boolean } },
    ) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && isFixedLength ? required(value) : undefined;
    },
  ],
};
