import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';

export const httpCatchAxiosError = <T>({
  defaultStatusText,
  defaultStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
}: {
  defaultStatusText: string;
  defaultStatusCode?: number;
}) => {
  return catchError<T, never>((error: AxiosError) => {
    const response: [string, number] =
      error.response !== undefined
        ? [error.response.statusText, error.response.status]
        : [defaultStatusText, defaultStatusCode];

    throw new HttpException(...response);
  });
};
