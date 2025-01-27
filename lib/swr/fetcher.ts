import { api, campusApi } from '../api';

export const axiosFetcher = (url: string) => api.get(url).then(res => res.data);

export const axiosCampusFetcher = (url: string) =>
  campusApi.get(url).then(res => res.data);
