'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', (error as AxiosError).message);
        } else if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
