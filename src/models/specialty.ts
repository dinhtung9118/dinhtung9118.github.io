import { BaseModel, ModelStatus } from "./base";

export type ISpecialty = Pick<
  Specialty,
  "id" | "name" | "partnerId" | "description" | "specialtyType" | "status"
  >;

export class Specialty extends BaseModel {
  constructor(props?: ISpecialty) {
    super();
    const date = (value: any) => new Date(value);
    this.assign(props, {
      createdAt: date,
      updatedAt: date,
    });
  }
  id?: string;
  name = "";
  description = "";
  specialtyType = "";
  partnerId = "";
  status = ModelStatus.ACTIVE;
  createdAt = new Date();
  updatedAt = new Date();
}
