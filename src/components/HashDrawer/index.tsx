import React, { createElement, useMemo, useRef, ReactNode } from "react";
import { useHistory, matchPath, RouteProps } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export type IHashDrawerRoute = RouteProps & {
  position?: "top" | "right" | "bottom" | "left";
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  DrahDrawer: {
    zIndex: theme.zIndex.drawer + 10,
  },
}));
export const HashDrawerSwitch = ({
  routes,
}: {
  routes: IHashDrawerRoute[];
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  let { hash } = location;

  hash = hash.slice(1);

  const matchRoute = routes.find((route) => matchPath(hash, route));

  const ref = useRef<ReactNode>();

  useMemo(() => {
    const render = (() => {
      if (!matchRoute) return;
      const match = matchPath(hash, matchRoute)!;
      const props = {
        match,
        history,
        location: history.location,
      };

      if (matchRoute.component) {
        return createElement(matchRoute.component, props);
      }

      if (matchRoute.render) {
        return matchRoute.render(props);
      }

      return matchRoute.children;
    })();

    if (render) ref.current = render;
  }, [hash, history, matchRoute]);
  return (
    <Drawer
      className={classes.DrahDrawer}
      open={Boolean(matchRoute)}
      anchor={matchRoute?.position || "right"}
      onClose={() => history.goBack()}
    >
      {ref.current}
    </Drawer>
  );
};
