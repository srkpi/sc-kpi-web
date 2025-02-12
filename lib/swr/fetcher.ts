import { campusApi } from '@/lib/campusApi';

export const axiosCampusFetcher = (url: string) =>
  campusApi.get(url).then(res => res.data);
