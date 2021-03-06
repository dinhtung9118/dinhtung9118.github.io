import React, { useState } from "react";

import DatePicker from "react-datepicker";

type TimeRange = {
  from?: Date;
  to?: Date;
};

type RangeInlineProps = {
  onSelect?: (range: TimeRange) => any;
  monthsShown?: number;
  minDate?: Date;
};

export const RangeInline = ({
  onSelect,
  monthsShown = 2,
  minDate
}: RangeInlineProps) => {
  const [dates, setDates] = useState<TimeRange>({});
  const selecting = !!dates.from && !dates.to;
  return (
    <DatePicker
      selected={dates.from}
      startDate={dates.from}
      endDate={dates.to || dates.from}
      selectsStart={selecting}
      selectsEnd={selecting}
      monthsShown={monthsShown}
      disabledKeyboardNavigation
      minDate={minDate}
      inline
      onChange={(date: Date) => {
        if (!dates.from || (dates.from && dates.to)) {
          setDates({ from: date });
          onSelect?.({ from: date });
        } else if (!dates.to) {
          const range =
            date! > dates.from
              ? { ...dates, to: date! }
              : { from: date!, to: dates.from };
          setDates(range);
          onSelect?.({ ...range });
        }
      }}
    />
  );
};
