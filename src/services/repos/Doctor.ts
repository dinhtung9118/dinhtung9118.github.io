import moment from 'moment'

import {config, http} from "../Clients/Http";
import {Doctor, IDoctor, ModelStatus} from "models";
import {IReqPaging, IResList, IResponse} from "./interface";
import {RepoAccount} from "./Account";
import {WorkingTime} from "models/workingTime";
import {Booking} from "../../models/booking";
import {BookingStatus} from "../../constants/enums";

const time = moment(moment().format("YYYY-MM-DD")).subtract(1, "day");

interface PayloadStatusBooking {
  status: BookingStatus | string,
  notes: string,
  cancelReason?: string,
}

const demoWokingTime = Array.from({length: 30}, ($, index) => {
  time.add(1, "day");
  return new WorkingTime({
    id: "",
    doctorId: "",
    status: "",
    date: time.format("YYYY-MM-DD"),
    sessions: [
      {from: 480, to: 600},
      {from: 600, to: 720},
      {from: 780, to: 840},
      {from: 840, to: 930},
      {from: 975, to: 1005},
      {from: 1005, to: 1125},
    ],
  });
});

class RepoDoctor extends RepoAccount<Doctor> {
  constructor() {
    super("doctors");
  }

  query = async (params: IReqPaging) => {
    const {data, total} = await super.query(params);
    return {data: data?.map((item: Doctor) => new Doctor(item)), total};
  };

  async byClinic(partner_id: string, params: IReqPaging) {
    params.filter = {...params.filter, partner_id};
    return this.query(params);
  }

  single = async (id: string) => {
    const {data} = await http.get<Doctor>(`doctors/me`);
    return new Doctor(data);
  };
  updatePassword = async (data: { newPassword: string; currentPassword: string }) => {
    await http.patch(`doctors/me/update-password`, data);
  };

  schedules = async (id: string) => {
    return Promise.delay(500, demoWokingTime);
  };

  updateWorkingTime = async (payload: WorkingTime) => {
    const model = new WorkingTime(payload);
    model.status = model.status === ModelStatus.ACTIVE ? ModelStatus.INACTIVE : ModelStatus.ACTIVE;
    const body = model.pickPayload(['status', 'date', 'sessions']);
    const {data} = await http.patch<IResponse<WorkingTime>>(`/working-time/${payload.id}`, {
      ...body,
    });
    console.log('updateWorkingTime=>>', data);
    return new WorkingTime(data.data!)
  };

  getWorkingTime = async (payload: any) => {
    const {
      data: {data, total},
    } = await http.get<IResList<WorkingTime>>("/working-time", {
      params: payload,
    });
    return {
      data: data?.map((item: WorkingTime) => new WorkingTime(item)),
      total,
    };
  };

  protected pickPayload(payload: IDoctor) {
    const model = new Doctor(payload);
    return {
      ...model.pickPayload([
        "firstName",
        "lastName",
        "phoneNumber",
        "status",
        "genderCode",
        "avatar",
        "nationCode",
        "nationalityCode",
        "academicRankCode",
        "specialties",
        "description",
        "workplace",
        "diseasesConsultantCode",
        "jobTitle",
      ]),
      partner_id: model.partner?.id,
      specialty_ids: model.specialties?.map((item) => item.id) || [],
    };
  };

  getBookings = async (payload: any) => {
    const {data: {data, total}} = await http.get<IResList<Booking>>(`/booking/doctor`,{
      params: payload,
    });
    return {
      data: data?.map((item: Booking) => new Booking(item)),
      total,
    }
  };

  getBookingInfo = async (id: string) =>{
    const {data}= await http.get(`/booking/doctor/${id}`);
    console.log('dattatata', data);
    return new Booking(data);
  };

    updateStatusBooking = async (id: string, payloadStatusBooking: PayloadStatusBooking) => {
    const {data} = await http.patch<IResponse<Booking>>(`/booking/doctor/${id}`,{
       ...payloadStatusBooking
    });
    console.log(data);
    return new Booking(data.data!);
  };

  async uploadAvatar(file: File, fileName: string) {
    const {
      data: {data},
    } = await http.post<IResponse<any>>(`/${this.sub}/gen-upload-avatar-url`, {
      contentType: "image/jpeg",
      fullFileName: fileName,
    });
    await config.put(data.signedUrl, file, {
      headers: {'Content-Type': file.type},
    });
    return data;
  }
}

export const doctor = new RepoDoctor();