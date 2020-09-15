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

  single = async (id: string) => {
    const { data } = await http.get<IResponse<Doctor>>(`doctors/me`);
    return new Doctor(data.data);
  };
  updatePassword = async (data: { newPassword: string; currentPassword: string }) => {
    await http.patch(`doctors/me/update-password`,data);
  };

  protected pickPayload(payload: IDoctor) {
    const model = new Doctor(payload);
    return {
      ...model.pickPayload([
        "firstName",
        "lastName",
        "phoneNumber",
        "status",
        "genderCode",
        "avatar",
        "nationCode",
        "nationalityCode",
        "academicRankCode",
        "specialties",
        "description"
      ]),
      partner_id: model.partner?.id,
      specialty_ids: model.specialties?.map((item) => item.id) ?? [],
    };
  }

  async uploadAvatar(file: File, fileName: string) {
    const {
      data: { data },
    } = await http.post<IResponse<any>>(`/${this.sub}/gen-upload-avatar-url`, {
      contentType: "image/jpeg",
      fullFileName: fileName,
    });
    await config.put(data.signedUrl, file, {
      headers: { 'Content-Type': file.type},
    });
    return data;
  }
}

export const doctor = new RepoDoctor();
