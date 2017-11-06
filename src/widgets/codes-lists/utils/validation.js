import { validate } from 'utils/utils';

export const validationSchema = {
  value: [
    { name: 'required', dictionary: 'validationCodeListCode' },
    { name: 'uniqueCodeAttr', dictionary: 'codeUnicity' },
  ],
  label: [{ name: 'required', dictionary: 'validationCodeListLabel' }],
};

export function validateCode({ code, currentValue = '', currentLabel = '', allCodes = [] }, path, schema) {
  const values = {
    value: currentValue,
    label: currentLabel,
    previousValue: code ? code.value : '',
    codes: allCodes,
  };

  return validate(schema, values, path);
}
