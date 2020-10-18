import {BaseModel} from "./base";

export enum ModelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum AccountRole {
  ADMIN = "MEBX_ADMIN",
  CLINIC = "CLINIC_ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type IAccount = Pick<
  Account,
  | "id"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "password"
  | "email"
  | "role"
  | "status"
  | "active"
  | "avatar"
  | "groupId"
  | "externalId"
  >;


export class Account extends BaseModel {
  constructor(props?: IAccount) {
    super();
    this.assign(props);
  }

  protected assign<K extends keyof this>(
    props: Partial<Record<K, any>> | any,
    map?: Partial<Record<K, (value: any) => this[K]>>,
  ) {
    if (!props) return;
    props.createdAt = props.id ? BaseModel.ObjectIDTime(props.id) : new Date();
    super.assign(props, map);
  }

  id = "";

  firstName = "";
  lastName = "";
  phoneNumber = "";
  email = "";
  status = ModelStatus.INACTIVE;
  role = AccountRole.PATIENT;
  groupId = "";
  externalId = "";
  password?: string;
  active?: boolean;
  avatar?: string;
  createdAt = new Date();

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isActive() {
    return BaseModel.statusToBool(this.status);
  }
}
