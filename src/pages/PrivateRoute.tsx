import React from 'react'
import {Redirect, Route, RouteProps} from "react-router";
import useAuthentication, {AuthStatus} from "stores/AuthenticationsStore/authentication";
import {RouteList} from "../routeList";
import Layout from "./Layout";

interface IProps {
  component: React.FC,
  path: string,
  exact?: boolean,
}

const PrivateRoute: React.FC<IProps & RouteProps> =({component, ...rest}) =>{
  const [state] = useAuthentication();
  if(state?.status === AuthStatus.LOGGED){
    return (
      <Layout>
        <Route {...rest} component={component} />
      </Layout>
    )
  }
 return <Redirect to={{pathname: RouteList.auth.login}}/>
}

export default PrivateRoute;
