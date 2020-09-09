import React, { Props } from "react";
import { FormikBag, FormikProps, withFormik } from "formik";
import {
  TextareaAutosize,
  Grid,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";

import AccountForm, { createAccountValidation } from "./base";
import { Specialty, IDoctor, Doctor, Clinic } from "models";

export interface IFormDoctorProps {
  submit: (values: IDoctor) => Promise<void>;
  clinics: Clinic[];
  specialties: Specialty[];
  data?: IDoctor;
  isEdit?: boolean;
}

const InsideDoctorForm = (
  props: FormikProps<IDoctor> & IFormDoctorProps & Props<any>,
) => {
  const {
    touched,
    children,
    handleChange,
    values,
    errors,
  } = props;

  return (
    <>
      <AccountForm {...props}>
        <Grid container spacing={2}>
          <FormControl
            variant="outlined"
            margin="dense"
            component={Grid}
            item
            md={6}
          >
          </FormControl>
          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            md={6}
          >
          </FormControl>



          <FormControl fullWidth margin="dense" component={Grid} item md={12}>
            <TextField
              size="small"
              name="education"
              label={'education label'}
              placeholder={'education placeholder'}
              variant="outlined"
              disabled={false}
              color={"primary"}
              value={values.education}
              fullWidth
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            margin="dense"
            component={Grid}
            item
            xs={12}
          >
          </FormControl>

          <FormControl component={Grid} item md={12}>
            <TextareaAutosize
              value={values.note}
              name="note"
              onChange={handleChange}
              title='note'
              placeholder=''
              rowsMin={3}
              rowsMax={10}
              style={{ resize: "none" }}
            />
          </FormControl>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              submit
            </Button>
          </Grid>
        </Grid>
        {children}
      </AccountForm>
    </>
  );
};
const initialValue = new Doctor();
export default withFormik<IFormDoctorProps, IDoctor>({
  mapPropsToValues: (props) => ({
    ...initialValue,
    ...props.data,
  }),
  validate: createAccountValidation<IDoctor>({
    partner: { required: Boolean },
    genderCode: { required: Boolean },
    nationCode: { required: Boolean },
    nationalityCode: { required: Boolean },
    academicRank: { required: Boolean },
    education: { required: Boolean },
    specialties: { required: (list: any[]) => Boolean(list?.length) },
  }),
  handleSubmit: async (
    values: IDoctor,
    { props, setSubmitting }: FormikBag<IFormDoctorProps, IDoctor>,
  ) => {
    setSubmitting(true);
    await props.submit(values);
  },
  displayName: "DoctorForm",
})(InsideDoctorForm);
