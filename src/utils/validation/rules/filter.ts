import { required } from '../validate-rules';

export const filterRules = {
  initialMember: [required],
  finalMember: [required],
  filter: [required],
};
