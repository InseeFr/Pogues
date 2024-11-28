import * as rules from '../../../forms/validation-rules';
import Dictionary from '../../../utils/dictionary/dictionary';

export const validationSchema = {
  value: [
    { name: 'required', dictionary: 'validationCodeListCode' },
    { name: 'uniqueCodeAttr', dictionary: 'codeUnicity' },
  ],
  label: [{ name: 'required', dictionary: 'validationCodeListLabel' }],
};

function validate(scheme, values, path) {
  return Object.keys(scheme).reduce((acc, name) => {
    const errors = [];

    scheme[name].forEach((rule) => {
      let errorMessage = rules[rule.name](values[name], values);
      if (errorMessage) {
        errorMessage = rule.dictionary
          ? Dictionary[rule.dictionary]
          : errorMessage;
        errors.push([errorMessage, `${path}${name}`]);
      }
    });

    return [...acc, ...errors];
  }, []);
}

export function validateCode(
  {
    editing,
    code,
    currentValue = '',
    currentLabel = '',
    currentPrecisionid = '',
    currentPrecisionlabel = '',
    currentPrecisionsize = '',
    codes = [],
  },
  path,
  schema,
) {
  const values = {
    value: currentValue,
    label: currentLabel,
    precisionid: currentPrecisionid,
    precisionlabel: currentPrecisionlabel,
    precisionsize: currentPrecisionsize,
    codes,
    editing,
    previousValue: code ? code.value : '',
  };

  return validate(schema, values, path);
}
