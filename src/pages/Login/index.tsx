import React, {useEffect} from "react";
import {Link as RouteLink, useHistory} from "react-router-dom";
import {Box, Paper, Typography, Link, Grid} from "@material-ui/core";
import FormLogin from "components/FormLogin";
import {RouteList} from "routeList";
import {LoginFormValues} from "components/FormLogin/index.d";
import useAuthentication, {AuthStatus} from 'stores/AuthenticationsStore/authentication';
import {useStyles} from "./index.type";
import {useI18n} from "stores/Locale/LocaleStore";

export default () => {
  const classes = useStyles();
  const [state, actions] = useAuthentication();
  const i18n = useI18n();
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
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid xs={8}></Grid>
        <Grid xs={4} className={classes.grid}>
          <Paper className={classes.paper}>
            <Box className={classes.logo} display="flex" height="100%"
                 alignItems="center">
              <Typography variant="h6">
                Logo
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">
                {i18n}
                Login
              </Typography>
              <Typography variant="h6">
                Nhap email va mat khau de trai nghiem
              </Typography>
              <Box className={classes.form}>
                <FormLogin
                  submit={onSubmit}
                />
                <Link component={RouteLink} to={RouteList.auth.reset}>
                  forgot
                </Link>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
};
