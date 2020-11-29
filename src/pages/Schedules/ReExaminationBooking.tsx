import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Divider,
  Avatar,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { Booking } from "../../models/booking";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { parse } from "querystring";
import {
  doctor as repoDoctor,
  patient as repoPatient,
} from "../../services/repos";
import { makeStyles } from "@material-ui/core";
import { WorkingTime } from "../../models";
import { Patient } from "../../models/patient";
import { BookingTypes } from "../../constants/enums";
import moment from "moment";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    background: theme.palette.common.white,
    width: 600,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const ReExaminationBooking: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const search = location.search.replace("?", "");
  const [bookingData, setBookingData] = useState<Booking>();
  const [workingTime, setWorkingTime] = useState<WorkingTime>();
  const [patient, setPatient] = useState<Patient>();
  const [noteDoctor, setNoteDoctor] = useState<string>("");
  const history = useHistory();
  const bookingId = get(parse(search), "bookingId", "") as string;
  const workingTimeState: WorkingTime = get(
    location,
    "state.workingTime",
    new WorkingTime(),
  );
  useEffect(() => {
    if (workingTimeState && !isEmpty(workingTimeState)) {
      setWorkingTime(workingTimeState);
    }
  }, [workingTimeState]);
  useEffect(() => {
    if (bookingId) {
      repoDoctor.getBookingInfo(bookingId).then((rs) => {
        setBookingData(rs);
        if (rs && rs.userId) {
          repoPatient.single(rs.patient || rs.userId).then((rs_p) => {
            setPatient(rs_p);
          });
        }
      });
    }
  }, [bookingId]);

  const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteDoctor(e.target?.value);
  };

  const handelSubmit = () => {
    const time = moment(workingTime?.date).toDate().getTime();
    const timeStart = time + (workingTime?.from || 0) * 60 * 1000;
    const timeEnd = time + (workingTime?.to || 0) * 60 * 1000;
    const newReExamination = {
      notes: noteDoctor,
      description: bookingData?.description,
      type: BookingTypes.RE_EXAMINATION,
      patientId: bookingData?.patient,
      doctorId: bookingData?.doctor?.id,
      partnerId: bookingData?.partner?.id,
      specialtyId: bookingData?.specialty.id,
      start: timeStart,
      end: timeEnd,
      hasMedicalInsurance: true,
      diseaseCodes: bookingData?.diseaseCodes,
      additionalData: bookingData?.additionalData || {},
      serialId: bookingData?.serialId,
    };
    repoDoctor.reExaminationBooking(newReExamination);
  };

  return (
    <Container className={classes.root}>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box fontSize={24} fontWeight={500}>
          Phieu tai kham
        </Box>
        <Box>
          <Button color="primary" onClick={() => handelSubmit()}>
            Save
          </Button>
        </Box>
      </Box>
      <Box display="flex" mt={2} mb={2}>
        <Box>
          <Avatar alt="Remy Sharp" src={patient?.avatar} />
        </Box>
        <Box ml={2}>
          <Box>{`Họ tên: ${patient?.fullName}`}</Box>
          <Box>{`Email: ${patient?.email}`}</Box>
        </Box>
      </Box>
      <Divider />
      <Box mt={2} mb={2}>
        <Box mb={1}>Thong tin tai kham</Box>
        <Box mb={1}>
          <Box>{`Ngày tái Khám: ${workingTime?.date}`}</Box>
          <Box>{`Thời gian dự kiến bắt đầu: ${WorkingTime.minusFormat(
            workingTime?.from || 0,
          )}`}</Box>
          <Box>{`Thời gian dự kiến kết thúc: ${WorkingTime.minusFormat(
            workingTime?.to || 0,
          )}`}</Box>
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth={true}
            id="outlined-multiline-static"
            label="Lời nhắn Bác sỹ"
            multiline
            rows={4}
            value={noteDoctor}
            onChange={handleChangeNote}
            placeholder="Nhập lời nhắn"
            variant="outlined"
          />
        </Box>
      </Box>
      <Divider />
      <Box>
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
                stomach pain
              </Box>
              <Box pt={1} pb={1}>
                {" "}
                FormGroup is a helpful wrapper used to group selection controls
                components that provides an easier API. However, you are
                encouraged you to use Checkboxes instead if multiple related
                controls are required. (See: When to use).
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
    </Container>
  );
};

export default ReExaminationBooking;
