export default class ValidationError extends Error {
  constructor(message, errors) {
    super(message);

    if (!errors) {
      errors = {
        _error: ['Unexpected error'],
      };
    }
    this.errors = errors;
  }
}
