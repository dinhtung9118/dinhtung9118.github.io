import React, { Props } from "react";
import { FormikProps } from "formik";
import {
  FormControl,
  TextField,
  FormControlLabel,
  Switch,
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
  "email",
  "password",
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
    validateForm,
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
        <FormControl component={Grid} item xs={6}>
          <FormControlLabel
            control={
              <Switch
                name="status"
                color="primary"
                checked={Account.statusToBool(values.status)}
                onChange={(e) => {
                  values.status = Account.statusFromBool(e.target.checked);
                  validateForm(values);
                }}
              />
            }
            label={
              Account.statusToBool(values.status)
                ? 'active'
                : 'inactive'
            }
          />
        </FormControl>
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
    email: { required: validations.requireString, pattern: validations.email },
    password: { required: validations.requireString },
    phoneNumber: { required: validations.requireString },
    ...list,
  });
}
