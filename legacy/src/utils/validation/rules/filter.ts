import { required } from '../validate-rules';

/** A filter must have a beginning, an end and a condition filter. */
export const filterRules = {
  initialMember: [required],
  finalMember: [required],
  filter: [required],
};
