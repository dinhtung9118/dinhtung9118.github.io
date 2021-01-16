import { IReqPaging, IResList, IResponse } from "./interface";
import { config, http, buildRequestParams } from "../clients/Http";
import { Clinic, SpecialtyType } from "models";

class RepoClinic {
  async query(req: IReqPaging) {
    const {
      data: { data, total },
    } = await http.get<IResList<Clinic>>("/partners", {
      params: buildRequestParams(req),
    });

    return {
      data: data?.map((item) => new Clinic(item)) || [],
      total,
    };
  }

  search = async (keyword: string) => {
    const res = await this.query({
      limit: 10,
      offset: 0,
      filter: { status: "ACTIVE" },
    });
    return res.data;
  };

  queryAll = async () => {
    const { data } = await http.get<IResList<Clinic>>("/partners", {
      params: { status: "ACTIVE" },
    });
    return data.data?.map((item) => new Clinic(item)) || [];
  };

  async querySpecialties(params: IReqPaging) {
    const {
      data: { data, total },
    } = await http.get<IResList<SpecialtyType>>("/partners/specialtyType");

    return {
      data: data?.map((item) => new SpecialtyType(item)) || [],
      total,
    };
    // return [];
    // return {
    //   data: data?.data?.map((item: any) => new Clinic(item)) ?? [],
    //   total: data?.data?.length ?? 0,
    // };
  }

  async single(idClinic: string) {
    const { data } = await http.get<IResponse<Clinic>>(`partners/${idClinic}`);
    return new Clinic(data.data!);
  }

  async create(payload: Partial<Clinic>) {
    const model = new Clinic(payload as Clinic);
    const dataBody = model.pickPayload([
      "email",
      "phoneNumber",
      "name",
      "address",
      "phoneNumberExt1",
      "phoneNumberExt2",
      "description",
      "type",
      "logo",
      "businessNo",
    ]);

    const { data } = await http.post<IResponse<Clinic>>("/partners", dataBody);
    return data;
  }

  async update(code: string, payload: Partial<Clinic>) {
    const model = new Clinic(payload as Clinic);
    const dataBody = model.pickPayload([
      "email",
      "phoneNumber",
      "name",
      "address",
      "phoneNumberExt1",
      "phoneNumberExt2",
      "description",
      "type",
      "logo",
      "businessNo",
      "status",
    ]);
    await http.patch(`/partners/${code}`, dataBody);
    return true;
  }

  async uploadLogo(formData: FormData, fileName: string) {
    const {
      data: { data },
    } = await http.post<IResponse<any>>(`/partners/upload-logo`, {
      contentType: "image/jpeg",
      fullFileName: fileName,
    });
    await config.put(data.signedUrl, formData, {
      headers: { "Content-Type": "image/png" },
    });
    return data;
  }
}

export const clinic = new RepoClinic();
