import type { UserEntity } from './auth.entity';

export type JwtPayload = {
  username: string;
};

export type AuthData = {
  accessToken: string;
};

export type RequestWithUser = Request & {
  user?: UserEntity;
};
