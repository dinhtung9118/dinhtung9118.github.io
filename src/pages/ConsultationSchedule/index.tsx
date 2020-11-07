import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import {useI18n} from "../../stores/Locale/LocaleStore";
import CommonPage from "../CommonPage";
import ConsultationPatient from "./ConsultaionWrapper/patientList";
import {doctor as repoDoctor} from "../../services/repos";

import {BookingStatus} from "../../constants/enums";
import {Booking} from "../../models/booking";
import {RouteList} from "../../routeList";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
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

const defaultPropsBorder = {
  bgcolor: "background.paper.light",
  borderColor: "text.primary.light",
  m: 1,
  border: 3,
  style: {width: 8, height: 8},
};

const ConsultationSchedule: React.FC = () => {
  const classes = useStyles();
  const i18n = useI18n();
  const {pages} = i18n;
  const advanceFilterValue = ["start", "status", "type"];

  const mapStatusToColor = (status: BookingStatus | string) => {
    switch (status) {
      case BookingStatus.NEW:
        return "warning";
      case BookingStatus.COMPELETED:
        return "success";
      case BookingStatus.CONFIRMED:
        return "info";
      case BookingStatus.CANCELED:
        return "";
      default:
        return "";
    }
  };

  const dataMappingFunction = (item: Booking) => {
    return {
      ...item,
      name: (
        <Link
          className={classes.link}
          to={`${RouteList.bookingInfo}?bookingId=${item.id}`}
        >
          Patient Tung
        </Link>
      ),
      speciality: item.specialty?.name || "-",
      start: moment(item.start).format("hh:mm MM-DD-YYYY"),
      code: (
        <Link
          className={classes.link}
          to={`${RouteList.bookingInfo}?bookingId=${item.id}`}
        >
          MC_00
        </Link>
      ),
      status: (
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Box
            {...defaultPropsBorder}
            borderRadius="50%"
            borderColor={`${mapStatusToColor(item.status)}.light`}
            bgcolor={`${mapStatusToColor(item.status)}.main`}
          />
          <Box>{item.status}</Box>
        </Box>
      ),
    };
  };

  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography component="div">
          <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium">
            {pages.consultationSchedule.title}
          </Box>
        </Typography>
        <Link className={classes.link} to={RouteList.consultationCreate}> Create Schedule time
          consultation
        </Link>
      </Box>
      <Paper className={classes.root}>
        <CommonPage
          advanceFilterList={advanceFilterValue}
          dataMappingFunction={dataMappingFunction}
          query={repoDoctor.getBookings}
        >
          {ConsultationPatient}
        </CommonPage>
      </Paper>
    </>
  );
};

export default ConsultationSchedule;
