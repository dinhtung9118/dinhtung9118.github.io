import React, {useEffect} from 'react';
import { Paper } from "@material-ui/core";
import useAuthentication, {AuthStatus} from "../../stores/authenticationsStore/authentication";
import {RouteList} from "../../routeList";
import {useHistory} from "react-router";

export default () => {
  const [state, ]= useAuthentication();
  const history = useHistory();
  useEffect(() => {
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
