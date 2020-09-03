import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import {RouteList} from "../routeList";
import Login from "./Login";
import DashBoard from "./DashBoard";
import LinearIndeterminate from "../components/LinearIndeterminate";

const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <LinearIndeterminate/>
      <Switch>
        <Route path={RouteList.auth.login} component={Login} />
        <Route path={RouteList.dashboard} component={DashBoard} />
      </Switch>
    </>
  )
};
export default Routes;
