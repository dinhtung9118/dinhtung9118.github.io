import React  from 'react';
import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import {RouteList} from "../routeList";
import Login from "./Login";
import LinearIndeterminate from "../components/LinearIndeterminate";
import PrivateRoute from "./PrivateRoute";
const DashBoard = lazy(() => import('./DashBoard'));
const Profile = lazy(() => import('./Profile'));
const ProfileEdit = lazy(() => import('./Profile/edit'));

const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <LinearIndeterminate/>
      <Switch>
        <Route path={RouteList.auth.login} component={Login} />
        <PrivateRoute exact path={RouteList.dashboard} component={Profile} />
        <PrivateRoute exact path={RouteList.profile} component={Profile} />
        <PrivateRoute exact path={RouteList.profile} component={ProfileEdit} />
      </Switch>
    </>
  )
};
export default Routes;
