import React, { Props, useCallback } from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
} from "@material-ui/core";

import defaultTheme from "./default";
import merge from "lodash.merge";

const createProvider = (options?: ThemeOptions) => ({
  children,
}: Props<any>) => {
  const extend = useCallback((outerTheme: Theme) => {
    return merge({}, outerTheme, options);
  }, []);
  return <ThemeProvider theme={extend}>{children}</ThemeProvider>;
};

export const RootThemeProvider = ({ children }: Props<any>) => {
  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme.theme)}>
      {children}
    </MuiThemeProvider>
  );
};

export const SizeDownProvider = createProvider(defaultTheme.sizeDown);
