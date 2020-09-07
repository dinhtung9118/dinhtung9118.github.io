import { Account } from "models";

export type IResponse<T = unknown> = {
  data?: T;
};

export type IResAuthLogin<T = Account> = IResponse<{
  access_token: string;
  userInfo: T;
}>;

export type IResList<T = unknown> = IResponse<T[]> & {
  total?: number;
};

export type IParamsSort = {
  name: string;
  desc: boolean;
};

export type IReqPaging = {
  offset: number;
  limit: number;
  sort?: IParamsSort;
  filter: Record<string, any>;
};

export type IQueryPaging<T> = (params: IReqPaging) => Promise<IResList<T>>;
