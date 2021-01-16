import {BaseModel} from "./base";
import {BookingStatus} from "../constants/enums";
import {Doctor} from "./doctor";
import {Clinic} from "./clinic";
import isObject from 'lodash/isObject'

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
  | "patient"
  | "hasMedicalInsurance"
  | "userId"
  | "diseaseCodes">

export class Booking extends BaseModel {
  constructor(props?: IBooking) {
    super();
    this.assign(props);
    if (props?.doctor && isObject(props?.doctor)) {
      this.doctor = new Doctor(props?.doctor);
    }
    if (props?.partner && isObject(props?.partner)) {
      this.partner = new Clinic(props?.partner);
    }
  }

  id: string = '';
  notes: string = '';
  description: string = '';
  status: BookingStatus = BookingStatus.NEW;
  type: string = '';
  doctor: Doctor | string = '';
  partner: Clinic | string = '';
  specialty: {
    name: string,
    id: string,
    _id: string,
  } = {
    name: '',
    id: '',
    _id: ''
  };
  start: string = "";
  end: string = "";
  patient: any = "";
  hasMedicalInsurance: boolean = true;
  userId: string = "";
  diseaseCodes: Array<string> = [];
}
