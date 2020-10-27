import { BaseModel } from "./base";
import { BookingStatus } from "../constants/enums";
import { Doctor } from "./doctor";
import { Clinic } from "./clinic";

export type IBooking = Pick<Booking,
  | "id"
  | "notes"
  | "description"
  | "status"
  | "doctor"
  | "partner"
  | "specialty"
  | "start"
  | "end"
  | "hasMedicalInsurance"
  | "useId"
  | "diseaseCodes"
  >

export class Booking extends BaseModel {
  constructor(props?: IBooking ) {
    super();
    this.assign(props)
    this.doctor = new Doctor(props?.doctor);
    this.partner = new Clinic(props?.partner);
  }
   id :string = '';
   notes : string = '';
   description: string = '';
   status: BookingStatus = BookingStatus.NEW;
   type: string = '';
   doctor: Doctor = new Doctor();
   partner: Clinic = new Clinic();
   specialty: string =""
   start: string = "";
   end: string = "";
   hasMedicalInsurance: boolean = true;
   useId: string = "";
   diseaseCodes: Array<string> = [];
}
