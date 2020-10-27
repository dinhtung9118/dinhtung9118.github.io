import React, {useEffect, useState} from "react"

import {Paper, Box, Button, useTheme} from '@material-ui/core';
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


interface IMapped {
  startDay: number,
  endDay: number,
  schedules: any[],
}

const SchedulesPage: React.FC = () => {
  const theme = useTheme();
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
  const [mapped, setMapped]= useState<IMapped>({
    startDay: 8,
    endDay: 18,
    schedules: [],
  });
  const [state] = useAuthentication();
  const payload = {
    doctorId: state.account.externalId,
    offset: 0,
    limit: 50,
    // date: timeExpired,
  };
  const data = useApi(() => repoDoctor.getWorkingTime(payload));

  useEffect(() => {

    if (data) {
      let startDay = 8;
      let endDay = 18;

      const schedules = WorkingTime
        .toSchedule(data.data || [])
        .map((s) => {
          console.log('ssssss=>', s);
          const start = (s.startDate as Date).getHours();
          const end = (s.endDate as Date).getHours() + 1;
          if (startDay > start) startDay = start;
          if (endDay < end) endDay = end;
          return {...s, status: s.data.status}
        }) ;

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
    repoDoctor.updateWorkingTime(sessionWorking);
  };

  const renderDetailSession = (props: any) => {
    const workingTime: WorkingTime = props.appointmentData?.data;
    if(workingTime && !workingTime.sessions) return (<></>);
    console.log(workingTime.sessions[0].from);
    console.log(workingTime.sessions[0].to);
    const startTime = WorkingTime.minusFormat(workingTime.sessions[0].from || 0) || '';
    const endTime = WorkingTime.minusFormat(workingTime.sessions[0].to || 0) || '';
    console.log('props', workingTime);
    return (
      <Box p={2}>
        <Box alignItems="center" display="flex" flexDirection="row" mb={1}>
          <Box width="1.5em" height="1.5em" bgcolor={workingTime.status === "ACTIVE"?
            'success.main':
            'text.disabled'
          } borderRadius="50%" />
          <Box ml={1}>{moment(workingTime.date).format('DD MMMM YYYY')}</Box>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mr={1}>
            <AccessTimeIcon />
          </Box>
          <Box>{startTime} - {endTime}</Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained"
                  color={workingTime.status === ModelStatus.INACTIVE ?'primary':'default'}
                  onClick={() => handlerChangeStatusSessions(workingTime)}>
            {workingTime.status === ModelStatus.ACTIVE ? "Inactive" : "Active"}
          </Button>
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
