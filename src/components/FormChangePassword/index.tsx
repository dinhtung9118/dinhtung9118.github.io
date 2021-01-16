import React from "react";
import {
  Button,
  FormControl,
  TextField,
  Box,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { ChangePasswordFormValues, ChangePasswordFormProps } from "./index.d";
import { FormikBag, FormikProps, withFormik } from "formik";

const initialValue = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const InsideFormChangePass: React.FC<
  FormikProps<ChangePasswordFormValues> & ChangePasswordFormProps
> = ({ values, errors, touched, handleChange, handleSubmit, handleClose }) => {
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <TextField
              type="password"
              error={!!(errors.currentPassword && touched.currentPassword)}
              label="Current Password"
              name="currentPassword"
              variant="outlined"
              value={values.currentPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined">
            <TextField
              type="password"
              error={!!(errors.newPassword && touched.newPassword)}
              label="New Password"
              name="newPassword"
              variant="outlined"
              value={values.newPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined">
            <TextField
              type="password"
              error={
                !!(errors.confirmNewPassword && touched.confirmNewPassword)
              }
              label="Confirm New Password"
              name="confirmNewPassword"
              variant="outlined"
              value={values.confirmNewPassword}
              onChange={handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Agree
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

const onSubmit = async (
  values: ChangePasswordFormValues,
  {
    setErrors,
    props,
    setSubmitting,
  }: FormikBag<ChangePasswordFormProps, ChangePasswordFormValues>,
) => {
  setSubmitting(true);
  await props.handleSubmit(values);
};

export default withFormik<ChangePasswordFormProps, ChangePasswordFormValues>({
  mapPropsToValues: () => ({
    ...initialValue,
  }),
  handleSubmit: onSubmit,
  displayName: "ChangePassForm",
})(InsideFormChangePass);
