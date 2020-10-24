import React, {useState} from 'react';
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import {makeStyles, createStyles, Theme} from '@material-ui/core';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import range from 'lodash/range';

import {
  DatePickerProps,
  OptionalDatePickerProps,
  CustomHeaderProps
} from "./DateTimePicker";
import {format, getMonth, getYear, isValid} from "date-fns";
import {DEFAULT_YEAR_DROPDOWN_ITEM} from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
    },
    datePicker: {
      position: 'relative',
      display: 'table-cell',
    },
    iconCalendar: {
      position: 'absolute',
      fontSize: '24px',
      right: '3px',
      top: '7px',
      zIndex: 2,
    },
    containerDateRange: {
      display: "flex",
    },
    startDate: {
      marginLeft: 2,
    },
    endDate: {
      marginLeft: 2,
    },
    popperContainer: {
      zIndex: theme.zIndex.tooltip,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate3d(0px, 36px, 0px)',
    },
    formControl: {
      display: 'block',
      height: 'calc(1em + 0.75rem + 2px)',
      padding: '0.375rem 0.75rem',
      fontSize:' 0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#353c48',
      backgroundColor: '#F9FAFC',
      backgroundClip: 'padding-box',
      border: '1px solid #DEE2E6',
      borderRadius: '0.25rem',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    },
    '.react-datepicker__input-container ': {
      '&::before': {
        left: '3px',
      }
    }
  }),
);
type TDatePicker = OptionalDatePickerProps & DatePickerProps;

const DatePicker: React.FC<TDatePicker> = ({
                                             dateFormat,
                                             onChange,
                                             useCustomHeader,
                                             yearDropdownItemNumber = DEFAULT_YEAR_DROPDOWN_ITEM,
                                           }) => {
  const classes = useStyles();
  const [isFocusDatePicker, setFocusDatePicker] = useState(false);
  const [value, setValue] = useState(new Date());

  const handleChangeDate = (date: Date) => {
    setFocusDatePicker(false);
    setValue(date);
  };

  return (
    <div className={classes.datePicker}>
      <ReactDatePicker
        className={classes.formControl}
        onChange={handleChangeDate}
        popperClassName={classes.popperContainer}
        selected={value}
      />
      <DateRangeOutlinedIcon className={classes.iconCalendar}/>
    </div>)
}

export default DatePicker;
