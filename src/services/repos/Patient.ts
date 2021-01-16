import { RepoAccount } from "./Account";
import { http } from "../clients/Http";
import { Patient } from "../../models/patient";
import { IReqPaging, IResList, IResponse } from "./interface";
import { Doctor } from "../../models";

class RepoPatient extends RepoAccount<Patient> {
  constructor() {
    super("patients");
  }
  query = async (params: IReqPaging) => {
    const { data, total } = await super.query(params);
    return { data: data?.map((item: Patient) => new Patient(item)), total };
  };

  update = async (id: string, data: Partial<Patient>) => {
    const rs = await super.update(id, data);
    return new Patient(rs!);
  };

  async single(id: string) {
    const { data } = await http.get<IResponse<Patient>>(`patients/${id}`);
    return new Patient(data.data!);
  }
}

export const patient = new RepoPatient();
