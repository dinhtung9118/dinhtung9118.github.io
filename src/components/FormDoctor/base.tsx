import React, { Props } from "react";
import { FormikProps } from "formik";
import { FormControl, TextField, Grid } from "@material-ui/core";
import { Account, IAccount } from "models";
import {
  IValidError,
  createValidation,
  IValidList,
  validations,
  I18nFormField
} from "utils";
import {useI18n} from "../../stores/Locale/LocaleStore";

const listFields: (keyof IAccount)[] = ["firstName", "lastName", "phoneNumber"];

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

  const {
    component: { accountForm: i18nForm },
  } = useI18n();

  const mapFieldToLangugage = (field: string) =>{
    switch (field) {
      case 'firstName':
        return i18nForm.firstName.label;
      case 'lastName':
        return i18nForm.lastName.label;
      case 'phoneNumber':
        return i18nForm.phoneNumber.label;
      default:
        return field
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {listFields.map((name) => {
          const value = values[name];
          const error = errors[name] as IValidError;
          const touch = touched[name];
          const isError = !!(error && touch);
          const label = mapFieldToLangugage(name);

          return (
            <FormControl key={name} margin="dense" component={Grid} item xs={6}>
              <TextField
                size="small"
                label={label}
                placeholder={label}
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
    // phoneNumber: { required: validations.requireString },
    ...list,
  });
}
