import React, { Props } from "react";
import { FormikProps } from "formik";
import {
  FormControl,
  TextField,
  Grid,
} from "@material-ui/core";
import { Account, IAccount } from "models";
import {
  IValidError,
  createValidation,
  IValidList,
  validations,
} from "untils";

const listFields: (keyof IAccount)[] = [
  "firstName",
  "lastName",
  "phoneNumber",
];

export default function AccountForm<T extends IAccount>(
  props: FormikProps<T> & Props<any>,
) {
  const {
    children,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {listFields.map((name) => {
          const value = values[name];
          const error = errors[name] as IValidError;
          const touch = touched[name];
          const isError = !!(error && touch);

          return (
            <FormControl key={name} margin="dense" component={Grid} item xs={6}>
              <TextField
                size="small"
                label={name}
                placeholder={name}
                variant="outlined"
                color={"primary"}
                name={name}
                value={value}
                onChange={handleChange}
                error={isError}
                helperText={isError ? error : ""}
              />
            </FormControl>
          );
        })}
      </Grid>
      {children}
    </form>
  );
}

export function createAccountValidation<T extends IAccount>(
  list: IValidList<Omit<T, keyof Account>> = {},
) {
  return createValidation<T>({
    firstName: { required: validations.requireString },
    lastName: { required: validations.requireString },
    phoneNumber: { required: validations.requireString },
    ...list,
  });
}
