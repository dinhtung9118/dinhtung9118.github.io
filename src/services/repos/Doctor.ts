import moment from "moment";

import { Doctor, IDoctor, ModelStatus } from "models";
import {
  IReqPaging,
  IResList,
  IResponse,
  PDoctorsWorkingTime,
} from "./interface";
import { RepoAccount } from "./Account";
import { WorkingTime } from "models/workingTime";
import { Booking } from "../../models/booking";
import { BookingStatus } from "../../constants/enums";
import {config, http} from "../clients/Http";

const time = moment(moment().format("YYYY-MM-DD")).subtract(1, "day");

interface PayloadStatusBooking {
  status: BookingStatus | string;
  notes: string;
  cancelReason?: string;
}

class RepoDoctor extends RepoAccount<Doctor> {
  constructor() {
    super("doctors");
  }

  query = async (params: IReqPaging) => {
    const { data, total } = await super.query(params);
    return { data: data?.map((item: Doctor) => new Doctor(item)), total };
  };

  async byClinic(partner_id: string, params: IReqPaging) {
    params.filter = { ...params.filter, partner_id };
    return this.query(params);
  }

  single = async (id: string) => {
    const { data } = await http.get<Doctor>(`doctors/me`);
    console.log('data=>>', data);
    return new Doctor(data);
  };
  updatePassword = async (data: {
    newPassword: string;
    currentPassword: string;
  }) => {
    await http.patch(`doctors/me/update-password`, data);
  };

  updateWorkingTime = async (payload: WorkingTime) => {
    const model = new WorkingTime(payload);
    model.status =
      model.status === ModelStatus.ACTIVE
        ? ModelStatus.INACTIVE
        : ModelStatus.ACTIVE;
    const body = model.pickPayload(["status", "date"]);
    const { data } = await http.patch<IResponse<WorkingTime>>(
      `/working-time/${payload.id}`,
      {
        ...body,
      },
    );
    return new WorkingTime(data.data!);
  };

  getWorkingTime = async (payload: any) => {
    const {
      data: { data, total },
    } = await http.get<IResList<WorkingTime>>("/working-time", {
      params: payload,
    });
    return {
      data: data?.map((item: WorkingTime) => new WorkingTime(item)),
      total,
    };
  };

  batchCreate = async (payload: PDoctorsWorkingTime) => {
    const { data } = await http.post<IResList<WorkingTime>>(
      "/working-time/consult",
      {
        ...payload,
      },
    );
    return data.data?.map((item: WorkingTime) => new WorkingTime(item));
  };

  getConsultationWorkingTime = async (payload: any) => {
    const {
      data: { data, total },
    } = await http.get<IResList<WorkingTime>>("/working-time/consult", {
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
  }

  getBookings = async (payload: any) => {
    const {
      data: { data, total },
    } = await http.get<IResList<Booking>>(`/booking/doctor`, {
      params: payload,
    });
    return {
      data: data?.map((item: Booking) => new Booking(item)),
      total,
    };
  };

  getBookingInfo = async (id: string) => {
    const { data } = await http.get(`/booking/doctor/${id}`);
    return new Booking(data);
  };

  reExaminationBooking = async (payload: any) => {
    const { data } = await http.post(`/booking/doctor`, payload);
    return new Booking(data);
  };

  updateStatusBooking = async (
    id: string,
    payloadStatusBooking: PayloadStatusBooking,
  ) => {
    const data = await http.patch<Booking>(
      `/booking/doctor/${id}`,
      {
        ...payloadStatusBooking,
      },
    );
    return new Booking(data.data);
  };

  async uploadAvatar(file: File, fileName: string) {
    const {
      data: { data },
    } = await http.post<IResponse<any>>(`/${this.sub}/gen-upload-avatar-url`, {
      contentType: "image/jpeg",
      fullFileName: fileName,
    });
    await config.put(data.signedUrl, file, {
      headers: { "Content-Type": file.type },
    });
    return data;
  }
}

export const doctor = new RepoDoctor();
