import React, {useEffect, useState} from "react"
import {Link} from 'react-router-dom'

import {
  Paper,
  Box,
  Button,
  FormControlLabel,
  Switch,
  useTheme,
  Theme,
  makeStyles
} from '@material-ui/core';
import moment from "moment";
import {
  doctor as repoDoctor,
} from "services/repos";
import {useApi} from "../../stores/UseApi/useApi";
import useAuthentication
  from "stores/AuthenticationsStore/authentication";
import {WorkingTime} from "models/workingTime";
import {
  Scheduler,
  WeekView,
  Appointments,
  DateNavigator,
  TodayButton,
  Toolbar,
  AppointmentTooltip,
  CurrentTimeIndicator,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import {ViewState} from "@devexpress/dx-react-scheduler";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {AccountStatus, ModelStatus} from "../../models";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {RouteList} from "../../routeList";


interface IMapped {
  startDay: number,
  endDay: number,
  schedules: any[],
}

const useStyles = makeStyles((theme: Theme) => ({
  link:{
    textDecoration: 'none',
    color: theme.palette.primary.main,
  }
}));

const SchedulesPage: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const resourcesData = [
    {
      text: 'Active',
      id: AccountStatus.ACTIVE,
      color: theme.palette.success.main,
    }, {
      text: 'Inactive',
      id: AccountStatus.INACTIVE,
      color: theme.palette.text.disabled,
    },
  ];
  const [currentDate, setCurrentDate] = React.useState(() => new Date());
  const [mapped, setMapped] = useState<IMapped>({
    startDay: 8,
    endDay: 18,
    schedules: [],
  });
  const [state] = useAuthentication();
  const [active, setActive] = useState(false);
  const [data, setData] = useState<WorkingTime[]>();
  const payload = {
    doctorId: state.account.externalId,
    offset: 0,
    limit: 50,
    // date: timeExpired,
  };


  const dataRs = useApi(() => repoDoctor.getWorkingTime(payload));
  useEffect(()=>{
    dataRs && setData(dataRs.data)
  }, [dataRs]);

  useEffect(() => {
    console.log('useEffect1');
    if (data) {
      let startDay = 8;
      let endDay = 18;

      const schedules = WorkingTime
        .toSchedule(data || [])
        .map((s) => {
          console.log('ssssss=>', s);
          const start = (s.startDate as Date).getHours();
          const end = (s.endDate as Date).getHours() + 1;
          if (startDay > start) startDay = start;
          if (endDay < end) endDay = end;
          return {...s, status: s.data.status}
        });
      console.log('useEffect 2');
      setMapped({
        startDay,
        endDay,
        schedules,
      })
    }
  }, [data]);

  const resources = [
    {
      fieldName: 'status',
      instances: resourcesData,
    },
  ];

  const handlerChangeStatusSessions = (sessionWorking: WorkingTime) => {
    setActive(!active);
    repoDoctor.updateWorkingTime(sessionWorking).then((rs) => {

      const newWorkingTime = data || [];
      const indexOfScheduleUpdate = newWorkingTime.findIndex((value) => rs.id === value.id);
      if (newWorkingTime?.length > 0 && indexOfScheduleUpdate !== -1) {
        newWorkingTime[indexOfScheduleUpdate] = rs;
        setData([...newWorkingTime])
      }
    });
  };

  const renderDetailSession = (props: any) => {
    const workingTime: WorkingTime = props.appointmentData?.data;
    const readOnly = new Date().getTime() > new Date(workingTime.date).getTime() + workingTime.sessions[0].to;
    if (workingTime && !workingTime.sessions) return (<></>);
    const startTime = WorkingTime.minusFormat(workingTime.sessions[0].from || 0) || '';
    const endTime = WorkingTime.minusFormat(workingTime.sessions[0].to || 0) || '';
    console.log('props', workingTime);
    setActive(workingTime.status === ModelStatus.ACTIVE);
    return (
      <Box p={2}>
        <Box alignItems="center" display="flex" flexDirection="row" mb={1}>
          <Box width="1.5em" height="1.5em"
               bgcolor={workingTime.status === "ACTIVE" ?
                 'success.main' :
                 'text.disabled'
               } borderRadius="50%"/>
          <Box ml={1}>{moment(workingTime.date).format('DD MMMM YYYY')}</Box>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mr={1}>
            <AccessTimeIcon/>
          </Box>
          <Box>{startTime} - {endTime}</Box>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mr={1}>
            <AssignmentIndIcon/>
          </Box>
          <Link
            className={classes.link}
           to={`${RouteList.consultationSchedule}?date=${workingTime.date}`}>
            Go to Consultation Schedule</Link>
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={active}
                disabled={readOnly}
                onChange={() => handlerChangeStatusSessions(workingTime)}
                name="activeWorking"
                color="secondary"
              />
            }
            label={workingTime.status === ModelStatus.ACTIVE ? "Active" : "Inactive"}
          />
        </Box>
      </Box>)
  }

  return (<Paper>
      <Scheduler
        data={mapped.schedules}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />

        <Toolbar
          flexibleSpaceComponent={() => (
            <>
              <Box flex={1}/>
            </>
          )}
        />
        <WeekView
          key={currentDate.toString()}
          startDayHour={mapped.startDay}
          endDayHour={mapped.endDay}
        />
        <DateNavigator/>
        <TodayButton/>
        <Appointments/>
        <Resources
          data={resources}
          mainResourceName="status"
        />
        <AppointmentTooltip
          contentComponent={(props) => renderDetailSession(props)}
        />
        <CurrentTimeIndicator
          shadePreviousCells
          shadePreviousAppointments
          updateInterval={10000}
        />
      </Scheduler>
    </Paper>
  )
};

export default SchedulesPage;