import React from "react";
import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { RouteList } from "../routeList";
import Login from "./Login";
import LinearIndeterminate from "../components/LinearIndeterminate";
import PrivateRoute from "./PrivateRoute";

const DashBoard = lazy(() => import("./DashBoard"));
const Profile = lazy(() => import("./Profile"));
const SchedulesPage = lazy(() => import("./Schedules"));
const ConsultationSchedule = lazy(() => import("./ConsultationSchedule"));
const Examinationchedule = lazy(() => import("./Examination"));
const BookingInfo = lazy(() => import("./ConsultationSchedule/BookingInfo"));
const SchedulesConsultationPage = lazy(
  () => import("./Schedules/ConsultationWorkingTime"),
);

const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <LinearIndeterminate />
      <Switch>
        <Route path={RouteList.auth.login} component={Login} />
        <PrivateRoute
          exact={true}
          path={RouteList.dashboard}
          component={DashBoard}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.profile}
          component={Profile}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.schedules}
          component={SchedulesPage}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.consultationSchedule}
          component={ConsultationSchedule}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.bookingInfo}
          component={BookingInfo}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.consultationWorkingTime}
          component={SchedulesConsultationPage}
        />
        <PrivateRoute
          exact={true}
          path={RouteList.examinationSchedule}
          component={Examinationchedule}
        />
      </Switch>
    </>
  );
};
export default Routes;
