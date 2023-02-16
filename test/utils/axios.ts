import { HttpStatus } from '@nestjs/common';
import type { AxiosResponse } from 'axios';

export const createAxiosResponse = ({
  data = {},
  statusCode = HttpStatus.OK,
  statusText = 'OK',
}: Partial<{
  data: object;
  statusCode: number;
  statusText: string;
}> = {}): AxiosResponse => ({
  data,
  status: statusCode,
  statusText,
  headers: {},
  config: {} as AxiosResponse['config'],
});
