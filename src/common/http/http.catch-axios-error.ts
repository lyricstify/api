import { HttpException, HttpStatus } from '@nestjs/common';
import { catchError } from 'rxjs';

export const httpCatchAxiosError = <T>({
  defaultStatusText,
  defaultStatusCode = HttpStatus.NOT_FOUND,
}: {
  defaultStatusText: string;
  defaultStatusCode?: number;
}) => {
  return catchError<T, never>(() => {
    throw new HttpException(defaultStatusText, defaultStatusCode);
  });
};
