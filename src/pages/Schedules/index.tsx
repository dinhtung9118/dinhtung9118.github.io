import React, {useEffect, useMemo, useState} from "react"

import {Paper, Box, Button} from '@material-ui/core';
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
  AppointmentForm
} from "@devexpress/dx-react-scheduler-material-ui";

import {ViewState} from "@devexpress/dx-react-scheduler";
import {AccountStatus} from "../../models";

export const resourcesData = [
  {
    text: 'Active',
    id: AccountStatus.ACTIVE,
    color: '#E91E63',
  }, {
    text: 'Inactive',
    id: AccountStatus.INACTIVE,
    color: '#7E57C2',
  },
];

interface IMapped {
  startDay: number,
  endDay: number,
  schedules: any[],
}

const SchedulesPage: React.FC = () => {
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
    const sessions = props.appointmentData?.data;
    console.log('props', sessions);
    return (
      <Box width={100} p={2}>

        <Button onClick={() => handlerChangeStatusSessions(sessions)}>
          {sessions.status === "ACTIVE" ? "Active" : "Inactive"}
        </Button>
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
