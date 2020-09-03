import React from "react";
import { Button, FormControl, TextField, Box } from "@material-ui/core";
import {LoginFormValues, LoginFormProps} from './index.d'
import {FormikBag, FormikProps, withFormik} from "formik";

const initialValue = {
  email: '',
  password:''
}

const InsideFormLogin:React.FC<FormikProps<LoginFormValues> & LoginFormProps> = ({values,errors,touched, handleChange,handleSubmit}) => {
  return (
    <Box component="form" >
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="dense">
          <TextField
            error={!!(errors.email && touched.email)}
            label="email"
            name="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="dense" variant="outlined">
          <TextField
            error={!!(errors.password && touched.password)}
            label="password"
            name="password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            "Login"
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

const onSubmit = async (
  values: LoginFormValues,
  {
    setErrors,
    props,
    setSubmitting,
  }: FormikBag<LoginFormProps, LoginFormValues>,
) => {
  setSubmitting(true);
  await props.submit(values);
};

export default withFormik<LoginFormProps, LoginFormValues>({
  mapPropsToValues: () => ({
    ...initialValue,
  }),
  handleSubmit: onSubmit,
  displayName: "LoginForm",
})(InsideFormLogin);
