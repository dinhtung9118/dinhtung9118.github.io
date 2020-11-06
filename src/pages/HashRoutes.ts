import * as React from "react";
import { RouteList } from "../routeList";
import { lazy } from "react";

const ProfileEdit = lazy(() => import("./Profile/edit"));

export interface IHashRoute {
  path: string;
  component: React.FC;
}
export const HashRoutes = [
  {
    path: RouteList.profileEdit,
    component: ProfileEdit,
  },
];
