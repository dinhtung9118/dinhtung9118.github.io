import React, {useEffect} from "react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { Box, Paper, Container, Link } from "@material-ui/core";

import FormLogin from "components/FormLogin";
import { RouteList } from "routeList";
import {LoginFormValues} from "components/FormLogin/index.d";
import useAuthentication, {AuthStatus} from 'stores/authenticationsStore/authentication';

export default () => {
  const [state, actions]= useAuthentication();
  const history = useHistory();
  const onSubmit = async (value: LoginFormValues) => {
    await actions.login(value);
  };

  useEffect(() => {
    if (state.status === AuthStatus.LOGGED) {
      history.push(RouteList.dashboard);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, history]);

  return (
    <Box display="flex" height="100%" alignItems="center">
      <Container fixed maxWidth="xs">
        <Paper>
          <Box p={2}>
            <FormLogin
              submit={onSubmit}
            />
            <Link component={RouteLink} to={RouteList.auth.reset}>
              forgot
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
