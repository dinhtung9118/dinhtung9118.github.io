import React from 'react';
import {lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import {RouteList} from "../routeList";
import Login from "./Login";
import LinearIndeterminate from "../components/LinearIndeterminate";
import PrivateRoute from "./PrivateRoute";

const DashBoard = lazy(() => import('./DashBoard'));
const Profile = lazy(() => import('./Profile'));


const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <LinearIndeterminate/>
      <Switch>
        <Route path={RouteList.auth.login} component={Login}/>
        <PrivateRoute
          exact={true}
          path={RouteList.dashboard}
          component={DashBoard}/>
        <PrivateRoute exact={true} path={RouteList.profile}
                      component={Profile}/>

      </Switch>
    </>
  )
};
export default Routes;
