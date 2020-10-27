import { BaseModel } from "./base";
import moment from "moment";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export type IWorkingTime = Pick<
  WorkingTime,
  "id" | "doctorId" | "status" | "date" | "sessions"
  >;

export interface ISession {
  from: number;
  to: number;
}

export class WorkingTime extends BaseModel {
  constructor(props: IWorkingTime) {
    super();
    this.assign(props, {
      date: (value) => {
        return moment(new Date(value).getTime())
          .format("YYYY-MM-DD")
          .toString();
      },
    });
  }
  id!: string;
  doctorId!: string;
  status!: string;
  date!: string;
  sessions!: ISession[];

  static toSchedule(workingTimes: WorkingTime[]) {
    return workingTimes.reduce<AppointmentModel[]>((schedules, workingTime) => {
      const date = moment(workingTime.date);
      workingTime.sessions.forEach((section) => {
        schedules.push({
          startDate: date.clone().add(section.from, "minutes").toDate(),
          endDate: date.clone().add(section.to, "minutes").toDate(),
          data: workingTime,
        });
      });
      return schedules;
    }, []);
  }

  static minusFormat(minus: number) {
    debugger
    const hours = Math.floor(minus / 60).pad(2);
    const min = (minus % 60).pad(2);
    return `${hours}:${min}`;
  }
}
