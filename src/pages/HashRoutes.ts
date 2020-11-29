import * as React from "react";
import { RouteList } from "../routeList";
import { lazy } from "react";

const ProfileEdit = lazy(() => import("./Profile/edit"));
const ConsulteantionCreate = lazy(
  () => import("./Schedules/ConsultationWorkingTime/create"),
);

const ReExaminationBooking = lazy(
  () => import("./Schedules/ReExaminationBooking"),
);

export interface IHashRoute {
  path: string;
  component: React.FC;
}
export const HashRoutes = [
  {
    path: RouteList.profileEdit,
    component: ProfileEdit,
  },
  {
    path: RouteList.consultationCreate,
    component: ConsulteantionCreate,
  },
  {
    path: RouteList.ReExamintionBooking,
    component: ReExaminationBooking,
  },
];
