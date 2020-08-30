import React, { Props, useMemo, FormEvent, ChangeEvent } from "react";
import { Button, FormControl, TextField, Box } from "@material-ui/core";

interface IProps extends Props<any> {
  status?: "disable" | "error";
  onSubmit?: (username: string, password: string) => any;
}

export default ({ children, status, onSubmit }: IProps) => {
  const values = useMemo(() => ({ user: "", pass: "" }), []);

  const actions = useMemo(
    () => ({
      submit(e: FormEvent) {
        e.preventDefault();
      },
      userChanged(e: ChangeEvent<HTMLInputElement>) {
        values.user = e.currentTarget.value;
      },
      passChanged(e: ChangeEvent<HTMLInputElement>) {
        values.pass = e.currentTarget.value;
      },
    }),
    [values, onSubmit],
  );
  const isDisabled = status === "disable";
  const isError = status === "error";
  return (
    <Box component="form" onSubmit={actions.submit}>
      <FormControl fullWidth margin="dense">
        <TextField
          error={isError}
          disabled={isDisabled}
          label="useName"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="dense" variant="outlined">
        <TextField
          error={isError}
          disabled={isDisabled}
          label="password"
          variant="outlined"
          type="password"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isDisabled}
        >
          "Login"
        </Button>
      </FormControl>
      {children}
    </Box>
  );
};
