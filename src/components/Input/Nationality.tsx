import React, {useMemo} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField, InputProps} from "@material-ui/core";
import {IValidError} from "untils";
import {useI18n} from "stores/Locale/LocaleStore";

const Nationality: React.FC<Omit<InputProps, "onChange" | "error"> & {
  onChange: (value?: string) => void;
  error?: IValidError;
}> = (
  {...props}
) => {
  const {
    config: {nationality},
    component: {inputs},
  } = useI18n();
  const {errors = {}} = inputs.nationality;

  const options = useMemo(() => Object.entries(nationality), [nationality]);

  return (
    <Autocomplete
      options={options}
      value={options.find(([value]) => value === props.value) || null}
      getOptionLabel={([, label]) => label}
      filterSelectedOptions
      onChange={(e, value) => props.onChange(value?.first)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label={inputs.nationality.label}
          error={!!props.error}
          helperText={props.error ? errors[props.error] : ""}
        />
      )}
    />
  );
};

export default Nationality;
