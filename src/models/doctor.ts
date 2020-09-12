import { IAccount, Account } from "./account";
import { Specialty } from "models/specialty";

export type IDoctor = IAccount &
  Pick<
    Doctor,
    | "nationCode"
    | "nationalityCode"
    | "genderCode"
    | "partner"
    | "specialties"
    | "education"
    | "academicRankCode"
    | "workplace"
    | "description"
    >;

export class Doctor extends Account {
  constructor(props?: IDoctor) {
    super();
    this.assign(props);
  }

  nationCode?: string;
  nationalityCode?: string;

  genderCode?: string;
  partner?: { id: string; name: string };
  specialties = Array<Specialty>();
  workplace = Array<string>();

  education = "";
  academicRankCode = "";
  description = "";
}
