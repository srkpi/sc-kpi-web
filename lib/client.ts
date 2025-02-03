'use server';

import { cookies } from 'next/headers';

const Client = (basePath: string) => {
  return async <T>(url: string | URL, options: RequestInit = {}) => {
    const { headers = {}, ...otherOptions } = options;
    const jwt = cookies().get('token')?.value;

    const input = new URL(url, basePath).href;

    const contentType =
      new Headers(headers).get('Content-type') ?? 'application/json';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = await fetch<T>(input, {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        Authorization: jwt ? `Bearer ${jwt}` : '',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        'Content-Type': contentType,
        ...headers,
      },
      ...otherOptions,
    });

    // if (response.status === 401) {
    //   cookies().delete('token');
    //   redirect('/');
    // }

    return response;
  };
};

export const client = Client(process.env.NEXT_PUBLIC_API_BASE_URL!);
