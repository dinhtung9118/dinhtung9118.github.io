import { ModelStatus } from "models/base";
import { Account } from "models";

import { IReqPaging, IResList, IResponse } from "./interface";

import { http, buildRequestParams } from "../Clients/Http";

export abstract class RepoAccount<T extends Account> {
  constructor(protected sub: string) {}

  async query(req: IReqPaging): Promise<IResList<T>> {
    const { data } = await http.get(this.sub, {
      params: buildRequestParams(req),
    });
    return data;
  }

  protected pickPayload(payload: any) {
    return payload;
  }

  async create(payload: Partial<T> | any) {
    const { data } = await http.post<IResponse<T>>(
      this.sub,
      this.pickPayload(payload),
    );
    return data.data;
  }

  async update(id: string, payload: Partial<T> | any) {
    const { data: result } = await http.patch<IResponse<T>>(
      `${this.sub}/me`,
      this.pickPayload(payload),
    );
    return result.data;
  }

  async single(id: string) {
    const { data } = await http.get<IResponse<T>>(`${this.sub}/${id}`);
    return data.data;
  }

  updateStatus = async (id: string, status: ModelStatus) => {
    await http.patch(`/users/${id}/change-status`, { status });
    return true;
  };

  async delete(ids: string[]) {
    await Promise.delay(200);
    return true;
  }
}
