import { BaseModel, ModelStatus } from "./base";

export type IClinic = Pick<
  Clinic,
  | "address"
  | "businessNo"
  | "code"
  | "createdAt"
  | "description"
  | "email"
  | "emailVerified"
  | "logo"
  | "name"
  | "phoneNumber"
  | "phoneNumberExt1"
  | "phoneNumberExt2"
  | "status"
  | "tncAcceptance"
  | "updatedAt"
  | "id"
  | "type"
>;

export class Clinic extends BaseModel {
  constructor(props?: IClinic) {
    super();
    const date = (value: any) => new Date(value);
    this.assign(props, {
      updatedAt: date,
    });
    if (props?.id) {
      this.createdAt = BaseModel.ObjectIDTime(props.id);
    }
  }

  id = "";
  address = "";
  businessNo = "";
  code = "";
  description = "";
  email = "";
  emailVerified!: boolean;
  logo = "";
  name = "";
  phoneNumber = "";
  phoneNumberExt1 = "";
  phoneNumberExt2 = "";
  status = ModelStatus.INACTIVE;
  tncAcceptance = false;
  type?: string;
  createdAt = new Date();
  updatedAt = new Date();

  get isActive() {
    return this.status === ModelStatus.ACTIVE;
  }
}
