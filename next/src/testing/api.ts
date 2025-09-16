import { AxiosError, AxiosHeaders } from 'axios';

export function makeAPIErrorWithErrorCode(errorCode: string) {
  return new AxiosError('An error occured', undefined, undefined, undefined, {
    data: { errorCode },
    status: 400,
    statusText: '',
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  });
}

export function makeAPIErrorWithNoErrorCode() {
  return new AxiosError('An unexpected error occured');
}
