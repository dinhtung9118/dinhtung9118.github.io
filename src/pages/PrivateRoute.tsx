import React, { Suspense } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import useAuthentication, {
  AuthStatus,
} from "stores/authenticationsStore/authentication";
import { RouteList } from "../routeList";
import Layout from "./Layout";
import Spinner from "components/Spinner";
import { HashDrawerSwitch } from "../components/HashDrawer";
import { HashRoutes, IHashRoute } from "./HashRoutes";

interface IProps {
  component: React.FC;
  path: string;
  exact?: boolean;
  isHash?: boolean;
}

const renderRoute = (Component: React.FC) => (props: RouteProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};
const PrivateRoute: React.FC<IProps & RouteProps> = ({
  component,
  isHash,
  ...rest
}) => {
  const [state] = useAuthentication();
  if (state?.status === AuthStatus.LOGGED) {
    return (
      <>
        <Layout>
          <Route {...rest} component={renderRoute(component)} />
        </Layout>
        {
          <HashDrawerSwitch
            routes={HashRoutes.map<IHashRoute>((item: IHashRoute) => {
              return {
                path: item.path,
                component: renderRoute(item.component),
              };
            })}
          />
        }
      </>
    );
  }
  return <Redirect to={{ pathname: RouteList.auth.login }} />;
};

export default PrivateRoute;
