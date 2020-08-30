import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Box, Paper, Container, Link } from "@material-ui/core";

import FormLogin from "components/FormLogin";
import { RouteList } from "routeList";

export default () => {

  const onSubmit = () => {};

  return (
    <Box display="flex" height="100%" alignItems="center">
      <Container fixed maxWidth="xs">
        <Paper>
          <Box p={2}>
            <FormLogin
              status={"disable"}
              onSubmit={onSubmit}
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
