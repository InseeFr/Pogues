import { name, required } from '../validate-rules';

export const questionnaireRules = {
  name: [required, name],
  label: [required],
  TargetMode: [required],
  dynamiqueSpecified: [required],
  formulaSpecified: [required],
};
