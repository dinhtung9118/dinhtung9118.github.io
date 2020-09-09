import { IReqPaging, IResList, IResponse } from "./interface";
import { http } from "../Clients/Http";
import { Specialty, SpecialtyType } from "models";

class RepoSpecialties {
  async query(req?: IReqPaging) {
    const {
      data: { data, total },
    } = await http.get<IResList<SpecialtyType>>("/specialties");

    return {
      data: data?.map((item) => new SpecialtyType(item)) ?? [],
      total,
    };
  }

  async querySpecialType(req?: IReqPaging) {
    const {
      data: { data, total },
    } = await http.get<IResList<SpecialtyType>>("/specialty-types");

    return {
      data: data?.map((item) => new SpecialtyType(item)) ?? [],
      total,
    };
  }

  async createSpecialtyType(payload: Partial<SpecialtyType>) {
    const model = new SpecialtyType(payload as SpecialtyType);
    const dataBody = model.pickPayload(["code", "vi", "en"]);

    const { data } = await http.post<IResponse<SpecialtyType>>(
      "/specialties",
      dataBody,
    );
    return data;
  }

  async updateSpecialtyType(payload: Partial<SpecialtyType>) {
    const model = new SpecialtyType(payload as SpecialtyType);
    const dataBody = model.pickPayload(["vi", "en"]);
    await http.patch(`/specialties/${payload.code}`, dataBody);
    return true;
  }

  async querySpecialties(req?: IReqPaging) {
    const {
      data: { data, total },
    } = await http.get<IResList<Specialty>>("/specialties");

    return {
      data: data?.map((item) => new Specialty(item)) ?? [],
      total,
    };
  }

  async single(idSpecialty: string) {
    const { data } = await http.get<IResponse<Specialty>>(
      `specialties/${idSpecialty}`,
    );
    return data.data;
  }

  async createSpecialty(payload: Partial<Specialty>) {
    const model = new Specialty(payload as Specialty);
    const dataBody = model.pickPayload([
      "name",
      "partnerId",
      "description",
      "specialtyType",
      "status",
    ]);

    const { data } = await http.post<IResponse<Specialty>>(
      "/specialties",
      dataBody,
    );
    return data;
  }
  async updateSpecialty(payload: Partial<Specialty>) {
    const model = new Specialty(payload as Specialty);
    const dataBody = model.pickPayload([
      "name",
      "partnerId",
      "description",
      "specialtyType",
      "status",
    ]);

    await http.patch(`/specialties/${payload.id}`, dataBody);
    return true;
  }

  async getByPartner(id: string) {
    const {
      data: { data, total },
    } = await http.get<IResList<Specialty>>(`/specialties?partnerId=${id}`);
    return {
      data: data?.map((item) => new Specialty(item)) ?? [],
      total,
    };
  }
}

export const specialties = new RepoSpecialties();
