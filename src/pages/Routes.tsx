import React, {useEffect} from 'react';
import {lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import {RouteList} from "../routeList";
import Login from "./Login";
import LinearIndeterminate from "../components/LinearIndeterminate";
import PrivateRoute from "./PrivateRoute";
import {I18n} from "../untils";
import {errorNotifier} from 'services/Clients/Http'
import {connectNotifier} from 'stores/Connection/Connection'
import { useSnackbar, OptionsObject } from "notistack";
import {CloseButton} from 'components/Notistack'
import {useI18n} from "../stores/Locale/LocaleStore";

const DashBoard = lazy(() => import('./DashBoard'));
const Profile = lazy(() => import('./Profile'));

const useConnectSnackBar = (i18n: I18n) => {
  const {
    system: { notices },
    errors,
  } = i18n;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const keyOf = (state: boolean) => `connectStatus-${state}`;

    return connectNotifier.listen(() => {
      const isOnline = connectNotifier.value;

      closeSnackbar(keyOf(!isOnline));

      const props: OptionsObject = isOnline
        ? { variant: "success" }
        : { variant: "error", autoHideDuration: null };

      const key = keyOf(isOnline);

      enqueueSnackbar(
        <CloseButton
          name={key}
          message={isOnline ? notices.online : notices.offline}
        />,
        { key, ...props },
      );
    });
  }, [closeSnackbar, enqueueSnackbar, notices]);

  useEffect(() => {
    let count = 0;
    return errorNotifier.listen((error) => {
      const key = `${error.name || "unKnow"}-${count++}`;

      if (error.name === "offline") {
        enqueueSnackbar(<CloseButton name={key} message={errors.offline} />, {
          key,
          variant: "warning",
        });
      } else {
        enqueueSnackbar(
          <CloseButton
            name={key}
            message={
              errors[error.name] ||
                error.message ||
                  error.name ||
                    "Some thing went wrong!"
            }
          />,
          { key, variant: "error" },
        );
      }
    });
  }, [enqueueSnackbar, errors]);
};
const Routes: React.FC = (): JSX.Element => {
  const i18n = useI18n();
  useConnectSnackBar(i18n);
  return (
    <>
      <LinearIndeterminate/>
      <Switch>
        <Route
          path={RouteList.auth.login}
          component={Login}/>
        <PrivateRoute
          exact={true}
          path={RouteList.dashboard}
          component={DashBoard}/>
        <PrivateRoute
          exact={true}
          path={RouteList.profile}
          component={Profile}/>

      </Switch>
    </>
  )
};
export default Routes;
