import PropTypes from 'prop-types';

export const fieldArrayFields = {
  name: PropTypes.string.isRequired,
  forEach: PropTypes.func.isRequired,
  get: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
  insert: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  shift: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired,
  unshift: PropTypes.func.isRequired,
  reduce: PropTypes.func.isRequired,
};

export const fieldArrayMeta = {
  dirty: PropTypes.bool.isRequired,
  form: PropTypes.string.isRequired,
  error: PropTypes.string,
  warning: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool,
  submitting: PropTypes.bool,
};
