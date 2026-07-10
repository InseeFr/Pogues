export class HttpResponseError extends Error {
  statusCode = 404; // Not found
  message: string;
  details: string[] | undefined;
  constructor(statusCode: number, message: string, details?: string[]) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
