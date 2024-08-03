import { Role } from './';

export type DecodedTokenType = {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
};
