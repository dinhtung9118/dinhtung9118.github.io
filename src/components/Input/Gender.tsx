import React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  RadioGroupProps,
  FormHelperText,
  FormLabel,
  Box,
} from "@material-ui/core";
import {IValidError} from 'untils'

import {useI18n} from "stores/Locale/LocaleStore";

const Gender:React.FC<RadioGroupProps & { error?: IValidError }> = ({error,...props}) => {
  const {
    config: {gender},
    component: {inputs},
  } = useI18n();
  const { errors = {} } = inputs.gender;
  return (
      <>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <FormLabel error={!!error}>{inputs.gender.label}</FormLabel>
          <Box pr={2} />
          <RadioGroup {...props}>
            {Object.entries(gender).map(([key, label]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio size="small" />}
                label={label}
              />
            ))}
          </RadioGroup>
        </Box>
        {error && (
          <FormHelperText error={!!error} style={{ textAlign: "right" }}>
            {errors[error]}
          </FormHelperText>
        )}
      </>
  )
};

export default Gender;
