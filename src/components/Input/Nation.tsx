import React, {useMemo} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField, TextFieldProps} from "@material-ui/core";
import {IValidError} from "untils";
import {useI18n} from "../../stores/Locale/LocaleStore";

const Nation: React.FC<Omit<TextFieldProps, "onChange" | "error"> & {
  onChange: (value?: string) => void;
  error?: IValidError;
}> = ({
        onChange,
        error,
        ...props
      }) => {
  const {
    config: {nations},
    component: {inputs},
  } = useI18n();
  const {errors = {}} = inputs.nation;

  const options = useMemo(() => Object.entries(nations), [nations]);

  return (
    <Autocomplete
      options={options}
      value={options.find(([value]) => value === props.value) || null}
      getOptionLabel={([, label]) => label}
      filterSelectedOptions
      onChange={(e, value) => onChange(value?.first)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label={inputs.nation.label}
          error={!!error}
          helperText={error ? errors[error] : ""}
          {...props}
        />
      )}
    />
  );
};

export default Nation;
