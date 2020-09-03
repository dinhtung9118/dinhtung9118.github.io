import { Account } from "models/account";

export type IResponse<T = unknown> = {
  data?: T;
};

export type IResAuthLogin<T = Account> = IResponse<{
  access_token: string;
  userInfo: T;
}>;
