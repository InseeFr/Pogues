import Dictionary from '../../../utils/dictionary/dictionary';
import * as rules from '../../../utils/validation/rules';

export const validationSchema = {};

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
