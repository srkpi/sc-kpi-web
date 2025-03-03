'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const FileUpload = (basePath: string) => {
  return async (url: string | URL, formData: FormData) => {
    const jwt = (await cookies()).get('token')?.value;

    if (!jwt) {
      redirect('/');
    }

    const input = new URL(url, basePath).href;

    const response = await fetch(input, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
    });

    // if (response.status === 401) {
    //   cookies().delete('token');
    //   redirect('/');
    // }

    if (!response.ok) {
      throw new Error('Error uploading file.');
    }
    return response;
  };
};

export const clientFileUpload = FileUpload(process.env.API_BASE_URL!);
