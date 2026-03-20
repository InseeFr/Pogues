import { name, nameLoop, required } from '../validate-rules';

export const roundaboutRules = {
  name: [required, name],
  label: [required],
  nameLoop: [required, nameLoop],
  basedOn: [required],
  initialMember: [required],
  finalMember: [required],
  occurrenceLabel: [required],
};
