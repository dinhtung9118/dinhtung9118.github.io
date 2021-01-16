import { BaseModel } from "./base";
import dayjs from "dayjs";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { convertToUTC7 } from "../utils/Date";

export type IWorkingTime = Pick<
  WorkingTime,
  | "id"
  | "doctorId"
  | "status"
  | "date"
  | "from"
  | "to"
  | "remainSeats"
  | "seats"
>;

export interface ISession {
  from: number;
  to: number;
}

export class WorkingTime extends BaseModel {
  constructor(props?: IWorkingTime) {
    super();
    this.assign(props, {
      date: (value) => {
        return convertToUTC7(value).format("YYYY-MM-DD").toString();
      },
    });
  }

  id: string = "";
  doctorId: string = "";
  status: string = "";
  date: string = "";
  from!: number;
  to!: number;
  remainSeats!: number;
  seats!: number;

  static toSchedule(workingTimes: WorkingTime[]) {
    return workingTimes.reduce<(AppointmentModel & { working: WorkingTime })[]>(
      (schedules, workingTime) => {
        const date = dayjs(workingTime.date);
        schedules.push({
          working: workingTime,
          startDate: date.clone().add(workingTime.from, "minute").toDate(),
          endDate: date.clone().add(workingTime.to, "minute").toDate(),
        });
        return schedules;
      },
      [],
    );
  }

  static minusFormat(minus: number) {
    const hours = Math.floor(minus / 60).pad(2);
    const min = (minus % 60).pad(2);
    return `${hours}:${min}`;
  }
}
