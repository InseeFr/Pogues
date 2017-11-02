import { validate } from 'utils/utils';

export const validationSchema = {
  code: [
    { name: 'required', dictionary: 'validationCodeListCode' },
    { name: 'uniqueCodeAttr', dictionary: 'codeUnicity' },
  ],
  label: [{ name: 'required', dictionary: 'validationCodeListLabel' }],
};

export function validateCode({ currentCode = '', currentLabel = '', fields }, path, schema) {
  const values = {
    code: currentCode,
    label: currentLabel,
    codes: fields.getAll() || [],
  };

  return validate(schema, values, path);
}
