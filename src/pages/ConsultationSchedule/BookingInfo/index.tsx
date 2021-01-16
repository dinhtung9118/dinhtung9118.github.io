import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { parse } from "querystring";
import { deepOrange } from "@material-ui/core/colors";
import {
  Avatar,
  Paper,
  Box,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import get from "lodash/get";

import { Booking } from "models/booking";
import { useLoader } from "stores/Loader";
import { doctor as repoDoctor, patient as repoPatient } from "services/repos";
import { Patient } from "models/patient";
import { BookingStatus } from "constants/enums";
import { CloseButton } from "components/Notistack";
import { useSnackbar } from "notistack";
import { RouteList } from "../../../routeList";

const defaultPropsBorder = {
  bgcolor: "background.paper.light",
  borderColor: "text.primary.light",
  m: 1,
  border: 3,
  style: { width: 8, height: 8 },
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  square: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  ctaAction: {
    display: "flex",
  },
  btnCancel: {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
  btnStatus: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const BookingInfo: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const search = location.search.replace("?", "");
  const [, loader] = useLoader();
  const [bookingData, setBookingData] = useState<Booking>();
  const [patient, setPatient] = useState<Patient>();
  const bookingId = get(parse(search), "bookingId", "") as string;

  useEffect(() => {
    if (bookingId) {
      loader.push(
        repoDoctor.getBookingInfo(bookingId).then((rs) => {
          setBookingData(new Booking(rs));
          if (rs && rs.userId) {
            loader.push(
              repoPatient.single(rs.patient || rs.userId).then((rs_p) => {
                setPatient(rs_p);
              }),
            );
          }
        }),
      );
    }
  }, []);

  const mapStatusToColor = (status: BookingStatus | undefined) => {
    console.log('bookingData', bookingData);
    debugger
    if (!status) return "";
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

  const handleChangeStatus = (status: BookingStatus | undefined) => {
    if (!status) return "";
    const payload = {
      status: status,
      notes: "complete",
      // cancelReason: "off",
    };
    repoDoctor
      .updateStatusBooking(bookingData!.id, payload)
      .then((rs) => {
        setBookingData(rs);
        enqueueSnackbar(
          <CloseButton name={"success"} message="Change Status Successfull!" />,
          {
            key: "success",
            variant: "success",
          },
        );
      })
      .catch((e) => {
        enqueueSnackbar(<CloseButton name={"error"} message={e?.message} />, {
          key: "success",
          variant: "error",
        });
      });
  };

  const handleReExmination = () => {
    history.push({
      pathname: RouteList.schedules,
      search: `?bookingId=${bookingData?.id}`,
    });
  };

  return (
    <>
      {bookingData && patient && (
        <Paper className={classes.root}>
          <Box>
            <Grid container>
              <Grid item md={4}>
                <Box alignItems="flex-start" display="flex">
                  <Box mr={3}>
                    <Avatar
                      variant="square"
                      className={classes.square}
                      src={patient?.avatar}
                    >
                      N
                    </Avatar>
                  </Box>
                  <Box>
                    <Box>Name: {patient?.fullName}</Box>
                    <Box>Emai: {patient?.email}</Box>
                    <Box display="flex" alignItems="center">
                      Status:
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Box
                          {...defaultPropsBorder}
                          borderRadius="50%"
                          borderColor={`${mapStatusToColor(
                            bookingData?.status,
                          )}.light`}
                          bgcolor={`${mapStatusToColor(
                            bookingData?.status,
                          )}.main`}
                        />
                        <Box>{bookingData?.status}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                className={`${classes.ctaAction}`}
                item
                md={8}
                justify="flex-end"
                alignItems={"flex-start"}
              >
                <Box>
                  <Button
                    className={classes.btnCancel}
                    onClick={() => handleChangeStatus(BookingStatus.CANCELED)}
                  >
                    <Box ml={1}>
                      <Box>Cancele</Box>
                    </Box>
                  </Button>
                  {bookingData?.status === BookingStatus.NEW && (
                    <Button
                      className={classes.btnStatus}
                      onClick={() =>
                        handleChangeStatus(BookingStatus.CONFIRMED)
                      }
                    >
                      <Box ml={1}>
                        <Box>Confirm</Box>
                      </Box>
                    </Button>
                  )}
                  {bookingData?.status === BookingStatus.CONFIRMED && (
                    <Button
                      className={classes.btnStatus}
                      onClick={() =>
                        handleChangeStatus(BookingStatus.PROCESSING)
                      }
                    >
                      <Box ml={1}>
                        <Box>PROCESSING</Box>
                      </Box>
                    </Button>
                  )}
                  {bookingData?.status === BookingStatus.PROCESSING && (
                    <Button
                      className={classes.btnStatus}
                      onClick={() =>
                        handleChangeStatus(BookingStatus.COMPELETED)
                      }
                    >
                      <Box ml={1}>
                        <Box>Compeleted</Box>
                      </Box>
                    </Button>
                  )}
                  <Button
                    className={classes.btnStatus}
                    onClick={handleReExmination}
                  >
                    <Box ml={1}>
                      <Box>Đăt lịch tái Khám</Box>
                    </Box>
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Box mt={2} mb={1}>
                Info Detail
              </Box>
              <Box display="flex">
                <Box minWidth={200} mr={5}>
                  <Box pt={1} pb={1}>
                    Time Consultation:
                  </Box>
                  <Box pt={1} pb={1}>
                    Patient need Consulting
                  </Box>
                  <Box pt={1} pb={1}>
                    Patient notes
                  </Box>
                </Box>
                <Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    14:30 - 22/10/2020
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    {bookingData.diseaseCodes.join(", ")}
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    {bookingData.description}
                  </Box>
                </Box>
              </Box>
              <Box mt={2} mb={1}>
                More Info
              </Box>
              <Box display="flex">
                <Box minWidth={200} mr={5}>
                  <Box pt={1} pb={1}>
                    Allergy:
                  </Box>
                  <Box pt={1} pb={1}>
                    Height:
                  </Box>
                  <Box pt={1} pb={1}>
                    Weight:{" "}
                  </Box>
                  <Box pt={1} pb={1}>
                    Patient:{" "}
                  </Box>
                  <Box pt={1} pb={1}>
                    Patient:{" "}
                  </Box>
                  <Box pt={1} pb={1}>
                    Last Re-examination:{" "}
                  </Box>
                </Box>
                <Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    Sea Food
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    170 cm
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    57 kg
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    DO NOT use tobacco
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    DO NOT use stimulants (alcohol, beer ...)
                  </Box>
                  <Box pt={1} pb={1}>
                    {" "}
                    14:30 - 12/9/2020
                  </Box>
                </Box>
              </Box>
              <Box>More Image</Box>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default BookingInfo;
