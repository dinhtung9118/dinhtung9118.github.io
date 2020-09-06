import React, {useEffect} from 'react';
import { Paper } from "@material-ui/core";
import useAuthentication, {
  AuthStatus,
  storeKey
} from "../../stores/AuthenticationsStore/authentication";
import {RouteList} from "../../routeList";
import {useHistory} from "react-router";
import databases from "../../storages";

export default () => {
  const [state, ]= useAuthentication();
  const history = useHistory();
  useEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        console.log('errors', data);
        // tslint:disable-next-line:no-console
        console.error(err);
      });
    })();

    if (state.status === AuthStatus.INITIAL) {
      history.push(RouteList.auth.login);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, history]);
  return (
    <>
      <Paper>
      <div>
        homePage
      </div>
      </Paper>
    </>
  )
}
