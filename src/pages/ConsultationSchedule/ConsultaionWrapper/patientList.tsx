import React, { useEffect, useState } from "react";
import {
  TablePagination,
  makeStyles,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  withStyles,
  Theme,
  createStyles,
  InputBase,
} from "@material-ui/core";

import { ChildrenProps } from "../../CommonPage/CommonPage";
import CommonTable from "components/Table";
import { TitleWithClassName } from "components/Table/Table";
import { WorkingTime } from "models/workingTime";
import DatePicker from "components/DatePicker";
import { BookingStatus } from "../../../constants/enums";
import { ISession } from "../../../models/workingTime";
import { configTimeDate, getDateTimeNumber } from "../../../utils/Date";
import { doctor as repoDoctor } from "../../../services/repos";
import useAuthentication from "../../../stores/authenticationsStore/authentication";
import { useLocation } from "react-router";
import get from "lodash/get";
import { parse } from "querystring";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 550,
    },
    margin: {
      display: "flex",
      margin: theme.spacing(1),
    },
    link: {
      textDecoration: "none",
    },
  }),
);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(0),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }),
)(InputBase);

const ConsultationPatient: React.FC<ChildrenProps> = ({
  data,
  totals,
  handleOnAddAdvanceFilterField,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const search = location.search.replace("?", "");
  const dateParam = get(parse(search), "date", "") as string;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listWorkingtime, setListWorkingTime] = useState<ISession[]>([]);
  const [currentBookingType, setBookingType] = useState<string>("CONSULTATION");
  const [currentBookingStatus, setBookingStatus] = useState<string>(
    BookingStatus.NEW,
  );
  const [timeWorking, setTimeWorking] = useState<string | number>("all");
  const [selectDate, setSelectDate] = useState(new Date());
  const [state] = useAuthentication();
  const listBookingStatus = [
    { value: BookingStatus.NEW, lable: "New" },
    { value: BookingStatus.CONFIRMED, lable: "Confirmed" },
    { value: BookingStatus.OUT_OF_DATE, lable: "Out of Date" },
    { value: BookingStatus.CANCELED, lable: "Canceled" },
    { value: BookingStatus.COMPELETED, lable: "Compeleted" },
  ];

  const titleList: TitleWithClassName[] = [
    {
      className: "",
      cellRender: "ID",
      align: "left",
      minWidth: 120,
    },
    {
      className: "",
      cellRender: "Name Patient",
      align: "left",
      minWidth: 120,
    },
    {
      className: "",
      cellRender: "Code Patient Consultation",
      align: "left",
      minWidth: 120,
    },
    {
      className: "",
      cellRender: "Specitialy",
      align: "left",
      minWidth: 120,
    },
    {
      className: "",
      cellRender: "Time Consultation",
      align: "left",
      minWidth: 120,
    },
    {
      className: "",
      cellRender: "Status",
      align: "left",
      minWidth: 120,
    },
  ];
  const pathList = ["id", "name", "code", "speciality", "start", "status"];

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};
  useEffect(() => {
    dateParam && setSelectDate(new Date(dateParam));
  }, [dateParam]);
  useEffect(() => {
    const payload = {
      doctorId: state.account.externalId,
      offset: 0,
      limit: 250,
      date: getDateTimeNumber(selectDate),
    };
    repoDoctor.getWorkingTime(payload).then((rs) => {
      if (rs.data && rs.data.length > 0) {
        setListWorkingTime(rs?.data || []);
      }
    });
  }, []);

  const getStartTime = () => {
    const hours = Number(Math.floor(Number(timeWorking) / 60).pad(2));
    const min = Number((Number(timeWorking) % 60).pad(2));
    const totalTime = hours * 60 * 60 + min * 60;
    return getDateTimeNumber(selectDate) + totalTime * configTimeDate;
  };

  useEffect(() => {
    handleOnAddAdvanceFilterField &&
      handleOnAddAdvanceFilterField([
        {
          label: "status",
          value: currentBookingStatus,
        },
        {
          label: "type",
          value: currentBookingType,
        },
        {
          label: "start",
          value: timeWorking === "all" ? "all" : getStartTime(),
        },
      ]);
  }, [currentBookingStatus, selectDate, currentBookingType, timeWorking]);

  const handlerOnChangeDateTime = (
    date: Date,
    e: React.SyntheticEvent<any> | undefined,
  ) => {
    setSelectDate(date);
  };

  const handleChangeTime = (
    event: React.ChangeEvent<{ value: unknown | unknown }>,
  ) => {
    setTimeWorking(event.target.value as string);
  };
  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBookingStatus(event.target.value as string);
  };

  return (
    <>
      <Box ml={1} display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box minWidth={80} display="flex" alignItems="center" ml={2}>
            <InputLabel>Status:</InputLabel>
            <FormControl className={classes.margin}>
              <Select
                labelId="status-booking-label"
                id="status-booking-select"
                value={currentBookingStatus}
                onChange={handleChangeStatus}
                input={<BootstrapInput />}
              >
                <MenuItem value="all">All</MenuItem>
                {listBookingStatus.length > 0 &&
                  listBookingStatus.map((status) => {
                    return (
                      <MenuItem value={status.value}>{status.lable}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" alignItems="center">
            <Box mr={1}>
              <InputLabel>Date Consulting</InputLabel>
            </Box>
            <DatePicker
              name="Date"
              dateValue={selectDate}
              onChange={handlerOnChangeDateTime}
            />
          </Box>
          <Box minWidth={80} display="flex" alignItems="center" ml={2}>
            <InputLabel>Time Consultations</InputLabel>
            <FormControl className={classes.margin}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={timeWorking}
                onChange={handleChangeTime}
                input={<BootstrapInput />}
              >
                <MenuItem value="all">All</MenuItem>
                {listWorkingtime.length > 0 &&
                  listWorkingtime.map((time) => {
                    const startTime = WorkingTime.minusFormat(time.from);
                    const endTime = WorkingTime.minusFormat(time.to);
                    return (
                      <MenuItem value={time.from}>
                        {startTime} - {endTime}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <CommonTable
        className={classes.container}
        data={data || []}
        pathList={pathList}
        titleList={titleList}
        stickyHeader={true}
      />
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ConsultationPatient;
