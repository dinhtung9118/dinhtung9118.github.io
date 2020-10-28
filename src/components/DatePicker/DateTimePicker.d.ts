import { FieldValidator } from 'formik';
import { ReactDatePickerProps } from 'react-datepicker';

/**
 * The origin props of react-datepicker which will be used as options
 */
export interface OptionalDatePickerProps extends ReactDatePickerProps {
  onChange?(date: Date | null, event: React.SyntheticEvent<any> | undefined): void;
}

/**
 * Properties of DatePicker component in project that OptionalDatePickerProps did not include.
 */
export interface DatePickerProps {
  name: string;
  showTimeInput?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  validate?: FieldValidator;
  placeholder?: string;
  dateFormat?: string;
  readOnly?: boolean;
  disabled?: boolean;
  isShowYearPicker?: boolean;
  useCustomHeader?: boolean;
  dataValue?: Date;
}

export interface CustomHeaderProps {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

