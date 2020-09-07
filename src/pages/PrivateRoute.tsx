import React, { Suspense }  from 'react'
import {Redirect, Route, RouteProps} from "react-router";
import useAuthentication, {AuthStatus} from "stores/AuthenticationsStore/authentication";
import {RouteList} from "../routeList";
import Layout from "./Layout";
import Spinner from "components/Spinner";

interface IProps {
  component: React.FC,
  path: string,
  exact?: boolean,
}

const renderRoute = (Component: React.FC) => (props: RouteProps) => {
  return (
    <Suspense fallback={<Spinner/>}>
      <Component {...props} />
    </Suspense>
  );
};
const PrivateRoute: React.FC<IProps & RouteProps> =({component, ...rest}) =>{
  const [state] = useAuthentication();
  console.log('component', component);
  if(state?.status === AuthStatus.LOGGED){
    return (
      <Layout>
        <Route {...rest} component={renderRoute(component)} />
      </Layout>
    )
  }
 return <Redirect to={{pathname: RouteList.auth.login}}/>
}

export default PrivateRoute;
