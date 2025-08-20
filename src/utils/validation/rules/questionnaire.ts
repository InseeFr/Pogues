import { name, required } from '../validate-rules';

//Disabled validation rules for series to implement specific validation rules for series
export const questionnaireRules = {
  serie: [],
  operation: [],
  campaigns: [],
  name: [required, name],
  label: [required],
  TargetMode: [required],
  dynamiqueSpecified: [required],
  formulaSpecified: [required],
};
