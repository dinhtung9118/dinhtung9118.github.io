import { config, http } from "../Clients/Http";
import { Doctor, IDoctor } from "models";
import { IReqPaging, IResponse } from "./interface";
import { RepoAccount } from "./Account";

class RepoDoctor extends RepoAccount<Doctor> {
  constructor() {
    super("doctors");
  }

  query = async (params: IReqPaging) => {
    const { data, total } = await super.query(params);
    return { data: data?.map((item: Doctor) => new Doctor(item)), total };
  };

  async byClinic(partner_id: string, params: IReqPaging) {
    params.filter = { ...params.filter, partner_id };
    return this.query(params);
  }

  single = async (id: string) => new Doctor(await super.single(id));

  protected pickPayload(payload: IDoctor) {
    const model = new Doctor(payload);
    return {
      ...model.pickPayload([
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "password",
        "status",
        "genderCode",
        "avatar",
      ]),
      partner_id: model.partner?.id,
      specialty_ids: model.specialties?.map((item) => item.id) ?? [],
    };
  }

  async uploadAvatar(formData: FormData, fileName: string) {
    const {
      data: { data },
    } = await http.post<IResponse<any>>(`/${this.sub}/gen-upload-avatar-url`, {
      contentType: "image/jpeg",
      fullFileName: fileName,
    });
    await config.put(data.signedUrl, formData, {
      headers: { "Content-Type": "image/png" },
    });
    return data;
  }
}

export const doctor = new RepoDoctor();
