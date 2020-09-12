import React from "react";
import {
  Select,
  MenuItem,
  SelectProps,
  InputLabel,
  Box,
  FormHelperText,
} from "@material-ui/core";
import {IValidError} from "untils";
import {useI18n} from "stores/Locale/LocaleStore";

const AcademicRank: React.FC<Omit<SelectProps, "error"> & { error?: IValidError }> = ({
                                                                                        error,
                                                                                        ...props
                                                                                      }) => {
  const {
    config: {academicLevel},
    component: {
      inputs: {academicRank},
    },
  } = useI18n();

  const {errors = {}} = academicRank;

  return (
    <>
      <InputLabel error={!!error}>{academicRank.label}</InputLabel>
      <Box height="0px" visibility="hidden" px={4}>
        {academicRank.label}
      </Box>
      <Select
        name="academicRank"
        color="primary"
        label={academicRank.label}
        placeholder={academicRank.placeholder}
        error={!!error}
        {...props}
        value={props.value || ""}
      >
        {Object.entries(academicLevel).map(([key, label]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText error={!!error}>{errors[error]}</FormHelperText>
      )}
    </>
  );
};

export default AcademicRank;
