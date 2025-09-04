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
  minimum: [isRequiredWithFixedLength(false)],
  // we need a maximum only if the loop has a dynamic length
  maximum: [isRequiredWithFixedLength(false)],
  // we need a minimum only if the loop has a fixed length
  size: [isRequiredWithFixedLength(true)],
};

/** Apply the required rule if loop is not based on, depending on fixedLength. */
function isRequiredWithFixedLength(needsFixedLength: boolean) {
  return (
    value: string | number,
    { form }: { form: { basedOn?: string; isFixedLength?: boolean } },
  ) => {
    const basedOn = get(form, 'basedOn');
    const isFixedLength = get(form, 'isFixedLength');

    if (!basedOn && isFixedLength === needsFixedLength) {
      return required(value);
    }

    return undefined;
  };
}
