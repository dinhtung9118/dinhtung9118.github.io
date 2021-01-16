import { BaseModel } from "./base";

export type ISpecialtyType = Pick<
  SpecialtyType,
  "id" | "code" | "en" | "vi" | "id"
>;

export class SpecialtyType extends BaseModel {
  constructor(props: ISpecialtyType) {
    super();
    const date = (value: any) => new Date(value);
    this.assign(props, {
      createdAt: date,
      updatedAt: date,
    });
  }
  id!: string;
  code!: string;
  en!: string;
  vi!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
