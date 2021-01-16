import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Paper,
  Box,
  FormControlLabel,
  Switch,
  useTheme,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { doctor as repoDoctor } from "services/repos";
import { useApi } from "stores/UseApi/useApi";
import useAuthentication from "stores/authenticationsStore/authentication";
import { WorkingTime } from "models/workingTime";
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

import { ViewState } from "@devexpress/dx-react-scheduler";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { AccountStatus, ModelStatus } from "models";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { RouteList } from "routeList";
import { useStyles } from "./style";

interface IMapped {
  startDay: number;
  endDay: number;
  schedules: any[];
}

const SchedulesConsultationPage: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const resourcesData = [
    {
      text: "Active",
      id: AccountStatus.ACTIVE,
      color: theme.palette.success.main,
    },
    {
      text: "Inactive",
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
    limit: 250,
    // date: timeExpired,
  };

  const dataRs = useApi(() => repoDoctor.getConsultationWorkingTime(payload));
  useEffect(() => {
    dataRs && setData(dataRs.data);
  }, [dataRs]);

  useEffect(() => {
    if (data) {
      let startDay = 8;
      let endDay = 18;

      const schedules = WorkingTime.toSchedule(data || []).map((s) => {
        const start = (s.startDate as Date).getHours();
        const end = (s.endDate as Date).getHours() + 1;
        if (startDay > start) startDay = start;
        if (endDay < end) endDay = end;
        return s;
      });
      setMapped({
        startDay,
        endDay,
        schedules,
      });
    }
  }, [data]);

  const resources = [
    {
      fieldName: "status",
      instances: resourcesData,
    },
  ];

  const handlerChangeStatusSessions = (sessionWorking: WorkingTime) => {
    setActive(!active);
    repoDoctor.updateWorkingTime(sessionWorking).then((rs) => {
      const newWorkingTime = data || [];
      const indexOfScheduleUpdate = newWorkingTime.findIndex(
        (value) => rs.id === value.id,
      );
      if (newWorkingTime?.length > 0 && indexOfScheduleUpdate !== -1) {
        newWorkingTime[indexOfScheduleUpdate] = rs;
        setData([...newWorkingTime]);
      }
    });
  };

  const handleAddConsultationWorkingTime = () => {
    history.push({ hash: RouteList.consultationCreate });
  };

  const renderDetailSession = (props: any) => {
    const workingTime: WorkingTime = props.appointmentData?.working;
    const readOnly =
      new Date().getTime() >
      new Date(workingTime.date).getTime() + workingTime.to;
    if (workingTime && !workingTime) return <></>;
    const startTime = WorkingTime.minusFormat(workingTime.from || 0) || "";
    const endTime = WorkingTime.minusFormat(workingTime.to || 0) || "";
    return (
      <Box p={2}>
        <Box alignItems="center" display="flex" flexDirection="row" mb={1}>
          <Box
            width="1.5em"
            height="1.5em"
            bgcolor={
              workingTime.status === "ACTIVE" ? "success.main" : "text.disabled"
            }
            borderRadius="50%"
          />
          <Box ml={1}>{moment(workingTime.date).format("DD MMMM YYYY")}</Box>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mr={1}>
            <AccessTimeIcon />
          </Box>
          <Box>
            {startTime} - {endTime}
          </Box>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mr={1}>
            <AssignmentIndIcon />
          </Box>
          <Link
            className={classes.link}
            to={`${RouteList.consultationSchedule}?date=${workingTime.date}`}
          >
            Go to Consultation Schedule
          </Link>
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
            label={
              workingTime.status === ModelStatus.ACTIVE ? "Active" : "Inactive"
            }
          />
        </Box>
      </Box>
    );
  };

  return (
    <Paper>
      <Box display="flex" alignItems="flex-end">
        <Button
          onClick={handleAddConsultationWorkingTime}
          variant="contained"
          color="primary"
          type="submit"
        >
          Tạo Lịch Tư Vấn
        </Button>
      </Box>
      <Scheduler data={mapped.schedules}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />

        <Toolbar
          flexibleSpaceComponent={() => (
            <>
              <Box flex={1} />
            </>
          )}
        />
        <WeekView
          key={currentDate.toString()}
          startDayHour={mapped.startDay}
          endDayHour={mapped.endDay}
        />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <Resources data={resources} mainResourceName="status" />
        <AppointmentTooltip
          onAppointmentMetaChange={(props) => {
            console.log(props.data);
            const workingTime: WorkingTime = props.data?.appointmentData?.data;
            setActive(workingTime?.status === ModelStatus.ACTIVE);
          }}
          contentComponent={(props) => renderDetailSession(props)}
        />
        <CurrentTimeIndicator
          shadePreviousCells
          shadePreviousAppointments
          updateInterval={10000}
        />
      </Scheduler>
    </Paper>
  );
};

export default SchedulesConsultationPage;
