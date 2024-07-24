export const fetcher = (url: string | URL) =>
  fetch(url).then(res => res.json());
