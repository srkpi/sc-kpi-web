import { Role } from './';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
};

export type DecodedTokenType = {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
};
