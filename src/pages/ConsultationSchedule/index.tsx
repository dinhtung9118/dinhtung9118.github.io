import React from 'react';
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
import {useI18n} from "../../stores/Locale/LocaleStore";
import CommonPage from "../CommonPage";
import ConsultationPatient from "./ConsultaionWrapper/patientList";
import DatePicker from "../../components/DatePicker";

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

const ConsultationSchedule: React.FC = () => {
  const classes = useStyles();
  const i18n = useI18n();
  const {pages} = i18n;
  const [timeWorking, setTimeWorking] = React.useState('10');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeWorking(event.target.value as string);
  };
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
                <MenuItem value={20}>8:00 -12:00</MenuItem>
                <MenuItem value={30}>2:00 -18:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Paper className={classes.root}>
        <CommonPage>
          {ConsultationPatient}
        </CommonPage>
      </Paper>
    </>
  )
};

export default ConsultationSchedule
