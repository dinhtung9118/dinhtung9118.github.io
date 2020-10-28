import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import { useI18n } from "../../stores/Locale/LocaleStore";
import CommonPage from "../CommonPage";
import ConsultationPatient from "./ConsultaionWrapper/patientList";
import DatePicker from "../../components/DatePicker";
import { doctor as repoDoctor } from "../../services/repos";
import { Data } from "../../services/repos/__mock__/__booking__";
import useAuthentication from "../../stores/AuthenticationsStore/authentication";
import { ISession, WorkingTime } from "../../models/workingTime";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(0),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    margin: {
      display: "flex",
      margin: theme.spacing(1),
    },
  }),
);

const defaultPropsBorder = {
  bgcolor: 'background.paper.light',
  borderColor: 'text.primary.light',
  m: 1,
  border: 3,
  style: { width: 8, height: 8 },
};

const ConsultationSchedule: React.FC = () => {
  const classes = useStyles();
  const i18n = useI18n();
  const { pages } = i18n;
  const [timeWorking, setTimeWorking] = React.useState('10');
  const [listWorkingtime, setListWorkingTime] = React.useState<ISession[]>([]);
  const [state] = useAuthentication();

  useEffect(() => {
    const payload = {
      doctorId: state.account.externalId,
      offset: 0,
      limit: 50,
      date: 1603818000000,
    }
    repoDoctor.getWorkingTime(payload).then((rs) => {
      console.log('response', rs);
      if (rs.data && rs.data.length > 0) {
        setListWorkingTime(rs?.data[0].sessions || [])
      }
    })
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeWorking(event.target.value as string);
  };

  const dataMappingFunction = (item: Data) => {
    return {
      ...item,
      status: (<Box display="flex" alignItems="center" justifyContent="flex-start">
        <Box
          {...defaultPropsBorder}
          borderRadius="50%"
          borderColor='text.primary.light'
          bgcolor="primary.main"
        />
        <Box>{item.status}</Box>
      </Box>)
    }
  }

  return (
    <>
      <Box mb={2} display="flex" alignItems="center"
           justifyContent="space-between">
        <Typography
          component="div">
          <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium">
            {pages.consultationSchedule.title}
          </Box>
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" alignItems="center">
            <Box mr={1}>
              <InputLabel>Date Consulting</InputLabel>
            </Box>
            <DatePicker name="Date"/>
          </Box>
          <Box minWidth={80} display="flex" alignItems="center" ml={2}>
            <InputLabel>Time Consulting</InputLabel>
            <FormControl className={classes.margin}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={timeWorking}
                onChange={handleChange}
                input={<BootstrapInput/>}
              >
                <MenuItem value={10}>All</MenuItem>
                {listWorkingtime.length > 0 && listWorkingtime.map((time) => {
                  const startTime = WorkingTime.minusFormat(time.from);
                  const endTime = WorkingTime.minusFormat(time.to);
                  return (
                    <MenuItem value={`${time.from}-${time.to}`}>{startTime} - {endTime}</MenuItem>
                  )
                })}

              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Paper className={classes.root}>
        <CommonPage
          dataMappingFunction={dataMappingFunction}
          query={repoDoctor.getBookings}
        >
          {ConsultationPatient}
        </CommonPage>
      </Paper>
    </>
  )
};

export default ConsultationSchedule
