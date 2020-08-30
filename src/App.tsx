import React from 'react';
import { Route, Switch } from "react-router-dom";
import {RouteList} from "./routeList";
import Login from 'pages/Login'

function App() {
  return (
    <div>
      <Switch>
        <Route path={RouteList.auth.login} component={Login} />
        <Route path={RouteList.dashboard} component={Login} />
      </Switch>
    </div>
  );
}

export default App;
