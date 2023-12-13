import get from 'lodash.get';
import merge from 'lodash.merge';

export function validate(form, items, stores, state) {
  return Object.keys(items).reduce((acc, path) => {
    const value = get(form, path);

    if (value !== undefined) {
      const rules = items[path];
      let errors = [];

      for (let i = 0; i < rules.length; i += 1) {
        // The rule is executed with the value
        errors = rules[i](value, { form, stores, state }) || [];

        if (!Array.isArray(errors)) errors = [errors];

        // If error messages are obtained from the rule an error object is created
        if (errors.length > 0) acc = [...acc, { path, errors }];
      }
    }
    return acc;
  }, []);
}

/**
 * This method build a nested object using the keys passed in path and add a message to the deeper object key.
 *
 * @param {string} path     The string with the object keys joined by points (foo.bar.xyz).
 * @param {string} message  The message that will be added to the deeper key.
 *
 * @return {object} The builded object.
 */
function getNestedErrorFromPath(path, [message]) {
  const keys = path.split('.');

  function getErrorFromKeys(listKeys, errorMessage, errors) {
    const key = listKeys.shift();

    if (keys.length > 0) {
      errors = {
        [key]: getErrorFromKeys(keys, errorMessage),
      };
    } else {
      errors = {
        [key]: message,
      };
    }

    return errors;
  }

  return getErrorFromKeys(keys, message, {});
}

/**
 * This method builds an errors object from a list of validation errors.
 *
 * @param {array}  errors The validation errors.
 *
 * @return {object} The errors object.
 */
export function getErrorsObject(errors) {
  return errors.reduce((acc, error) => {
    return merge(acc, getNestedErrorFromPath(error.path, error.errors));
  }, {});
}
