import { AxiosError } from 'axios';

interface ErrorResponseData {
  message?: string | string[];
}

export const errorHandler = (error: AxiosError<ErrorResponseData>): string => {
  const message = error.response?.data?.message;

  return message
    ? typeof message === 'object'
      ? message[0]
      : message
    : error.message;
};
