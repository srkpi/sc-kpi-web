import { campusApi } from '../api';
export const axiosCampusFetcher = (url: string) =>
  campusApi.get(url).then(res => res.data);
