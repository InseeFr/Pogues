import { name, required } from '../validate-rules';

export const sequenceRules = {
  name: [required, name],
  label: [required],
};
