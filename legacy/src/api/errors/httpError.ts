export class HttpResponseError extends Error {
  statusCode = 404; // Not found
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
