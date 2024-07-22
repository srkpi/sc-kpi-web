import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token') || null;

export const setAccessToken = (token: string | null) => {
  if (token) {
    Cookies.set('access_token', token);
  } else {
    Cookies.remove('access_token');
  }
};
