import {BaseModel} from "./base";

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
  >;


export class Account extends BaseModel {
  constructor(props: IAccount) {
    super();
    if (this instanceof Account) this.assign(props);
  }

  protected assign<K extends keyof this>(
    props: Partial<Record<K, any>> | any,
    map?: Partial<Record<K, (value: any) => this[K]>>,
  ) {
    props.createdAt = props.id ? BaseModel.ObjectIDTime(props.id) : new Date();
    super.assign(props, map);
  }

  id!: string;

  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  password?: string;
  email!: string;
  role!: AccountRole;
  status!: AccountStatus;
  active?: boolean;
  avatar?: string;

  createdAt!: Date;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isActive() {
    return Account.statusToBool(this.status);
  }

  static statusFromBool(bool: boolean) {
    return bool ? AccountStatus.ACTIVE : AccountStatus.INACTIVE;
  }

  static statusToBool(status: AccountStatus) {
    return status === AccountStatus.ACTIVE;
  }
}
