import React, { useMemo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, TextFieldProps } from "@material-ui/core";
import { IValidError } from "utils";
import { useI18n } from "stores/Locale/LocaleStore";

export const JobTitle = ({
  onChange,
  error,
  ...props
}: Omit<TextFieldProps, "onChange" | "error"> & {
  onChange: (value?: string) => void;
  error?: IValidError;
}) => {
  const {
    config: { jobTitle },
    component: { inputs },
  } = useI18n();
  const { errors = {} } = inputs.jobTitle;

  const options = useMemo(() => Object.entries(jobTitle), [jobTitle]);

  return (
    <Autocomplete
      options={options}
      value={options.find(([value]) => value === props.value) ?? null}
      getOptionLabel={([, label]) => label}
      filterSelectedOptions
      onChange={(e, value) => onChange(value?.first)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label={inputs.jobTitle.label}
          error={!!error}
          helperText={error ? errors[error] : ""}
          {...props}
        />
      )}
    />
  );
};
