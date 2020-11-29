import React, { Props } from "react";
import { FormikBag, FormikProps, withFormik } from "formik";
import {
  TextareaAutosize,
  Grid,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {
  WorkPlace,
  Gender,
  AcademicRank,
  Nation,
  Nationality,
  Diseases,
  JobTitle,
} from "components/Input";
import AccountForm, { createAccountValidation } from "./base";
import { Specialty, IDoctor, Doctor, Clinic } from "models";
import { IValidError } from "utils";

import { useI18n } from "../../stores/Locale/LocaleStore";

export interface IFormDoctorProps {
  submit: (values: IDoctor) => Promise<void>;
  clinics?: Clinic[];
  specialties: Specialty[];
  data?: IDoctor;
  isEdit?: boolean;
}

const InsideDoctorForm = (
  props: FormikProps<IDoctor> & IFormDoctorProps & Props<any>,
) => {
  const {
    children,
    handleChange,
    values,
    errors,
    touched,
    validateForm,
    specialties,
  } = props;

  const {
    component: { doctorForm: i18nForm },
  } = useI18n();

  const errorCode = (key: keyof IDoctor) => {
    return touched[key] ? (errors[key] as IValidError) : undefined;
  };

  const renderSpecialtyTypeBox = () => {
    const isError = Boolean(errors.specialties && touched.specialties);
    console.log("values.workplace", values.workplace);
    return (
      <Autocomplete
        multiple
        options={specialties}
        value={values.specialties || []}
        getOptionLabel={(option) => option.name || option.specialtyType}
        filterSelectedOptions
        onChange={(e, value: Specialty[]) => {
          values.specialties = value;
          validateForm(values);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            label={i18nForm.specialties.label}
            error={isError}
            helperText={isError ? i18nForm.specialties.errors?.required : ""}
          />
        )}
      />
    );
  };

  return (
    <>
      <AccountForm {...props}>
        <Grid container spacing={2}>
          <FormControl margin="dense" component={Grid} item md={6}>
            <Gender
              row
              name="genderCode"
              value={values.genderCode || ""}
              onChange={handleChange}
              error={errorCode("genderCode")}
            />
          </FormControl>
          <FormControl
            margin="none"
            size="small"
            variant="outlined"
            fullWidth
            component={Grid}
            item
            md={6}
          >
            <AcademicRank
              name="academicRankCode"
              value={values.academicRankCode}
              error={errorCode("academicRankCode")}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            xs={6}
          >
            <JobTitle
              name="jobTitle"
              value={values.jobTitle}
              error={errorCode("jobTitle")}
              onChange={(value) => {
                values.jobTitle = value || "";
                validateForm(values);
              }}
            />
          </FormControl>
          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            md={6}
          >
            <Nation
              name="nationCode"
              value={values.nationCode}
              error={errorCode("nationCode")}
              onChange={(value) => {
                values.nationCode = value;
                validateForm(values);
              }}
            />
          </FormControl>
          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            md={6}
          >
            <Nationality
              name="nationalityCode"
              value={values.nationalityCode}
              error={errorCode("nationalityCode")}
              onChange={(value: any) => {
                values.nationalityCode = value;
                validateForm(values);
              }}
            />
          </FormControl>
          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            xs={12}
          >
            <WorkPlace
              name="workplace"
              value={values.workplace}
              error={errorCode("workplace")}
              onChange={(value) => {
                values.workplace = value || [];
                validateForm(values);
              }}
            />
          </FormControl>

          <FormControl
            margin="dense"
            size="small"
            variant="outlined"
            component={Grid}
            item
            xs={12}
          >
            <Diseases
              name="diseasesConsultantCode"
              value={values.diseasesConsultantCode}
              error={errorCode("diseasesConsultantCode")}
              onChange={(value) => {
                values.diseasesConsultantCode = value || [];
                validateForm(values);
              }}
            />
          </FormControl>

          <FormControl
            variant="outlined"
            margin="dense"
            component={Grid}
            item
            xs={12}
          >
            {renderSpecialtyTypeBox()}
          </FormControl>

          <FormControl component={Grid} item md={12}>
            <TextareaAutosize
              value={values.description}
              name="description"
              onChange={handleChange}
              title="description"
              placeholder="description"
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
    genderCode: { required: Boolean },
    nationCode: { required: Boolean },
    nationalityCode: { required: Boolean },
    academicRankCode: { required: Boolean },
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
