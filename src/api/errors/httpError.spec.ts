import { HttpResponseError } from './httpError';

describe('HttpResponse Error', () => {
  test('should create create new Error with status and message', () => {
    const simpleError = new HttpResponseError(404, 'Not Found');
    expect(simpleError.statusCode).toBe(404);
    expect(simpleError.message).toBe('Not Found');
  });
});
