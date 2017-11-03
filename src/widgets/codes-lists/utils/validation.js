import { validate } from 'utils/utils';

export const validationSchema = {
  value: [
    { name: 'required', dictionary: 'validationCodeListCode' },
    { name: 'uniqueCodeAttr', dictionary: 'codeUnicity' },
  ],
  label: [{ name: 'required', dictionary: 'validationCodeListLabel' }],
};

export function validateCode({ currentValue = '', currentLabel = '', fields }, path, schema) {
  const values = {
    value: currentValue,
    label: currentLabel,
    codes: fields.getAll() || [],
  };

  return validate(schema, values, path);
}
