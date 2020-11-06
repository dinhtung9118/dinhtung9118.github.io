import React, { useMemo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, InputProps } from "@material-ui/core";
import { IValidError } from "untils";
import { useI18n } from "stores/Locale/LocaleStore";

export const Diseases = (
  props: Omit<InputProps, "onChange" | "error" | "value"> & {
    onChange: (value?: string[]) => void;
    error?: IValidError;
    value: string[];
  },
) => {
  const {
    config: { diseases },
    component: { inputs },
  } = useI18n();
  const { errors = {} } = inputs.diseases;

  const options = useMemo(() => Object.entries(diseases), [diseases]);

  const inValues = useMemo(
    () => options.filter(([value]) => props.value.includes(value)),
    [options, props.value],
  );

  return (
    <Autocomplete
      options={options}
      value={inValues}
      getOptionLabel={([, label]) => label}
      filterSelectedOptions
      multiple
      onChange={(e, values) => props.onChange(values?.map(([value]) => value))}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label={inputs.diseases.label}
          error={!!props.error}
          helperText={props.error ? errors[props.error] : ""}
        />
      )}
    />
  );
};
