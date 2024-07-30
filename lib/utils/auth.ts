import Cookies from 'js-cookie';

export const rememberMe = (email: string) => {
  Cookies.set('userEmail', email);
};

export const getRememberedEmail = () => {
  return Cookies.get('userEmail');
};

export const forgetMe = () => {
  Cookies.remove('userEmail');
};
