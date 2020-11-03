import { IAccount, Account } from "./account";

export type IPatient = IAccount &
  Pick<
    Patient,
    | "dateOfBirth"
    | "tncAcceptance"
    | "gender"
    | "address"
    | "nationCode"
    | "nationalityCode"
    | "job"
    >;

export class Patient extends Account {
  constructor(props: IPatient) {
    super();
    this.assign(props, {
      dateOfBirth: (value) => new Date(value),
    });
  }

  dateOfBirth = new Date();
  tncAcceptance = true;
  gender!: string;
  address!: string;
  nationCode!: string;
  nationalityCode!: string;
  job!: string;
}
