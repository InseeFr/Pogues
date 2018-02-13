import { validate } from 'utils/utils';

export const validationSchema = {
  value: [
    { name: 'required', dictionary: 'validationCodeListCode' },
    { name: 'uniqueCodeAttr', dictionary: 'codeUnicity' }
  ],
  label: [{ name: 'required', dictionary: 'validationCodeListLabel' }]
};

export function validateCode(
  { editing, code, currentValue = '', currentLabel = '', codes = [] },
  path,
  schema
) {
  const values = {
    value: currentValue,
    label: currentLabel,
    codes,
    editing,
    previousValue: code ? code.value : ''
  };

  return validate(schema, values, path);
}
