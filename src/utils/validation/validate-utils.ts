import get from 'lodash.get';
import merge from 'lodash.merge';

type Form = {
  [k: string]: unknown;
};

export function validate(
  form: Form,
  items: {
    [k: string]: ((
      value?: unknown,
      { form, stores, state }?: { form: Form; stores: unknown; state: unknown },
    ) => string | string[])[];
  },
  stores?: unknown,
  state?: unknown,
): { path: string; errors: string[] }[] {
  const res = [];
  for (const [path, rules] of Object.entries(items)) {
    const value = get(form, path);

    if (value !== undefined) {
      for (const rule of rules) {
        // The rule is executed with the value
        const ruleResult = rule(value, { form, stores, state });
        if (!ruleResult) continue;

        const errors = Array.isArray(ruleResult) ? ruleResult : [ruleResult];

        res.push({ path, errors });
      }
    }
  }
  return res;
}

/**
 * This method build a nested object using the keys passed in path and add a message to the deeper object key.
 *
 * @param {string} path     The string with the object keys joined by points (foo.bar.xyz).
 * @param {string} message  The message that will be added to the deeper key.
 *
 * @return {object} The builded object.
 */
function getNestedErrorFromPath(path: string, [message]: string[]): unknown {
  const keys = path.split('.');

  function getErrorFromKeys(listKeys: string[], errorMessage: string): unknown {
    const key = listKeys.shift();

    if (key) {
      if (keys.length > 0) {
        return {
          [key]: getErrorFromKeys(keys, errorMessage),
        };
      } else {
        return {
          [key]: message,
        };
      }
    }

    return {};
  }

  return getErrorFromKeys(keys, message);
}

/**
 * This method builds an errors object from a list of validation errors.
 *
 * @param {array}  errors The validation errors.
 *
 * @return {object} The errors object.
 */
export function getErrorsObject(errors: { path: string; errors: string[] }[]): {
  [k: string]:
    | string
    | {
        [k: string]: string;
      };
} {
  const res = {};
  for (const error of errors) {
    const nestedError = getNestedErrorFromPath(error.path, error.errors);
    merge(res, nestedError);
  }
  return res;
}
